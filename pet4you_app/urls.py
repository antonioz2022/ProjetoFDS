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
    path("report_list/", views.list_reports, name="report_list"),
    path("report/<int:pet_id>/", views.add_report, name='report'),
    path("report_admin/", views.report_admin_view, name='report_admin'),
    path("list/", views.listPets, name= "list"),
    path("favorite/", views.listFavorites, name= "favorite"),
    path("edit/<int:pet_id>/", views.edit_post, name="edit_post"),
]