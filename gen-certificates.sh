openssl req -x509 -newkey rsa:4096 -keyout certificates/key.pem -out certificates/cert.pem -sha256 -days 36500 -nodes -subj "/C=XX/ST=California/L=SanJose/O=ezfind/OU=ezfind/CN=ezfind"