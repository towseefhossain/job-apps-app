from rest_framework.response import Response
from rest_framework import generics, status
from .models import JobApplication
from .serializers import JobApplicationSerializer
from .models import Event
from .events_types import EventType
from rest_framework.views import APIView
from django.db.models import Sum


class JobApplicationListCreate(generics.ListCreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        Event.objects.create(
            name=str(EventType.JOB_APPLICATION),
            points=10
        )
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        JobApplication.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class JobApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    lookup_field = "pk"


class JobApplicationList(APIView):
    def get(self, request, name):
        if name:
            jobapplications = JobApplication.objects.filter(
                name__icontains=name)
        else:
            jobapplications = JobApplication.objects.all()

        serializer = JobApplicationSerializer(jobapplications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PointsList(APIView):
    def get(self, request):
        events = Event.objects.all()
        totalPoints = events.aggregate(Sum('points'))['points__sum']
        return Response({"points": totalPoints}, status=status.HTTP_200_OK)

# Create your views here.
