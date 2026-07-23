#IMPORT DefaultRouter class to register routes(url path)
from rest_framework.routers import DefaultRouter
#import all entire
#view that we created
from . import views #or from .views  ......
from django.urls import path #import path

#create a router instance
router=DefaultRouter()

#register  each route and end point url
#and its corresponding views
router.register(r'employees',views.EmployeeViewSet)
router.register(r'departments',views.DepartmentViewSet)
#router.register(r'users',views.UserViewSet)
router.register(r'userdetails',views.UserDetailsViewSet)
router.register(r'projects',views.ProjectViewSet)

#convert the  registered urls into url pattern list
#our SignupAPIView,LoginAPIView are APIViews not ViewSet 
#so it sould be custom added to the url patterns list using path() fn
#and append it to the existing url pattern list
urlpatterns = [
    path('signup/',views.SignupAPIView.as_view(), name = "user-signup"), #signup/ ,/ is compulsory
    path('login/',views.LoginAPIView.as_view(), name = "user-login")
]

#convert the registered urls into url patterns list
urlpatterns = router.urls + urlpatterns