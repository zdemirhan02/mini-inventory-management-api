const API_PRODUCTS_URL = '/api/products';
const API_CATEGORIES_URL = '/api/categories';
let productModal;

document.addEventListener('DOMContentLoaded', () => {
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    loadDashboardData();
});

function loadDashboardData() {
    loadProducts();
    loadCategoryCount();
}

function loadProducts() {
    fetch(API_PRODUCTS_URL)
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('product-table-body');
            tableBody.innerHTML = '';

            document.getElementById('total-products').innerText = products.length;

            products.forEach(product => {
                // Stok verisini DTO veya Model'deki farklı isimlendirmelere karşı esnek yakalıyoruz
                const stockVal = product.stockQuantity !== undefined ? product.stockQuantity : (product.quantity !== undefined ? product.quantity : 0);

                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td class="fw-bold">${product.name}</td>
                        <td>${product.description || '-'}</td>
                        <td>${product.price} ₺</td>
                        <td><span class="badge bg-${stockVal > 5 ? 'success' : 'danger'}">${stockVal} Adet</span></td>
                        <td>Category #${product.categoryId || product.category?.id || '-'}</td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-warning me-1" onclick="editProduct(${product.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(err => console.error('Ürünler yüklenirken hata:', err));
}

function loadCategoryCount() {
    fetch(API_CATEGORIES_URL)
        .then(response => response.json())
        .then(categories => {
            document.getElementById('total-categories').innerText = categories.length;
        })
        .catch(() => {
            // Kategori servisi yoksa varsayılan 1 yazalım
            document.getElementById('total-categories').innerText = '1';
        });
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const stockInput = parseInt(document.getElementById('productQuantity').value);

    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: stockInput,
        stockQuantity: stockInput,
        categoryId: parseInt(document.getElementById('categoryId').value)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_PRODUCTS_URL}/${id}` : API_PRODUCTS_URL;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
        .then(response => {
            if (!response.ok) throw new Error('İşlem başarısız');
            return response.json();
        })
        .then(() => {
            productModal.hide();
            loadDashboardData();
            resetForm();
        })
        .catch(err => alert('Hata: ' + err.message));
}

function deleteProduct(id) {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
        fetch(`${API_PRODUCTS_URL}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) loadDashboardData();
            })
            .catch(err => alert('Silme hatası: ' + err.message));
    }
}

function editProduct(id) {
    fetch(`${API_PRODUCTS_URL}/${id}`)
        .then(res => res.json())
        .then(product => {
            const stockVal = product.stockQuantity !== undefined ? product.stockQuantity : product.quantity;

            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productQuantity').value = stockVal;
            document.getElementById('categoryId').value = product.categoryId || product.category?.id || 1;

            document.getElementById('modalTitle').innerText = 'Ürün Güncelle';
            productModal.show();
        });
}

function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('modalTitle').innerText = 'Yeni Ürün Ekle';
}