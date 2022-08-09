from django.db import models
from apps.projects.models import Projects

# Create your models here.

STATUS = (
    (0,"Borrador"),
    (1,"finalizado")
)

class Section(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    code = models.TextField()
    photo = models.ImageField(upload_to='photos/section', default='')
    photo_name = models.CharField(max_length=50, default='')
    status = models.IntegerField(choices=STATUS, default=0)
    author = models.IntegerField()
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return str(self.id)
