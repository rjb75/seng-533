#!/bin/bash

# for each js file in the smokeTests directory

for file in smokeTests/*.js; do
  k6 run $file --summary-export=results/$(basename $file .js).json --out csv=results/$(basename $file .js).csv
  echo "Ran $file" >> results/summary.txt
done