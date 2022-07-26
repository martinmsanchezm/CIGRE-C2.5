from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectsSerializer
from .models import Projects
# Create your views here.

class ListProjectsView(APIView):
    def get(self, request, format=None):
        try:
            result = ProjectsSerializer(Projects.objects.all().order_by('-created_at'), many=True)
            result = result.data
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
