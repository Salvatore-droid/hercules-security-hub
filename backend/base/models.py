from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

class User(AbstractUser):
    # Add any additional fields you need
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        
    class Meta:
        db_table = 'users'
        # Add this to avoid reverse accessor clash
        swappable = 'AUTH_USER_MODEL'

class UserSession(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Use string reference
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'user_sessions'