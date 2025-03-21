from django.db import models

class Course(models.Model):
    course_name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=10, unique=True)
    instructor = models.CharField(max_length=100)
    credits = models.IntegerField()

    def __str__(self):
        return self.course_name