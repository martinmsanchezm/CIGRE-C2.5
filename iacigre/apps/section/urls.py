from django.urls import path
from .views import AddSection, ListSectionView, EditSection, DeleteSection

app_name="section"

urlpatterns = [
    path('add-section', AddSection.as_view()),
    path('get-sections', ListSectionView.as_view()),
    path('edit-section', EditSection.as_view()),
    path('delete-section', DeleteSection.as_view()),
]