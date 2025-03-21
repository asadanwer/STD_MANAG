from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('students.urls')),  # Include students app URLs
    path('api/', include('courses.urls')),  # Include courses app URLs
    path('api/', include('enrollments.urls')),  # Include enrollments app URLs
]