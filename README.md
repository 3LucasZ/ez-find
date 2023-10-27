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

- Make the labels multi-line when it gets too long
- Display the printer meta data xml properly
- Selection for different types of DYMO printers
- Non-admins can only search/view items/storages
- Admins can create, update, delete, etc

# Debugging

- npx prisma studio

# Thanks to:

- https://favicon.io/favicon-converter/

# Privacy policy:

- We do not make any money. We do not collect any data from our users. We use Google sign in only to see if your email is part of the administration team.

# Terms of service:

- We run on a private network, only a small core team can access. Please do not hack our website.
