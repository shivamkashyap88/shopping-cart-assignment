import '../style/home.scss';
import modalHTML from '../js/modal';
import Crousals from '../js/crousal';
import Header from '../js/header';
import '../style/media.scss';
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
                    <h3>${sortCategory[i].name}</h3><p>${sortCategory[i].description}</p><button class="btn">${'Explore ' + sortCategory[i].key}</button>
                    </article>
                </section>`;
                document.getElementById('sectionCategories').insertAdjacentHTML('beforeend',template);
            } else {
                var template = `
                <section class="sec">
                    <article>
                    <h3>${sortCategory[i].name}</h3><p>${sortCategory[i].description}</p><button class="btn">${'Explore ' + sortCategory[i].key}</button>
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
    var product = document.createElement("div");
    var row = document.createElement("div");
    var product_flex = document.createElement("div");
    var image_div = document.createElement("div");
    var product_column = document.createElement("div");
    var product_flex_grow = document.createElement("div");
    var smallscr = document.createElement("div");
    var largscr = document.createElement("div");
    var span = document.createElement("span");
    var button = document.createElement("button");
    var button2 = document.createElement("button");
    var lrgbutton = document.createElement("button");
    var img = document.createElement("img");
    var p = document.createElement("p");
    var h2 = document.createElement("h2");
    product.className = "product";
    row.className = "product-row";
    product_flex.className = "product__display-flex";
    product_column.className = "product__display-column";
    product_flex_grow.className = "product__flex-grow";
    span.className = "product__button-row";
    image_div.className = "product__img";
    largscr.className = "btn-large-screen";
    smallscr.className = "btn-small-screen";
    button.className = "btn";
    button2.className = "btn product__button-price";
    lrgbutton.className = "btn product__button-price2";
    img.src = products.imageURL;
    p.innerHTML = products.description;
    button.innerHTML = "Buy Now @ Rs." + products.price;
    button.setAttribute('onclick', `addProduct("${products.id}")`);
    lrgbutton.innerHTML = "Buy Now @ Rs." + products.price;
    lrgbutton.setAttribute('onclick', `addProduct("${products.id}")`);
    h2.innerHTML = products.name;
    span.innerHTML = "MRP Rs." + products.price;
    button2.innerHTML = "Buy Now";
    button2.setAttribute('onclick', `addProduct("${products.id}")`);
    image_div.appendChild(img);
    smallscr.appendChild(button);
    product_flex_grow.appendChild(p);
    product_column.appendChild(product_flex_grow);
    product_column.appendChild(smallscr);
    product_flex.appendChild(image_div);
    product_flex.appendChild(product_column);
    largscr.appendChild(span);
    largscr.appendChild(lrgbutton);
    largscr.appendChild(button2);
    row.appendChild(h2);
    row.appendChild(product_flex);
    row.appendChild(largscr);
    product.appendChild(row);
    document.getElementsByClassName("products-list")[0].appendChild(product);
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
    document.getElementsByClassName('position-relative')[0].insertAdjacentHTML('beforeend', modal.renderHTML());
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
    document.getElementsByClassName('width100')[0].classList.add('checkoutButton_flex');
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