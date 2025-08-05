from rest_framework import serializers
from .models import Category, Course, Instructor

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ["id", "first_name", "last_name", "email", "bio"]

class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    instructors = InstructorSerializer(many=True, read_only=True)
    instructor_ids = serializers.PrimaryKeyRelatedField(queryset=Instructor.objects.all(), source='instructors', many=True, write_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "category", "category_name", "instructors", "instructor_ids", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]

