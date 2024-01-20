function editProduct(productId) {
    var productName = prompt('Enter new name:');
    var productQuantity = prompt('Enter new quantity:');

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
            productElement.innerHTML = productName + ' - ' + productQuantity +
                '<button onclick="editProduct(' + productId + ')">Edit</button>' +
                '<button onclick="deleteProduct(' + productId + ')">Delete</button>';
        } else {
            alert('Failed to edit product');
        }
    });
}