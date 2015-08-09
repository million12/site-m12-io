FROM million12/typo3-flow-neos-abstract:latest
MAINTAINER Marcin Ryzycki marcin@m12.io

# ENV: Repository for installed TYPO3 Neos distribution 
ENV T3APP_BUILD_REPO_URL git@github.com:million12/site-m12-io.git

# Add key needed to access repository million12/site-m12-io using SSH key
ADD gh-repo-key /

RUN \
  `# Configure GH repository key` \
  chown www /gh-repo-key && chmod 600 /gh-repo-key && \
  echo "IdentityFile /gh-repo-key" >> /etc/ssh/ssh_config && \

  `# Pre-package Neos` \
  . /build-typo3-app/pre-install-typo3-app.sh

# Add remaining container-files
ADD container-files /
