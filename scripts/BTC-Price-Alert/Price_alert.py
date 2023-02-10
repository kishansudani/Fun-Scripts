import gi
from gi.repository import Notify
import requests
import time


gi.require_version('Notify', '0.7')
Notify.init("Test Notifier")

while True:
    time.sleep(2.4)
    url = requests.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    urls = url.json()
    price = urls['bitcoin']['usd']
    if (price < 24000):
        notification = Notify.Notification.new(
            'Price',
            str(price),
            None
        )
        notification.show()