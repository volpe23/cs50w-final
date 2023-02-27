from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time

PATH = 'C:/Users/lv-andrisr/OneDrive - TEKNOS GROUP OY/Desktop/test/chromedriver.exe'

url = 'https://www.skyscanner.net/transport/flights/rix/mty/230930/231007/?adultsv2=2&cabinclass=economy&childrenv2=&currency=EUR'

options = Options()
options.add_experimental_option('detach', True)
# options.headless = True
# options.add_argument("--window-size=1920,1080")
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_argument("--disable-extensions")
driver = webdriver.Chrome(PATH, options=options)
driver.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.53 Safari/537.36'})
driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
# driver.implicitly_wait(10)
driver.get(url)
time.sleep(10)