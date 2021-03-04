**Related PR**
* Katello

#### Summary
* Completely in `React`, with `router` & `PF4` components
* Divided into two tabs sections: General fields & Advanced Fields
* Slots for extending fields (general / advanced)
* Form can be submitted only if there are no invalid fields

#### Fields overview
|General Fields|Changes|
| - |:-:| -:|
|_Organization_|Can be changed in the Form, changing ORG/LOC will fetch new data and reset form fields (HostGroup, OS & Smart Proxy)|
|_Location_|Same as Organization|
|_Host group_|OS, LCE, ACK|
|_Operating System_|When selected, show name (& linkt) to assigned `host_init_config` template (if not show link to OS detail)|
|_Smart Proxy_|No changes|
|_Insecure_|No changes|

|Advanced Fields|Changes|
| - |:-:| -:|
|Setup Remote Execution|`Yes/No` in default option `Inherit from Host parameter` is changing based on selected org, loc, os & host group TODO: Rename to deploy ssh keys & pridat info o template|
|Setup Insights|Same as for setup rex above. TODO: Pridat info o template|
|Token Life Time|Can be set to `unlimited`, plus limited to `999 999` hours|
|`foreman_remote_execution` fields|See [todo#link](github.com)|
|`Katello` fields|See [todo#link](github.com)|



**Changes in the template**
