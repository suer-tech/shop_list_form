function applyFilters() {
    var filterUrl = document.getElementById('applyFiltersButton').dataset.filterUrl;
    var filterName = document.getElementById('filterName').value;
    var sortBy = document.getElementById('sortBy').value;
    var sortOrder = document.getElementById('sortOrder').value;

    filterUrl += '?filterName=' + encodeURIComponent(filterName) + '&sortBy=' + encodeURIComponent(sortBy) + '&sortOrder=' + encodeURIComponent(sortOrder);

    fetch(filterUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                var productList = document.getElementById('productList');
                var existingColumnHeader = productList.querySelector('.list-group-item:first-child');
                productList.innerHTML = '';
                productList.appendChild(existingColumnHeader);

                data.products.forEach(product => {
                    var newProduct = document.createElement('li');
                    newProduct.className = 'list-group-item';
                    newProduct.id = 'product' + product.id;
                    newProduct.innerHTML = '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-md-6">' + product.name + '</div>' +
                        '<div class="col-md-4">' + product.quantity + '</div>' +
                        '<div class="col-md-2 d-flex justify-content-end">' +
                        '<button onclick="editProduct(' + product.id + ')" class="btn btn-secondary mx-1">Изменить</button>' +
                        '<button onclick="deleteProduct(' + product.id + ')" class="btn btn-danger mx-1">Удалить</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    productList.appendChild(newProduct);
                });
            } else {
                alert('Не удалось применить фильтры');
            }
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}

document.getElementById('applyFiltersButton').addEventListener('click', function(event) {
    event.preventDefault();
    applyFilters();
});
