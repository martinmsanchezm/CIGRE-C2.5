from ast import Add
from django.urls import path
from .views import ListProjectsView, AddNewProject, EditNewProject, DeleteProject

app_name="projects"

urlpatterns = [
    path('get-projects', ListProjectsView.as_view()),
    path('add-project', AddNewProject.as_view()),
    path('edit-project', EditNewProject.as_view()),
    path('delete-project', DeleteProject.as_view()),
]