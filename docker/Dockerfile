FROM million12/typo3-flow-neos-abstract:latest
MAINTAINER Marcin Ryzycki marcin@m12.io

# ENV: Repository for installed TYPO3 Neos distribution 
ENV T3APP_BUILD_REPO_URL git@github.com:million12/site-m12-io.git

# Add key needed to access private repository
ADD container-files/gh-repo-key /

# Pre-install TYPO3 Neos into /tmp/typo3-neos.tgz
RUN \
  chown www /gh-repo-key && chmod 600 /gh-repo-key && \
  echo "IdentityFile /gh-repo-key" >> /etc/ssh/ssh_config && \
  . /build-typo3-app/pre-install-typo3-app.sh

# Add remaining container-files
ADD container-files /
