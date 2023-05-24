from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, first_name=None, last_name=None, password=None):
        if not email:
            raise ValueError('Email field is required')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name)

        user.set_password(password)
        user.save()

        return user
    

class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=255)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    # last_login = models.DateTimeField(blank=True, null=True, format='%d-%m-%Y')
    
    objects = UserAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    
    def __str__(self):
        return f"{self.email}"
    
    # def set_password(self, raw_password):
    #     self.password = raw_password
        
    # def check_password(self, raw_password):
    #     return self.password == raw_password
