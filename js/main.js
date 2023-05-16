import headerPage from "./components/header_page.js";
import { homePage } from "./pages/home_page.js";
import { handleOption } from "./helper.js";

document.querySelector('#root').appendChild(headerPage());

document.querySelector('#root').appendChild(homePage());

handleOption();

const
    cartSection = document.querySelector('.cart'),
    priceInfo = document.querySelector('.price-info');

export {
    cartSection,
    priceInfo
}