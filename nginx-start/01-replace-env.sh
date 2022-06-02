#!/bin/sh

touch /opt/app-root/src/info.txt

echo "01-replace-env.sh run at: $(date)" > /opt/app-root/src/info.txt
for xenv in \
  REACT_APP_STORYBOOK_ENABLE \
  REACT_APP_API_BACKEND ;
do
  if [[ -z "${!xenv}" ]]; then
    echo "$xenv is not defined" >> info.txt
  else
    echo "Replace @@$xenv@@ with value ${!xenv} " >> info.txt
    sed -i "s,@@$xenv@@,${!xenv},g" static/js/main.*.js
    sed -i "s,@@$xenv@@,${!xenv},g" static/js/*.chunk.js
  fi
done