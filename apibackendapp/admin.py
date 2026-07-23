from django.contrib import admin
from .models import Department,Employee,UserDetails,Project
from rest_framework.authtoken.models import Token

# Register your models here.
#register all the models thjat we want to manage using the django's default admin user interface
admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(UserDetails)
admin.site.register(Project)
admin.site.register(Token)


