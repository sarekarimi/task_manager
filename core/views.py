from django.shortcuts import render,redirect
from django.urls import reverse
from django.views import generic
from .models import Task
from .forms import TaskModelForm
from django.http import JsonResponse
from django.core import serializers



class CreateTask(generic.CreateView):
    template_name = "core/list.html"
    form_class = TaskModelForm
    extra_context={'flag':'CreateTask'}

    def get(self, *args, **kwargs):
        form = self.form_class()
        tasks = Task.objects.all()
        return render(self.request, self.template_name, 
            {"form": form, "tasks": tasks})

    def post(self, *args, **kwargs):
        if self.request.is_ajax and self.request.method == "POST":
            form = self.form_class(self.request.POST)
            if form.is_valid():
                instance = form.save()
                ser_instance = serializers.serialize('json', [ instance, ])
                # send to client side.  
                return JsonResponse({"instance": ser_instance}, status=200)
            else:
                return JsonResponse({"error": form.errors}, status=400)

        return JsonResponse({"error": ""}, status=400)



def UnselectedTask(self,pk):
    item = Task.objects.get(pk=pk)
    item.is_done= False
    instance = item.save()
    ser_instance = serializers.serialize('json', [ instance, ])
    return JsonResponse({"instance": ser_instance}, status=200)
   


def SelectedTask(request,pk):
    item = Task.objects.get(pk=pk)
    item.is_done= True
    instance = item.save()
    ser_instance = serializers.serialize('json', [ instance, ])
    return JsonResponse({"instance": ser_instance}, status=200)


class DeleteTask(generic.DeleteView):
    queryset = Task.objects.all()
    
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
    def get_success_url(self):
        return reverse("create-task")


class UpdateTask(generic.UpdateView):
    extra_context={'flag':'UpdateTask'}
    queryset = Task.objects.all()
    template_name = "core/list.html"
    form_class = TaskModelForm
    
    def get_context_data(self, **kwargs):
        return dict(
        super().get_context_data(**kwargs),
        tasks=Task.objects.all()[0:100]
    )
    def get_success_url(self):
        return reverse("create-task")