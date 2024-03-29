# Dymo Printing

Steps in order to have dymo printing functionality:

1. Install the official Dymo Connect SDK for Mac or Windows from: https://www.dymo.com/support?cfid=online-support-sdk
2. Accept/allow any changes the SDK wants to make on your device
3. Make sure:

- Dymo Connect Service is running on your computer
- Service port is at 41951 (default)
- Connected to a printer via USB
- Dymo Certificate is trusted

# Useful Commands

- cancel -a -x # cancel all printer jobs
- /bin/bash /Applications/DYMO.WebApi.Mac.Host.app/Contents/Resources/InstallCertificates.sh

# Future plans

- None

# Deploy

- docker compose --env-file .env build
- Push to hub w/ Desktop
- Copy paste docker-compose.yml and .env
- docker compose --env-file .env pull
- docker compose --env-file .env up
- #in case you need to go back in?
- docker start ezfind-compose-app-1 ezfind-compose-db-1
- docker exec -it ezfind-compose-app-1 /bin/sh

# Debugging

- npx prisma studio
- netstat -anlp | grep 3000

# Thanks to:

- https://favicon.io/favicon-converter/

# Privacy policy:

- https://www.freeprivacypolicy.com/live/ecbf96ef-5d3a-49e3-a3b1-c4d00ade0934

# Terms of service:

- https://www.freeprivacypolicy.com/live/f2d9ef3d-0010-4737-84ac-55143be8a3a0
