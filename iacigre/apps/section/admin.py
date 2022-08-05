from django.contrib import admin
from .models import Section


class ProjectsAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return False
    
    list_display = (
        'id',
        'status',
        'author',
        'project',
        )
    list_display_links = ('id', 'author', 'project')
    list_filter = ('created_at', )
    list_per_page = 25

admin.site.register(Section, ProjectsAdmin)