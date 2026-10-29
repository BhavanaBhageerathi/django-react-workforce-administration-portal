#import the required libraries
#import serializers module
from rest_framework import serializers
#import all the models that we created so far
from .models import Employee,Department,UserDetails,Project
#also import the in built user model from django
from django.contrib.auth.models import User,Group
import re
from django.contrib.auth.hashers import make_password

#create a serializer fro signup/registration of the user
#during signup automatically assign the user to a group
#if the group doent exist , then create a group
#save the user and also create a token for the user automatically
#SignupSerializer is already in django ,here we r over riding it
class SignupSerializer(serializers.ModelSerializer):
    #step1 : add a custom field for group name
    group_name = serializers.CharField(write_only=True,required=False)
    #this field will be used only for saving the user, so write only
    #user can be saved without this field also, so required false

    #step2: override the 'create' method to handle custom user registration
    def create(self,validated_data):
        #validated_Data will be receiving the details fro signup send via Api
        #the details inclued username,password,groupname(optional)
        #since django rest framework doesnot allow user creation and group assignment at once
        #we have to keep the grp name aside ,create the user and the assign the group
        self.group_name = validated_data.pop('group_name',None) # save grp name if exists from the validated data, else save none 
        #then remove the "group_name" field from the validated_data
        
        #since the defalt create was hashing the password ,we aslo have to do it
        validated_data["password"] = make_password(validated_data.get("password"))
        #now we can save the user
        #call the create mthod of the parent /super clss of SignupSerializer
        #the parent of SignupSerializer is Modelserializer
        user = super(SignupSerializer,self).create(validated_data)   

        #now add the created user to the group
        #if group is sent , then ass user to the group
        #if the sent group doesnt exist, then create the group and add user
        if self.group_name:
            group,created = Group.objects.get_or_create(name=self.group_name)
            #add  the user that we created to the group
            user.groups.add(group)

        return user

    class Meta:
        model=User
        fields=['username','password','group_name']

#Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField() #field to get username and send username to user
    password= serializers.CharField(write_only=True) #field to get password from and not send it
    class Meta:
        model=User
        fields=['username','password']







#create serializers for models we created

class DepartmentSerializer(serializers.ModelSerializer):  #creating department serializer class by inheriting model serializer class of django
    #provide another nested class called Meta
    #this meta class will contain the Meta data(demographic data)
    class Meta:
        model=Department
        fields='__all__' #passing everything

#create seperate functions to validation and later include them in the respective serializer





class EmployeeSerializer(serializers.ModelSerializer):
  
    
    #display dept name for each employee
    #create a read-only field so that we dont have to send it during post or pput or patch
    #but we will have that field during get request.
    DepartmentName=serializers.CharField(
        source="DepartmentId.DepartmentName", #DepartmentId is the name used in employee model(fk) not in deprtmnt model.
        read_only=True
    )

    #if you want deptid and deptname as a nested json
    #inside the employee json
    Department=DepartmentSerializer(           #ivdem fk ayit kodukuna field
        source="DepartmentId",
        read_only=True
    )
   


    class Meta:
        model=Employee
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        #fields='__all__'
        fields=('id','username','password','groups','user_permissions') #now if we give get request for users,will show only these selected fields

class UserdetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserDetails
        fields='__all__'
'''
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields='__all__'
        '''

#create a small serializer just to provide employee details (emp id, emp name) to the project serializer
class EmployeeProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields=('EmployeeId','EmployeeName') #we need only selected fields
class ProjectSerializer(serializers.ModelSerializer):
    #create an instace of the EmployeeProjectSerializer to add it as a read-only nestedview
    #so that when creating project, pass only empid not emp name
    employee_details = EmployeeProjectSerializer(
        source="employees",   #got it from the project model
        many= True, #since its a many to many relation
        read_only=True
    )

    class Meta:
        model=Project
        # fields='_all_' # will work,but order will different
        #      {
        #     "id": 1,
        #     "employee_details": [
        #         {
        #             "EmployeeId": 1,
        #             "EmployeeName": "TestEmployee1"
        #         },
        #         {
        #             "EmployeeId": 2,
        #             "EmployeeName": "TestEmployee2"
        #         }
        #     ],
        #     "name": "clinic management",
        #     "employees": [
        #         1,
        #         2
        #     ]
        # }
        fields=('id','name','employees','employee_details')  #'id','name','employees' already there now add employee_details
        #     {
        #     "id": 1,
        #     "name": "clinic management",
        #     "employees": [
        #         1,
        #         2
        #     ],
        #     "employee_details": [
        #         {
        #             "EmployeeId": 1,
        #             "EmployeeName": "TestEmployee1"
        #         },
        #         {
        #             "EmployeeId": 2,
        #             "EmployeeName": "TestEmployee2"
        #         }
        #     ]
        # }

