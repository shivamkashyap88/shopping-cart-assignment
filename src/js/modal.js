import '../style/modal.scss';
export default class modalHTML {
    item = '';
    productCount = [];
    productObj = {};
    renderHTML() {
        var template = `
            <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onclick="toggleModal()">&times;</span>
                    <p>My Cart <span class="total_count_header"></span></p>
                </div>
                <div class="product-content">
                </div>
                </div>
          </div>`;
        return template;
    }

    addProduct(product) {
        var promocode = `
        <section class="promocode">
            <figure>
                <img src="../static/images/lowest-price.png" width="100px" alt="Promo Code">
            </figure>
            <p>You won't find it cheaper anywhere</p>
        </section>`;
        if (Object.keys(this.productObj).length === 0) {
            document.getElementsByClassName("product-content")[0].innerHTML = '';
            document.getElementsByClassName("product-content")[0].insertAdjacentHTML('beforeend', promocode);
        }
        var isProductAdded = this.addToProductArray(product);
        if (!isProductAdded) {
            var productItem = `
            <section class="basket">
                <figure class="basket__product-image">
                <img src=${product.imageURL} alt="productImage"/>
                </figure>
                <article class="basket__product-description">
                    <h3>${product.name}</h3>
                    <div class="basket__product-count">
                        <div class="incdec_funct">
                        <span onclick=`+ `"increaseProductCount('${product.id}','${product.price}')"` + `class="basket__product-addsubtract">&plus;</span>
                        <span id="${product.id}-count" class="">${this.productObj[product.id]}</span>
                        <span onclick=`+ `"decreaseProductCount('${product.id}',${product.price})"` + `class="basket__product-addsubtract">&minus;</span>
                        </div>
                        <div class="product-content">
                        <span class="basket__product-text">&times;</span>
                        <span class="basket__product-text">Rs.${product.price}</span>
                        </div>
                        <span id="${product.id}-price" class="basket__product-text total_price_item">Rs.${this.productObj[product.id] * product.price}</span>
                    </div>
                </article>
            </section>
        `;
            document.getElementsByClassName("product-content")[0].classList.remove('emptycart_message');
            document.getElementsByClassName("product-content")[0].insertAdjacentHTML('afterbegin', productItem);
        }
    }

    checkoutButtonTemplate() {
        var checkoutButtonString = 'Start Shopping';
        var template = `
            <div class="checkout">
                <p id="promoCode_p"></p>
                <button class="btn width100">
                <span class="total_amount_text">${checkoutButtonString}</span>
                <span class="total_amount"></span></button>
            </div>
        `;
        var emptyCart = `<header class="flex-full">
            <h5>No items in your cart<h5>
            <p>Your favourite items are just cick away</p>
        </header>`;
        if (Object.keys(this.productObj).length === 0) {
            document.getElementsByClassName("product-content")[0].classList.add('emptycart_message');
            document.getElementsByClassName("product-content")[0].insertAdjacentHTML('afterbegin', emptyCart);
        }
        document.getElementsByClassName("modal-content")[0].insertAdjacentHTML('beforeend', template);
    }

    addToProductArray(product) {
        var flag = false;
        if (this.productObj.hasOwnProperty(product.id)) {
            flag = true;
            for (var i = 0; i < Object.keys(this.productObj).length; i++) {
                if (Object.keys(this.productObj)[i] == product.id) {
                    this.productObj[product.id] = this.productObj[product.id] + 1;
                }
            }
        } else {
            this.productObj[product.id] = 1;
        }
        return flag;
    }

    calculateTotalPrice() {
        var count = 0;
        for (var i = 0; i < document.getElementsByClassName('total_price_item').length; i++) {
            count += parseInt(document.getElementsByClassName('total_price_item')[i].textContent.match(/\d+/)[0]);
        }
        return count;
    }

    increaseProductCount(id, price) {
        this.productObj[id] = this.productObj[id] + 1;
        document.getElementById(id + '-count').innerHTML = this.productObj[id];
        for (var i = 0; i < Object.keys(this.productObj).length; i++) {
            if (Object.keys(this.productObj)[i] == id) {
                document.getElementById(id + '-price').innerHTML = 'Rs.' + this.productObj[id] * price;
            }
        }
        document.getElementsByClassName('total_amount')[0].innerHTML = 'Rs.' + this.calculateTotalPrice();
    }
    decreaseProductCount(id, price) {
        this.productObj[id] = this.productObj[id] - 1;
        document.getElementById(id + '-count').innerHTML = this.productObj[id];
        for (var i = 0; i < Object.keys(this.productObj).length; i++) {
            if (Object.keys(this.productObj)[i] == id) {
                document.getElementById(id + '-price').innerHTML = 'Rs.' + this.productObj[id] * price;
            }
        }
        document.getElementsByClassName('total_amount')[0].innerHTML = 'Rs.' + this.calculateTotalPrice();
    }
}
