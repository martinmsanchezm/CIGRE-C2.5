from ast import Add
from django.urls import path
from .views import ListProjectsView, AddNewProject

app_name="projects"

urlpatterns = [
    path('get-projects', ListProjectsView.as_view()),
    path('add-project', AddNewProject.as_view()),
]