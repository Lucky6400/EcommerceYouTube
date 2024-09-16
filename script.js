const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => navLinks.classList.toggle('show'));

let cartItems = localStorage.getItem('cartItems');
cartItems = cartItems ? JSON.parse(cartItems) : [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartBadges = document.querySelectorAll('.cart_badge');

function updateCart(arr) {
    localStorage.setItem('cartItems', JSON.stringify(arr));
}

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const productName = card.querySelector('h4').textContent;
        const productPrice = card.querySelector('small').textContent.replace('$', '');
        const productImage = card.querySelector('img').src;

        const product = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
            img: productImage
        }

        const existingProduct = cartItems.find(item => item.name === product.name);

        if(existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push(product);
        }

        updateCart(cartItems);
        displayNoOfItemsInCart();
        alert(`${productName} is added to cart.`);
    })
})


function displayNoOfItemsInCart() {
    cartBadges.forEach(badge => {
        badge.textContent = cartItems.length;
    })
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart_items');

    if(cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        if(cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty">Your Cart is empty.</p>';
            return;
        }

        cartItems.forEach((item, index) => {
            const cartCard = document.createElement('div');
            cartCard.classList.add('cart_card');

            cartCard.innerHTML = `
                <img src="${item.img}" alt="${item.name}" />
                <div>
                    <h1>${item.name} <small>x ${item.quantity}</small></h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, nisi. Earum accusamus
                        voluptatibus, nam, excepturi ipsa repudiandae quos accusantium molestias aspernatur odit vitae
                        qui facilis alias error inventore quod harum.
                    </p>
                    <span>$${item.price * item.quantity}</span>
                </div>
                <button class="btn remove-item">Remove</button>
            `;

            cartCard.querySelector('.remove-item').addEventListener('click', function() {
                removeItemFromCart(index)
            });

            cartItemsContainer.appendChild(cartCard);
        })
    }
}


function removeItemFromCart(index) {
    cartItems.splice(index, 1);

    updateCart(cartItems);

    updateCartSummary();
    
    renderCartItems();

    displayNoOfItemsInCart();

    
}

renderCartItems();
displayNoOfItemsInCart();


function updateCartSummary () {
    let totalItems = 0;
    let totalCost = 0;

    cartItems.forEach(item => {
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;
    })

    const discount = totalCost * 0.10;
    const finalTotal = totalCost - discount;

    document.getElementById('total_items').textContent = totalItems;
    document.getElementById('total_cost').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('discount').textContent = `$${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `$${finalTotal.toFixed(2)}`;
}

updateCartSummary();

