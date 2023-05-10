let products = [{
    id: 'ts01',
    image: './images/1.webp',
    name: 'Nước Dâu',
    price: 30000,
    size: {
        M: 30000,
        L: 35000
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
    name: 'Cà phê',
    price: 40000,
    size: {
        M: 40000,
        L: 45000
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
    name: 'Bạc xỉu',
    price: 50000,
    size: {
        M: 50000,
        L: 55000
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
    name: 'Trà nâu',
    price: 60000,
    size: {
        M: 60000,
        L: 65000
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

let cart = {};

const productList = document.querySelector('.product-list'),
    cartSection = document.querySelector('.cart'),
    priceInfo = document.querySelector('.price-info'),
    bill = document.querySelector('.total span')

// Click Option 
function handleOption() {

    // Option main
    document.querySelectorAll('.product-select.main ul li').forEach((option) => {
        option.addEventListener('click', (e) => {
            if (!e.target.classList.contains('click')) {
                document.querySelectorAll('.product-select.main ul li').forEach((li) => {
                    li.classList.remove('click');
                });
                e.target.classList.add('click');
            }
        });
    });
    // Option categoty
    document.querySelectorAll('.product-select.category ul li').forEach((option) => {
        option.addEventListener('click', (e) => {
            if (!e.target.classList.contains('click')) {
                document.querySelectorAll('.product-select.category ul li').forEach((li) => {
                    li.classList.remove('click');
                });
                e.target.classList.add('click');
            }
        });
    });
}
handleOption()

function renderProduc(params) {
    if (!params) return false;
    for (let product of params) {
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
renderProduc(products)

function handleClick(button) {
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('click')
        if (e.target.classList.contains('click')) {
            button.parentElement.querySelectorAll('button').forEach((btn) => {
                if (e.target !== btn) {
                    btn.classList.remove('click')
                }
            });
        }
    });
}

function addProduct(li, product) {
    let { id, image, name, price, size, ice, sugar, topping } = product;
    let newProduct = {
            name: name,
            quantity: 1,
            totalPrice: price,
            image: image,

        },
        choiceSize,
        choiceIce,
        choiceSugar,
        choiceTopping


    // Khi không chọn size
    if (!li.querySelector('[data-name="size"].click')) {
        alert('Vui lòng chọn size')
        return false
    }

    // Khi không chọn đá
    if (!li.querySelector('[data-name="ice"].click')) {
        alert('Vui lòng chọn đá')
        return false
    }
    // Khi không chọn sugar
    if (!li.querySelector('[data-name="sugar"].click')) {
        alert('Vui lòng chọn đường')
        return false
    }

    // Khi đã chọn size
    if (li.querySelector('[data-name="size"].click')) {
        choiceSize = li.querySelector('[data-name="size"].click').getAttribute('data-value');
        newProduct.size = choiceSize;
        newProduct.price = size[choiceSize];
    }

    // Khi đã chọn đá
    if (li.querySelector('[data-name="ice"].click')) {
        choiceIce = li.querySelector('[data-name="ice"].click').getAttribute('data-value');
        newProduct.ice = choiceIce;
    }

    // Khi đã chọn đường
    if (li.querySelector('[data-name="sugar"].click')) {
        choiceSugar = li.querySelector('[data-name="sugar"].click').getAttribute('data-value');
        newProduct.sugar = choiceSugar;
    }

    // Khi đã chọn topping
    if (li.querySelector('[data-name="topping"].click')) {
        choiceTopping = li.querySelector('[data-name="topping"].click').getAttribute('data-value');
        newProduct.topping = topping[choiceTopping]['name'];
        newProduct.price += topping[choiceTopping]['price'];
        newProduct.totalPrice = newProduct.price;
    } else {
        newProduct.topping = '';
    }
    let key
    if (choiceTopping) {
        key = `${id}-${choiceSize}-ice${choiceIce}-sugar${choiceSugar}-${choiceTopping}`;
    }

    if (!choiceTopping) {
        key = `${id}-${choiceSize}-ice${choiceIce}-sugar${choiceSugar}`;
    }

    // Xử lý khi bị trùng lặp sản phẩm
    if (cart[key]) {
        cart[key]['quantity'] += 1;
        cart[key]['totalPrice'] = cart[key]['quantity'] * cart[key]['price'];
        // alert('sản phẩm đã có trong giỏ hàng')
        // return;
    } else {
        cart[key] = newProduct
    }
    console.log()
    renderCart(cart)
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
        closeCart()

        priceInfo.appendChild(div);

        total += totalPrice;
    }

    bill.innerHTML = `
	<span>${total.toLocaleString()}</span>
	`;
}

function deleteProduct(k) {
    const agreeDelete = confirm('Bạn muốn xóa món này khỏi giỏ hàng')
    if (agreeDelete === true) {
        delete cart[k];
        renderCart(cart);
    }
}

function changeProduct(k, div) {
    const quantityButton = div.querySelectorAll('.quantity-button')
    quantityButton.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (e.target.classList.contains('decrease')) {
                cart[k]['quantity'] -= 1
                if (cart[k]['quantity'] <= 0) {
                    cart[k]['quantity'] = 1
                    alert('Không thể giảm số lượng sản phẩm được nữa')
                    return
                } else {
                    cart[k]['totalPrice'] = cart[k]['quantity'] * cart[k]['price']
                }
                renderCart(cart)
                return
            }
            if (e.target.classList.contains('increase')) {
                cart[k]['quantity'] += 1
                cart[k]['totalPrice'] = cart[k]['quantity'] * cart[k]['price']
                renderCart(cart)
                return
            }
        })
    })
}

function closeCart() {
    const icon = document.querySelector('.icon')
    icon.addEventListener('click', () => {
        cartSection.classList.remove('show')
    })
}