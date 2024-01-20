function deleteProduct(productId) {
    var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    fetch('/delete/' + productId + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var productToRemove = document.getElementById('product' + productId);
            productToRemove.parentNode.removeChild(productToRemove);
        } else {
            alert('Не удалось удалить продукт');
        }
    })
    .catch(error => {
        console.error('Произошла проблема с выполнением запроса:', error);
    });
}
