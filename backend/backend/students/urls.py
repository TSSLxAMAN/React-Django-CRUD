from django.urls import path
from .views import *

urlpatterns = [
    path('addStudent/', AddStudentView.as_view(), name='addStudent'),
    path('getStudent/', GetStudentView.as_view(), name='getStudent'),
    path('deleteStudent/<int:id>/', DeleteStudentView.as_view(), name='deleteStudent'),
    path('editStudent/<int:id>/', EditStudentView.as_view(), name='editStudent'),
]
