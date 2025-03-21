from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)  # Register the viewset

urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs
]