
from django.contrib import admin
from django.urls import path
from core.views import CreateTask,DeleteTask,UpdateTask,SelectedTask,UnselectedTask

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',CreateTask.as_view(),name="create-task"),
    path('<int:pk>/delete',DeleteTask.as_view(),name="delete-task"),
    path('<int:pk>/update',UpdateTask.as_view(),name="update-task"),
    path('<int:pk>/selected',SelectedTask,name="selected-task"),
    path('<int:pk>/unselected', UnselectedTask,name="unselected-task"),
]
