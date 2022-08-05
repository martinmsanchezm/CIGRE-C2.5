from django.urls import path
from .views import GetUserProfile, EditUserProfile, EditImageProfile, Get_Users

app_name="user_profile"

urlpatterns = [
    path('get-user-profile', GetUserProfile.as_view()),
    path('edit-user-profile', EditUserProfile.as_view()),
    path('edit-image-profile', EditImageProfile.as_view()),
    path('get-users', Get_Users.as_view()),
]