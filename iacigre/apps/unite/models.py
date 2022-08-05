from django.db import models
from django.contrib.auth import get_user_model
from apps.projects.models import Projects
User = get_user_model()

# Create your models here.

class Unite(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    user_add = models.IntegerField()
    user_add_name = models.CharField(max_length=50)
    
    def __str__(self):
        return str(self.id)