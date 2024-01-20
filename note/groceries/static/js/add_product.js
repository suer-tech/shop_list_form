function addProduct() {
    var nameInput = document.getElementById('name');
    var quantityInput = document.getElementById('quantity');

    var productName = nameInput.value.trim();
    if (productName === '') {
        alert('Введите название продукта');
        return;
    }

    var formData = new FormData();
    formData.append('name', productName);
    formData.append('quantity', quantityInput.value);

    var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    fetch(addProductUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var productList = document.getElementById('productList');
            var newProduct = document.createElement('li');
            newProduct.className = 'list-group-item';
            newProduct.id = 'product' + data.product_id;
            newProduct.innerHTML = '<div class="container-fluid">' +
                '<div class="row">' +
                '<div class="col-md-6">' + productName + '</div>' +
                '<div class="col-md-4">' + quantityInput.value + '</div>' +
                '<div class="col-md-2 d-flex justify-content-end align-items-center">' +
                '<button onclick="editProduct(' + data.product_id + ')" class="btn btn-secondary mx-1">Изменить</button>' +
                '<button onclick="deleteProduct(' + data.product_id + ')" class="btn btn-danger mx-1">Удалить</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            productList.appendChild(newProduct);

            nameInput.value = '';
            quantityInput.value = 1;

        } else {
            alert('Failed to add product');
        }
    });
}
