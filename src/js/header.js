export default class header {
    count = 0;
    renderHeader() {
        return `
        <header id="header">
        <nav>
            <div class="row position-relative">
                <div class="col main-logo-section">
                    <img alt="Brand Logo" src="../static/images/logo.png" class="brand-logo" />
                    <ul class="main-logo-list">
                        <li><a href="home.html">Home</a></li>
                        <li><a href="products.html">Products</a></li>
                    </ul>
                </div>
                <div class="header-right-section" onclick="openBasket()">
                    <img alt="Cart logo" src="../static/images/cart.svg" class="cart-logo" />
                    <span class="items-number">0 Items</span>
                    <div class="login-section-link">
                        <ul>
                            <li><a href="#">SignIn</a></li>
                            <li><a href="#">Register</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
        `;
    }

    changeBasketCount() {
        this.count = this.count + 1;
        document.getElementsByClassName('items-number')[0].innerHTML = this.count + ' Items';
    }
}