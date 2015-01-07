FROM million12/typo3-flow-neos-abstract:latest
MAINTAINER Marcin Ryzycki marcin@m12.io

# ENV: Repository for installed TYPO3 Neos distribution 
ENV T3APP_BUILD_REPO_URL git@github.com:million12/site-m12-io.git

# Add key needed to access private repository million12/site-typostrap-io
ADD container-files /

# Pre-install TYPO3 Neos into /tmp/typo3-neos.tgz
RUN \
  chmod 600 /gh-repo-key && chown www:www /gh-repo-key && \
  echo "IdentityFile /gh-repo-key" >> /etc/ssh/ssh_config && \
  . /build-typo3-app/pre-install-typo3-app.sh
