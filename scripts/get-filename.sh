$([ -e ./public/list-contract.txt ] && rm ./public/list-contract.txt)

filenames=$(ls ./src/abis/*.json)
for eachfile in $filenames; do
    echo $(echo $eachfile | cut -d'/' -f 4) >>./public/list-contract.txt
done
