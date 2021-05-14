from django.forms import ModelForm,Textarea
from .models import Task

class TaskModelForm(ModelForm):
    class Meta:
        model=Task
        fields=(
            'title',
            'description'
        )
        widgets = {
            'description': Textarea(attrs={'cols': 80, 'rows': 2}),
        }