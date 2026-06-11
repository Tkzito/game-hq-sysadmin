#!/bin/bash
mkdir -p /home/operator
printf "id\tdate\tproduct\tamount\n" > /home/operator/sales.tsv
printf "1\t2026-06-10\tWidget A\t100.50\n" >> /home/operator/sales.tsv
printf "2\t2026-06-11\tWidget B\t200.00\n" >> /home/operator/sales.tsv
printf "3\t2026-06-11\tWidget C\t50.00\n" >> /home/operator/sales.tsv
printf "4\t2026-06-12\tWidget A\t150.00\n" >> /home/operator/sales.tsv

chown -R operator:operator /home/operator
chmod 644 /home/operator/sales.tsv
