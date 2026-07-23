from rest_framework import viewsets,filters
#coz we are going to create views based on viewsets
from .models import Department,User,UserDetails,Employee,Project
from .serializers import LoginSerializer,SignupSerializer,DepartmentSerializer,UserdetailsSerializer,EmployeeSerializer,UserSerializer,ProjectSerializer
from rest_framework import viewsets,filters,permissions,status

# @becoz we r going to create views based on viewsets
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate






# creating a highly customised signupApIView by inheriting the APIView class
class SignupAPIView(APIView):
    #signup should be accessible to all users without authorization
    # permission_classes = [] # or below line // no allow token based authentication
    permission_classes = [permissions.AllowAny]
    #define our own custom post function to handle registration or signup
    def post(self,request):
        # create an instance of the respective serialiser class
        serializer=SignupSerializer(data=request.data)
        #if the user creation was successful in signupserialiser
        #serializer object will be valid
        if serializer.is_valid():
            # in that case save the user using ther serializer
            user = serializer.save()
            # and get the created token
            token,created=Token.objects.get_or_create(user=user)
            #design the json response to be send back on successfull user creation
            return Response({
                "user_id":user.id,
                "username":user.username,
                "token":token.key,
                "role":user.groups.all()[0].id if user.groups.exists() else None
                },status.HTTP_201_CREATED)

        else:
            return Response({
                'status':status.HTTP_400_BAD_REQUEST,
                'data':serializer.errors
                },
                status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            #get the username and password from the data and try custom authentication
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            #try to authenticate using authenticate fn
            user = authenticate(request,username=username,password=password)
            print("user::::::::::",user)
            #if successfully validated, authenticate fn will return a valid user obj else none
            if user is not None:
                #get the token and send it alone with json resonse
                token = Token.objects.get(user=user)
                response = {
                    "status":status.HTTP_200_OK,
                    "message":"Success",
                    "username":user.username,
                    "token":token.key,
                    "role":user.groups.all()[0].id if user.groups.exists() else None
                }
                return Response(response,status=status.HTTP_200_OK)

            else:
                response = {
                    "status":status.HTTP_401_UNAUTHORIZED,
                    "message":"Invalid username or password"
                    }
                return Response(response,status=status.HTTP_401_UNAUTHORIZED)
        
        # if all the above return statements didnt trigger, then :
        return Response({
            'status':status.HTTP_400_BAD_REQUEST,
            'data':serializer.errors
            },
            status.HTTP_400_BAD_REQUEST)



# Create your views here.
class DepartmentViewSet(viewsets.ModelViewSet):
    #create a queryset object from the model
    #to retrieve all the objects of the class
    #also define the serializer class
    queryset=Department.objects.all()#variable name queryset exactly like this
    serializer_class=DepartmentSerializer#seralizer variable also.
    #to bypass the permission for login 
    permission_classes = []
    # permission_classes = [permissions.IsAuthenticated] #again giving authentication

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset=Employee.objects.all()
    serializer_class=EmployeeSerializer

    #add search functionality for employee
    filter_backends=[filters.SearchFilter]
    search_fields=['EmployeeName','Designation'] #ndhoke vech search chyan pattanam#ithoke use chyth ahn nammal search chyane
    permission_classes = []




class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset=UserDetails.objects.all()
    serializer_class=UserdetailsSerializer
    permission_classes = []

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes = []

class ProjectViewSet(viewsets.ModelViewSet):
    queryset=Project.objects.all()
    serializer_class=ProjectSerializer
    permission_classes = []

