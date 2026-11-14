from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, ClassViewSet, SubjectViewSet,
    StudentViewSet, TeacherViewSet, GradeViewSet, ScheduleViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'classes', ClassViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'grades', GradeViewSet)
router.register(r'schedule', ScheduleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]