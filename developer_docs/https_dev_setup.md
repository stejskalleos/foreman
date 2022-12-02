# HTTPS Development setup
Setup for HTTPS Devel setup behind Apache proxy.
## Certificates
We will generate certificates with [step tool](https://smallstep.com/docs/step-cli)

**Installation**
Download latest `rpm` from the [GitHub](https://github.com/smallstep/cli/releases)
```bash
sudo dnf install -y ./step-cli_*.rpm
```

**Create a certificate authority**
Root CA:
```bash
step certificate create --no-password --insecure --profile root-ca "Example Root CA" root_ca.crt root_ca.key
```

Create a TLS certificate
```bash
step certificate create foreman.example.com foreman.example.com.crt foreman.example.com.key \
    --profile leaf --not-after=8760h \
    --ca ./intermediate_ca.crt --ca-key ./intermediate_ca.key --bundle \
    --no-password --insecure
```

Install the certificate into the system trust store
```bash
step certificate install root_ca.crt
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
  ServerName foreman.example.com

  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/

  RequestHeader set X-Forwarded-Proto http
</VirtualHost>

<VirtualHost *:443>
  ServerName foreman.example.com

  SSLEngine on
  SSLCertificateFile /path/to/certs-folder/example.com.crt
  SSLCertificateKeyFile /path/to/certs-folder/example.com.key

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
service httpd restart
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

## Smart proxy

Configuration:
```yaml
:foreman_url: https://foreman.example.com
:http_port: 8080
:https_port: 8443
:ssl_certificate: /path/to/certs-folder/foreman.example.com.crt
:ssl_ca_file: /path/to/certs-folder/rootCA.crt
:ssl_private_key: /path/to/certs-folder/foreman.example.com.key

:bind_host: ['*']
```

Proxy modules:
```yaml
# Dynflow
# Registration
# Templates
# Ansible
```

# TO_TEST:
* Dynflow
* Ansible
* Registration
* Templates (provisioning)

