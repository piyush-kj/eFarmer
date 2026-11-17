/* =========================================================
   eFarmer - small vanilla JavaScript
   Everything here runs in the browser. No server needed.
   ========================================================= */

/* ---------- 1. Mobile menu ---------- */
function initNav() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
    var open = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ---------- 2. Footer year ---------- */
function initYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- 3. Market data ----------
   This is demo data. To add a real product, copy one block
   below and change the values. "img" points to a file in /images.
*/
var PRODUCTS = [
  {
    id: 1,
    crop: 'Wheat',
    variety: 'Sharbati, Grade A',
    dealer: 'Sharma Agro Traders',
    city: 'Indore',
    state: 'Madhya Pradesh',
    qty: 120,
    price: 2450,
    img: 'grain-sieve.jpg',
    verified: true
  },
  {
    id: 2,
    crop: 'Paddy',
    variety: 'Basmati 1121',
    dealer: 'Kisan Rice Mill',
    city: 'Karnal',
    state: 'Haryana',
    qty: 200,
    price: 3100,
    img: 'paddy-field.jpg',
    verified: true
  },
  {
    id: 3,
    crop: 'Rice',
    variety: 'Sona Masoori',
    dealer: 'Sri Balaji Wholesale',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    qty: 80,
    price: 3400,
    img: 'rice-grains.jpg',
    verified: true
  },
  {
    id: 4,
    crop: 'Wheat',
    variety: 'Lokwan, clean',
    dealer: 'Patel Grain House',
    city: 'Junagadh',
    state: 'Gujarat',
    qty: 60,
    price: 2380,
    img: 'wheat-hand.jpg',
    verified: false
  },
  {
    id: 5,
    crop: 'Maize',
    variety: 'Yellow, dry',
    dealer: 'Deccan Feed Suppliers',
    city: 'Nizamabad',
    state: 'Telangana',
    qty: 150,
    price: 2050,
    img: 'grain-sieve.jpg',
    verified: true
  },
  {
    id: 6,
    crop: 'Mustard',
    variety: 'Bold seed',
    dealer: 'Bharat Oil Mills',
    city: 'Alwar',
    state: 'Rajasthan',
    qty: 45,
    price: 5250,
    img: 'grain-sieve.jpg',
    verified: false
  },
  {
    id: 7,
    crop: 'Rice',
    variety: 'Ponni boiled',
    dealer: 'Chola Rice Depot',
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    qty: 110,
    price: 2900,
    img: 'rice-grains.jpg',
    verified: true
  },
  {
    id: 8,
    crop: 'Gram (Chana)',
    variety: 'Desi, double cleaned',
    dealer: 'Vidarbha Pulse Traders',
    city: 'Akola',
    state: 'Maharashtra',
    qty: 70,
    price: 5400,
    img: 'wheat-hand.jpg',
    verified: true
  },
  {
    id: 9,
    crop: 'Bajra',
    variety: 'Local hybrid',
    dealer: 'Marwar Grain Co.',
    city: 'Jodhpur',
    state: 'Rajasthan',
    qty: 90,
    price: 2300,
    img: 'grain-sieve.jpg',
    verified: false
  }
];

/* ---------- 4. Money format ---------- */
function rupees(n) {
  return '\u20B9' + Number(n).toLocaleString('en-IN');
}

/* ---------- 5. Marketplace page ---------- */
function initMarket() {
  var grid = document.getElementById('productGrid');
  if (!grid) return;

  var searchInput = document.getElementById('searchInput');
  var cropSelect = document.getElementById('cropSelect');
  var stateSelect = document.getElementById('stateSelect');
  var resetBtn = document.getElementById('resetBtn');
  var resultLine = document.getElementById('resultLine');

  /* Fill the two dropdowns from the data (no repeats) */
  var crops = [];
  var states = [];
  PRODUCTS.forEach(function (p) {
    if (crops.indexOf(p.crop) === -1) crops.push(p.crop);
    if (states.indexOf(p.state) === -1) states.push(p.state);
  });
  crops.sort();
  states.sort();

  crops.forEach(function (c) {
    var o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    cropSelect.appendChild(o);
  });
  states.forEach(function (s) {
    var o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    stateSelect.appendChild(o);
  });

  function render() {
    var q = searchInput.value.trim().toLowerCase();
    var crop = cropSelect.value;
    var state = stateSelect.value;

    var list = PRODUCTS.filter(function (p) {
      var matchQ = !q ||
        p.crop.toLowerCase().indexOf(q) > -1 ||
        p.variety.toLowerCase().indexOf(q) > -1 ||
        p.dealer.toLowerCase().indexOf(q) > -1 ||
        p.city.toLowerCase().indexOf(q) > -1;
      var matchCrop = !crop || p.crop === crop;
      var matchState = !state || p.state === state;
      return matchQ && matchCrop && matchState;
    });

    grid.innerHTML = '';

    if (list.length === 0) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' +
        'No listings match your search. Try clearing the filters.</div>';
    }

    list.forEach(function (p) {
      var card = document.createElement('article');
      card.className = 'card product-card';
      card.innerHTML =
        '<img src="' + p.img + '" alt="' + p.crop + '">' +
        '<div class="card-body">' +
          '<div class="product-top">' +
            '<h3>' + p.crop + '</h3>' +
            (p.verified
              ? '<span class="badge">Verified</span>'
              : '<span class="badge badge-amber">New</span>') +
          '</div>' +
          '<p class="product-meta">' + p.variety + '</p>' +
          '<p class="product-meta">' + p.dealer + '<br>' + p.city + ', ' + p.state + '</p>' +
          '<div class="price-row">' +
            '<div class="price">' + rupees(p.price) + '<small>per quintal</small></div>' +
            '<button class="btn btn-outline btn-small" data-id="' + p.id + '">Contact</button>' +
          '</div>' +
        '</div>';
      grid.appendChild(card);
    });

    if (resultLine) {
      resultLine.textContent = list.length + ' listing' +
        (list.length === 1 ? '' : 's') + ' found';
    }
  }

  searchInput.addEventListener('input', render);
  cropSelect.addEventListener('change', render);
  stateSelect.addEventListener('change', render);
  resetBtn.addEventListener('click', function () {
    searchInput.value = '';
    cropSelect.value = '';
    stateSelect.value = '';
    render();
  });

  /* Open the dealer popup */
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-id]');
    if (!btn) return;
    var id = Number(btn.getAttribute('data-id'));
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (p) openDealerModal(p);
  });

  render();
}

/* ---------- 6. Dealer popup ---------- */
function openDealerModal(p) {
  var modal = document.getElementById('dealerModal');
  if (!modal) return;

  document.getElementById('mCrop').textContent = p.crop + ' (' + p.variety + ')';
  document.getElementById('mDealer').textContent = p.dealer;
  document.getElementById('mPlace').textContent = p.city + ', ' + p.state;
  document.getElementById('mQty').textContent = p.qty + ' quintal available';
  document.getElementById('mPrice').textContent = rupees(p.price) + ' / quintal';
  document.getElementById('mPhone').textContent = '+91 98' +
    String(10000000 + p.id * 111111).slice(0, 8);

  modal.classList.add('open');
}

function initModalClose() {
  var modal = document.getElementById('dealerModal');
  if (!modal) return;

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
      modal.classList.remove('open');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
}

/* ---------- 7. Sell page: save listings in the browser ----------
   localStorage keeps the data on the farmer's own device only.
   For a real site you would send this to a backend.
*/
var STORE_KEY = 'efarmer_listings';

function getListings() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch (err) {
    return [];
  }
}

function saveListings(list) {
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

function initSellForm() {
  var form = document.getElementById('sellForm');
  if (!form) return;

  var alertBox = document.getElementById('sellAlert');
  var listBox = document.getElementById('myListings');
  var countEl = document.getElementById('listingCount');

  function showAlert(msg, type) {
    alertBox.textContent = msg;
    alertBox.className = 'alert show ' + (type === 'error' ? 'alert-error' : 'alert-success');
  }

  function drawListings() {
    var list = getListings();
    listBox.innerHTML = '';

    if (countEl) {
      countEl.textContent = list.length + ' listing' + (list.length === 1 ? '' : 's');
    }

    if (list.length === 0) {
      listBox.innerHTML = '<div class="empty-state">You have not added any crop yet. ' +
        'Fill the form above to create your first listing.</div>';
      return;
    }

    list.forEach(function (item, index) {
      var row = document.createElement('div');
      row.className = 'listing-row';
      row.innerHTML =
        '<div>' +
          '<strong>' + item.crop + ' &middot; ' + item.qty + ' quintal</strong>' +
          '<span>' + item.village + ', ' + item.state + ' &middot; ' +
            rupees(item.price) + ' per quintal</span>' +
        '</div>' +
        '<button class="btn btn-outline btn-small" data-del="' + index + '">Remove</button>';
      listBox.appendChild(row);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var item = {
      crop: document.getElementById('crop').value.trim(),
      qty: document.getElementById('qty').value.trim(),
      price: document.getElementById('price').value.trim(),
      village: document.getElementById('village').value.trim(),
      state: document.getElementById('state').value,
      name: document.getElementById('fname').value.trim(),
      phone: document.getElementById('phone').value.trim()
    };

    if (!item.crop || !item.qty || !item.price || !item.village || !item.state || !item.name || !item.phone) {
      showAlert('Please fill every field before submitting.', 'error');
      return;
    }

    if (item.phone.replace(/\D/g, '').length !== 10) {
      showAlert('Please enter a valid 10 digit mobile number.', 'error');
      return;
    }

    var list = getListings();
    list.unshift(item);
    saveListings(list);
    form.reset();
    drawListings();
    showAlert('Listing added. Dealers near you can now see it in the marketplace.', 'success');
  });

  listBox.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-del]');
    if (!btn) return;
    var index = Number(btn.getAttribute('data-del'));
    var list = getListings();
    list.splice(index, 1);
    saveListings(list);
    drawListings();
    showAlert('Listing removed.', 'success');
  });

  drawListings();
}

/* ---------- 8. Contact page form ---------- */
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var box = document.getElementById('contactAlert');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('cname').value.trim();
    var email = document.getElementById('cemail').value.trim();
    var message = document.getElementById('cmessage').value.trim();

    if (!name || !email || !message) {
      box.textContent = 'Please fill your name, email and message.';
      box.className = 'alert show alert-error';
      return;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      box.textContent = 'That email address does not look right.';
      box.className = 'alert show alert-error';
      return;
    }

    /* No server in this demo, so we open the visitor's mail app */
    var body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
    window.location.href = 'mailto:hello@efarmer.example?subject=' +
      encodeURIComponent('eFarmer enquiry from ' + name) + '&body=' + body;

    box.textContent = 'Thanks ' + name + '! Your mail app should open now. ' +
      'If it does not, write to hello@efarmer.example';
    box.className = 'alert show alert-success';
    form.reset();
  });
}

/* ---------- Start everything ---------- */
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initYear();
  initMarket();
  initModalClose();
  initSellForm();
  initContactForm();
});
