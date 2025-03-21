from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()  # Ensure this line is present
    serializer_class = StudentSerializer  # Ensure this line is present