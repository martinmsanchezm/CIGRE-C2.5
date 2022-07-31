from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectsSerializer
from .models import Projects
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.

class ListProjectsView(APIView):
    def post(self, request, format=None):
        user_id = self.request.user.id
        try:
            result = ProjectsSerializer(Projects.objects.all().order_by('-updated_at'), many=True)
            result = result.data
            for data in result:                
                user = User.objects.get(id=data.get('author'))
                data['author'] = user.first_name+' '+user.last_name
                data['updated_at'] = data['updated_at'].split('T')[0]
                data['title'] = data['title']
                data['status'] = 1 if user_id==user.id else 0
            return Response(
                {'res': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al cargar los proyectos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AddNewProject(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        title  = data.get('title')
        desc = data.get('desc')
        photo = data.get('photo')
        category = data.get('category')
        status_value = data.get('status')
        if (Projects.objects.filter(title=title).exists()):
            return Response(
                {'error': 'El titulo del proyecto ya existe en la base de datos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        #crear project
        try:
            project = Projects.objects.create(
                title=title,
                slug=title+'_',
                desc=desc,
                category=category,
                photo=photo,
                author=user,
                status=status_value
            )
            return Response(
                {'res': "Se crea el proyecto correctamente"},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al crear el proyecto en la base de datos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class EditNewProject(APIView):
    def post(self, request, format=None):
        data = self.request.data

        title  = data.get('title')
        desc = data.get('desc')
        category = data.get('category')
        #editar project
        try:
            project = Projects.objects.get(id=data.get('id'))
            project.title = title
            project.desc = desc
            project.category = category
            project.save()
            return Response(
                {'res': "Se modifica el proyecto correctamente"},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al crear el proyecto en la base de datos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DeleteProject(APIView):
    def post(self, request, format=None):
        data = self.request.data
        #editar project
        try:
            project = Projects.objects.get(id=data.get('id'))
            project.delete()
            return Response(
                {'res': "Se elimina el proyecto correctamente"},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al crear el proyecto en la base de datos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
