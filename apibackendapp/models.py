from django.db import models
from django.contrib.auth.models import User#importing built in user class
#from django.db.models.signals import post_save
#from django.dispatch import receiver
#from rest_framework.authtoken.models import Token
#from django.conf import settings

#to automatically generate token even if the user is created via admin interface
#when we receive the post_save signal of USER model,then we can generate token for that user
'''@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)
        '''

# Create your models here#.

#create model for department by inheriting Models class inside models module
class Department(models.Model):
    DepartmentId=models.AutoField(primary_key=True) #here we are creating auto increment using autofield class  and primary key by passing primary_key=true to the autofield class's constructor
    #naming convenction ithahn standard
    DepartmentName=models.CharField(max_length=150)#string/char field
    #to list the dept name instead of the object name define this funct
    def __str__(self):
        return self.DepartmentName

#create model for Employee
class Employee(models.Model):  #auytofield..charfield are all classses in jango..these are inheriting from model class
    EmployeeId=models.AutoField(primary_key=True) #here we are creating auto increment using autofield class  and primary key by passing primary_key=true to the autofield class's constructor
    #naming convenction ithahn standard
    EmployeeName=models.CharField(max_length=150)#string/char field
    Designation=models.CharField(max_length=150)
    DateOfJoining=models.DateField()
    #foreign key..we have a class called foreign key and inside the foreignkey class,we are passing the model with pk
    DepartmentId=models.ForeignKey(Department,on_delete=models.CASCADE)
#example of direct relation since the refered field is 
#departmentid employeeil ond

    #on_delete=models.CASCADE MEANS IF A DEPARTMENT IS DELETED,THEN ALL THE EMPLOYEES UNDER THAT DEPARTMENT WILL BE AUTOMATICALLY DELETED.
    Contact=models.CharField(max_length=150)
    IsActive=models.BooleanField(default=True)
    def __str__(self):
        return self.EmployeeName



#user create akanda built in
#we will create userdetails model(one to one relationship kamikan)
class UserDetails(models.Model):
    #we are trying to build userdetails with inbuilt model user in django(litle diff)
    #an one to one field mapping the user model built in to django
    #we are not storing a single field here.its the user's complete instance
    #refering via a reverse  relationship with the user model
    #import user class first
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='user_details') #alias name.
    #conflict varathe irikan lowercase

    #in reverse relationship,the model will not be having the relationship field in the refered class'User'
    #using 'user_details' related name which is the accessor that can be used to navigate back to User Object
    #if 'user_details' is not provided,them django will automatically assign a related name to access back the User Object
    #user Useril illa.
    PhoneNo=models.CharField(max_length=25)
    email =models.EmailField()#field specific for email.
    def __str__(self):
        return self.user.username


#model for project (many to many relationships)
class Project(models.Model):
    #for a many to many field,one employee can have multiple projects.Multiple employee can be assigned to one project
    #for a many to many relationship model,we cannot expilicitly define an id field.Django will be refering to the default id field.
    #it will be creating
    name=models.CharField(max_length=200,unique=True)
    #define a many to many field
    #adding a related_name for the reverser access to work
    employees=models.ManyToManyField(Employee,related_name='projects') 
    #employees is reverse relationship to employee
    #related name will be later refered in the serializer.
    def __str__(self):
        return self.name






