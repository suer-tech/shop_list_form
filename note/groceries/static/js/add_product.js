function addProduct() {
    var nameInput = document.getElementById('name');
    var quantityInput = document.getElementById('quantity');

    var formData = new FormData();
    formData.append('name', nameInput.value);
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
            newProduct.id = 'product' + data.product_id;
            newProduct.innerHTML = nameInput.value + ' - ' + quantityInput.value +
                '<button onclick="editProduct(' + data.product_id + ')">Edit</button>' +
                '<button onclick="deleteProduct(' + data.product_id + ')">Delete</button>';
            productList.appendChild(newProduct);

            nameInput.value = '';
            quantityInput.value = 1;

        } else {
            alert('Failed to add product');
        }
    });
}