# local-mock-server

  A simple local mock server with cli tool

## About

  You can use it with Node.js API or CLI tool.
  
## Install

```sh
$ npm i --save-dev local-mock-server
```

## Example

### CLI

serve mock files in 'mockdir' directory
```sh
mock -d mockdir
```

### Node.js API

```js
const mock = require('local-mock-serever')
mock('mockdir') // '/mock' directory by default
```