# Given two integers, X and Y, find their sum, difference, product, and quotient.

read x
read y

echo $((x + y))
echo $((x - y))
echo $((x * y))
echo $((x / y))

# or other solution

read X
read Y
printf "%s\n" $X{+,-,*,/}"($Y)" | bc