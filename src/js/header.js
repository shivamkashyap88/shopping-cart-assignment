export default class header {
    count = 0;
    renderHeader() {
        return `
        <header id="header">
        <nav>
            <div class="position-relative">
                <div class="main-logo-section">
                    <img alt="Brand Logo" src="../static/images/logo.png" class="brand-logo" />
                    <ul class="main-logo-list">
                        <li><a href="home.html">Home</a></li>
                        <li><a href="products.html">Products</a></li>
                    </ul>
                </div>
                <div class="header-right-section">
                   <div class="login-section-link">
                    <ul>
                        <li><a href="signin.html">SignIn</a></li>
                        <li><a href="/">Register</a></li>
                    </ul>
                    </div>
                    <div class="header-right-section__basket" onclick="toggleModal()">    
                        <img alt="Cart logo" src="../static/images/cart.svg" width="25px" class="cart-logo" />
                        <span class="items-number">0 Items</span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
        `;
    }

    changeBasketCount() {
        this.count = this.count + 1;
        var mobileHeader = `
        <div class="mobile_cart">
                <p>My Cart <span class="mobile_cart-item"></span></p>
        </div>`;
        if(document.getElementsByClassName("mobile_cart")[0]) {
            document.getElementsByClassName("mobile_cart")[0].remove();
        }
        document.getElementsByClassName("modal-header")[0].insertAdjacentHTML('afterend', mobileHeader);
        document.getElementsByClassName('items-number')[0].innerHTML = this.count + ' Items';
        document.getElementsByClassName('total_count_header')[0].innerHTML = '(' + this.count + ' Item)';
        document.getElementsByClassName('mobile_cart-item')[0].innerHTML = '(' + this.count + ' Item)';
    }
}