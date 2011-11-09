## Features

- recursivley include other configuration files
- scan directory for configuration files
- extend other settings
- reference other variables in config

## Example

```ini

[vars]
SOME_GLOBAL_VAR=hello world!

[some-setting]
name=vars:SOME_GLOBAL_VAR


[another-setting]
$extends=some-setting


[include]
files=/path/to/configs/*.conf /another/path/*.conf

```



