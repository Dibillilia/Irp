from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect

from django.contrib.auth.models import User
from .models import Profile, Lesson

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


def index(request):
    if hasattr(request, "user") and request.user.is_authenticated:
        return redirect(dashboard)
    return render(request, "framework/index.html")


def get_lesson(request):
    return render(request, "framework/get_lesson.html")


def sales_page(request):
    # TODO: check if logged in
    return render(request, "framework/sales_page.html")


def register(request):
    return render(request, "framework/register.html")


def create_user(request):
    p = request.POST
    if p["password"] != p["password2"]:
        return HttpResponse("Passwords do not match")
    user_exists = User.objects.filter(username=p["username"]).count()
    if user_exists > 0:
        return HttpResponse("Username not unique")
    user = User.objects.create_user(p['username'], p['email'], p['password'])
    profile = Profile(user=user, description=p["description"])
    profile.save()

    # now that we have created the user, we need to log the current session in under that user
    user = authenticate(request, username=p["username"], password=p["password"]) #this almost def isn't necessary, but
    #idk better safe than sorry
    if user is not None:
        login(request, user)
        return redirect(dashboard)

@login_required(login_url='/accounts/login/')
def dashboard(request):
    lessons = Lesson.objects.filter(user=request.user)
    return render(request, 'framework/dashboard.html', {"username": request.user.username, "lessons": lessons})

@login_required(login_url='/accounts/login/')
def new_lesson(request):
    if request.method == "GET":
        return render(request, 'framework/new_lesson.html', {"username": request.user.username})
    elif request.method == "POST":
        slug = request.POST["title"].replace(" ", "_").lower() #TODO: make actual url encoder

        is_unique = Lesson.objects.filter(user=request.user, slug=slug).count() == 0
        if not is_unique:
            return HttpResponse("slug is not unique")

        lesson = Lesson(title=request.POST["title"], slug=slug, user=request.user)
        lesson.save()
        return redirect(dashboard)

@login_required(login_url='/accounts/login/')
def edit(request, lesson_slug):
    lesson = Lesson.objects.get(user=request.user, slug=lesson_slug)
    return render(request, 'vle/index.html', {'html': lesson.html})

@login_required(login_url='/accounts/login/')
def save_lesson(request, lesson_slug):
    lesson = Lesson.objects.get(user=request.user, slug=lesson_slug)
    print(lesson)
    lesson.html = request.POST["html"]
    print(lesson.html)
    lesson.save()
    return HttpResponse("lesson saved successfully")