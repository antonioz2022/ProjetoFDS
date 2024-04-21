from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = "pet4you"
urlpatterns = [
    path("", views.home, name="home"),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register_view, name='register'),
    path("posting/", views.createPost, name="posting"),
    path("list/", views.listPets, name= "list"),
    path("edit/<int:pet_id>/", views.edit_post, name="edit_post"),
]