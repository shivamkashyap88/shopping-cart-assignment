import '../style/home.scss';
import '../style/register.scss';
import '../style/product.scss';
import modalHTML from '../js/modal';
import Crousals from '../js/crousel';
import Header from '../js/header';
import categories from '../../server/categories/index.get.json';
import products from '../../server/products/index.get.json';
import banner from '../../server/banners/index.get.json';

var modal = new modalHTML();
var header = new Header();
var crousal = new Crousals();

window.renderCatalog = function () {
    var sortCategory = categories.sort(function(a,b){
            return a.order - b.order;
    });
    for (var i = 0; i < sortCategory.length; i++) {
        if (sortCategory[i].imageUrl) {
            if (sortCategory[i].order % 2 !== 0) {
                var template = `
                <section class="sec">
                    <figure>
                    <img class="categories-img" src="${sortCategory[i].imageUrl}">
                    </figure>
                    <article>
                    <h3>${sortCategory[i].name}</h3><p>${sortCategory[i].description}</p><button class="btn btn--auto">${'Explore ' + sortCategory[i].key}</button>
                    </article>
                </section>`;
                document.getElementById('sectionCategories').insertAdjacentHTML('beforeend',template);
            } else {
                var template = `
                <section class="sec">
                    <article>
                    <h3>${sortCategory[i].name}</h3><p>${sortCategory[i].description}</p><button class="btn btn--auto">${'Explore ' + sortCategory[i].key}</button>
                    </article>
                    <figure>
                    <img class="categories-img" src="${sortCategory[i].imageUrl}">
                    </figure>
                </section>`;
                document.getElementById('sectionCategories').insertAdjacentHTML('beforeend',template);
            }
        }

    }

}

window.addCustomClass = function () {
    for(var j = 0 ; j < document.getElementsByClassName('sec').length ; j++) {
        document.getElementsByClassName('sec')[j].classList.add('categories-banner-row');
    }
}

var generateHTMLProduct = function (products) {
    var template = `
    <section class="product">
        <div class="product-row">
            <h2>${products.name}</h2>
            <article class="product__display-flex">
                    <figure class="product__img">
                        <img src="${products.imageURL}">
                    </figure>
                <div class="product__display-column">
                    <div class="product__flex-grow">
                        <p>${products.description}</p>
                    </div>
                    <div class="btn-small-screen">
                        <button class="btn" onclick=` + `"addProduct('${products.id}')">`+`${"Buy Now @ Rs." + products.price}</button>
                    </div>
                </div>
            </article>
            <div class="btn-large-screen">
                <span class="product__button-row">${"MRP Rs." + products.price}</span>
                <button class="btn product__button-price2" onclick=`+`"addProduct('${products.id}')">`+ `${"Buy Now @ Rs." + products.price}</button>
                <button class="btn product__button-price" onclick=` +`"addProduct('${products.id}')">`+ `Buy Now</button>
            </div>
        </div>
    </section>
    `;
    document.getElementsByClassName("products-list")[0].insertAdjacentHTML('beforeend',template);
}

window.renderHeader = function () {
    document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', header.renderHeader());
}

window.renderProducts = function (id) {
    for (var i = 0; i < products.length; i++) {
        if (id && products[i].category === id) {
            generateHTMLProduct(products[i]);
        } else if (!id) {
            generateHTMLProduct(products[i]);
        }
    }
    document.getElementsByClassName("product")[document.getElementsByClassName("product").length - 1].className = "product product__last";
    document.getElementsByClassName('header-container')[0].insertAdjacentHTML('beforeend', modal.renderHTML());
    if (!id) {
        modal.checkoutButtonTemplate();
    }
}

window.addProduct = function (productId) {
    document.getElementById('promoCode_p').innerHTML = 'Promo code can be applied on payment page';
    for (var i = 0; i < products.length; i++) {
        if (productId === products[i].id) {
            modal.addProduct(products[i]);
            header.changeBasketCount();
        }
    }
    document.getElementsByClassName('btn--full')[0].classList.add('checkoutButton_flex');
    document.getElementsByClassName('total_amount_text')[0].innerHTML = 'Proceed to Checkout';
    document.getElementsByClassName('total_amount')[0].innerHTML = 'Rs.' + modal.calculateTotalPrice();
}

window.changeProduct = function (event) {
    document.getElementsByClassName("products-list")[0].innerHTML = '';
    var productObj = [
        {
            name: 'All',
            id: ''
        },
        {
            name: 'Fruits &amp; Vegetables',
            id: '5b6899953d1a866534f516e2'
        }, {
            name: 'Bakery Cakes and Dairy',
            id: '5b6899123d1a866534f516de'
        }, {
            name: 'Beverages',
            id: '5b675e5e5936635728f9fc30'
        }, {
            name: 'Beauty and Hygine',
            id: '5b68994e3d1a866534f516df'
        }, {
            name: 'Baby Care',
            id: '5b6899683d1a866534f516e0'
        }];
    for (var i = 0; i < productObj.length; i++) {
        if (productObj[i].name === event.target.innerHTML) {
            renderProducts(productObj[i].id);
            document.getElementById('prduct__category').innerHTML = event.target.innerHTML;
        }
    }
}

window.toggleModal = function () {
    if (document.getElementById("myModal").classList.contains('show-modal')) {
        document.getElementById("myModal").classList.remove('show-modal');
    } else {
        document.getElementById("myModal").classList.add('show-modal');
    }

}

window.increaseProductCount = function (id, price) {
    modal.increaseProductCount(id, price);
}

window.decreaseProductCount = function (id, price) {
    modal.decreaseProductCount(id, price);
}

window.renderCrousal = function () {
    document.getElementById('header').insertAdjacentHTML('afterend', crousal.renderHTML());
    for (var i = 0; i < banner.length; i++) {
        crousal.addSlides(banner[i].bannerImageUrl);
    }
    crousal.showSlides();

}

window.toggleDropdown = function () {
    if (document.getElementById('list-menu-small').classList.contains('list-menu-small-show')) {
        document.getElementById('list-menu-small').classList.remove('list-menu-small-show');
    } else {
        document.getElementById('list-menu-small').classList.add('list-menu-small-show');
    }
}

window.plusSlides = function (n) {
    crousal.plusSlides(n);
}

document.getElementsByClassName('categories-banner-row')[0].remove();