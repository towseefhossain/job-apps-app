from rest_framework import serializers
from .models import JobApplication, Event, LeetCode


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'name', 'createdAt', 'updatedAt']


class LeetCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeetCode
        fields = ['id', 'name', 'level', 'createdAt', 'updatedAt']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'points', 'createdAt', 'updatedAt']
