#!/bin/sh
#
# Site build script
#
# This file should contain all necessary steps to build the website. Include here 
# all necessary build steps (e.g. scripts minification, styles compilation etc).
#

case $@ in
  #
  # This is called when container is being build (and this script is called with --preinstall param)
  #
  *--preinstall*)
    echo "M12.IO build script: PREINSTALL"
    
    # Install required tools globally
    npm install -g gulp bower
    
    # Install site packages
    set -e # exit with error if any of the following fail
    cd Build/
    bower install --allow-root
    npm install
    gulp build --env=Production
    ;;
 
  #
  # This is called when container launches (and script is called without param)
  #
  *)
    echo "M12.IO build script"
    
    # WORKAROUND to sometimes faulty `./flow site:import`
    # For fresh install or when T3APP_NEOS_SITE_PACKAGE_FORCE_REIMPORT is set, reimport db/resources
    if [[ $RUNTIME_EXECUTED_MIGRATIONS == 0 ]] || [ "${T3APP_NEOS_SITE_PACKAGE_FORCE_REIMPORT^^}" = TRUE ]; then
      ./flow db:import --package-key M12.Site
      cp -f Packages/Sites/M12.Site/Resources/Private/Content/Resources/* Data/Persistent/Resources/.
    fi
    
    cd Build/
    bower install
    npm install
    gulp build --env=Production # build for production by default
    ;;
esac

echo "M12.IO Build completed."
