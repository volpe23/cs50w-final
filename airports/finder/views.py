from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bs4 import BeautifulSoup as bs
from . import scraper
from .models import *


# Create your views here.
def index(request):
    return HttpResponse("Hello world!")

def scrape(request):
    # url = 'https://www.kayak.ie/flights/RIX-MTY/2023-09-24-flexible-3days/2023-10-03-flexible-3days/2adults?sort=bestflight_a'
    
    # driver = webdriver.Chrome()
    # driver.get(url)
    
    # try:
    #     element = WebDriverWait(driver, 20).until(
    #         EC.presence_of_element_located((By.CLASS_NAME, 'best-flights-list-results'))
    #     )
    #     # print(element, "Hello world!")
    # except:
    #     pass
    
    return render(request, 'finder/scraper.html')

def flight(request):
    from_airport = request.GET['from']
    destination = request.GET['destination']
    start_date = request.GET['start']
    back_date = request.GET['back']
    print(start_date, back_date)
    flights = scraper.launch_browser(from_airport, destination, start_date, back_date)
    # print(flights)
    return JsonResponse({'flights' : flights}, safe=False)
