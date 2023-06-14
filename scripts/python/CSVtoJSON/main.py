import csv
filename = "textFx.csv"
data = []

with open(filename, 'r') as file:
    reader = csv.DictReader(file)
    data = [row for row in reader]

# The array of dictionaries
for row in data:
    print(row, end="\n")