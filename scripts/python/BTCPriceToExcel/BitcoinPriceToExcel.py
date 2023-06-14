import xlsxwriter
import requests

# Gets user inputs from command line
start_year = input('Start Year YYYY:  ')
start_month = input('Start Month MM:  ')
start_day = input('Start Day DD:  ')
end_year = input('End Year YYYY:  ')
end_month = input('End Month MM:  ')
end_day = input('End Day DD:  ')

# inserts user input into url
url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start={0}-{1}-{2}&end={3}-{4}-{5}'.format(
    start_year, start_month, start_day, end_year, end_month, end_day
)

# calls API and assigns data
request = requests.get(url)
results = request.json()
data = results['bpi']

# opens and names xlsx file
saved_file = 'bitcoin-hist{}.xlsx'.format(
 start_year + '-' + start_month + '-' + start_day + '_' + end_year + '-' + end_month + '-' + end_day
)
historical_prices = xlsxwriter.Workbook(saved_file)
prices_sheet = historical_prices.add_worksheet()
prices_sheet.write('A1', 'Date')
prices_sheet.write('B1', 'Price USD')

# appends data to the opened xlsx file
f = 1
for key in data:
    date = key
    price_usd = data[key]

    prices_sheet.write(f, 0, date)
    prices_sheet.write(f, 1, price_usd)
    f +=1
# close xlsx file
historical_prices.close()

# command line confirmation
print('Your file is saved as ' + saved_file)