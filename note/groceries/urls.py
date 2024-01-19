from django.urls import path
from .views import shopping_list, add_product, delete_product, filter_products, edit_product

urlpatterns = [
    path('', shopping_list, name='shopping_list'),
    path('add/', add_product, name='add_product'),
    path('delete/<int:product_id>/', delete_product, name='delete_product'),
    path('filter/', filter_products, name='filter_products'),
    path('edit/<int:product_id>/', edit_product, name='edit_product'),

]