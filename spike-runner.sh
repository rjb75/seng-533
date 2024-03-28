#!/bin/bash

# for each js file in the spikeTests directory

for file in spikeTests/*.js; do
  k6 run $file --summary-export=results/spike-$(basename $file .js).json --out csv=results/spike-$(basename $file .js).csv
  echo "Ran $file" >> results/spike-summary.txt
done