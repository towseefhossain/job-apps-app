from django.urls import path
from . import views

urlpatterns = [
    path('jobapplications/', views.JobApplicationListCreate.as_view(),
         name="jobapplications-view-create"),
    path('jobapplications/<int:pk>/', views.JobApplicationDetail.as_view(),
         name="jobapplications-view-detail"),
    path('jobapplications/list/<str:name>/', views.JobApplicationList.as_view(),
         name="jobapplications-view-list"),
    path('leetcode/', views.LeetCodeListCreate.as_view(),
         name="leetcode-view-create"),
    path('leetcode/<int:pk>/', views.LeetCodeDetail.as_view(),
         name="leetcode-view-detail"),
    path('leetcode/list/<str:name>/', views.LeetCodeList.as_view(),
         name="leetcode-view-list"),
    path('points/', views.PointsList.as_view(), name="points-view"),
]
