#!/bin/bash

version=$(curl -s https://registry.npmjs.org/logging-starter | jq '.["dist-tags"].latest' | sed 's/"//g')
echo current version: $version
majorVersion=$(echo $version | cut -d '.' -f 1-2 )
minorVersion=$(echo $version | cut -d '.' -f 3)
((minorVersion++))

newVersion=$(echo $majorVersion.$minorVersion)
echo new version: $newVersion

newPackageJson=$(cat package.json | sed "s/\"version\": \".*\",/\"version\": \"$newVersion\",/")
echo $newPackageJson > package.json

npm run prettier:fix -- package.json

npm publish
