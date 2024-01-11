from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import UserSerializer, TokenSerializer
from .models import User
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError

from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.

# Registration Views
def RegisterPage(request):
    return render(request, 'register.html')

@api_view(['POST'])
def RegisterNewUser(request):
    print(request.data)

    if User.objects.filter(email=request.data['email']):
        return Response(status=status.HTTP_200_OK, data={'data': 'data return the the response function', 'dataone': 'second data of the response'})

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

# Login views

def LoginPage(request):
    return render(request, 'login.html')

@api_view(['POST'])
def LoginUser(request):
    email = request.data['email']
    password = request.data['password']

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(status=status.HTTP_200_OK, data={'user_not_exist': 'Password and User combination are wrong 1'})
    if user is None:
        return Response(status=status.HTTP_200_OK, data={'user_not_exist': 'Password and User combination are wrong 2'})
    if not user.check_password(password):
        return Response(status=status.HTTP_200_OK, data={'user_not_exist': 'Password and User combination are wrong 3'})
    
    accessToken = AccessToken.for_user(user)
    refreshToken = RefreshToken.for_user(user)

    # return Response(status=status.HTTP_200_OK, data={
    #     'access_token': accessToken.token,
    #     'refresh_token': refreshToken.token
    # })

    token_serializer = TokenSerializer(data={
        'access_token': str(accessToken),
        'refresh_token': str(refreshToken)
    })

    if token_serializer.is_valid():
        return Response(status=status.HTTP_200_OK, data=token_serializer.data)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
