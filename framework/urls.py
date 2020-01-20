from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('student/', views.get_lesson, name='lesson query'),
    path('features/', views.sales_page, name='sales page'),
    path('register/', views.register, name='register'),
    path('create_user/', views.create_user, name='create user'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('new_lesson/', views.new_lesson, name='new lesson'),
    path('edit/<slug:lesson_slug>', views.edit, name='edit lesson'),
]