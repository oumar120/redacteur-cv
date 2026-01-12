from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('pdf/', views.cv_pdf, name='cv_pdf'),
    path('circulaire/', views.preview_circulaire, name='preview_circulaire'),
]