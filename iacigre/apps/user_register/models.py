from django.db import models

# Create your models here.

class User_Register(models.Model):
    email = models.CharField(max_length=50)
    names = models.CharField(max_length=50, default="")
    desc = models.CharField(max_length=150, default="")
    
    def __str__(self):
        return str(self.email)