

## Summary
* Completely in `React`, with `router` & `PF4` components
* Divided into two tabs sections: General fields & Advanced Fields
* Slots for extending fields (general / advanced)
* Form can be submitted only if there are no invalid fields
* Added link to DOC

## Fields overview
### General Fields

**Organization & Location**
* Can be changed in the Form
* changing ORG/LOC will fetch new data and reset form fields (HostGroup, OS & Smart Proxy)
*  Reset of fields from plugins is handled by plugins.

**Host group**
* If selected, following fields inherit the value from selected host group: Operating System, Activation Keys & Life Cycle Environment
* Selecting HG resets OS field

**Operating System**
* When selected, show info about assigned `host_init_config` template.
* If template is not found, show error and block form

**Smart Proxy** - No changes

**Insecure** - No changes

### Advanced Fields
**Setup Remote Execution** & **Setup Insights**
* `Yes/No` value in default options `Inherit from Host parameter` is delivered from selected organization, location host group and operating system. The chain of getting value is:
`organization -> location -> operatingsystem -> hostgroup`

**Repository** (new field)
* Add repository before registration

**Repository GPG** (new field)
* URL to GPG file (or path to file)

**Token Life Time**
* Can be set to `unlimited`, otherwise validated as `>= 1 && <= 999 999` hours

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


## Changes in the template
**Global registration**
- Use Activation keys from hostgroup & from user input together
- `force` re-registration with subman
- `ignore_subman_errors` - ignore errors for subman

**host init config**
- changed banner at the end of script (& removed `foreman` from msg, because Satellite)

## Tests
```
be rails t test/controllers/registration_commands_controller_test.rb test/controllers/api/v2/registration_co*
```

## TODO:
```
to global:
<%= "\n# Repository: [#{@repo}]" if @repo.present? -%>
<%= "\n# Repository GPG key: [#{@repo_gpg}]" if @repo_gpg.present? -%>
```
## Related PR
* Katello (TODO)
* Foreman Remote Execution (TODO)
