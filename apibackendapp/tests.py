from django.test import TestCase
from rest_framework.test import APITestCase,APIClient
from .models import Employee,Department,Project
from datetime import date
from django.urls import reverse
from .serializers import EmployeeSerializer
from rest_framework import status
# Create your tests here.
#create the class for testing the employeeviewset crud operations
#using the setUp() fn define the dummy data for testing

#class name convections very imp...edh viewset ahno trying to test then test this should be name of class
class EmployeeViewSetTest(APITestCase):
    #define the setup function to setup the data for testing
    def setUp(self):
        #create a sample dept object#for testing employee we need dummy dept and proj
        self.department=Department.objects.create(DepartmentName="HR")
        #create some sample projects#we are creating objects and not saving it to db
        self.project1=Project.objects.create(name="CMS")
        self.project2=Project.objects.create(name="E-commerce")
        #create a sample employee object with the details
        self.employee=Employee.objects.create(
            EmployeeName="jackie chan",
            Designation="Karate master",
            DateOfJoining=date(2026,7,16),
            DepartmentId=self.department,
            Contact="1234",
            IsActive=True

        )
        #assign project to employees
        self.employee.projects.set([self.project1,self.project2])#employee projects realtion use chytha related name ahn projects

        #assign the client property to APIClient class object
        self.client=APIClient()#clienten thanne ezthanam


    #now writing test cases..everything will be inside this class
    #TEST CASE 1:Testing the list of all employees
    #actual endpoint url was api/employees,but django test will not be using it
    #django test framework will automatically create oits own end point urls for testing
    #athin oru rule or format ind
    #eg:employee-list to list all employees,employee-detail for details
    def test_employee_list(self):#ingne ayirkanam name of listing chyan olla funct..naming convetion very imp for testing

        #step1:define the url and get the actual response
        url=reverse('employee-list')#reverse map the url for emp testing and using this url get response
        response=self.client.get(url)

        #step2:create objects for employee Model and employee serializer.this will contain the dummy data we created
        employees=Employee.objects.all()
        serializer=EmployeeSerializer(employees,many=True)

        #step3: compare the response got from  step1 with step2(dummydata),randum equal then test is passed
        #check for the status and the data #listing the response 200 ayirknm and data should match with this
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data,serializer.data)
        


     #TEST CASE 2:Testing the employee details
    def test_employee_details(self):

        #step1:define the url and get the actual response
        url=reverse('employee-detail',args=[self.employee.EmployeeId])#reverse map the url for emp testing and using this url get response
        response= self.client.get(url)

        #step2:create objects for employee Model and employee serializer.this will contain the dummy data we created
        #we dont want all employees details only one employees details
        serializer=EmployeeSerializer(self.employee)

        #step3: compare step1 and step2
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data,serializer.data)

    #TEST CASE 3:Testing the employee deletion
    def test_employee_delete(self):

        #step1:define the url and get the actual response
        url=reverse('employee-detail',args=[self.employee.EmployeeId])#reverse map the url for emp testing and using this url get response
        response= self.client.delete(url) #delete req employye detail urlil ahn pass akane so same urls for both#instead of get,delete req

        #step2 we dont get a response
        
        #step3: compare step1 and step2
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
        self.assertEqual(Employee.objects.count(),0)#response code should be 204 and currently num of employees should be zero
    


    #TEST CASE 4:Testing the employee creation
    def test_employee_create(self):

        #step1:define the url and get the actual response #same url for employee list is used for this.
        url=reverse('employee-list')
        data={                #instead of passing args we pass data in dict form
            "EmployeeName":"bruc lee",
            "Designation":"Kunfu master",
            "DateOfJoining":"2026-07-16",#postmanil data engne aykuo angne thanne aykanam
            "DepartmentId":self.department.DepartmentId,
            "Contact":"1234",
            "IsActive":True
        }
            
        response= self.client.post(url,data,format='json') #delete req employye detail urlil ahn pass akane so same urls for both#instead of get,delete req

        #step2 we dont get a response
        
        #step3: compare step1 and step2
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(),2)#response code should be 204 and currently num of employees should be zero
        #test chymbo oro funct run cheyambolum setup data(dummy data) will be created..so here jackie jan and bruce lee is created.so statsu should be 201 and the num of employees  should be 2
