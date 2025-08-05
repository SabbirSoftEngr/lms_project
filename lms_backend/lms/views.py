from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Category, Course, Instructor
from .serializers import CategorySerializer, CourseSerializer, InstructorSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [AllowAny]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Course.objects.all()
        category_id = self.request.query_params.get('category', None)
        instructor_id = self.request.query_params.get('instructor', None)
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        if instructor_id is not None:
            queryset = queryset.filter(instructors__id=instructor_id)
        return queryset

    def perform_create(self, serializer):
        instructors_data = self.request.data.get('instructor_ids', [])
        course = serializer.save()
        course.instructors.set(instructors_data)

    def perform_update(self, serializer):
        instructors_data = self.request.data.get('instructor_ids', [])
        course = serializer.save()
        course.instructors.set(instructors_data)

