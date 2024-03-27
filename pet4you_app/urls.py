from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = "pet4you"
urlpatterns = [
    path("signup/", views.authView, name="authView"),
    path("", views.home, name="home"),
    path('accounts/', include("django.contrib.auth.urls")),
    path('logout/', views.logout_view, name='logout'),
]