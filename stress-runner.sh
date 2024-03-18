#!/bin/bash

# for each js file in the smokeTests directory

for file in stressTests/*.js; do
  k6 run $file --summary-export=results/$(basename $file .js).json --out csv=results/stress-$(basename $file .js).csv
  echo "Ran $file" >> results/stress-summary.txt
done