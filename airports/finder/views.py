from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from . import scraper
from .models import *


# Create your views here.
def index(request):
    return HttpResponse("Hello world!")

def flight(request):
    from_airport = request.GET['from']
    destination = request.GET['destination']
    start_date = request.GET['start']
    back_date = request.GET['back']
    print(start_date, back_date)
    flights = scraper.launch_browser(from_airport, destination, start_date, back_date)
    # print(flights)
    return JsonResponse({'flights' : flights}, safe=False)

class UserInfo(APIView):
    
    def get_user(self, pk):
        try:
            return UserAccount.objects.get(pk=pk)
        except UserAccount.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format = None):
        user = self.get_user(pk)
        serializer = UserSerializer(user)
        print(request.data)
        # if serializer.is_valid():
        try:
            # serializer.save()
            return Response({'status' : 'success', 'data' : serializer.data}, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({'status' : 'error', 'data' : serializer.errors}, status=status.HTTP_400_BAD_REQUEST)