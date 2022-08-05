from django.urls import path
from .views import ListUsers, AddSection, DeleteUnite, GetUnite

app_name="user_unite"

urlpatterns = [
    path('get-users', ListUsers.as_view()),
    path('unite-user', AddSection.as_view()),
    path('delete-user', DeleteUnite.as_view()),
    path('get-unite', GetUnite.as_view()),

]