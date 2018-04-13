#!/bin/bash
# Shell script to upgrade cloud9 php 5.x to php 5.6.31 or 7.1.7

echo "Updating the System..."
sudo apt-get update
echo "Updating mcrypt..."
sudo apt-get install libmcrypt-dev
echo "Install cUrl"
sudo apt-get install libcurl4-gnutls-dev
echo "Install apache2 dev tools for apxs2"
sudo apt-get install apache2-dev

read -p "Enter the PHP version number to install(5.6.31 or 7.1)? " phpversion
echo $phpversion
read -p "You are about to upgrade to PHP $phpversion OK(y or n)? " -n 1 -r
echo 
if [[ $REPLY =~ ^[Yy]$ ]]
then
    curl -L -O https://github.com/phpbrew/phpbrew/raw/master/phpbrew
    chmod +x phpbrew
    sudo mv phpbrew /usr/local/bin/
    phpbrew init
    
    # add this to your ~/.bashrc:
    #[[ -e ~/.phpbrew/bashrc ]] && source ~/.phpbrew/bashrc
    echo "[[ -e ~/.phpbrew/bashrc ]] && source ~/.phpbrew/bashrc" >> ~/.bashrc
    #vim ~/.bashrc
    export PHPBREW_SET_PROMPT=1
    export PHPBREW_RC_ENABLE=1
    # Paste this: 
    #   [[ -e ~/.phpbrew/bashrc ]] && source ~/.phpbrew/bashrc
    # and
    #   source /home/ubuntu/.phpbrew/bashrc
    #
    sudo phpbrew self-update
    sudo chmod oga+rw /usr/lib/apache2/modules
    sudo chmod -R oga+rw /etc/apache2/
    #sudo chmod -R oga+rw /var/lib/apache2/module/enabled_by_admin
    phpbrew install $phpversion +default +mysql +apxs2
    source ~/.phpbrew/bashrc
    phpbrew switch $phpversion
    phpbrew use $phpversion
    
    #phpbrew ext install curl
    #cp /etc/apache2/mods-available/php5.conf /etc/apache2/mods-available/php7.conf
    #ln -s /etc/apache2/mods-available/php7.conf /etc/apache2/mods-enabled/php7.conf
    #rm /etc/apache2/mods-enabled/php5.load
    #sudo chmod og-w /usr/lib/apache2/modules
    #sudo chmod -R og-w /etc/apache2/
    #sudo chmod -R oga-w /var/lib/apache2/module/enabled_by_admin
    php -v
fi

echo "Installing MySQL 5.6"
#mysql-ctl install
#sudo apt-get install mysql-server-5.6
echo "Finished installing Mysql"
echo "Installing phpMyAdmin"
phpmyadmin-ctl install
echo "Finished phpMyAdmin"
echo "Starting Mysql server..."
mysql-ctl start
echo "Mysql server started."

#update node
echo "installing node 6"
nvm install 6
#make node 6 default
echo "making node 6 as default node version"
nvm alias default 6