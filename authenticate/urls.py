from django.urls import path
from . import views

# Create your urls here

app_name = 'authenticate'

urlpatterns = [
    # Register Urls
    path('register_page/', views.RegisterPage, name='register_page'),
    path('register_new_user/', views.RegisterNewUser, name='register_new_user'),

    # Login Urls
    path('login_page/', views.LoginPage, name='login_page'),
    path('login_user/', views.LoginUser, name='login_user'),
]