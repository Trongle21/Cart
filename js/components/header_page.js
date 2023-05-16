let menu = [{
    url: '#',
    name: 'Home Page',
    icon: 'bi bi-house'
}, {
    url: '#',
    name: 'Menu',
    icon: 'bi bi-grid'
}, {
    url: '#',
    name: 'My Orders',
    icon: 'bi bi-bag-dash'
}, {
    url: '#',
    name: 'History',
    icon: 'bi bi-hourglass'
}, {
    url: '#',
    name: 'Parners',
    icon: 'bi bi-person'
}, {
    url: '#',
    name: 'Setting',
    icon: 'bi bi-gear'
}, {
    url: '#',
    name: 'Donate to shelter',
    icon: 'bi bi-heart'
}];

export default function headerPage() {
    const head = document.createElement('header');
    head.innerHTML = '';
    head.innerHTML = `
    <div class="header">
        <nav class="page-header">
            <div class="header-logo">
                <img src="./images/The-Coffee-House-Logo-PNG-2.png" alt="">
            </div>
            <div class="header-menu">
                <ul class="header-list-menu">
                </ul>
            </div>
            <div class="log-out"><i class="bi bi-box-arrow-in-left"></i>Log Out</div>
        </nav>
    </div>
    `;
    menu.map((list) => {
        let { url, name, icon } = list;
        const li = document.createElement('li');
        li.classList.add('name-list');
        li.innerHTML = '';
        li.innerHTML = `
            <i class="${icon}"></i>${name}
        `;
        li.setAttribute('href', url);
        head.querySelector('.header-list-menu').appendChild(li);
    })
    return head;
}