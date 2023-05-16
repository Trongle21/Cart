import { cartSection } from "./main.js";
import { renderCart, cart } from "./pages/home_page.js";

// Click Option title
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
    // Click Option size,ice,suger,topping
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

// Thêm sản phẩm

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

// Xóa sản phẩm
function deleteProduct(k) {
    const agreeDelete = confirm('Bạn muốn xóa món này khỏi giỏ hàng')
    if (agreeDelete === true) {
        delete cart[k];
        renderCart(cart);
    }
}

// Thây đổi số lượng sản phẩm
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

// Đóng giỏ hàng
function closeCart() {
    const icon = document.querySelector('.icon')
    icon.addEventListener('click', () => {
        cartSection.classList.remove('show')
    })
}

export {
    handleOption,
    handleClick,
    addProduct,
    deleteProduct,
    changeProduct,
    closeCart
}