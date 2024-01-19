from django.shortcuts import render, get_object_or_404
from .models import Product
from django.views.decorators.http import require_POST
from django.http import JsonResponse, request


def shopping_list(request):
    filter_name = request.GET.get('filterName', '')
    sort_by = request.GET.get('sortBy', 'name')
    sort_order = request.GET.get('sortOrder', 'asc')

    if sort_order == 'desc':
        sort_by = '-' + sort_by

    products = Product.objects.filter(name__icontains=filter_name).order_by(sort_by)
    return render(request, 'groceries/shopping_list.html', {'products': products})


def add_product(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        quantity = request.POST.get('quantity', 1)
        product = Product.objects.create(name=name, quantity=quantity)
        return JsonResponse({'success': True, 'product_id': product.id})
    return JsonResponse({'success': False, 'error': 'Неверный метод запроса'})


@require_POST
def delete_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    product.delete()
    return JsonResponse({'success': True})


def filter_products(request):
    filter_name = request.GET.get('filterName', '')
    sort_by = request.GET.get('sortBy', 'name')
    sort_order = request.GET.get('sortOrder', 'asc')

    if sort_order == 'desc':
        sort_by = '-' + sort_by

    products = Product.objects.filter(name__icontains=filter_name).order_by(sort_by)

    data = {
        'success': True,
        'products': [{'id': product.id, 'name': product.name, 'quantity': product.quantity} for product in products]
    }

    return JsonResponse(data)

@require_POST
def edit_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    new_name = request.POST.get('name')
    new_quantity = request.POST.get('quantity')

    product.name = new_name
    product.quantity = new_quantity
    product.save()

    return JsonResponse({'success': True})