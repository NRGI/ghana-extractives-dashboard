
FROM node:8.12.0-stretch

RUN apt-get update && apt-get install -y curl \
    python \
    python-setuptools \
    python-pip \
    nginx \
    gettext \
    && pip install --index-url=https://pypi.python.org/simple/ supervisor \
    && cp /usr/bin/envsubst /usr/local/bin/envsubst \
    && rm -rf /var/lib/apt/lists/*

RUN curl -O -L https://github.com/papertrail/remote_syslog2/releases/download/v0.19/remote_syslog_linux_amd64.tar.gz \
    && tar -zxf remote_syslog_linux_amd64.tar.gz  \
    && cp remote_syslog/remote_syslog /usr/local/bin  \
    && rm -r remote_syslog_linux_amd64.tar.gz \
    && rm -r remote_syslog


RUN mkdir /var/log/supervisor/

COPY . /src
WORKDIR /src
RUN npm install ; npm rebuild node-sass

# copy nginx config
COPY docker/conf/nginx.conf /etc/nginx/sites-enabled/default

# copy supervisord config
COPY docker/conf/supervisord.conf /etc/supervisord.conf


RUN ["chmod", "+x", "/src/docker/docker-entrypoint.sh"]

EXPOSE 80

CMD /src/docker/docker-entrypoint.sh
