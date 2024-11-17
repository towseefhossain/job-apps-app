from django.urls import path
from . import views

urlpatterns = [
    path('jobapplications/', views.JobApplicationListCreate.as_view(),
         name="jobapplications-view-create"),
    path('jobapplications/<int:pk>/', views.JobApplicationDetail.as_view(),
         name="jobapplications-view-detail"),
    path('jobapplications/list/<str:name>/', views.JobApplicationList.as_view(),
         name="jobapplications-view-list"),
    path('points/', views.PointsList.as_view(), name="points-view"),
]
