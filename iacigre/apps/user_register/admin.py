from django.contrib import admin
from .models import User_Register
# Register your models here.

class UserRegisterAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
    
    list_display = (
        'id',
        'email',
        'desc'
    )
    list_display_links = ('id', 'email', )
    list_filter = ('email', )
    list_per_page = 25

admin.site.register(User_Register, UserRegisterAdmin)

