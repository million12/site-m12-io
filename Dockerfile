FROM million12/typo3-neos-abstract:latest
MAINTAINER Marcin Ryzycki marcin@m12.io

# ENV: Repository for installed TYPO3 Neos distribution 
ENV TYPO3_NEOS_REPO_URL git@github.com:million12/site-m12-io.git

# Add key needed to access private repository million12/site-typostrap-io
ADD docker-files /

# Pre-install TYPO3 Neos into /tmp/typo3-neos.tgz
RUN \
  chmod 600 /gh-repo-key && \
  echo "IdentityFile /gh-repo-key" >> /etc/ssh/ssh_config && \
  . /build-typo3-neos/pre-install-typo3-neos.sh
