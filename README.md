# blog

[![Build Status](https://travis-ci.org/alonehover/Blog.svg?branch=master)](https://travis-ci.org/alonehover/Blog)

#### 环境需要
* mysql
* node 7+

#### install

`npm install`

or

`yarn`

### config

1. copy config.tpl.json to config.json

2. set mysql option
```
"mysql": {
    "connectionLimit" : 10,
    "host"     : "mysql server host", // default `localhost`
    "user"     : "mysql user name",
    "password" : "mysql password",
    "database" : "database name"
}
```

#### run

1. run mongo first
   `mongod`

2. `npm start`

3. open browser in `localhost:3000`
