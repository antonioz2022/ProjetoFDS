from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = "pet4you"
urlpatterns = [
    path("signup/", views.authView, name="authView"),
    path("", views.home, name="home"),
    path('accounts/', include("django.contrib.auth.urls")),
    path('logout/', views.logout_view, name='logout'),
    path("posting/", views.createPost, name="posting"),
    path("list/", views.listPets, name= "list"),
    path("edit/<int:pet_id>/", views.edit_post, name="edit_post"),
]