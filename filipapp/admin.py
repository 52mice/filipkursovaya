from django.contrib import admin
from .models import User, Class, Subject, Student, Teacher, Grade, Schedule

admin.site.register(User)
admin.site.register(Class)
admin.site.register(Subject)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Grade)
admin.site.register(Schedule)