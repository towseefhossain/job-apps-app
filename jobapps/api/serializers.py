from rest_framework import serializers
from .models import JobApplication, Event


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'name', 'createdAt', 'updatedAt']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'points', 'createdAt', 'updatedAt']
