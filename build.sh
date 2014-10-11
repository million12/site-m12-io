#!/bin/sh
#
# M12.io build script
#
# This file should contain all necessary step to build up&running website.
# Include here all necessary build steps (e.g. scripts minification,
# styles compilation etc).
#

echo "M12.IO build script"

# This should be already available in the system - install it manually if needed.
#sudo npm install -g gulp bower

cd Build/

bower install
npm install
gulp build --env=Production # build for production by default

echo "M12.IO Build completed."
