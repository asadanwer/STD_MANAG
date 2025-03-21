from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnrollmentViewSet
router = DefaultRouter()
router.register(r'enrollments', EnrollmentViewSet)  # Register the viewset
urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs
]