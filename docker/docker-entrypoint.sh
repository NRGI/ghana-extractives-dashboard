# creating the .env file used by the node application using the environment variables
envsubst < docker/env.template > .env

# setting papertrail credentials in the config file for rsyslog
envsubst < docker/conf/log_files.yml > /etc/log_files.yml

# starting nginx
nginx -g 'daemon on;'

# starting supervisor
supervisord -c /etc/supervisord.conf

env $(cat /src/.env) pm2 start /src/docker/conf/ecosystem.json --no-daemon


