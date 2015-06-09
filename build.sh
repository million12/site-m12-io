#!/bin/sh
#
# Site build script
#
# This file should contain all necessary steps to build the website. Include here 
# all necessary build steps (e.g. scripts minification, styles compilation etc).
#

#
# Build site package things (gulp, js/css etc)
#
function buildSitePackage() {
  echo "Building site package..."
  cd Build/
  bower install --allow-root # this script might be called as root inside container
  npm install
  gulp build --env=Production # build for production by default
}

case $@ in
  #
  # This is called when container is being build (and this script is called with --post-build param)
  #
  *--post-build*)
    echo "M12.IO build script: POST-BUILD"
    
    # Install required tools globally (if not installed)
    npm install -g gulp bower
    
    # Build site package
    set -e # exit if anything fails here, so we know about errors early on
    buildSitePackage
    ;;
 
  #
  # This is called when container launches (and this script is called without any param)
  #
  *)
    echo "M12.IO build script"
    
    # WORKAROUND to sometimes faulty `./flow site:import`
    # For fresh install or when T3APP_NEOS_SITE_PACKAGE_FORCE_REIMPORT is set, reimport db/resources
    if [[ $RUNTIME_EXECUTED_MIGRATIONS == 0 ]] || [ "${T3APP_NEOS_SITE_PACKAGE_FORCE_REIMPORT^^}" = TRUE ]; then
      ./flow db:import --package-key M12.Site
      cp -f Packages/Sites/M12.Site/Resources/Private/Content/Resources/* Data/Persistent/Resources/.
    fi
    
    # Build site package
    buildSitePackage
    ;;
esac

echo "M12.IO Build completed."
