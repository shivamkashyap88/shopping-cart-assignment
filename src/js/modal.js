import '../style/modal.scss';
export default class modalHTML {
    item = '';
    productCount = [];
    productObj = {};
    renderHTML() {
        return `
            <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <p>My Cart</p>
                </div>
                <div class="product-content">
                    
                </div>
            </div>
          </div>`;
    }

    addProduct(product) {
        var isProductAdded = this.addToProductArray(product);
        if (!isProductAdded) {
            var productItem = `
            <div class="basket">
                <div class="basket__product-image">
                <img src=${product.imageURL} />
                </div>
                <div class="basket__product-description">
                    <h3>${product.name}</h3>
                    <div class="basket__product-count">
                        <span onclick=`+ `"increaseProductCount('${product.id}','${product.price}')"` + `class="basket__product-addsubtract">&plus;</span>
                        <span id="${product.id}-count" class="basket__product-text">${this.productObj[product.id]}</span>
                        <span onclick=`+ `"decreaseProductCount('${product.id}',${product.price})"` + `class="basket__product-addsubtract">&minus;</span>
                        <span class="basket__product-text">&times;${product.price}</span>
                        <span id="${product.id}-price" class="basket__product-text">Rs.${this.productObj[product.id] * product.price}</span>
                    </div>
                </div>
            </div>
        `;
            document.getElementsByClassName("product-content")[0].insertAdjacentHTML('beforeend', productItem);
        }
    }

    checkoutButtonTemplate() {
        console.log('sasas')
        var template = `
            <div class="checkout">
                <button class="btn width100">Proceed to Checkout</button>
            </div>
        `;
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

    increaseProductCount(id, price) {
        this.productObj[id] = this.productObj[id] + 1;
        document.getElementById(id + '-count').innerHTML = this.productObj[id];
        for (var i = 0; i < Object.keys(this.productObj).length; i++) {
            if (Object.keys(this.productObj)[i] == id) {
                document.getElementById(id + '-price').innerHTML = 'Rs.' + this.productObj[id] * price;
            }
        }

    }
    decreaseProductCount(id, price) {
        this.productObj[id] = this.productObj[id] - 1;
        document.getElementById(id + '-count').innerHTML = this.productObj[id];
        for (var i = 0; i < Object.keys(this.productObj).length; i++) {
            if (Object.keys(this.productObj)[i] == id) {
                document.getElementById(id + '-price').innerHTML = 'Rs.' + this.productObj[id] * price;
            }
        }
    }
}
