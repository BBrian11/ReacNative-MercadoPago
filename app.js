var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
window.Mercadopago.setPublishableKey("ENV_PUBLIC_KEY");
window.Mercadopago.getIdentificationTypes();
document.getElementById('cardNumber').addEventListener('keyup', guessPaymentMethod);
document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

mercadopago.configure({
  client_id: 'ENV_6218531568156563',
  client_secret: 'ENV_MB64ieDa2bfuHk6sObJAaCBg0rMEuZHQ'
});



function guessPaymentMethod(event) {
    let cardnumber = document.getElementById("cardNumber").value;

    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0,6);
        window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);
    }
};

function setPaymentMethod(status, response) {
    if (status == 200) {
        let paymentMethodId = response[0].id;
        let element = document.getElementById('payment_method_id');
        element.value = paymentMethodId;
        getInstallments();
    } else {
        alert(`payment method info error: ${response}`);
    }
}

function getInstallments(){
  window.Mercadopago.getInstallments({
      "payment_method_id": document.getElementById('payment_method_id').value,
      "amount": parseFloat(document.getElementById('transaction_amount').value)

  }, function (status, response) {
      if (status == 200) {
          document.getElementById('installments').options.length = 0;
          response[0].payer_costs.forEach( installment => {
              let opt = document.createElement('option');
              opt.text = installment.recommended_message;
              opt.value = installment.installments;
              document.getElementById('installments').appendChild(opt);
          });
      } else {
          alert(`installments method info error: ${response}`);
      }
  });
}

doSubmit = false;
document.querySelector('#pay').addEventListener('submit', doPay);

function doPay(event){
    event.preventDefault();
    if(!doSubmit){
        var $form = document.querySelector('#pay');

        window.Mercadopago.createToken($form, sdkResponseHandler);

        return false;
    }
};

function sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        alert("verify filled data");
    }else{
        var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        doSubmit=true;
        form.submit();
    }
};





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res)); 


const mercadopago = require ('mercadopago');

// Add Your credentials
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN'
});

// Create a preference object
let preference = {
  items: [
    {
      title: 'My Item',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// This value replaces the String "<%= global.id %>" in your HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});



module.exports = app;
