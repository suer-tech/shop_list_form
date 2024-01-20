function applyFilters() {
    // Получаем URL из data-атрибута
    var filterUrl = document.getElementById('applyFiltersButton').dataset.filterUrl;

    // Получаем значения фильтров
    var filterName = document.getElementById('filterName').value;
    var sortBy = document.getElementById('sortBy').value;
    var sortOrder = document.getElementById('sortOrder').value;

    // Строим URL с учетом фильтров
    filterUrl += '?filterName=' + encodeURIComponent(filterName) + '&sortBy=' + encodeURIComponent(sortBy) + '&sortOrder=' + encodeURIComponent(sortOrder);

    // Выполняем AJAX-запрос
    fetch(filterUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                var productList = document.getElementById('productList');
                productList.innerHTML = '';  // Очищаем текущий список продуктов

                data.products.forEach(product => {
                    var newProduct = document.createElement('li');
                    newProduct.id = 'product' + product.id;
                    newProduct.innerHTML = product.name + ' - ' + product.quantity +
                        '<button onclick="editProduct(' + product.id + ')">Edit</button>' +
                        '<button onclick="deleteProduct(' + product.id + ')">Delete</button>';
                    productList.appendChild(newProduct);
                });
            } else {
                alert('Failed to apply filters');
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
}

// Добавляем обработчик события на кнопку для выполнения функции без перезагрузки страницы
document.getElementById('applyFiltersButton').addEventListener('click', function(event) {
    event.preventDefault();  // Предотвращаем стандартное действие кнопки (например, отправку формы)
    applyFilters();  // Вызываем функцию фильтрации
});