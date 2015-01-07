# m12.io: TYPO3 Neos based website

This is our complete [m12.io](http://m12.io) website and it's an example how you can build a simple website on top of TYPO3 Neos CMS. The website is very simple and contains just a few pages and a blog system. Though, while working on it, we tried to discover and incorporate the best practises for working with TYPO3 Neos. From HTML templates, Sass styling, modern package managers and build tools (bower, gulp, npm) through showing how you can wrap it all and launch using Docker containers.


## Usage

#### Using Docker (recommended)

Even if you don't have any experience with Docker, you can launch it quickly in just one step. 

##### Prepare Docker host (if you don't have any)

If you don't have any host for running Docker containers, you have two options:

* **Option 1**: install [boot2docker](http://boot2docker.io/). There's instruction how to do that for WIN or MAC.
* **Option 2**: preferred way if you use [Vagrant](https://www.vagrantup.com/). We have provided `Vagrantfile` which launches minimalistic [CoreOS](https://coreos.com/) host (a nice alternative to boot2docker). Simply run `vagrant up` and it's done.

We use [fig](http://www.fig.sh/) tool to orchestrate necessary containers and link them together. Install it on your Docker host and/or on your machine (if you're on Mac). 

If you have fig already installed, there's a `fig.yml` config already provided, so you can simply run:  
```
fig up
```  
The configuration can be customised via env variables, e.g. you can provide your own host names which will be configured in Nginx, admin user details for Neos etc.

Map `m12.io dev.m12.io test.m12.io` to your docker host IP (or whatever hostnames you have provided in NEOS_APP_VHOST_NAMES variable while launching the containers) and you should be able to access it under http://the_host_name:8080/.

By default, there's also SSH container launched in case you'd like to proceed with development. To simplify the process of managing SSH keys, they are imported via GitHub API. Provide your GitHub username (you need to have your public key there added to your GitHub account) and the key will be automatically imported when the container starts. You should be able to SSH to it using:  
```
ssh -p 5678 www@your-docker-host
```

#### Manual setup (not-recommended ;)

Just clone it and run it on your web server. You'll need:
* web server with Nginx/PHP-FPM/MySQL
* configured vhost for this project
* update [Configuration/Settings.yaml](Configuration/Settings.yaml) with database details.

Now go to your vhost address and TYPO3 Neos should guide you through installation process, i.e. setting up admin user, importing `M12.Site` site package.

## Build process

Build process installs all necessary front-end libraries (Foundation, Fonts) and compiles/minifies styles and JavaScript.

### Requirements

You'll need to have the following items installed before continuing:

* [Node.js](http://nodejs.org): installed
* [Gulp](http://gulpjs.com): Run `[sudo] npm install -g gulp`
* [Bower](http://bower.io): Run `[sudo] npm install -g bower`

### How to build

All build steps are in `./build.sh` script. Simply run it when necessary.

During development, use `gulp build` or `gulp watch` **from Build/ directory.

 
## Content import/export

Import the content:  
```
./flow site:prune --confirmation TRUE
./flow site:import --package-key M12.Site
./flow db:import --package-key M12.Site
./flow flow:cache:flush --force && ./flow cache:warmup
```

Export the content:  
```
./flow site:export --package-key M12.Site --tidy
./flow db:export --package-key M12.Site
```


## Author

* Marcin ryzy Ryzycki <marcin@m12.io>
