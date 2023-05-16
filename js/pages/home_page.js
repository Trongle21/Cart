import products from "../data.js";
import { handleClick, addProduct, deleteProduct, changeProduct, closeCart } from '../helper.js';
import { cartSection, priceInfo } from '../main.js';
let cart = {}
let titleListMain = [{
    url: '#',
    name: 'Coffee'
}, {
    url: '#',
    name: 'Non Coffee'
}, {
    url: '#',
    name: 'Food'
}, {
    url: '#',
    name: 'Snack'
}, {
    url: '#',
    name: 'Dessert'
}, ]
let titleListCate = [{
    url: '#',
    name: 'Delivery'
}, {
    url: '#',
    name: 'Dine in'
}, {
    url: '#',
    name: 'Away'
}, ]

function homePage() {
    const main = document.createElement('main');
    main.innerHTML = '';
    main.innerHTML = `
    <section class="product-page">
        <div class="container">
            <div class="product-top">
                <div class="search">
                    <input><span>Search...</span><i class="bi bi-search"></i>
                    <button class="btn-primary">
                        <i class="bi bi-text-left"> Filter</i>
                    </button>
                </div>
            </div>
            <div class="product-bottom">
                <div class="product-select main">
                    <ul>

                    </ul>
                </div>
                <div class="product-all">
                    <h2 class="style-text">Coffe menu</h2>
                    <ul class="product-list">
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section class="cart-section">
        <div class="cart">
            <div class="account">
                <div class="account-img">
                    <img src="./images/Kaio.png" alt="">
                </div>
                <div class="account-info">
                    <h4>Kaio</h4>
                    <h5>Kaiosuke@gmail.com</h5>
                </div>
                <div class="icon">
                    <i class="bi bi-x-square-fill"></i>
                </div>
            </div>
            <div class="product-cart">
                <h2>Cart <span>Order #3243</span></h2>
                <div class="transaction-cart">
                    <div class="product-select category">
                        <ul>
   
                        </ul>
                    </div>
                    <div class="price-info">
                    </div>
                    <div class="total-price">
                        <div class="line-bottom"></div>
                        <div class="total">
                            <h1>Total</h1>
                            <span></span>
                        </div>
                        <div class="btn-order">
                            <button>Place an order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    titleListMain.map((list) => {
        let { url, name } = list;
        const li = document.createElement('li');
        li.innerHTML = '';
        li.innerHTML = name;
        li.setAttribute('href', url)

        main.querySelector('.product-select.main ul').appendChild(li);
        main.querySelector('.product-select.main ul li').classList.add('click')
    })
    titleListCate.map((list) => {
        let { url, name } = list;
        const li = document.createElement('li');
        li.innerHTML = '';
        li.innerHTML = name;
        li.setAttribute('href', url)

        main.querySelector('.product-select.category ul').appendChild(li);
        main.querySelector('.product-select.category ul li').classList.add('click')
    })


    function renderProduct(params) {
        if (!params) return false;
        for (let product of params) {
            const productList = main.querySelector('.product-list')
            let { id, image, name, price, size, ice, sugar, topping } = product;
            const li = document.createElement('li');
            li.classList.add('product-name');
            li.innerHTML = '';
            li.innerHTML = `
            <div class="product-img">
                <img src="${image}" alt="">
            </div>
            <div class="product-info">
                <h2>${name}</h2><span class="price-size">${price.toLocaleString()}</span>
                <div class="select-size">
                    <h6 class="width">Size</h6>
                    <div class="size"></div>
                </div>
                <div class="select-ice">
                    <h6 class="width">Ice</h6>
                    <div class="ice"></div>
                </div>
                <div class="select-sugar">
                    <h6 class="width">Sugar</h6>
                    <div class="sugar"></div>
                </div>
                <div class="topping">
                <div class="topping"></div>
                </div>
            </div>
            <button class="btn-add">Added to cart</button>
        `;

            productList.appendChild(li);

            // render Size
            for (let [k, v] of Object.entries(size)) {
                const button = document.createElement('button');
                button.classList.add('btn');
                button.setAttribute('data-name', 'size');
                button.setAttribute('data-value', k);
                button.innerHTML = k;
                button.addEventListener('click', () => {
                    li.querySelector('.price-size').innerHTML = v.toLocaleString()
                })
                li.querySelector('.size').appendChild(button);
                handleClick(button)
            }
            li.querySelector('.size button').classList.add('click');

            // render ice
            for (let [k, v] of Object.entries(ice)) {
                const button = document.createElement('button');
                button.classList.add('btn');
                button.setAttribute('data-name', 'ice');
                button.setAttribute('data-value', v);
                button.innerHTML = v;

                li.querySelector('.ice').appendChild(button);

                handleClick(button)
            }

            // render sugar
            for (let [k, v] of Object.entries(sugar)) {
                const button = document.createElement('button');
                button.classList.add('btn');
                button.setAttribute('data-name', 'sugar');
                button.setAttribute('data-value', v);
                button.innerHTML = v;

                li.querySelector('.sugar').appendChild(button);
                handleClick(button)
            }
            for (let [k, v] of Object.entries(topping)) {
                const button = document.createElement('button');
                button.classList.add('btn');
                button.setAttribute('data-name', 'topping');
                button.setAttribute('data-value', k);
                button.innerHTML = `
                ${v.name} + ${v.price.toLocaleString()}
            `;

                li.querySelector('.topping').appendChild(button);
                handleClick(button)
            }

            li.querySelector('.btn-add').addEventListener('click', () => {
                addProduct(li, product)
            })
        }
    }
    renderProduct(products)

    return main;
}


function renderCart(cart) {
    let total = 0;
    priceInfo.innerHTML = '';
    cartSection.classList.add('show')
    for (let [k, v] of Object.entries(cart)) {
        let { name, image, quantity, topping, price, ice, sugar, size, totalPrice } = v,
        product = `
        <div class="cart-img">
            <img src="${image}" alt="">
        </div>
        <div class="pay-info">
            <h6 class="title">${name}</h6>
            <span>${totalPrice.toLocaleString()}</span>
            <button class="delete">Delete</button>
        <div class="price">
            <div class="quantity">
                <button class="quantity-button decrease">-</button>
                <input type="number" class="quantity-input" value="${quantity}" min="1">
                <button class="quantity-button increase">+</button>
            </div>
        </div>
        </div>
        `;
        const div = document.createElement('div');
        div.classList.add('cart-info');

        div.innerHTML = `
        ${product}
        `;

        // Xóa sản phẩm
        div.querySelector('.delete').addEventListener('click', () => {
            deleteProduct(k);
        });

        // Thay đổi số lượng sản phẩm
        changeProduct(k, div);

        // Đóng giỏ hàng
        closeCart();

        priceInfo.appendChild(div);

        total += totalPrice;
    }

    document.querySelector('.total span').innerHTML = `
    <span>${total.toLocaleString()}</span>
    `;
}
export {
    cart,
    homePage,
    renderCart,
}