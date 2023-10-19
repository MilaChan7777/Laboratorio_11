class ItemShop {
    constructor(product) {
        this.product = product;
    }

    render() {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <img src="${this.product.image}" alt="${this.product.title}">
            <br>
            <h5>${this.product.title}</h5>
            <p>Precio: $${this.product.price}</p>
            <p>Categoría: ${this.product.category}</p>
            <br>
            <a href="detalle.html?id=${this.product.id}">
                <button class="comprar">Comprar</button>
            </a>
        `;
        return productDiv;
    }
}

async function loadProducts() {
    const response = await fetch('https://raw.githubusercontent.com/MilaChan7777/Laboratorio_11/main/data.json');
    const products = await response.json();

    const productList = document.getElementById('product-list');

    products.forEach((product) => {
        const item = new ItemShop(product);
        productList.appendChild(item.render());
    });
}

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function loadProductDetails() {
    const productId = getProductIdFromUrl();

    if (!productId) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();

    const productDetails = document.getElementById('product-details');

    // Crear un div para la información del producto
    const productInfoDiv = document.createElement('div');
    productInfoDiv.className = 'product-info';
    
    // Agregar los elementos de información del producto al div
    productInfoDiv.innerHTML = `
        <h1>${product.title}</h1>
        <div class="rating">
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
    </div>
    <br>
        <p><b>Precio:</b> $${product.price}</p>
        <p><b>Categoría:</b> ${product.category}</p>
        <p><b>Descripción:</b> ${product.description}</p>
        <br>
        <button class="comprar-details"> Comprar </button>
        <br>
        <br>
        <button class="agregar-carrito"> Agregar al carrito </button>
    `;
    
    // Crear un div para la imagen del producto
    const productImageDiv = document.createElement('div');
    productImageDiv.className = 'product-image';
    
    // Crear la imagen y configurar sus atributos
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    
    // Agregar la imagen al div de la imagen del producto
    productImageDiv.appendChild(productImage);
    
    // Agregar los divs de información y de imagen al contenedor principal
    productDetails.appendChild(productInfoDiv);
    productDetails.appendChild(productImageDiv);

    const ratingContainer = document.querySelector('.rating');
    const stars = ratingContainer.querySelectorAll('.star');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // Establece la calificación haciendo que las estrellas seleccionadas estén rellenas
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('filled');
            }

            // Deshaz el relleno de las estrellas no seleccionadas
            for (let i = index + 1; i < stars.length; i++) {
                stars[i].classList.remove('filled');
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadProductDetails();
});
