FROM gamehq-compile-base:latest
USER root
RUN apk add --no-cache curl unzip && \
    curl -o terraform.zip https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip && \
    unzip terraform.zip && mv terraform /usr/bin/ && rm terraform.zip
USER operator
