from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'classes', ClassViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'grades', GradeViewSet)
router.register(r'schedule', ScheduleViewSet)

urlpatterns = [
    path('', index_page, name='home'), 
    path('students/', students_page, name='students'), 
    path('api/', include(router.urls)),
    path('grades/', grades_page, name='grades'),
    path('schedule/', schedule_page, name='schedule'), 

]