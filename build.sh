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
  bower install --allow-root # this script might be called as root inside container
  npm install
  gulp build #--env=Production # build for production by default
}

case $@ in
  #
  # This is called when container is being build (and this script is called with --post-build param)
  #
  *--post-build*)
    echo "M12.IO build script: POST-BUILD"

    # Build site package
    set -e # exit if anything fails here, so we know about errors early on
    buildSitePackage
    ;;

  *--post-init*)
    ./flow doctrine:migrate

    # Because now FLOW_CONTEXT is by default set to 'Production',
    # static resources (those from packages) are not published by default,
    # ie. symlinks in `Web/_Resources/Static/Packages/` are not present
    # after container launch. Therefore we need to publish them explicitly.
    ./flow resource:publish
    ;;

  #
  # This is called when container launches (and this script is called without any param)
  #
  *)
    echo "M12.IO build script"
    git config --global user.email "www@build.user" &&  git config --global user.name "WWW User"

    # Build site package, if needed
    if [[ "${T3APP_ALWAYS_DO_PULL^^}" = TRUE ]]; then
      buildSitePackage
    fi

    echo "M12.IO build script: done."
    ;;
esac

echo "M12.IO Build completed."
