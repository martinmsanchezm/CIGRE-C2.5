from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectsSerializer
from apps.unite.models import Unite
from .models import Projects
from apps.section.models import Section
from apps.user_profile import models, serializers
from os import path, remove
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

class ListProjectsView(APIView):
    def post(self, request, format=None):
        user_req = self.request.user
        try:
            result = ProjectsSerializer(Projects.objects.all().order_by('-created_at'), many=True)
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
                    'user_profile':user_profile,
                }
                data['updated_at'] = data['updated_at'].split('T')[0]
                data['created_at'] = data['created_at'].split('T')[0]
                data['title'] = data['title']
                data['github'] = data['github']
                data['status'] = 1 if user_req.id==user.id else 0
                # datos de usuario unite 
                data['status_unite'] = 0
                unites = Unite.objects.filter(project=data.get('id'))
                if (unites.exists()):
                    for unite in unites:
                        if user_req.id==unite.user_add:
                            data['status_unite'] = 1
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
        validate_activate(user.id)
        data = self.request.data

        title  = data.get('title')
        desc = data.get('desc')
        photo = data.get('photo')
        category = data.get('category')
        status_value = data.get('status')
        github = data.get('github')
        if (Projects.objects.filter(title=title).exists()):
            return Response(
                {'error': 'El titulo del proyecto ya existe en la base de datos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        #crear project
        try:
            Projects.objects.create(
                title=title,
                desc=desc,
                category=category,
                photo=photo,
                photo_name=photo,
                author=user,
                status=status_value,
                github=github
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
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        
        title  = data.get('title')
        desc = data.get('desc')
        category = data.get('category')
        github = data.get('github')
        #editar project
        try:
            project = Projects.objects.get(id=data.get('id'))
            project.title = title
            project.desc = desc
            project.category = category
            project.github = github
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
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        try:
            project = Projects.objects.get(id=data.get('id'))
            fs = FileSystemStorage(location="media/photos/project/")
            photo_name = str(project.photo_name)
            if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                remove(r'%s/%s'%(fs.location, photo_name))
            list_section = Section.objects.filter(project=data.get('id'))
            if (list_section.exists()):
                fs = FileSystemStorage(location="media/photos/section/")
                for section in list_section:
                    photo_name = str(section.photo_name)
                    if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                        remove(r'%s/%s'%(fs.location, photo_name))  
            project.delete()                  
            return Response(
                {'res': "Se elimina el proyecto correctamente"},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al eliminar el proyecto'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ImageProject(APIView):
    def post(self, request, format=None):
        user = self.request.user
        validate_activate(user.id)
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
            photo_name = str(project[0].photo_name)
            if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                remove(r'%s/%s'%(fs.location, photo_name))
            name = '%s_%s.%s'%(name_id, str(datetime.now()).replace(':','_').replace(' ','_'), ext_file)
            project.update(
                photo='photos/project/%s'%(name),
                photo_name=name
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
