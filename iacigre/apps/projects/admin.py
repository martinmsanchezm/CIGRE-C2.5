from django.contrib import admin
from .models import Projects
# Register your models here.

class ProjectsAdmin(admin.ModelAdmin):
   
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
    
    list_display = ('id', 'title', 'author', 'status', 'photo' )
    list_display_links = ('id', 'title', )
    list_filter = ('created_at', )
    list_per_page = 25


admin.site.register(Projects, ProjectsAdmin)