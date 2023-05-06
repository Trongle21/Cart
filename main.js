let products = [{
    id: 'ts01',
    image: './images/1.webp',
    name: 'Nhài sữa',
    price: 30000,
    size: {
        m: 30000,
        l: 35000
    },
    ice: [30, 50, 70],
    sugar: [30, 50, 70],
    topping: {
        td: {
            name: 'Thạch dừa xám',
            price: 10000
        },
        tcd: {
            name: 'Trân châu đen',
            price: 12000
        },
        tct: {
            name: 'Trân châu trắng',
            price: 15000
        }
    }
}, {
    id: 'ts02',
    image: './images/2.webp',
    name: 'Trà sữa',
    price: 40000,
    size: {
        m: 40000,
        l: 45000
    },
    ice: [30, 50, 70],
    sugar: [30, 50, 70],
    topping: {
        td: {
            name: 'Thạch dừa xám',
            price: 10000
        },
        tcd: {
            name: 'Trân châu đen',
            price: 12000
        },
        tct: {
            name: 'Trân châu trắng',
            price: 15000
        }
    }
}, {
    id: 'ts03',
    image: './images/3.webp',
    name: 'Cà Phê',
    price: 50000,
    size: {
        m: 50000,
        l: 55000
    },
    ice: [30, 50, 70],
    sugar: [30, 50, 70],
    topping: {
        td: {
            name: 'Thạch dừa xám',
            price: 10000
        },
        tcd: {
            name: 'Trân châu đen',
            price: 12000
        },
        tct: {
            name: 'Trân châu trắng',
            price: 15000
        }
    }
}, {
    id: 'ts04',
    image: './images/4.webp',
    name: 'Sữa Chua',
    price: 60000,
    size: {
        m: 60000,
        l: 65000
    },
    ice: [30, 50, 70],
    sugar: [30, 50, 70],
    topping: {
        td: {
            name: 'Thạch dừa xám',
            price: 10000
        },
        tcd: {
            name: 'Trân châu đen',
            price: 12000
        },
        tct: {
            name: 'Trân châu trắng',
            price: 15000
        }
    }
}, ]

function renderProducts(params) {
    if (!params) return false;
    for (let [k, v] of Object.entries(params)) {
        let { name, image, price, size, ice, sugar, topping } = v;
        const productList = document.querySelector('.product-list');
        const li = document.createElement('li');
        li.classList.add('product-name');
        li.innerHTML = '';
        li.innerHTML = `
            <div class="product-img">
                <img src="${image}" alt="">
            </div>
            <div class="product-info">
                <h2>${name}</h2><span>${price}</span>
                <div class="select-size">
                    <h6 class="width">Size</h6>
                    M <button class="btn btn-size size-m">${size.m.toLocaleString()}</button>
                    L <button class="btn btn-size size-l">${size.l.toLocaleString()}</button>
                </div>
                <div class="select-ice">
                    <h6 class="width">Ice</h6>
                    <button class="btn btn-ice">${ice[0]}</button>
                    <button class="btn btn-ice">${ice[1]}</button>
                    <button class="btn btn-ice">${ice[2]}</button>
                </div>
                <div class="select-sugar">
                    <h6 class="width">Sugar</h6>
                    <button class="btn btn-sugar">${sugar[0]}</button>
                    <button class="btn btn-sugar">${sugar[1]}</button>
                    <button class="btn btn-sugar">${sugar[2]}</button>
                </div>
                <div class="topping">
                    <button class="btn btn-tp">${topping.td.name}+<h1>${topping.td.price.toLocaleString()}</h1></button>
                    <button class="btn btn-tp">${topping.td.name}+<h1>${topping.tcd.price.toLocaleString()}</h1></button>
                    <button class="btn btn-tp">${topping.td.name}+<h1>${topping.tct.price.toLocaleString()}</h1></button>
                </div>
            </div>
            <button class="btn-add">Added to cart</button>
            `;

        productList.appendChild(li);

        // Xử lý các lựa chọn
        selectOption(li);

        // select 
        handleSelect(li)
            // Hiển thị giỏ hàng
        renderCart(name, image, price, size, topping, li);
    }
}
renderProducts(products);

function selectOption(li) {
    // Lựa chọn size
    const btnSize = li.querySelectorAll('.btn-size');
    btnSize.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('click');
            if (e.currentTarget.classList.contains('click')) {
                btnSize.forEach(span => {
                    if (e.currentTarget !== span) {
                        span.classList.remove('click');
                    }
                });
            }
        });
    });

    // Lựa chọn Đá
    const btnIce = li.querySelectorAll('.btn-ice');
    btnIce.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('click');
            if (e.currentTarget.classList.contains('click')) {
                btnIce.forEach(span => {
                    if (e.currentTarget !== span) {
                        span.classList.remove('click');
                    }
                });
            }
        });
    });
    // Lựa chọn đường
    const btnSugar = li.querySelectorAll('.btn-sugar');
    btnSugar.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('click');
            if (e.currentTarget.classList.contains('click')) {
                btnSugar.forEach(span => {
                    if (e.currentTarget !== span) {
                        span.classList.remove('click');
                    }
                });
            }
        });
    });
    // Lựa chọn topping
    const btnTp = li.querySelectorAll('.btn-tp');
    btnTp.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('click');
            if (e.currentTarget.classList.contains('click')) {
                btnTp.forEach(span => {
                    if (e.currentTarget !== span) {
                        span.classList.remove('click');
                    }
                });
            }
        });
    });

}

function handleSelect(li) {
    const totalPrice = document.querySelector('.total-price span');
    let toppingPrice = 0;
    let sizePrice = 0;
    // Chọn topping
    li.querySelectorAll('.btn-tp').forEach((btnTp) => {
        btnTp.addEventListener('click', (e) => {
            const btnTpPrice = btnTp.querySelector('h1').innerHTML.replace(/[,\.]/g, '');
            toppingPrice = parseFloat(btnTpPrice);
            updateTotalPrice();
        });
    });
    // Chọn size
    li.querySelectorAll('.btn-size').forEach((size) => {
        size.addEventListener('click', (e) => {
            sizePrice = parseFloat(e.target.innerHTML.replace(/[,\.]/g, ''));
            priceSize = sizePrice;
            // priceSize.innerHTML = sizePrice
            updateTotalPrice();
        });
    });
    // Cập nhật tổng giá trị
    function updateTotalPrice() {
        const priceSelect = sizePrice + toppingPrice;
        if (!isNaN(priceSelect)) {
            totalPrice.innerHTML = priceSelect.toLocaleString();
        }
    }
}

function renderCart(name, image, price, size, topping, li) {
    const btnAdd = li.querySelectorAll('.btn-add');
    const cart = document.querySelector('.cart');
    btnAdd.forEach((e) => {
        e.addEventListener('click', () => {
            cart.classList.add('show')
            const priceSpan = document.querySelector('.total-price span')
            priceSpan.innerHTML = `${price}`
            const priceInfo = document.querySelector('.price-info');
            const div = document.createElement('div');
            div.classList.add('cart-info');
            const cartInfo = document.querySelectorAll('.cart-info')
            div.innerHTML = '';
            div.innerHTML = `
            <div class="cart-img">
                <img src="${image}" alt="">
            </div>
            <div class="pay-info">
                <h6 class="title">${name}</h6>
                <span>${price.toLocaleString()}</span>
                <button class="delete">Delete</button>
                <div class="price">
                    <span>$</span>
                    <h4>${price.toLocaleString()}</h4>
                    <div class="quantity">
                        <button class="quantity-button decrease">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-button increase">+</button>
                    </div>
                </div>
            </div>
            `;
            priceInfo.appendChild(div)

            // Xử lý tăng giảm số lượng sản phẩm
            changeProduct(div)

            // Xử lý khi mua sản phẩm giống nhau
            sameProduct(div, li, name)

            /** Tổng giá tiền sau khi tăng số lượng */
            changePrice(div)

            // Total
            totalPrice(cartInfo, li)

        });
    });
}

function changeProduct(div) {
    const decrease = div.querySelector('.decrease');
    const increase = div.querySelector('.increase');
    const quantityInput = div.querySelector('.quantity-input');

    decrease.addEventListener('click', (e) => {
        if (quantityInput.value <= 1) {
            alert('Không thể giảm thêm số lượng sản phẩm')
        } else {
            quantityInput.value--
                totalPrice(document.querySelectorAll('.cart-info'))
        }
    })
    increase.addEventListener('click', (e) => {
        quantityInput.value++
            totalPrice(document.querySelectorAll('.cart-info'))
    })
}

function sameProduct(div, li, name) {
    const btnAdd = li.querySelectorAll('.btn-add');
    const quantityInput = div.querySelector('.quantity-input');
    const title = div.querySelector('.title');
    btnAdd.forEach((button) => {
        button.addEventListener('click', (e) => {
            // for (let value of title) {
            //     if (name === value.innerHTML) {
            //         quantityInput.value++;
            //     }
            // }
            // if (name === title.innerHTML) {}
            quantityInput.value++;
        });
    });
}

function totalPrice(cartInfo, priceSize, li) {
    let total = 0;
    for (let value of cartInfo) {
        const totalPrice = document.querySelector('.total-price span')
        const priceProduct = value.querySelector('.price h4').innerHTML.replace(/[,\.]/g, '');
        const quantity = value.querySelector('.quantity-input').value;
        const price = priceProduct * quantity
        total += price
        totalPrice.innerHTML = total
    }
}

function changePrice(div) {
    const input = div.querySelector(".quantity-input")
    input.addEventListener('change', function() {
        totalPrice()
    })
}