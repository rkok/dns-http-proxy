#!/bin/bash

if [ -z "$1" ]; then
	echo "Usage: $0 url" >&2
	exit 1
fi

DOMAIN="$(echo "$1" | basex -a 58).1337.nl"
echo -e "$DOMAIN\n"

dig @127.0.0.1 -p 5353 "$DOMAIN" TXT +noall +answer | grep -v '^;' | awk '{print $5}' | tr -cd '[[:alnum:]]' | basex -a 58 -d
