from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'instructors', views.InstructorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

