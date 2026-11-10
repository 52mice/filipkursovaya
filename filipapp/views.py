from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Class, Subject, Student, Teacher, Grade, Schedule
from .serializers import (
    UserSerializer, ClassSerializer, SubjectSerializer, 
    StudentSerializer, TeacherSerializer, GradeSerializer, ScheduleSerializer
)

# ModelViewSet сам делает всю магию (CRUD: создать, прочитать, обновить, удалить)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


def index_page(request):
    classes_list = Class.objects.all() 
    return render(request, 'filipapp/index.html', {'classes': classes_list})

def students_page(request):
    students_list = Student.objects.all()
    return render(request, 'filipapp/students.html', {'students': students_list})

def grades_page(request):
    grades_list = Grade.objects.all() 
    return render(request, 'filipapp/grades.html', {'grades': grades_list})

def schedule_page(request):
    schedule_list = Schedule.objects.all()
    return render(request, 'filipapp/schedule.html', {'schedule': schedule_list})    