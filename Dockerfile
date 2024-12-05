FROM php:8.1-apache

# Get the wanted PHP extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pdo_mysql intl zip pcntl

# Install composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/bin --filename=composer && \
    rm composer-setup.php


# Setup the apache conf
COPY ./resource/apache.conf /etc/apache2/sites-available/000-default.conf

# Add Xdebug configuration
COPY ./resource/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Expose the HTTP & Websocket ports and set the container workdir
EXPOSE 80
WORKDIR /var/www/

# Set the entrypoint
ENTRYPOINT [ "bash", "./resource/docker.sh" ]
