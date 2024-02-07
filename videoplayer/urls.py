from django.urls import path
from . import views

urlpatterns = [
    path('video/', views.video_player, name='video_player'),
]
