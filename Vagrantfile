VAGRANTFILE_API_VERSION = "2"
Vagrant.require_version ">= 1.6.5"
require 'fileutils'

CLOUD_CONFIG_PATH = File.join(File.dirname(__FILE__), 'cloud-config.yaml')

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.define "m12-io"
  
  config.vm.box = 'yungsang/coreos-beta'
  config.vm.box_version = ">= 1.2.9"
  
  config.vm.provider :parallels do |v, override|
    v.customize ['set', :id, '--memsize', 2048]
    v.customize ['set', :id, '--cpus', 4]
    v.customize ['set', :id, '--adaptive-hypervisor', 'on']
  end
  
  if File.exist?(CLOUD_CONFIG_PATH)
    config.vm.provision :file, :source => "#{CLOUD_CONFIG_PATH}", :destination => '/tmp/vagrantfile-user-data'
    config.vm.provision :shell, :inline => "mv /tmp/vagrantfile-user-data /var/lib/coreos-vagrant/"
  end
end
