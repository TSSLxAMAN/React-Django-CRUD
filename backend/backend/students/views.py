from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from .models import *
import json
# Create your views here.

class AddStudentView(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetStudentView(APIView):
    def get(self, request):
        queryset = Student.objects.all()
        serializer = StudentSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeleteStudentView(APIView):
    def delete(self, request, id):
            student = Student.objects.get(id=id)
            student.delete()
            return Response({"message": "Student deleted successfully."}, status=status.HTTP_200_OK)
    
class EditStudentView(APIView):
    def put(self, request, id):
        print(id)
        student = Student.objects.get(id=id)

        serializer = StudentSerializer(student, data=request.data) 

        if serializer.is_valid():
            print("error")
            serializer.save()
            print("error")
            return Response(serializer.data, status=status.HTTP_200_OK)
        print("xxerror")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)