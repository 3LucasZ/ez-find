# Dymo Printing

Steps in order to have dymo printing functionality:

1. Install the official Dymo Connect SDK for Mac or Windows from: https://www.dymo.com/support?cfid=online-support-sdk
2. Accept/allow any changes the SDK wants to make on your device
3. Make sure:

- Dymo Connect Service is running on your computer
- Service port is at 41951 (default)
- Connected to ONE printer via USB

4. (Note) There is currently only support for DYMO LabelWriter 450 Printers

# Useful Commands

- cancel -a -x # cancel all printer jobs
- /bin/bash /Applications/DYMO.WebApi.Mac.Host.app/Contents/Resources/InstallCertificates.sh

# Future plans

- Make the labels multi-line when it gets too long
- Display the printer meta data xml properly
- Non-admins can only search/view items/storages
- Admins can create, update, delete, etc
