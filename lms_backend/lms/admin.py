from django.contrib import admin
from .models import Category, Course

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created_at', 'updated_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['-created_at']

