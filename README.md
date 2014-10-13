# m12.io: TYPO3 Neos based website

This is our complete [m12.io](http://m12.io) website and it's an example how you can built simple website on top of TYPO3 Neos content management system. Although the website is very simple and contains just a few pages and a blog system, while working on it we tried to discover and incorporate the best practises of working with TYPO3 Neos. From templating, Sass styling, modern package managers and build systems (bower, gulp), through showing how you can wrap everything in Docker container.


## Usage

#### Manual setup

Just clone it and run it on your web server. You'll need:
* web server with Nginx/PHP-FPM/MySQL
* configured vhost for this project
* update [Configuration/Settings.yaml](Configuration/Settings.yaml) with database details.

Now go to your vhost address and TYPO3 Neos should guide you through installation process, i.e. setting up admin user, importing `M12.Site` site package.

#### Using Docker

Assuming you are familiar with Docker and have a host which can run docker containers for you, you can launch it quickly in just one step. We use [fig](http://www.fig.sh/) tool to orchestrate necessary containers and link them together.

If you have fig already installed, there's a `fig.yml` config already provided, so you can simply run:  
```
fig up
```  
The configuration can be customised via env variables, e.g. you can provide your own host names which will be configured, admin user details.

Map `m12.io dev.m12.io test.m12.io` to your docker host IP (or whatever hostnames you've provided in NEOS_APP_VHOST_NAMES variable while launching the containers) and you should be able to access it under http://the_host_name:8080/.

By default, there's also SSH container launched in case you'd like to proceed with development. To simplify the process of managing SSH keys, they are imported via GitHub API. Simply provide your GitHub username (you need to have your public key there added) and the key will be automatically imported when the container starts. You should be able to SSH to it using:  
```
ssh -p 5678 www@your-docker-host
```


## Build process

Build process installs all necessary front-end libraries (Foundation, Fonts) and compiles/minifies styles and JavaScript.

### Requirements

You'll need to have the following items installed before continuing:

* [Node.js](http://nodejs.org): installed
* [Gulp](http://gulpjs.com): Run `[sudo] npm install -g gulp`
* [Bower](http://bower.io): Run `[sudo] npm install -g bower`

### How to build

All build steps are in `./build.sh` script. Simply run it when necessary.
 
## Content import/export

Import the content:  
```
./flow site:prune --confirmation TRUE
./flow site:import --package-key M12.Site
./flow flow:cache:flush --force && ./flow cache:warmup
```

Export the content:  
```
./flow site:export --tidy --filename=Packages/Sites/M12.Site/Resources/Private/Content/Sites.xml
```


## Author

* Marcin ryzy Ryzycki <marcin@m12.io>
