m12.io
======

This package is a complete [m12.io](http://m12.io) website, incl. the initial content.

## Installation

```
composer require m12/m12-io-site:dev-master
./flow package:delete TYPO3.NeosDemoTypo3Org
./flow site:prune --confirmation TRUE
./flow site:import --package-key M12.Foundation.Demo
./flow flow:cache:flush --force; ./flow cache:warmup
```

## Build process

### Requirements

You'll need to have the following items installed before continuing:

* [Node.js](http://nodejs.org): installed
* [Gulp](http://gulpjs.com): Run `[sudo] npm install -g gulp`
* [Bower](http://bower.io): Run `[sudo] npm install -g bower`

### How to build

* From NEOS_ROOT directory go to M12.Site directory:

    ```cd Packages/Sites/M12.Site/Build```

* `bower install` - to install required front-end libraries in ../Resources/Public/Vendors
* `npm install` - to install gulp and its modules locally
* `gulp` - to build CSS/JS and whatever else is there
