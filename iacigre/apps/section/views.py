from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SectionSerializer
from .models import Section
from apps.projects.models import Projects
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

class AddSection(APIView):
    def post(self, request, format=None):
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        try:
            project = Projects.objects.get(id=data['post_prj_id'])
            section = Section.objects.create(
                title = data['title_value'],
                desc = data['desc_value'],
                code =  data['code_value'],
                author = user.id,
                project = project
            )
            if (data['file']):
                fs = FileSystemStorage(location="media/photos/section/")
                ext_file = data['file'].name.split('.')[-1].lower()
                name = '%s_%s.%s'%(section.id, str(datetime.now()).replace(':','_').replace(' ','_'), ext_file)
                section = Section.objects.filter(id=section.id)
                section.update(
                    photo='photos/section/%s'%name,
                    photo_name=name
                )
                fs.save(name, data['file'])                      

            return Response(
                {'res': 'Se crea la sección de forma exitosa'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al crear la sección'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class EditSection(APIView):
    def post(self, request, format=None):
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        try:
            section = Section.objects.filter(id=data['section_id'])
            section.update(
                title = data['title_value'],
                desc = data['desc_value'],
                code =  data['code_value'],
            )
            if (data['file']):
                fs = FileSystemStorage(location="media/photos/section/")
                ext_file = data['file'].name.split('.')[-1].lower()
                photo_name = str(section[0].photo_name)
                if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                    remove(r'%s/%s'%(fs.location, photo_name))
                name = '%s_%s.%s'%(section[0].id, str(datetime.now()).replace(':','_').replace(' ','_'), ext_file)
                section.update(
                    photo='photos/section/%s'%name,
                    photo_name=name
                )
                fs.save(name, data['file']) 
            if data['delete_image']=='true':
                fs = FileSystemStorage(location="media/photos/section/")
                photo_name = str(section[0].photo_name)
                if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                    remove(r'%s/%s'%(fs.location, photo_name))
                section.update(
                    photo='',
                    photo_name=''
                )
            return Response(
                {'res': 'Se edita la sección de forma exitosa'},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al editar la sección'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ListSectionView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        try:
            result = SectionSerializer(Section.objects.filter(project=data['project_id']).order_by('created_at'), many=True)
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

class DeleteSection(APIView):
    def post(self, request, format=None):
        user = self.request.user
        validate_activate(user.id)
        data = self.request.data
        #editar project
        try:
            section = Section.objects.get(id=data.get('id'))
            fs = FileSystemStorage(location="media/photos/section/")
            photo_name = str(section.photo_name)
            if (photo_name and path.exists(r'%s/%s'%(fs.location, photo_name))):
                remove(r'%s/%s'%(fs.location, photo_name))
            section.delete()
            return Response(
                {'res': "Se elimina la sección correctamente"},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al eliminar la sección en la base de datos'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )