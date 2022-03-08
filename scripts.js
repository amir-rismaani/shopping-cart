const productsContainer = document.querySelector('.products');

document.addEventListener('DOMContentLoaded', addProducts);

async function getProduct(){
    const res = await fetch('http://localhost:3000/products');
    const promise = await res.json();
    return promise;
}


async function addProducts(){
    const products = await getProduct();
    products.forEach(product => {
        const article = document.createElement('article');
        article.classList.add('product');
        article.innerHTML = `
            <div class="product__image">
                <img
                src="${product.AssociationShopProductImageFile_relativeUrl}"
                alt="${product.ShopProductName}"
                />
            </div>
            <div class="product__details">
                <div class="d-flex space-between">
                    <h3 class="name">${product.ShopProductName}</h3>
                    <span class="price">${product.SalePrice}</span>
                </div>
                <span class="product__add-to-cart">
                    <i class="fa-solid fa-cart-plus"></i>
                </span>
            </div>
        `
        productsContainer.appendChild(article);
    });
}