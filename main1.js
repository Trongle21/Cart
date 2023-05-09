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

const productList = document.querySelector('.product-list')
const cart = document.querySelector('.cart')
const priceInfo = document.querySelector('.price-info')
const billTotal = document.querySelector('.total-price span')

function renderProduct(params) {
    if (!params) return false;
    for (let product of params) {
        let { id, image, name, price, size, ice, sugar, topping } = product
        const li = document.createElement('li');
        li.classList.add('product-name');
        li.innerHTML = '';
        li.innerHTML = `
        <div class="product-img">
            <img src="${image}" alt="">
        </div>
        <div class="product-info">
            <h2>${name}</h2><span>${price.toLocaleString()}</span>
            <div class="select-size">
                <h6 class="width">Size</h6>
                M <button class="btn btn-size">${size.m}</button>
                L <button class="btn btn-size">${size.l}</button>
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
               <h1>${topping.td.name}</h1><button class="btn btn-tp">${topping.td.price}</button>
               <h1>${topping.tcd.name}</h1><button class="btn btn-tp">${topping.tcd.price}</button>
               <h1>${topping.tct.name}</h1> <button class="btn btn-tp">${topping.tct.price}</button>
            </div>
        </div>
        <button class="btn-add">Added to cart</button>
        `;

        // Render size

        productList.appendChild(li)

        // thêm sản phẩm vào giỏ hàng
        li.querySelector('.btn-add').addEventListener('click', () => {
            addProduct(li, product)
        });
    }
    // Xử lí khi lựa chọn
    handleClick()
}
renderProduct(products)

function handleClick() {
    const btn = document.querySelectorAll('.btn')
    btn.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('click');
            if (e.currentTarget.classList.contains('click')) {
                button.parentElement.querySelectorAll('button').forEach((span) => {
                    if (e.currentTarget !== span) {
                        span.classList.remove('click')
                    }
                });
            }
        });
    });
}
let cartegory = {};

function addProduct(li, product) {
    let { id, image, name, price, size, ice, sugar, topping } = product

    let newProduct = {}
    let choiceSize;
    let choiceIce;
    let choiceSugar;
    let choiceTopping;
    newProduct.name = name;
    newProduct.quantity = 1;
    newProduct.totalPrice = price;

    // Khi không chọn size
    if (!li.querySelector('.btn-size.click')) {
        alert('Vui lòng chọn size');
        return false
    }
    // // Khi không chọn ice
    // if (!li.querySelector('.btn-ice.click')) {
    //     alert('Vui lòng chọn ice');
    //     return false
    // }
    // // Khi không chọn sugar
    // if (!li.querySelector('.btn-sugar.click')) {
    //     alert('Vui lòng chọn đường');
    //     return false
    // }

    // Khi chọn size
    if (li.querySelector('.btn-size.click')) {
        choiceSize = li.querySelector('.btn-size.click').innerHTML;
        newProduct.price = parseInt(choiceSize)
    }
    // // Khi chọn ice
    // if (li.querySelector('.btn-ice.click')) {
    //     choiceIce = li.querySelector('.btn-ice.click').innerHTML;
    //     newProduct.ice = parseInt(choiceIce)
    // }
    // // Khi chọn sugar
    // if (li.querySelector('.btn-sugar.click')) {
    //     choiceSugar = li.querySelector('.btn-sugar.click').innerHTML;
    //     newProduct.ice = parseInt(choiceSugar)
    // }
    // Khi chọn topping
    if (li.querySelector('.btn-tp.click')) {
        choiceTopping = li.querySelector('.btn-tp.click').innerHTML;
        newProduct.price = newProduct.price + parseInt(choiceTopping)
        newProduct.totalPrice = newProduct.price
    } else {
        newProduct.topping = '';
    }

    // let key = `${id}-${choiceSize}-${choiceIce}-${choiceSugar}-${choiceTopping}`;
    // if (!choiceTopping) {
    //     key = `${id}-${choiceSize}-${choiceIce}-${choiceSugar}`;
    // }
    let key = `${id}-${choiceSize}-${choiceTopping}`;
    if (!choiceTopping) {
        key = `${id}-${choiceSize}`;
    }


    // Xử lý khi sản phẩm trùng lặp

    if (cartegory[key]) {
        // const quantityInput = document.querySelector('.quantity-input')
        // if (quantityInput) {
        //     quantityInput.value++;
        //     return;
        // }
        cartegory[key]['quantity'] += 1
            // cartegory[key]['totalPrice'] = cartegory[key]['quantity'] * cartegory[key]['price']
    } else {
        cartegory[key] = newProduct
    }
    renderCart(cartegory, product)
}

function renderCart(cartegory, product) {
    let { id, image, name, price, size, ice, sugar, topping } = product
    for (let [k, v] of Object.entries(cartegory)) {
        console.log(v.price)
        if (document.querySelector('.btn-size.click') && document.querySelector('.btn-ice.click') && document.querySelector('.btn-sugar.click')) {
            const div = document.createElement('div');
            cart.classList.add('show')
            div.classList.add('cart-info');
            div.innerHTML = '';
            div.innerHTML = `
            <div class="cart-img">
                <img src="${image}" alt="">
            </div>
            <div class="pay-info">
                <h6 class="title">${v.name}</h6>
                <span>${v.price}</span>
                <button class="delete" data-id = ${k}>Delete</button>
                <div class="price">
                    <div class="quantity">
                        <button class="quantity-button decrease">-</button>
                        <input type="number" class="quantity-input" value="${v.quantity}" min="1">
                        <button class="quantity-button increase">+</button>
                    </div>
                </div>
            </div>
            `;
            priceInfo.appendChild(div);
            // Xóa sản phẩm
            document.querySelectorAll('.delete').forEach((btnDelete) => {
                btnDelete.addEventListener('click', () => {
                    deleteProduct(k);
                });
            });

            // Thay đổi số lượng sản phẩm
            div.querySelectorAll('.quantity-button').forEach((quantityBtn) => {
                quantityBtn.addEventListener('click', (btn) => {
                    const quantityInput = div.querySelector('.quantity-input')
                    changeProduct(btn, quantityInput, v);
                });
            });

            // Tổng tiền tất cả các sản phẩm
            totalAllProduct(cartegory, v);

            // Đóng giỏ hàng
            closeCart()
        }
    }
}

function deleteProduct(k) {
    const deleteItem = document.querySelector(`.cart-info [data-id="${k}"]`);
    if (deleteItem) {
        const parent = deleteItem.parentElement.parentElement;
        if (parent) {
            parent.remove();
            totalAllProduct();
        }
    }
}

function changeProduct(btn, quantityInput, v) {
    if (btn.currentTarget.classList.contains('decrease')) {
        if (quantityInput.value < 2) {
            alert('Không thể giảm số lượng sản phẩm thêm được nữa')
        } else {
            v.quantity -= 1;
            quantityInput.value = v.quantity
            totalAllProduct();
        }
    }
    if (btn.currentTarget.classList.contains('increase')) {
        v.quantity += 1;
        quantityInput.value = v.quantity
        totalAllProduct();
    }
}

function totalAllProduct() {
    const cartInfo = document.querySelectorAll('.cart-info');
    let totalAllItem = 0;
    for (let items of cartInfo) {
        priceProduct = items.querySelector('.pay-info span').innerHTML;
        quantityProduct = items.querySelector('.quantity-input').value;
        const priceItem = parseInt(priceProduct) * quantityProduct;
        totalAllItem += priceItem;
    }
    billTotal.innerHTML = totalAllItem
}

function closeCart() {
    const icon = document.querySelector('.icon')
    icon.addEventListener('click', () => {
        if (icon) {
            cart.classList.remove('show')
        }
    })
}