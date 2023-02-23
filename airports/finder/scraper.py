from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time

PATH = 'C:/Users/lv-andrisr/OneDrive - TEKNOS GROUP OY/Desktop/test/chromedriver.exe'

def launch_browser():
    
    url = 'https://www.kayak.ie/flights/RIX-MTY/2023-09-24-flexible-3days/2023-10-03-flexible-3days/2adults?sort=bestflight_a'
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
    # driver.get_screenshot_as_file("screenshot.png")
    time.sleep(10)
    xp_button = '//*[@class="Iqt3 Iqt3-mod-stretch Iqt3-mod-bold Button-No-Standard-Style Iqt3-mod-variant-solid Iqt3-mod-theme-action Iqt3-mod-shape-rounded-small Iqt3-mod-shape-mod-default Iqt3-mod-spacing-default Iqt3-mod-size-small"]'
    # //*[@id="Ntc7"]/div[13]/div/div[3]/div/div/div[2]/div/div/div[1]/button
    ''
    button = driver.find_element(By.XPATH, xp_button)
    button.click()
    scraped = []
    try:
        # //*[@id="rs5E-info"]/ol
        xp_offers = '//*[@class="resultInner"]'
        offers = driver.find_elements(By.XPATH, xp_offers)

        for offer in offers:
            price = offer.find_element(By.CLASS_NAME, 'price-text').text
            flights = offer.find_element(By.CLASS_NAME, 'flights').find_elements(By.TAG_NAME, 'li')
            obj = {'price' : price, 'out' : {}, 'in' : {}}
            for i, flight in enumerate(flights):
                flight_info = flight.find_element(By.CLASS_NAME, 'container')
                date = flight_info.find_element(By.CLASS_NAME, 'with-date').find_element(By.CLASS_NAME, 'bottom').text
                times = flight_info.find_element(By.CLASS_NAME, 'times').text
                stops = flight_info.find_element(By.XPATH, './div[@class="section stops"]')
                stop_count = stops.find_elements(By.XPATH, './*')
                duration = flight_info.find_element(By.CLASS_NAME, 'duration').text
                # for stop in stop_count:
                #     stopover = stop.get_attribute('title')
                info = {'date' : date, 'times' : times.split('\n')[0], 'stopovers' : [stopover.text for stopover in stop_count], 'duration' : duration}
                
                if i == 0:
                    obj['out'] = info
                else:
                    obj['in'] = info
            scraped.append(obj)

        return scraped
        
    except NoSuchElementException:
        print("why???")
        pass
