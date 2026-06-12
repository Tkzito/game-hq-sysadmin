FROM gamehq-compile-base:latest
USER root
RUN id -u auxiliar >/dev/null 2>&1 || adduser -D -u 1003 -s /bin/bash auxiliar
RUN echo -e '#!/bin/bash\nif [ "$1" = "restart" ]; then\n  echo "Restarting service..."\n  touch /var/run/lp.restarted\nfi' > /usr/sbin/service && \
    chmod +x /usr/sbin/service
RUN echo "operator ALL=(ALL) NOPASSWD: /usr/sbin/service lp restart" >> /etc/sudoers
USER operator
