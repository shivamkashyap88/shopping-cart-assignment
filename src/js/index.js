import '../style/home.scss';
import '../style/media.scss';
import categories from '../../server/categories/index.get.json';
import products from '../../server/products/index.get.json';
import modalHTML from '../js/modal';
import Header from '../js/header';

var modal = new modalHTML();
var header = new Header();
var width1 = 'width-col-product-first';
var width2 = 'width-col-product-second';

for (var i = 0; i < categories.length; i++) {
    if (categories[i].imageUrl) {
        var bannerRow = document.getElementsByClassName('categories-banner-row')[categories[i].order];
        if (bannerRow) {
            var h3 = document.createElement("h3");
            h3.innerHTML = categories[i].name;
            var p = document.createElement("p");
            p.innerHTML = categories[i].description;
            var img = document.createElement("img");
            img.classList.add("categories-img");
            img.src = categories[i].imageUrl;
            var button = document.createElement("button");
            button.classList.add("btn");
            button.innerHTML = 'Explore ' + categories[i].key;

            if (categories[i].order % 2 !== 0) {
                bannerRow.getElementsByClassName('col')[0].classList.add(width2);
                bannerRow.getElementsByClassName('col')[1].classList.add(width1);
                bannerRow.getElementsByClassName('col')[1].appendChild(h3);
                bannerRow.getElementsByClassName("col")[1].appendChild(p);
                bannerRow.getElementsByClassName("col")[1].appendChild(button);
                bannerRow.getElementsByClassName("col")[0].appendChild(img);
            } else {
                bannerRow.getElementsByClassName('col')[1].classList.add(width2);
                bannerRow.getElementsByClassName('col')[0].classList.add(width1);
                bannerRow.getElementsByClassName('col')[0].appendChild(h3);
                bannerRow.getElementsByClassName("col")[0].appendChild(p);
                bannerRow.getElementsByClassName("col")[0].appendChild(button);
                bannerRow.getElementsByClassName("col")[1].appendChild(img);
            }
        }
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
    var h3 = document.createElement("h3");
    product.className = "product";
    product_flex.className = "product__display-flex";
    product_column.className = "product__display-column";
    product_flex_grow.className = "product__flex-grow";
    span.className = "product__button-row";
    image_div.className = "product__img";
    largscr.className = "row btn-large-screen";
    smallscr.className = "btn-small-screen";
    button.className = "btn";
    button2.className = "btn product__button-price";
    lrgbutton.className = "btn product__button-price2";
    img.src = products.imageURL;
    p.innerHTML = products.description;
    button.innerHTML = "Buy Now @ Rs."+ products.price;
    button.setAttribute('onclick',`addProduct("${products.id}")`);
    lrgbutton.innerHTML = "Buy Now @ Rs."+ products.price;
    lrgbutton.setAttribute('onclick',`addProduct("${products.id}")`);
    h3.innerHTML = products.name;
    span.innerHTML = "MRP Rs."+ products.price;
    button2.innerHTML = "Buy Now";
    button2.setAttribute('onclick',`addProduct("${products.id}")`);
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
    row.appendChild(h3);
    row.appendChild(product_flex);
    row.appendChild(largscr);
    product.appendChild(row);
    document.getElementsByClassName("products-list")[0].appendChild(product);
}
window.renderHeader = function () {
    document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin',header.renderHeader());  
}
window.renderProducts = function (id) {
    for (var i = 0; i < products.length; i++) {
        if (id && products[i].category === id) {
            generateHTMLProduct(products[i]);
        } else if(!id){
            generateHTMLProduct(products[i]);
        }
    }
    document.getElementsByClassName("product")[document.getElementsByClassName("product").length -1].className = "product product__last";
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',modal.renderHTML());  
    if(!id){
        modal.checkoutButtonTemplate();
    }
}

window.addProduct = function (productId) {
    for(var i =0 ; i< products.length ; i++){
        if(productId === products[i].id) {
            modal.addProduct(products[i]);
            header.changeBasketCount();
        }
    }
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

window.openBasket = function () {
    document.getElementById("myModal").classList.add('show-modal');
}

window.closeModal = function () {
    document.getElementById("myModal").classList.remove('show-modal');
}

window.increaseProductCount = function(id,price) {
    modal.increaseProductCount(id,price);
}

window.decreaseProductCount = function(id,price) {
    modal.decreaseProductCount(id,price);
}

document.getElementsByClassName('categories-banner-row')[0].remove();


