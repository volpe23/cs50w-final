from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('user/<int:pk>', views.UserInfo.as_view()),
    path('flight', views.flight, name='flight'),
]
