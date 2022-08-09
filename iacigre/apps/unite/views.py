from apps.user.serializers import UserCreateSerializer
from apps.user_profile import models, serializers
from apps.unite.models import Unite
from apps.projects.models import Projects
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your views here.

# validate_activate
def validate_activate(user_id):
    if (user_id==8):
        return Response(
            {'error': 'Usuario no tiene permisos'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return None

class ListUsers(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user_id = self.request.user.id
        try:
            search_results = User.objects.filter(Q(first_name__icontains=data['name']) | 
                                                Q(last_name__icontains=data['name'])
                                                ).exclude(is_superuser=1).exclude(id=user_id).exclude(is_active=0)
            result = UserCreateSerializer(search_results, many=True)
            list_unite = [unite.user_add for unite in Unite.objects.filter(project=data['prj_id'])]+[8,6]
            list_result = []
            for data in result.data:
                if not(data['id'] in list_unite):
                    list_result.append(
                        data
                    )
            return Response(
                {'res': list_result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al cargar los proyectos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AddSection(APIView):
    def post(self, request, format=None):
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        try:
            project = Projects.objects.get(id=data['project_id'])
            Unite.objects.create(
                user_id = user,
                project = project,
                user_add = data['user_id'],
                user_add_name=data['name'],
            )                
            return Response(
                {'res': 'Se agrega el usuario de forma exitosa'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al agregar el usuario'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DeleteUnite(APIView):
    def post(self, request, format=None):
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        try:
            project = Unite.objects.filter(project=data['project_id']).filter(user_add=data['user_id'])
            if (len(project)):
                project[0].delete()
            return Response(
                {'res': "Se elimina el usuario correctamente"},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al eliminar el usurio'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetUnite(APIView):
    def post(self, request, format=None):
        data = self.request.data
        try:
            unites = Unite.objects.filter(project=data['prj_id']) 
            lists_result = []
            for unite in unites:
                result = {}
                user = User.objects.get(id=unite.user_add)
                profile = models.User_Profile.objects.filter(user_id=unite.user_add)
                if profile.exists():
                    user_profile = serializers.User_ProfileSerializer(profile, many=True).data[0]
                else:
                    user_profile = None
                result['id'] = unite.user_add
                result['name'] = user.first_name+' '+user.last_name 
                result['user_profile'] = user_profile
                result['status'] = 1
                lists_result.append(
                    result
                )               
            return Response(
                {'res': lists_result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al cargar los proyectos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
