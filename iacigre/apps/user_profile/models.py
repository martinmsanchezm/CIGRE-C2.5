from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

class User_Profile(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    user_company = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos/user',blank=True,null=True)
    photo_name = models.CharField(max_length=50, default='')
    
    def __str__(self):
        return str(self.user_id)