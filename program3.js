let selectedItem = null;

const homePage = document.getElementById('home-page');
const paymentPage = document.getElementById('payment-page');

const items = [
  {
    title: `Python Crash Course, 2nd Edition: A Hands-On, Project-Based
            Introduction to Programming 2nd Edition`,
    price: '14.80',
    source: 'python-crash-course.jpg'
  },
  {
    title: 'HTML and CSS: Design and Build Websites 1st Edition',
    price: '13.90',
    source: 'html-css.jpg'
  },
  {
    title: `JavaScript: The Definitive Guide: Master the World's Most-Used
            Programming Language 7th Edition`,
    price: '20.12',
    source: 'javascript.jpg'
  },
  {
    title: 'Let the app decide for me',
    price: '???',
    source: 'red-random.png'
  }
]

const choiceContainer = document.getElementById('choice-container');

for (let i = 0; i < items.length; i++) {
  const newItem = document.createElement('div');

  newItem.id = `choice${i + 1}`;
  newItem.className = 'choice';
  newItem.innerHTML =
    `<img class="thmb" src="${items[i].source}" alt="" />
      <div class="item-info">
        <div class="item-info-top">
          <h4>${items[i].title}</h4>
        </div>
        <div class="item-info-bot">
          <h3>$${items[i].price}</h3>
          <button class="select-btn" onclick="setSelectedItem(${i + 1})">
            Select
          </button>
        </div>
      </div>`;

  choiceContainer.append(newItem);
}

const selectButtons = document.querySelectorAll('.select-btn');

selectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    checkIfPressed();
    showCheckout();
  })
})

const setSelectedItem = (itemNumber) => {
  selectedItem = itemNumber;
}

const showCheckout = () => {
  const foundCheckout = document.getElementById('checkout');
  const checkOutElement = document.createElement('div');

  if (foundCheckout) return;
  if (!selectedItem) return;

  checkOutElement.id = 'checkout';
  checkOutElement.innerHTML =
    `<h3>Proceed to Payment</h3>
    <button id="checkOutButton" onclick="checkOut()">Checkout</button>`;

  homePage.append(checkOutElement);
}

const checkOut = () => {
  const foundPayment = document.getElementById('payment');
  const paymentElement = document.createElement('div');
  const book = items[selectedItem - 1];

  if (foundPayment) return;

  paymentElement.id = 'payment';
  paymentElement.innerHTML =
    `<div id="payment-header">
        <img id="banner-logo" src="html-logo.png" />
        <h2 id="banner-text">Louie's Startup</h2>
        <button id="exit-payment-btn" onclick="removePayment()">&#10060;</button>
      </div> 
        <hr />
      <div id="payment-body">
        <div id="book-details">
          <img id="book-to-buy" src="${book.source}" />
          <div id="book-to-buy-details">
            <h1>${book.title}</h1>
            <h2>$${book.price}</h2>
          </div>
        </div>
        <div id="payment-method">
          <div id="money-input">
            <label id="input-label">Input Money: </label>
            <input type="number" id="money-input-field" />
          </div>
          <button id="submit-money-btn" onclick="processPayment()">Buy</button>
        </div>
    </div>`;

  paymentPage.append(paymentElement);
}

const processPayment = () => {
  const moneyPaid = Number(document.getElementById('money-input-field').value);
  const book = items[selectedItem - 1];
  const sufficientBalance = moneyPaid >= Number(book.price);
  const paymentResult = document.createElement('div');
  const paymentBody = document.getElementById('payment-body');
  const paymentMethod = document.getElementById('payment-method');
  const foundPaymentResult = document.getElementById('payment-result');

  if (foundPaymentResult) paymentBody.removeChild(foundPaymentResult);

  paymentResult.id = 'payment-result';

  if (sufficientBalance) {

    paymentResult.innerHTML =
      `<div id="payment-details">
        <div id="payment-result-header">
          <h1>Payment Received!</h1>
          <img id="payment-result-logo" src="check.png" />
        </div>
        <h2>Amount Due: $${book.price}</h2>
        <h2>Amount Paid: $${moneyPaid}</h2>
        <h2>Change: $${Math.round(100 * (moneyPaid - Number(book.price))) / 100}</h2>
      </>
      <button id="receipt-btn">Print Receipt</button>`;

    paymentBody.removeChild(paymentMethod);
  } else {
    paymentResult.innerHTML =
      `<div id="payment-result-header">
        <h1>You have insufficient balance!</h1>
        <img id="payment-result-logo" src="warning.png" />
      </div>
      <h2>Please Try Again</h2>`;
  }

  paymentBody.append(paymentResult);
}

const removePayment = () => {
  const paymentElement = document.getElementById('payment');
  const checkOutElement = document.getElementById('checkout');

  paymentPage.removeChild(paymentElement);
  homePage.removeChild(checkOutElement);

  removeSelectedItem();
}

const removeSelectedItem = () => {
  selectButtons.forEach((button) => {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
  })
  selectedItem = null;
}

const checkIfPressed = () => {

  for (let i = 1; i <= selectButtons.length; i++) {
    if (i == selectedItem) {
      selectButtons[i - 1].style.backgroundColor = 'green';
      selectButtons[i - 1].style.color = 'white';
    }
    else {
      selectButtons[i - 1].style.backgroundColor = 'white';
      selectButtons[i - 1].style.color = 'black';
    }
  }
}
