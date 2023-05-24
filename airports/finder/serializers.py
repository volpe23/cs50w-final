from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name',)
        
class UserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'last_login')
    