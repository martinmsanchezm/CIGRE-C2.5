from django.contrib import admin
from .models import Unite
# Register your models here.

class ProjectsAdmin(admin.ModelAdmin):
   
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    list_display = ( 
        'id',
        'user_id',
        'project',
        'user_add',
        'user_add_name'  
        )
    list_display_links = ('user_id','project',)
    list_filter = ('project', )
    list_per_page = 25


admin.site.register(Unite, ProjectsAdmin)
