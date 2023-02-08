# Given N integers, compute their average, rounded to three decimal places.

read n
for i in $(seq 1 $n); do
    read num
    sum=$((sum + num))
done
printf "%.3f" $(echo "$sum/$n" | bc -l)