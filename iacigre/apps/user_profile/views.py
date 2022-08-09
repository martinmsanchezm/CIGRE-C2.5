from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from os import path, remove
from .serializers import User_ProfileSerializer
from .models import User_Profile
from django.contrib.auth import get_user_model
from django.core.files.storage import FileSystemStorage
from datetime import datetime
User = get_user_model()


# validate_activate
def validate_activate(user_id):
    if (user_id==8):
        return Response(
            {'error': 'Usuario no tiene permisos'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return None

class GetUserProfile(APIView):
    def post(self, request, format=None):
        user_id = self.request.user.id
        if (user_id==8):
            return Response(
            {'error': 'Usuario no tiene permisos'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        validate_activate(user_id)
        try:
            user_profile = User_Profile.objects.filter(user_id=user_id)
            if (user_profile.exists()):
                result = User_ProfileSerializer(user_profile, many=True)
                result = result.data[0]
            else:
                result={}
            return Response(
                {'res': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al cargar el perfil'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EditUserProfile(APIView):
    def post(self, request, format=None):
        user_req = self.request.user
        if (user_req.id==8):
            return Response(
            {'error': 'Usuario no tiene permisos'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        validate_activate(user_req.id)
        data = self.request.data

        user_profile = User_Profile.objects.filter(user_id=user_req.id)
        user = User.objects.filter(id=user_req.id)
        try:
            if (user_profile.exists()):
                user_profile.update(
                    user_id=user_req,
                    user_company=data['user_company'],
                    photo=''
                )
            else:
                User_Profile.objects.create(
                    user_id=user_req,
                    user_company=data['user_company'],
                    photo=''
                )
            user.update(
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                )
            return Response(
                {'res': 'Se actualiza el perfil de forma exitosa'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al actualizar el perfil'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EditImageProfile(APIView):
    def post(self, request, format=None):
        user_req = self.request.user
        if (user_req.id==8):
            return Response(
            {'error': 'Usuario no tiene permisos'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        file = self.request.data
        try:
            fs = FileSystemStorage(location="media/photos/user/")
            ext_file = file['file'].name.split('.')[-1].lower()
            user_profile = User_Profile.objects.filter(user_id=user_req.id)
            photo_name = str(user_profile[0].photo_name)
            if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                remove(r'%s/%s'%(fs.location, photo_name))
            name = '%s_%s.%s'%(user_req.id, str(datetime.now()).replace(':','_').replace(' ','_'), ext_file)
            user_profile.update(
                photo='photos/user/%s'%name,
                photo_name=name
            )
            fs.save(name, file['file'])
            return Response(
                {'res': 'Se actualiza el perfil de forma exitosa'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al actualizar la imagen de perfil'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class Get_Users(APIView):
    def get(self, request, format=None):
        users = User.objects.all().order_by('last_name')
        result = []
        try:
            for user in users:
                if ((not user.id in [8,6]) and user.is_active):
                    user_profile = User_Profile.objects.filter(user_id=user.id)
                    if (user_profile.exists()):
                        user_profile = User_ProfileSerializer(user_profile, many=True)
                        user_profile = user_profile.data[0]
                        company = user_profile['user_company']
                        photo = user_profile['photo']
                    else:
                        company = None
                        photo = None
                    result.append({
                        'id':user.id,
                        'name': user.first_name+' '+user.last_name,
                        'company': company,
                        'photo': photo,
                        'is_head': user.is_staff
                    })
            return Response(
                {'res': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al cargar los usuarios'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )