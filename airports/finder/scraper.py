from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time

PATH = 'C:/Users/lv-andrisr/OneDrive - TEKNOS GROUP OY/Desktop/test/chromedriver.exe'

def launch_browser(from_airport, destination):
    # skyscanner url
    # https://www.skyscanner.net/transport/flights/rix/mty/230930/231007/?adultsv2=2&cabinclass=economy
    url = f'https://www.kayak.ie/flights/{from_airport}-{destination}/2023-09-24-flexible-3days/2023-10-03-flexible-3days/2adults?sort=bestflight_a'
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
        results = driver.find_element(By.CLASS_NAME, 'resultsList')
        xp_offers = './/div[@data-resultid]'
        offers = results.find_elements(By.XPATH, xp_offers)
        for offer in offers:
            xp_price = './div[2]/div/div/div[2]/div/div[2]/div/div[1]/a/div/div/div[1]/div[1]'
            price = offer.find_element(By.XPATH, xp_price).text
            # xp_flights = './div[2]/div/div/div[1]/div[2]/div/ol'

            xp_link = f'.//a[@role="link"]'
            link = offer.find_element(By.XPATH, xp_link)

            xp_flights = './/ol'
            flights = offer.find_element(By.XPATH, xp_flights).find_elements(By.TAG_NAME, 'li')
            obj = {'price' : price, 'link' : link, 'out' : {}, 'in' : {}}
            for i, flight in enumerate(flights):
                # flight_info = flight.find_element(By.XPATH, './div/div')
                
                flight_info_class = "mod-variant-large"
                xp_flight_info = f'.//div[contains(@class, {flight_info_class})]'
                flight_info = flight.find_element(By.XPATH, f'.//div[contains(@class, {xp_flight_info})]')
                
                date = flight_info.find_element(By.XPATH, './div[2]/div/div[2]').text
                times = flight_info.find_element(By.XPATH, './div[3]').text
                stops = flight_info.find_element(By.XPATH, './div[4]')
                stop_count = stops.find_elements(By.XPATH, './*')
                duration = flight_info.find_element(By.XPATH, './div[5]').text
                # for stop in stop_count:
                #     stopover = stop.get_attribute('title')
                info = {'date' : date, 'times' : times.split('\n')[0], 'stopovers' : [stopover.text for stopover in stop_count], 'duration' : duration}
                
                if i == 0:
                    obj['out'] = info
                else:
                    obj['in'] = info
            print(obj)
            scraped.append(obj)
        return scraped
        
    except NoSuchElementException:
        print("why??")
        driver.quit()
        return scraped
    finally:
        driver.quit()
        return scraped
        
