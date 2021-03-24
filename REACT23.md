

## Summary
* Completely in `React`, with `router` & `PF4` components
* Divided into two tabs sections: General fields & Advanced Fields
* Slots for extending fields (general / advanced)
* Form can be submitted only if there are no invalid fields

## Fields overview
### General Fields

**Organization & Location**
* Can be changed in the Form
* changing ORG/LOC will fetch new data and reset form fields (HostGroup, OS & Smart Proxy)

**Host group**
* If selected, inherit values for: Operating System, Activation Keys & Life Cycle Environment

**Operating System**
* When selected, show name (& link) to assigned `host_init_config` template (if not show link to OS detail)

**Smart Proxy** - No changes

**Insecure** - No changes

### Advanced Fields
**Setup Remote Execution** & **Setup Insights**
* `Yes/No` in default option `Inherit from Host parameter` is changing based on selected org, loc, os & host group TODO: Rename to deploy ssh keys & pridat info o template

**Registration Packages**
* TODO: Show / edit?

**Repository**
* TODO: Show / edit?

**Repository GPG**
* TODO: Show / edit?

**Token Life Time**
* Can be set to `unlimited`, plus limited to `999 999` hours

### Katello Fields
**Activation Keys**
* Better component for selecting activation keys
* Required only when selected hostgroup has no keys (or HG is not selected at all)

**Life cycle environment**
* New field

**Force**
* TODO: Better naming & texting

**Ignore errors**
* TODO: Better naming & texting

### Remote Execution Fields
No changes there


|`foreman_remote_execution` fields|See [todo#link](github.com)|
|`Katello` fields|See [todo#link](github.com)|



**Changes in the template**

## Related PR
* Katello (TODO)
* Foreman Remote Execution (TODO)