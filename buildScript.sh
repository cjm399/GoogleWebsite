find . -type f -name \*.html -o -name \*.js -o -name \*.css -exec sed -i s/GOOGLE_API_KEY/${GOOGLE_API_KEY}/g {} \;
return 0;