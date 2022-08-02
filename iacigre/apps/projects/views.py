from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectsSerializer
from .models import Projects
from apps.user_profile import models, serializers
from os import path, remove
from django.contrib.auth import get_user_model
from django.core.files.storage import FileSystemStorage
from datetime import datetime
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
                profile = models.User_Profile.objects.filter(user_id=data.get('author'))
                if profile.exists():
                    user_profile = serializers.User_ProfileSerializer(profile, many=True).data[0]
                else:
                    user_profile = None
                data['author'] = {
                    'name':user.first_name+' '+user.last_name, 
                    'user_profile':user_profile
                }
                data['updated_at'] = data['updated_at'].split('T')[0]
                data['created_at'] = data['created_at'].split('T')[0]
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
            Projects.objects.create(
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
            fs = FileSystemStorage(location="media/photos/project/")
            photo_name = str(project.photo).split('/')[-1]
            if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                remove(r'%s/%s'%(fs.location, photo_name))
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

class ImageProject(APIView):
    def post(self, request, format=None):
        file = self.request.data
        try:
            fs = FileSystemStorage(location="media/photos/project/")
            ext_file = file['file'].name.split('.')[-1].lower()
            if (file['action']=='edit'):
                project = Projects.objects.filter(id=file['project_id'])
                res = 'Se modifica el proyecto correctamente'
                name_id = file['project_id']
            else:
                project = Projects.objects.filter(title=file['project_id'])
                name_id = project[0].id
                res = 'Se crea el proyecto correctamente'
            photo_name = str(project[0].photo).split('/')[-1]
            if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                remove(r'%s/%s'%(fs.location, photo_name))
            name = '%s_%s.%s'%(name_id, str(datetime.now()).replace(':','_').replace(' ','_'), ext_file)
            project.update(
                photo='photos/project/%s'%(name)
            )
            fs.save(name, file['file'])
            return Response(
                {'res': res},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al actualizar la imagen de perfil'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
