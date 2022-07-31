from django.contrib import admin
from .models import User_Profile
# Register your models here.

class ProjectsAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return False
    
    list_display = ('id', 'user_id', 'user_company' )
    list_display_links = ('id', 'user_id', )
    list_filter = ('id', )
    list_per_page = 25

admin.site.register(User_Profile, ProjectsAdmin)
