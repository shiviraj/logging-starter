#!/bin/bash

version=$(curl -s https://registry.npmjs.org/logging-starter | jq '.["dist-tags"].latest' | sed 's/"//g')
echo current version: $version
majorVersion=$(echo $version | cut -d '.' -f 1-2 )
minorVersion=$(echo $version | cut -d '.' -f 3)
((minorVersion++))

newVersion=$(echo $majorVersion.$minorVersion)
echo new version: $newVersion

npm publish --version=$newVersion

#versionInJson=$(echo \"version\":\"$newVersion\",)
#echo $versionInJson
#
#awk 'NR==3 {$0="New Text"} {print}' file.txt > tmpfile
#sed -i '3s/.*/$versionInJson/' ./package.json
##cat package.json | sed -e 's/"version": ".*",/${versionInJson}/' > tmpFile
##cat tmpFile
