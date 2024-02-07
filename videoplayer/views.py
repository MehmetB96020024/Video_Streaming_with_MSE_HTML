from django.shortcuts import render

def video_player(request):
    return render(request, 'video_player.html')


def home(request):
    return render(request, 'home.html')