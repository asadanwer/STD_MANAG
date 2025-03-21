from rest_framework import serializers
from .models import Enrollment
from students.serializers import StudentSerializer
from courses.serializers import CourseSerializer
# class EnrollmentSerializer(serializers.ModelSerializer):
#     student = StudentSerializer(read_only=True)  # Nested serializer for student
#     course = CourseSerializer(read_only=True)    # Nested serializer for course
#     class Meta:
#         model = Enrollment
#         fields = '__all__'
class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'enrollment_date']
        read_only_fields = ['id']