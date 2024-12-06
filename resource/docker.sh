#!/bin/bash
composer install
mkdir /var/www/migrations
mkdir -p /var/www/var && chown -R www-data:www-data /var/www/var


# Clear cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Migrate database
php bin/console d:m:m --env=prod --no-interaction


# Start apache
exec apache2-foreground
