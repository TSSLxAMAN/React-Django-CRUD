from rest_framework import serializers
from .models import * 

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
    
    def validate_email(self, value):
        # Get the current instance being updated (if any)
        instance = getattr(self, 'instance', None)
        
        # Create a queryset that excludes the current instance
        queryset = Student.objects.filter(email=value)
        if instance:
            queryset = queryset.exclude(pk=instance.pk)
        
        # Check if email exists in other records
        if queryset.exists():
            raise serializers.ValidationError("Email already been registered")
        
        return value