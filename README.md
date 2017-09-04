Installation instructions
=========================

1. Get dig (apt-get install dnsutils)
2. Get NPM
3. npm install -g base-x-bin
4. npm install
5. npm start
6. ./dnsget.sh https://rebootr.nl/stuff/horse.txt

Bugs
====

- Breaks on long URLs.
- Breaks on long response bodies.

TODO on a rainy day
===================

- Error handling
- Use TXT records more efficiently, if possible
- Compression in request URL
- Compression in response body
- Multi-part requests
- Multi-part responses
- Authentication
