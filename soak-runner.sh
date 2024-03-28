#!/bin/bash

# for each js file in the soakTests directory

for file in soakTests/*.js; do
  k6 run $file --summary-export=results/soak-$(basename $file .js).json --out csv=results/soak-$(basename $file .js).csv
  echo "Ran $file" >> results/soak-summary.txt
done