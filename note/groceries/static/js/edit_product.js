function editProduct(productId) {
    var productName = prompt('Введите новое название:');
    var productQuantity = prompt('Введите новое количество:');

    if (productName === null || productQuantity === null) {
        return;
    }

    var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    fetch(editProductUrl.replace('0', productId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,
        },
        body: 'name=' + encodeURIComponent(productName) + '&quantity=' + encodeURIComponent(productQuantity),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var productElement = document.getElementById('product' + productId);
            var innerContainer = productElement.querySelector('.container-fluid .row');
            innerContainer.children[0].textContent = productName;
            innerContainer.children[1].textContent = productQuantity;
        } else {
            alert('Не удалось изменить продукт');
        }
    });
}
