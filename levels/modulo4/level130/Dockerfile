FROM gamehq-compile-base:latest
RUN apt-get update && apt-get install -y procps openssh-server openssh-client curl python3 && rm -rf /var/lib/apt/lists/*

# Renomeia os binarios reais para que os wrappers funcionem
RUN mv /usr/bin/ssh /usr/bin/ssh.real && \
    mv /usr/bin/scp /usr/bin/scp.real && \
    mv /usr/bin/curl /usr/bin/curl.real
