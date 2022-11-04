# HTTPS Development setup
Tested on Fedora.
DNS is for foreman.example.com, if you wan't to something different,
 just replace it with domain you like

## Prerequisities

Packages
```bash
dnf install httpd mod_ssl
```

Prepare DNS
```bash
# /etc/hosts
12.0.0.1 foreman.example.com
```

## Generate self-signed certificates
```bash
mkdir certs && cd certs
```

Create certificate authority
```bash
openssl req -x509 \
            -sha256 -days 356 \
            -nodes \
            -newkey rsa:2048 \
            -subj "/CN=foreman.example.com/C=CZ/L=Brno" \
            -keyout rootCA.key -out rootCA.crt
```

Create the server private key
```bash
openssl genrsa -out server.key 2048
```

Create certificate signing request
```bash
# csr.conf
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C = CZ
ST = CZ
L = Brno
O = The Foreman
OU = The Foreman DEV
CN = foreman.example.com

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = foreman.example.com
#DNS.2 = www.foreman.example.com
#IP.1 = 192.168.1.5
#IP.2 = 192.168.1.6
```

Generate certificate signing request (CSR) using server private key
```bash
openssl req -new -key server.key -out server.csr -config csr.conf
```

Create a external file
```bash
# cert.conf
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = foreman.example.com
```

Generate SSL certificate with self signed CA
```bash
openssl x509 -req \
    -in server.csr \
    -CA rootCA.crt -CAkey rootCA.key \
    -CAcreateserial -out server.crt \
    -days 365 \
    -sha256 -extfile cert.conf
```

Update CA trust
```bash
cp rootCA.crt /etc/pki/ca-trust/source/anchors/
cp update-ca-trust
```

## Configure Apache
Enable listening on `443` port
```bash
# conf/httpd.conf
Listen 443
```

Configure site
```bash
# /etc/httpd/conf.d/foreman.example.com.conf

<VirtualHost *:80>
  ServerName foreman.coconut.loc

  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/

  RequestHeader set X-Forwarded-Proto http
</VirtualHost>

<VirtualHost *:443>
  ServerName foreman.coconut.loc

  SSLEngine on
  SSLCertificateFile /path/to/certs-folder/foreman.example.com.crt
  SSLCertificateKeyFile /path/to/certs-folder/foreman.example.com.key

  SSLOptions +ExportCertData

  RequestHeader set X-Forwarded-Proto https

  RequestHeader set SSL_CLIENT_S_DN "%{SSL_CLIENT_S_DN}s"
  RequestHeader set SSL_CLIENT_CERT "%{SSL_CLIENT_CERT}s"
  RequestHeader set SSL_CLIENT_VERIFY "%{SSL_CLIENT_VERIFY}s"

  <Location "/">
    ProxyPass http://localhost:3000/
    ProxyPassReverse http://localhost:3000/
  </Location>
</VirtualHost>
```

Apply changes
```bash
apachectl configtest
systemctl restart httpd
```

# Running Foreman
```
# Rails
bundle exec rails server --binding 0.0.0.0 --port 3000

# Webpack
./node_modules/.bin/webpack-dev-server-without-h2 --config ./config/webpack.config.js \
  --allowed-hosts foreman.example.com \
  --https \
  --cert '/path/to/certs-folder/foreman.example.com.crt' \
  --key '/path/to/certs-folder/foreman.example.com.key'

```
## Foreman configuration
```yaml
# config/settings.yaml
:require_ssl: true
:webpack_dev_server_https: true
```

## Smart Proxy authentication
Foreman settings, in `Authentication` tab:
* `SSL client DN env`: `HTTP_SSL_CLIENT_S_DN`
* `SSL client verify env`: `HTTP_SSL_CLIENT_VERIFY`
* `SSL client cert env`: `HTTP_SSL_CLIENT_CERT`

Smart proxy configuration:
```yaml
:foreman_url: https://foreman.example.com
:log_file: STDOUT
:http_port: 8080
:https_port: 8443
:ssl_certificate: /path/to/certs-folder/foreman.example.com.crt
:ssl_ca_file: /path/to/certs-folder/rootCA.crt
:ssl_private_key: /path/to/certs-folder/foreman.example.com.key

:bind_host: ['*']
```

# TODO:
Dynflow
Ansible
Note about browser and not reloading the certificate
