Blog
==========================

**Rest Blog Client**

Make sure you have installed:
- [NodeJs] (https://nodejs.org/)
- npm
- bower
- http-server
- [Rest Blog Server] (https://github.com/Keaws/rest-blog)

To start the app:
```
npm install
bower install
http-server
```

To run tests (WebStorm IDE):
```
select Run -> Edit Configurations
JavaScript File: [blog-client directory]\node_modules\protractor\lib\cli.js
Application Parameters: [blog-client directory]\tests\config.js
```

or execute in command line:
```
node .\node_modules\protractor\lib\cli.js .\tests\config.js
```
