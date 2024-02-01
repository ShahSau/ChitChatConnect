from django.shortcuts import render
from .serializers import UserSerializer,SignUpSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

def get_auth_for_user(user):
	tokens = RefreshToken.for_user(user)
	return {
		'user': UserSerializer(user).data,
		'tokens': {
			'access': str(tokens.access_token),
			'refresh': str(tokens),
		}
	}

# Create your views here.
class SignInView(APIView):
    # Allow any user (authenticated or not) to access this url
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Please provide both username and password"},
                            status=HTTP_400_BAD_REQUEST)


        user = authenticate(username=username, password=password)
        if not user:
            return Response({"error": "Invalid Credentials"},
                             status=HTTP_400_BAD_REQUEST)
        
        user_data = get_auth_for_user(user)

        return Response(user_data)
    

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        new_user = SignUpSerializer(data=request.data)
        new_user.is_valid(raise_exception=True) # Will raise an exception if the data provided is not valid (e.g. password too short) and throw a 400 error
        user = new_user.save()
        user_data = get_auth_for_user(user)
        
        return Response(user_data)


