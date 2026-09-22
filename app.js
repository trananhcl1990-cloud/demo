(function() {
// Master data loaded from window.CALOHA_DATA or global scope
const dataSrc = (typeof window !== 'undefined' && window.CALOHA_DATA) 
  ? window.CALOHA_DATA 
  : (typeof require !== 'undefined' ? require('./data.js') : {});

const PRODUCTS_DATA = dataSrc.PRODUCTS_DATA || (typeof window !== 'undefined' ? window.PRODUCTS_DATA : []) || [];
const CATEGORIES_DATA = dataSrc.CATEGORIES_DATA || (typeof window !== 'undefined' ? window.CATEGORIES_DATA : []) || [];
const ARTICLES_DATA = dataSrc.ARTICLES_DATA || (typeof window !== 'undefined' ? window.ARTICLES_DATA : []) || [];
const TESTIMONIALS_DATA = dataSrc.TESTIMONIALS_DATA || (typeof window !== 'undefined' ? window.TESTIMONIALS_DATA : []) || [];

class CalohaApp {
  constructor() {
    // Cart state from localStorage
    this.cart = JSON.parse(localStorage.getItem('caloha_cart') || '[]');

    // Products state with localStorage persistence for CMS editing
    let savedProds = null;
    try {
      const raw = localStorage.getItem('caloha_products');
      if (raw) savedProds = JSON.parse(raw);
    } catch(e) {}

    // Ensure all 62 products from Google Sheets are loaded if localStorage is missing or outdated
    if (!savedProds || !Array.isArray(savedProds) || savedProds.length < PRODUCTS_DATA.length) {
      this.products = PRODUCTS_DATA;
      try {
        localStorage.setItem('caloha_products', JSON.stringify(PRODUCTS_DATA));
      } catch(e) {}
    } else {
      this.products = savedProds;
    }

    this.categories = CATEGORIES_DATA;

    // Articles state with localStorage persistence for CMS editing
    const savedArts = localStorage.getItem('caloha_articles');
    this.articles = savedArts ? JSON.parse(savedArts) : ARTICLES_DATA;

    this.testimonials = TESTIMONIALS_DATA;

    // Orders state with localStorage persistence and fallback demo order
    const savedOrders = localStorage.getItem('caloha_orders');
    if (savedOrders) {
      try { this.orders = JSON.parse(savedOrders); } catch(e) { this.orders = []; }
    } else {
      this.orders = [
        {
          id: 'ORD-829104',
          date: '20/09/2026, 14:35:10',
          name: 'Nguyễn Thanh Tùng',
          phone: '0988 234 567',
          email: 'tung.nguyen@example.com',
          province: 'TP. Hồ Chí Minh',
          district: 'Quận 1',
          ward: 'Phường Bến Nghé',
          address: 'Số 12 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
          shippingMethod: 'Tiêu chuẩn (2-3 ngày)',
          shippingFee: 0,
          payment: 'banking',
          paymentLabel: 'Chuyển khoản VietQR',
          items: [
            {
              id: 1,
              name: 'Tinh Dầu Cam Ngọt (Sweet Orange)',
              volume: '30ml',
              price: 180000,
              quantity: 2,
              image: 'assets/cat_citrus.jpg'
            },
            {
              id: 2,
              name: 'Tinh Dầu Oải Hương (Lavender Pure)',
              volume: '10ml',
              price: 250000,
              quantity: 1,
              image: 'assets/cat_floral.jpg'
            }
          ],
          subtotal: 610000,
          discount: 50000,
          voucherCode: 'CALOHA10',
          total: 560000,
          note: 'Giao trong giờ hành chính, đóng gói hộp quà giúp tôi.',
          status: 'Đang vận chuyển'
        }
      ];
      localStorage.setItem('caloha_orders', JSON.stringify(this.orders));
    }

    this.appliedVoucher = JSON.parse(localStorage.getItem('caloha_voucher') || 'null');
    this.orderNote = localStorage.getItem('caloha_order_note') || '';
    this.selectedShippingMethod = 'standard';
    this.selectedPaymentMethod = 'cod';

    // Inquiries / Consultation leads state with localStorage persistence
    this.inquiries = JSON.parse(localStorage.getItem('caloha_inquiries') || '[]');

    // Settings state with localStorage persistence
    this.settings = JSON.parse(localStorage.getItem('caloha_settings') || JSON.stringify({
      hotline: '0988.234.567',
      email: 'contact@caloha.vn',
      showroomHcm: 'Số 168 Đường Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
      showroomHn: 'Số 88 Phố Huế, Phường Ngô Thì Nhậm, Quận Hai Bà Trưng, TP. Hà Nội',
      freeShipThreshold: 500000,
      bankInfo: 'Vietcombank - STK: 1029384756 - CTK: CONG TY CO PHAN DUOC LIEU CALOHA'
    }));

    // Active CMS tab
    this.activeCmsTab = 'dashboard';

    // Catalog filter state
    this.catalogFilters = {
      category: 'all',
      price: 'all',
      volume: 'all',
      sort: 'featured',
      search: ''
    };

    // Article filter state
    this.activeArticleCategory = 'all';

    // Hero Carousel state
    this.currentHeroSlide = 0;
    this.heroSlidesData = [
      {
        title: 'Tinh Túy Thảo Mộc<br><span>Nuôi Dưỡng Thân, Tâm, Trí</span>',
        desc: 'Khám phá bộ sưu tập hơn 62 dòng tinh dầu thiên nhiên nguyên chất và dầu nền hữu cơ từ CALOHA. Chắt lọc từng giọt dược liệu tinh túy giúp giải tỏa căng thẳng, nâng cao chất lượng giấc ngủ và làm sạch không gian sống.'
      },
      {
        title: 'Hương Cam Chanh Năng Động<br><span>Sảng Khoái & Tươi Mới</span>',
        desc: 'Chiết xuất từ vỏ quả cam ngọt chín mọng, chanh organic và cam bergamot Ý. Giúp thanh lọc không khí, xua tan uể oải và kích thích năng lượng sáng tạo trong công việc.'
      },
      {
        title: 'Hương Hoa & Dược Liệu Trị Liệu<br><span>Vỗ Về Giấc Ngủ Sâu</span>',
        desc: 'Tinh chất hoa Oải hương Provence, Trầm hương quý và Đàn hương nguyên bản. Giúp cân bằng cảm xúc, hạ dịu hệ thần kinh và đưa bạn vào giấc ngủ an lành.'
      }
    ];
    this.heroInterval = null;

    // Lightbox state
    this.lightboxImages = [];
    this.lightboxCurrentIndex = 0;
    this.lightboxCaption = '';

    // Active product modal gallery state
    this.activeModalProduct = null;
    this.activeGalleryIndex = 0;

    this.init();
  }

  init() {
    // Check URL parameters for standalone pages
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('category');
        if (catParam) {
          this.catalogFilters.category = catParam;
        }
        const searchParam = urlParams.get('search');
        if (searchParam) {
          this.catalogFilters.search = searchParam;
        }
        const artCatParam = urlParams.get('articleCat');
        if (artCatParam) {
          this.activeArticleCategory = artCatParam;
        }
      } catch (err) {
        console.warn('Error parsing URL params:', err);
      }
    }

    this.renderCategoryCards();
    this.renderHomeProducts('featured');
    this.renderCatalogProducts();
    this.renderTestimonials();
    this.renderArticles();
    this.setupSearch();
    this.updateCartUI();
    this.setupEvents();
    this.startHeroCarousel();
    this.setupKeyboardShortcuts();
    this.initFloatingWidget();
    this.initCartPage();
    this.initCheckoutPage();
    this.initOrdersPage();
    this.initAdminPage();
    this.initSingleBlogPage();

    // Sync radio buttons if filtered by query param
    if (this.catalogFilters.category !== 'all') {
      const radio = document.querySelector(`input[name="cat-filter"][value="${this.catalogFilters.category}"]`);
      if (radio) radio.checked = true;
    }
    if (this.catalogFilters.search) {
      const searchInput = document.getElementById('header-search-input');
      if (searchInput) searchInput.value = this.catalogFilters.search;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupEvents() {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        document.getElementById('mobile-drawer').style.display = 'block';
      });
    }
    const closeMobileBtn = document.getElementById('close-mobile-menu');
    if (closeMobileBtn) {
      closeMobileBtn.addEventListener('click', () => this.closeMobileMenu());
    }

    // Cart open
    const openCartBtn = document.getElementById('open-cart-btn');
    if (openCartBtn) {
      openCartBtn.addEventListener('click', () => this.openCart());
    }

    // Global Hash listener for navigation (#home, #catalog, #about, #articles, #contact, #admin, #cms)
    if (typeof window !== 'undefined' && window.addEventListener) {
      const handleHash = () => {
        if (typeof location === 'undefined') return;
        const hash = location.hash.replace('#', '').trim();
        if (!hash) return;
        if (hash === 'admin' || hash === 'cms') {
          if (this.isAdminLoggedIn()) this.navigate('cms');
          else this.openAdminLoginModal();
        } else if (['home', 'catalog', 'about', 'articles', 'contact'].includes(hash)) {
          this.navigate(hash);
        }
      };

      window.addEventListener('hashchange', handleHash);
      setTimeout(handleHash, 80);
    }
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeLightbox();
        this.closeProductModal();
        this.closeArticleModal();
        this.closeCart();
        this.closeCheckout();
        this.closeCmsProductModal();
        this.closeCmsArticleModal();
        this.closeAdminLoginModal();
      }
      if (e.key === 'ArrowLeft') {
        const lb = document.getElementById('image-lightbox');
        if (lb && lb.classList.contains('active')) this.navLightbox(-1);
      }
      if (e.key === 'ArrowRight') {
        const lb = document.getElementById('image-lightbox');
        if (lb && lb.classList.contains('active')) this.navLightbox(1);
      }
      // Secret Admin Hotkey: Ctrl+Shift+A or Alt+A
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        this.openAdminLoginModal();
      }
    });
  }

  closeMobileMenu() {
    const el = document.getElementById('mobile-drawer');
    if (el) el.style.display = 'none';
  }

  /* ==================== HERO CAROUSEL ==================== */
  startHeroCarousel() {
    this.stopHeroCarousel();
    this.heroInterval = setInterval(() => {
      this.nextHeroSlide();
    }, 6000);
  }

  stopHeroCarousel() {
    if (this.heroInterval) clearInterval(this.heroInterval);
  }

  setHeroSlide(index) {
    this.currentHeroSlide = index;
    this.updateHeroSlideUI();
    this.startHeroCarousel();
  }

  nextHeroSlide() {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % 3;
    this.updateHeroSlideUI();
  }

  prevHeroSlide() {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + 3) % 3;
    this.updateHeroSlideUI();
  }

  updateHeroSlideUI() {
    const slides = document.querySelectorAll('.hero-slide');
    slides.forEach((slide, idx) => {
      if (idx === this.currentHeroSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    const dots = document.querySelectorAll('.hero-dot');
    dots.forEach((dot, idx) => {
      if (idx === this.currentHeroSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    const titleEl = document.getElementById('hero-text-title');
    const descEl = document.getElementById('hero-text-desc');
    const slideInfo = this.heroSlidesData[this.currentHeroSlide];

    if (titleEl && slideInfo) {
      titleEl.style.opacity = '0';
      setTimeout(() => {
        titleEl.innerHTML = slideInfo.title;
        titleEl.style.opacity = '1';
        titleEl.style.transition = 'all 0.4s ease';
      }, 200);
    }
    if (descEl && slideInfo) {
      descEl.style.opacity = '0';
      setTimeout(() => {
        descEl.innerHTML = slideInfo.desc;
        descEl.style.opacity = '1';
        descEl.style.transition = 'all 0.4s ease';
      }, 200);
    }
  }

  /* ==================== SPA & CROSS-PAGE NAVIGATION ==================== */
  navigate(viewName, e) {
    if (e && e.preventDefault) e.preventDefault();

    const targetEl = document.getElementById(`view-${viewName}`);
    if (!targetEl) {
      if (viewName === 'home') window.location.href = 'index.html';
      else if (viewName === 'catalog') window.location.href = 'catalog.html';
      else if (viewName === 'about') window.location.href = 'about.html';
      else if (viewName === 'articles') window.location.href = 'articles.html';
      else if (viewName === 'contact') window.location.href = 'contact.html';
      else if (viewName === 'cms') window.location.href = 'index.html#admin';
      return;
    }

    const views = ['home', 'catalog', 'about', 'articles', 'contact', 'cms'];

    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        el.style.display = (v === viewName) ? 'block' : 'none';
      }
    });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (viewName === 'cms') {
      if (!this.isAdminLoggedIn()) {
        this.openAdminLoginModal();
        return;
      }
      this.renderCmsDashboard();
    } else {
      if (typeof history !== 'undefined' && history.pushState) {
        history.pushState(null, '', '#' + viewName);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* ==================== HOME CATEGORY CARDS ==================== */
  renderCategoryCards() {
    const container = document.getElementById('home-category-cards');
    if (!container) return;

    container.innerHTML = this.categories.map(cat => {
      const count = this.products.filter(p => p.category === cat.id).length;
      return `
        <div class="cat-card" onclick="app.filterCatalogByCategory('${cat.id}')">
          <img src="${cat.image}" alt="${cat.name}" class="cat-card-img" loading="lazy" onerror="this.src='assets/cat_herbal.jpg'">
          <div class="cat-card-overlay">
            <span class="cat-card-count">${count} Sản Phẩm</span>
            <h3 class="cat-card-name">${cat.name}</h3>
            <p class="cat-card-sub">${cat.tagline}</p>
            <span class="cat-card-btn">Xem danh mục &rarr;</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==================== HOME PRODUCTS ==================== */
  filterHomeProducts(filter, btnElement) {
    if (btnElement) {
      document.querySelectorAll('.product-tabs-bar .tab-btn').forEach(btn => btn.classList.remove('active'));
      btnElement.classList.add('active');
    }
    this.renderHomeProducts(filter);
  }

  renderHomeProducts(filter = 'featured') {
    const container = document.getElementById('home-products-grid');
    if (!container) return;

    let displayList = [];
    if (filter === 'featured') {
      displayList = this.products.filter(p => p.featured || p.isOrganic).slice(0, 12);
    } else if (filter === 'all') {
      displayList = this.products;
    } else {
      displayList = this.products.filter(p => p.category === filter);
    }

    container.innerHTML = displayList.map(prod => this.createProductCardHtml(prod)).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  /* ==================== PRODUCT CARD TEMPLATE ==================== */
  createProductCardHtml(prod) {
    const galleryJson = JSON.stringify(prod.gallery || [prod.image]).replace(/"/g, '&quot;');
    return `
      <div class="product-card" data-id="${prod.id}">
        <div class="product-img-wrap" onclick="app.openProductModal(${prod.id})" style="cursor:pointer;">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" onerror="this.src='assets/cat_herbal.jpg'">
          
          <div class="product-card-badges">
            ${prod.isOrganic ? '<span class="pill-badge pill-organic">Organic</span>' : ''}
            ${prod.featured ? '<span class="pill-badge pill-best">Bán chạy</span>' : ''}
          </div>

          <div class="product-quick-actions" onclick="event.stopPropagation()">
            <button class="quick-action-btn" title="Xem nhanh & Kính lúp" onclick="event.stopPropagation(); app.openProductModal(${prod.id})">
              <i data-lucide="eye"></i>
            </button>
            <button class="quick-action-btn" title="Xem ảnh lớn" onclick="event.stopPropagation(); app.openLightbox('${prod.image}', '${prod.name}', ${galleryJson})">
              <i data-lucide="zoom-in"></i>
            </button>
          </div>
        </div>

        <div class="product-info">
          <div class="product-category">${prod.category} • ${prod.volume}</div>
          <h3 class="product-title" onclick="app.openProductModal(${prod.id})">${prod.name}</h3>
          
          <div class="product-notes-badge">
            <i data-lucide="sparkles" style="width:12px; height:12px; color:var(--herbal-light);"></i>
            <span>${prod.note || 'Tinh khiết'}</span>
          </div>

          <p class="product-aroma">${prod.aroma || prod.uses || ''}</p>

          <div class="product-price-row">
            <div>
              <span class="product-price">${prod.priceFormatted || (prod.price.toLocaleString('vi-VN') + 'đ')}</span>
            </div>
            <button class="btn btn-primary btn-sm btn-icon" onclick="app.addToCart(${prod.id}, '${prod.volume}')" title="Thêm vào giỏ hàng">
              <i data-lucide="shopping-bag" style="width:16px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* ==================== CATALOG VIEW & FILTERS ==================== */
  renderCatalogProducts() {
    const container = document.getElementById('catalog-products-grid');
    if (!container) return;

    let list = [...this.products];

    // Category filter
    if (this.catalogFilters.category !== 'all') {
      list = list.filter(p => p.category === this.catalogFilters.category);
    }

    // Price filter
    if (this.catalogFilters.price === 'under500' || this.catalogFilters.price === 'under-300') {
      list = list.filter(p => p.price < 500000);
    } else if (this.catalogFilters.price === '500to1000' || this.catalogFilters.price === '300-500') {
      list = list.filter(p => p.price >= 500000 && p.price <= 1000000);
    } else if (this.catalogFilters.price === 'above1000' || this.catalogFilters.price === 'over-500') {
      list = list.filter(p => p.price > 1000000);
    }

    // Volume filter
    if (this.catalogFilters.volume !== 'all') {
      list = list.filter(p => p.volume === this.catalogFilters.volume);
    }

    // Search query
    if (this.catalogFilters.search) {
      const q = this.catalogFilters.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.aroma && p.aroma.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (this.catalogFilters.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.catalogFilters.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.catalogFilters.sort === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update count display
    const countEl = document.getElementById('catalog-count-display') || document.getElementById('catalog-count');
    if (countEl) countEl.textContent = list.length;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <i data-lucide="frown" style="width:48px; height:48px; color:var(--text-muted); margin-bottom:12px;"></i>
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p style="color:var(--text-muted); margin-bottom:20px;">Vui lòng thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
          <button class="btn btn-outline btn-sm" onclick="app.resetCatalogFilters()">Xóa Bộ Lọc</button>
        </div>
      `;
    } else {
      container.innerHTML = list.map(prod => this.createProductCardHtml(prod)).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  setVolFilter(vol, btn) {
    this.catalogFilters.volume = vol;
    document.querySelectorAll('[data-vol]').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderCatalogProducts();
  }

  filterCatalog() {
    const catChecked = document.querySelector('input[name="cat-filter"]:checked');
    if (catChecked) this.catalogFilters.category = catChecked.value;

    const priceChecked = document.querySelector('input[name="price-filter"]:checked');
    if (priceChecked) this.catalogFilters.price = priceChecked.value;

    const volChecked = document.querySelector('input[name="vol-filter"]:checked');
    if (volChecked) this.catalogFilters.volume = volChecked.value;

    const sortEl = document.getElementById('catalog-sort');
    if (sortEl) this.catalogFilters.sort = sortEl.value;

    this.renderCatalogProducts();
  }

  filterCatalogByCategory(catId) {
    if (document.getElementById('catalog-products-grid')) {
      if (document.getElementById('view-catalog')) {
        this.navigate('catalog');
      }
      this.catalogFilters.category = catId;
      
      const radio = document.querySelector(`input[name="cat-filter"][value="${catId}"]`);
      if (radio) radio.checked = true;

      this.renderCatalogProducts();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } else {
      window.location.href = 'catalog.html?category=' + encodeURIComponent(catId);
    }
  }

  resetCatalogFilters() {
    this.catalogFilters = {
      category: 'all',
      price: 'all',
      volume: 'all',
      sort: 'featured',
      search: ''
    };

    const firstCat = document.querySelector('input[name="cat-filter"][value="all"]');
    if (firstCat) firstCat.checked = true;
    const firstPrice = document.querySelector('input[name="price-filter"][value="all"]');
    if (firstPrice) firstPrice.checked = true;
    const firstVol = document.querySelector('input[name="vol-filter"][value="all"]');
    if (firstVol) firstVol.checked = true;

    const sortEl = document.getElementById('catalog-sort');
    if (sortEl) sortEl.value = 'featured';

    this.renderCatalogProducts();
  }

  /* ==================== PRODUCT QUICK VIEW MODAL & ZOOM ==================== */
  openProductModal(id) {
    const prod = this.products.find(p => p.id === id);
    if (!prod) return;

    this.activeModalProduct = prod;
    this.activeGalleryIndex = 0;

    const gallery = prod.gallery || [prod.image, "assets/story_distillation.jpg"];
    const modal = document.getElementById('product-detail-modal');
    const body = document.getElementById('product-modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div class="product-modal-grid">
        <!-- Image & Gallery Section -->
        <div class="product-gallery-section">
          <div class="product-main-view" id="modal-zoom-container">
            <img id="modal-main-image" src="${gallery[0]}" alt="${prod.name}" class="product-main-img" onerror="this.src='assets/cat_herbal.jpg'">
            <div id="modal-zoom-lens" class="zoom-lens"></div>
            <div id="modal-zoom-result" class="zoom-result-window"></div>
            <button class="expand-btn-floating" onclick="app.openLightbox('${gallery[0]}', '${prod.name}')" title="Xem toàn màn hình">
              <i data-lucide="maximize-2" style="width:16px;"></i>
            </button>
          </div>

          <div class="product-thumbs-row">
            ${gallery.map((img, idx) => `
              <div class="product-thumb-item ${idx === 0 ? 'active' : ''}" onclick="app.switchModalImage(${idx})">
                <img src="${img}" alt="Thumbnail ${idx+1}" onerror="this.src='assets/cat_herbal.jpg'">
              </div>
            `).join('')}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted); text-align:center; margin-top:8px;">
            💡 Rê chuột vào ảnh để phóng to kính lúp 2x • Nhấp để xem toàn màn hình
          </div>
        </div>

        <!-- Info Section -->
        <div class="product-modal-info">
          <span class="pill-badge pill-organic" style="margin-bottom:8px;">${prod.category}</span>
          <h2 style="font-family:var(--font-heading); font-size:1.8rem; color:var(--primary); margin:0 0 4px 0;">${prod.name}</h2>
          <div style="color:var(--text-muted); font-size:0.9rem; font-style:italic; margin-bottom:14px;">${prod.subtitle || ''}</div>
          
          <div class="product-price-row" style="margin-bottom:16px; border-bottom:1px solid var(--border-light); padding-bottom:12px;">
            <span class="product-price" style="font-size:1.7rem;">${prod.priceFormatted || (prod.price.toLocaleString('vi-VN') + 'đ')}</span>
            <span style="color:var(--accent); font-size:0.85rem; font-weight:600;"><i data-lucide="check-circle" style="width:14px;"></i> Còn hàng (${prod.stock || 10} lọ)</span>
          </div>

          <div style="margin-bottom:16px;">
            <strong style="font-size:0.85rem; color:var(--text-dark);">Dung tích lựa chọn:</strong>
            <div class="volume-options-row" style="margin-top:6px;">
              <button class="volume-btn active">${prod.volume || '10ml'}</button>
            </div>
          </div>

          <div style="background:var(--mint-bg); padding:14px; border-radius:var(--radius-sm); margin-bottom:18px; font-size:0.88rem; line-height:1.6;">
            <strong>Hương thơm:</strong> ${prod.aroma || prod.note || 'Thanh khiết tự nhiên'}<br>
            <strong>Phương pháp:</strong> ${prod.method || 'Chưng cất hơi nước thủ công'}<br>
            <strong>Xuất xứ:</strong> ${prod.origin || 'CALOHA Farm (Việt Nam / Nhập khẩu)'}
          </div>

          <div style="margin-bottom:20px;">
            <strong style="font-size:0.88rem;">Công dụng trị liệu nổi bật:</strong>
            <ul style="margin:8px 0 0 18px; font-size:0.85rem; color:var(--text-dark); line-height:1.6;">
              ${Array.isArray(prod.benefits) ? prod.benefits.map(b => `<li>${b}</li>`).join('') : `<li>${prod.benefits || 'Thư giãn, kháng khuẩn và thanh lọc không khí'}</li>`}
            </ul>
          </div>

          <div class="modal-actions-row">
            <button class="btn btn-primary" onclick="app.addToCart(${prod.id}, '${prod.volume}'); app.closeProductModal();">
              <i data-lucide="shopping-bag" style="width:18px;"></i> Thêm Vào Giỏ Hàng
            </button>
            <button class="btn btn-outline" onclick="app.addToCart(${prod.id}, '${prod.volume}'); app.closeProductModal(); app.openCheckout();">
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    this.setupZoomMagnifier();
    if (window.lucide) window.lucide.createIcons();
  }

  closeProductModal() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  switchModalImage(index) {
    if (!this.activeModalProduct) return;
    const gallery = this.activeModalProduct.gallery || [this.activeModalProduct.image];
    if (!gallery[index]) return;

    this.activeGalleryIndex = index;
    const mainImg = document.getElementById('modal-main-image');
    if (mainImg) mainImg.src = gallery[index];

    document.querySelectorAll('.product-thumb-item').forEach((thumb, idx) => {
      if (idx === index) thumb.classList.add('active');
      else thumb.classList.remove('active');
    });

    this.setupZoomMagnifier();
  }

  setupZoomMagnifier() {
    const container = document.getElementById('modal-zoom-container');
    const img = document.getElementById('modal-main-image');
    const lens = document.getElementById('modal-zoom-lens');
    const result = document.getElementById('modal-zoom-result');

    if (!container || !img || !lens || !result) return;

    result.style.backgroundImage = `url("${img.src}")`;

    const moveLens = (e) => {
      e.preventDefault();
      const rect = img.getBoundingClientRect();
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;

      let x = e.clientX - rect.left - (lensWidth / 2);
      let y = e.clientY - rect.top - (lensHeight / 2);

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > rect.width - lensWidth) x = rect.width - lensWidth;
      if (y > rect.height - lensHeight) y = rect.height - lensHeight;

      lens.style.left = x + 'px';
      lens.style.top = y + 'px';

      const cx = 2.2;
      const cy = 2.2;

      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
      result.style.backgroundSize = `${rect.width * cx}px ${rect.height * cy}px`;
    };

    container.onmouseenter = () => {
      lens.style.display = 'block';
      result.style.display = 'block';
      result.style.backgroundImage = `url("${img.src}")`;
    };

    container.onmouseleave = () => {
      lens.style.display = 'none';
      result.style.display = 'none';
    };

    container.onmousemove = moveLens;
  }

  /* ==================== FULLSCREEN LIGHTBOX ==================== */
  openLightbox(mainImgSrc, caption = '', galleryList = null) {
    const lightbox = document.getElementById('image-lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');

    if (!lightbox || !img) return;

    if (galleryList && galleryList.length > 0) {
      this.lightboxImages = galleryList;
      this.lightboxCurrentIndex = galleryList.indexOf(mainImgSrc);
      if (this.lightboxCurrentIndex === -1) this.lightboxCurrentIndex = 0;
    } else {
      this.lightboxImages = [mainImgSrc];
      this.lightboxCurrentIndex = 0;
    }

    this.lightboxCaption = caption;
    img.src = this.lightboxImages[this.lightboxCurrentIndex];
    if (cap) cap.innerHTML = `<strong>${caption}</strong> (${this.lightboxCurrentIndex + 1}/${this.lightboxImages.length})`;

    lightbox.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) lightbox.classList.remove('active');
  }

  navLightbox(direction) {
    if (this.lightboxImages.length <= 1) return;

    this.lightboxCurrentIndex = (this.lightboxCurrentIndex + direction + this.lightboxImages.length) % this.lightboxImages.length;
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');

    if (img) img.src = this.lightboxImages[this.lightboxCurrentIndex];
    if (cap) cap.innerHTML = `<strong>${this.lightboxCaption}</strong> (${this.lightboxCurrentIndex + 1}/${this.lightboxImages.length})`;
  }

  /* ==================== TESTIMONIALS ==================== */
  renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    container.innerHTML = this.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">
          ${'★'.repeat(t.rating)}
        </div>
        <p class="testimonial-text">"${t.content}"</p>
        <div class="testimonial-author">
          <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" loading="lazy">
          <div>
            <h4 class="testimonial-name">${t.name}</h4>
            <div class="testimonial-role">${t.title}</div>
            <div style="font-size:0.75rem; color:var(--herbal-light); margin-top:2px;">Sản phẩm: ${t.product}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ==================== ARTICLES VIEW ==================== */
  renderArticles() {
    const fullGrid = document.getElementById('full-articles-grid');
    if (fullGrid) {
      let list = [...this.articles];
      if (this.activeArticleCategory !== 'all') {
        list = list.filter(a => a.category === this.activeArticleCategory);
      }

      fullGrid.innerHTML = list.map(art => `
        <div class="article-card" onclick="window.location.href='single-blog.html?id=${art.id}'">
          <div class="article-img-wrap">
            <img src="${art.image}" alt="${art.title}" class="article-img" loading="lazy" onerror="this.src='assets/story_distillation.jpg'">
            <span class="article-badge" style="position:absolute; top:12px; left:12px; background:var(--primary); color:#fff; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">${art.category}</span>
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span><i data-lucide="calendar" style="width:13px;"></i> ${art.date}</span>
              <span><i data-lucide="clock" style="width:13px;"></i> ${art.readTime}</span>
            </div>
            <h3 class="article-title">${art.title}</h3>
            <p class="article-desc">${art.excerpt || art.summary}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:12px;">
              <a href="single-blog.html?id=${art.id}" class="article-more" onclick="event.stopPropagation()">Đọc bài viết chi tiết &rarr;</a>
              <button class="btn btn-outline btn-sm" style="padding:4px 8px; font-size:0.75rem;" onclick="event.stopPropagation(); app.openArticleModal('${art.id}')" title="Xem nhanh tóm tắt">Xem nhanh</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Also populate home page articles grid if present
    const homeGrid = document.getElementById('home-articles-grid');
    if (homeGrid) {
      homeGrid.innerHTML = this.articles.slice(0, 4).map(art => `
        <div class="article-card" onclick="window.location.href='single-blog.html?id=${art.id}'">
          <div class="article-img-wrap">
            <img src="${art.image}" alt="${art.title}" class="article-img" loading="lazy" onerror="this.src='assets/story_distillation.jpg'">
            <span class="article-badge" style="position:absolute; top:12px; left:12px; background:var(--primary); color:#fff; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">${art.category}</span>
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span><i data-lucide="calendar" style="width:13px;"></i> ${art.date}</span>
              <span><i data-lucide="clock" style="width:13px;"></i> ${art.readTime}</span>
            </div>
            <h3 class="article-title">${art.title}</h3>
            <p class="article-desc">${art.excerpt || art.summary}</p>
            <div style="margin-top:auto; padding-top:10px;">
              <a href="single-blog.html?id=${art.id}" class="article-more" onclick="event.stopPropagation()">Đọc bài viết chi tiết &rarr;</a>
            </div>
          </div>
        </div>
      `).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  filterArticlesByCategory(catName, btnElement) {
    if (document.getElementById('full-articles-grid')) {
      if (document.getElementById('view-articles')) {
        this.navigate('articles');
      }
      this.activeArticleCategory = catName;

      document.querySelectorAll('[data-art-cat]').forEach(btn => {
        if (btn.getAttribute('data-art-cat') === catName) btn.classList.add('active');
        else btn.classList.remove('active');
      });

      this.renderArticles();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } else {
      window.location.href = 'articles.html?articleCat=' + encodeURIComponent(catName);
    }
  }

  openArticleModal(id) {
    const art = this.articles.find(a => a.id === id);
    if (!art) return;

    const modal = document.getElementById('article-reader-modal');
    const body = document.getElementById('article-modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="margin-bottom:16px;">
        <span class="pill-badge pill-organic">${art.category}</span>
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; color:var(--primary); margin:10px 0 8px 0;">${art.title}</h2>
        <div style="font-size:0.85rem; color:var(--text-muted); display:flex; gap:16px;">
          <span>Ngày đăng: ${art.date}</span>
          <span>Thời gian đọc: ${art.readTime}</span>
        </div>
      </div>
      <img src="${art.image}" alt="${art.title}" style="width:100%; max-height:300px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:20px;" onerror="this.src='assets/story_distillation.jpg'">
      <div style="font-size:0.95rem; line-height:1.8; color:var(--text-dark);">
        ${art.content}
      </div>
      <div style="margin-top:30px; padding-top:20px; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <a href="single-blog.html?id=${art.id}" class="btn btn-primary btn-sm">Mở Trang Bài Viết Đầy Đủ &rarr;</a>
        <button class="btn btn-outline btn-sm" onclick="app.closeArticleModal();">Đóng</button>
      </div>
    `;

    modal.classList.add('active');
  }

  closeArticleModal() {
    const modal = document.getElementById('article-reader-modal');
    if (modal) modal.classList.remove('active');
  }

  /* ==================== SINGLE BLOG PAGE CONTROLLER ==================== */
  initSingleBlogPage() {
    const mainEl = document.getElementById('single-blog-article');
    if (!mainEl) return;

    // Get article ID from URL query param ?id=...
    let artId = null;
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      artId = params.get('id') || params.get('article') || params.get('post');
    }

    let article = this.articles.find(a => a.id === artId);
    if (!article) {
      article = this.articles[0]; // default to first article
    }
    if (!article) return;

    this.currentArticleId = article.id;

    // 1. Breadcrumbs
    const breadcrumbCat = document.getElementById('blog-breadcrumb-cat');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = article.category;
      breadcrumbCat.href = 'articles.html?articleCat=' + encodeURIComponent(article.category);
    }
    const breadcrumbTitle = document.getElementById('blog-breadcrumb-title');
    if (breadcrumbTitle) {
      breadcrumbTitle.textContent = article.title;
    }

    // 2. Category badge & Title
    const catBadge = document.getElementById('blog-cat-badge');
    if (catBadge) {
      catBadge.textContent = '🌿 ' + article.category;
      catBadge.href = 'articles.html?articleCat=' + encodeURIComponent(article.category);
    }
    const titleEl = document.getElementById('blog-post-title');
    if (titleEl) {
      titleEl.textContent = article.title;
      document.title = `${article.title} | CALOHA Natural Health`;
    }

    // 3. Meta information
    const authorAvatar = document.getElementById('blog-author-avatar');
    if (authorAvatar) authorAvatar.src = article.authorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80';
    const authorName = document.getElementById('blog-author-name');
    if (authorName) authorName.textContent = article.author || 'ThS. DS. Đặng Thu Hà';
    const authorRole = document.getElementById('blog-author-role');
    if (authorRole) authorRole.textContent = article.authorRole || 'Chuyên gia Trị liệu Mùi hương CALOHA';

    const dateEl = document.getElementById('blog-date');
    if (dateEl) dateEl.textContent = article.date;
    const readTimeEl = document.getElementById('blog-read-time');
    if (readTimeEl) readTimeEl.textContent = article.readTime;
    const viewsEl = document.getElementById('blog-views');
    if (viewsEl) viewsEl.textContent = (article.views || 1840).toLocaleString('vi-VN') + ' lượt xem';

    // 4. Hero image
    const heroImg = document.getElementById('blog-hero-img');
    if (heroImg) {
      heroImg.src = article.image;
      heroImg.alt = article.title;
      heroImg.onerror = () => { heroImg.src = 'assets/story_distillation.jpg'; };
    }
    const heroCaption = document.getElementById('blog-hero-caption');
    if (heroCaption) {
      heroCaption.innerHTML = `<i data-lucide="camera" style="width:14px; margin-right:4px;"></i> Hình ảnh: Tinh dầu thiên nhiên nguyên chất CALOHA - Chứng nhận hữu cơ quốc tế.`;
    }

    // 5. Table of Contents
    const tocContainer = document.getElementById('blog-toc-list');
    if (tocContainer) {
      if (article.toc && article.toc.length) {
        tocContainer.innerHTML = article.toc.map(item => `
          <li><a href="#${item.id}">${item.title}</a></li>
        `).join('');
      } else {
        tocContainer.innerHTML = `
          <li><a href="#xuat-xu">1. Nguồn gốc và đặc tính nguyên liệu</a></li>
          <li><a href="#tri-lieu">2. Tác dụng trị liệu tinh thần (Aromatherapy)</a></li>
          <li><a href="#ung-dung">3. Hướng dẫn ứng dụng thực tế & Lưu ý an toàn</a></li>
        `;
      }
    }

    // 6. Content Body
    const bodyEl = document.getElementById('blog-post-content');
    if (bodyEl) {
      bodyEl.innerHTML = article.content;
    }

    // 7. Tags
    const tagsWrap = document.getElementById('blog-tags-list');
    if (tagsWrap) {
      const tags = article.tags || ['TinhDau', 'Aromatherapy', 'Organic', 'Caloha'];
      tagsWrap.innerHTML = tags.map(t => `<a href="articles.html?search=${encodeURIComponent(t)}" class="blog-tag-pill">#${t}</a>`).join('');
    }

    // 8. Like Button & Rating
    const likeBtn = document.getElementById('blog-like-btn');
    const likeCountEl = document.getElementById('blog-like-count');
    const isLiked = localStorage.getItem('caloha_liked_' + article.id) === 'true';
    let currentLikes = article.likes || 156;
    if (isLiked) currentLikes += 1;
    if (likeCountEl) likeCountEl.textContent = currentLikes;
    if (likeBtn) {
      if (isLiked) likeBtn.classList.add('liked');
      else likeBtn.classList.remove('liked');
    }

    // Setup Rating
    const savedRating = localStorage.getItem('caloha_rated_' + article.id) || '5';
    this.highlightStars(parseInt(savedRating, 10));

    // 9. Author Bio Card
    const authorBioImg = document.getElementById('blog-bio-avatar');
    if (authorBioImg) authorBioImg.src = article.authorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80';
    const authorBioName = document.getElementById('blog-bio-name');
    if (authorBioName) authorBioName.textContent = article.author || 'ThS. DS. Đặng Thu Hà';
    const authorBioRole = document.getElementById('blog-bio-role');
    if (authorBioRole) authorBioRole.textContent = article.authorRole || 'Ban Cố Vấn Dược Liệu CALOHA';

    // 10. Prev / Next Article Navigation
    const currentIndex = this.articles.findIndex(a => a.id === article.id);
    const prevIndex = (currentIndex - 1 + this.articles.length) % this.articles.length;
    const nextIndex = (currentIndex + 1) % this.articles.length;
    const prevArt = this.articles[prevIndex];
    const nextArt = this.articles[nextIndex];

    const prevCard = document.getElementById('blog-nav-prev');
    if (prevCard && prevArt) {
      prevCard.href = `single-blog.html?id=${prevArt.id}`;
      prevCard.innerHTML = `
        <img src="${prevArt.image}" alt="${prevArt.title}" onerror="this.src='assets/story_distillation.jpg'">
        <div class="blog-nav-card-info">
          <span>&larr; Bài Trước</span>
          <h5>${prevArt.title}</h5>
        </div>
      `;
    }

    const nextCard = document.getElementById('blog-nav-next');
    if (nextCard && nextArt) {
      nextCard.href = `single-blog.html?id=${nextArt.id}`;
      nextCard.innerHTML = `
        <div class="blog-nav-card-info" style="text-align:right;">
          <span>Bài Tiếp Theo &rarr;</span>
          <h5>${nextArt.title}</h5>
        </div>
        <img src="${nextArt.image}" alt="${nextArt.title}" onerror="this.src='assets/story_distillation.jpg'">
      `;
    }

    // 11. Comments Rendering
    this.renderArticleComments(article.id);

    // 12. Related Articles Grid (3 cards)
    const relatedGrid = document.getElementById('blog-related-grid');
    if (relatedGrid) {
      const otherArticles = this.articles.filter(a => a.id !== article.id).slice(0, 3);
      relatedGrid.innerHTML = otherArticles.map(a => `
        <div class="article-card" onclick="window.location.href='single-blog.html?id=${a.id}'">
          <div class="article-img-wrap">
            <img src="${a.image}" alt="${a.title}" class="article-img" loading="lazy" onerror="this.src='assets/story_distillation.jpg'">
            <span class="article-badge" style="position:absolute; top:12px; left:12px; background:var(--primary); color:#fff; padding:4px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">${a.category}</span>
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span><i data-lucide="calendar" style="width:13px;"></i> ${a.date}</span>
              <span><i data-lucide="clock" style="width:13px;"></i> ${a.readTime}</span>
            </div>
            <h3 class="article-title">${a.title}</h3>
            <p class="article-desc">${a.excerpt || a.summary}</p>
            <a href="single-blog.html?id=${a.id}" class="article-more" onclick="event.stopPropagation()">Đọc bài viết chi tiết &rarr;</a>
          </div>
        </div>
      `).join('');
    }

    // 13. Sidebar Widgets
    this.renderBlogSidebar(article);

    if (window.lucide) window.lucide.createIcons();
  }

  renderArticleComments(articleId) {
    const listEl = document.getElementById('blog-comments-list');
    const countEl = document.getElementById('blog-comments-count');
    if (!listEl) return;

    let comments = JSON.parse(localStorage.getItem('caloha_comments_' + articleId) || 'null');
    if (!comments) {
      comments = [
        {
          name: 'Nguyễn Thị Bích Ngọc',
          date: '14/09/2026 15:20',
          rating: 5,
          text: 'Bài viết phân tích rất kỹ và khoa học! Trước đây mình cứ nghĩ Cam Ngọt và Bergamot giống nhau, giờ mới biết Bergamot có thêm Linalyl Acetate giúp giảm stress và chống trầm cảm tốt hơn nhiều. Đã đặt mua 1 chai Bergamot của CALOHA xông phòng ngủ cực kỳ thư thái.',
          reply: 'Dược sĩ CALOHA mến chào chị Ngọc! Rất vui vì bài viết hữu ích cho chị. Tinh dầu Bergamot vùng Calabria của CALOHA đạt chuẩn kiểm nghiệm hữu cơ châu Âu nên nốt hương vô cùng thanh sạch, chúc chị luôn có những giấc ngủ an lành ạ!'
        },
        {
          name: 'Hoàng Minh Tuấn',
          date: '14/09/2026 18:45',
          rating: 5,
          text: 'Phần lưu ý về quang độc tính (Phototoxicity) rất quan trọng mà nhiều bên bán hàng không hề tư vấn cho khách. Rất đánh giá cao sự chỉn chu và đạo đức y dược của CALOHA!',
          reply: 'CALOHA chân thành cảm ơn anh Tuấn! An toàn trị liệu luôn là tôn chỉ số 1 của CALOHA trong từng giọt thảo mộc gửi đến khách hàng.'
        }
      ];
      localStorage.setItem('caloha_comments_' + articleId, JSON.stringify(comments));
    }

    if (countEl) countEl.textContent = `(${comments.length})`;

    listEl.innerHTML = comments.map(c => `
      <div class="comment-item">
        <div class="comment-item-top">
          <div class="comment-author-info">
            <div class="comment-avatar">${c.name.charAt(0).toUpperCase()}</div>
            <div>
              <div class="comment-author-name">
                ${c.name}
                <span class="comment-verified-badge"><i data-lucide="shield-check" style="width:11px; vertical-align:middle;"></i> Độc giả kiểm chứng</span>
              </div>
              <div class="comment-date">${c.date} • Đánh giá: ${'★'.repeat(c.rating || 5)}${'☆'.repeat(5 - (c.rating || 5))}</div>
            </div>
          </div>
        </div>
        <div class="comment-body">${c.text}</div>
        ${c.reply ? `
          <div class="comment-official-reply">
            <h6><i data-lucide="check-circle" style="width:14px; color:var(--accent);"></i> Phản hồi từ Dược Sĩ Chuyên Môn CALOHA:</h6>
            <p style="margin:0; color:var(--text-dark);">${c.reply}</p>
          </div>
        ` : ''}
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    if (!this.currentArticleId) return;

    const nameInput = document.getElementById('comment-author-input');
    const phoneInput = document.getElementById('comment-phone-input');
    const textInput = document.getElementById('comment-text-input');
    const ratingInput = document.querySelector('input[name="comment-star-rating"]:checked');

    if (!nameInput || !textInput) return;

    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    const rating = ratingInput ? parseInt(ratingInput.value, 10) : 5;

    if (!name || !text) {
      this.showToast('Vui lòng điền đầy đủ họ tên và nội dung bình luận.');
      return;
    }

    const comments = JSON.parse(localStorage.getItem('caloha_comments_' + this.currentArticleId) || '[]');
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    comments.unshift({
      name: name,
      date: dateStr,
      rating: rating,
      text: text,
      reply: null
    });

    localStorage.setItem('caloha_comments_' + this.currentArticleId, JSON.stringify(comments));
    this.renderArticleComments(this.currentArticleId);
    this.showToast('✨ Cảm ơn bạn! Bình luận đã được đăng thành công.');

    textInput.value = '';
    nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
  }

  toggleArticleLike() {
    if (!this.currentArticleId) return;
    const key = 'caloha_liked_' + this.currentArticleId;
    const isLiked = localStorage.getItem(key) === 'true';
    const likeBtn = document.getElementById('blog-like-btn');
    const likeCountEl = document.getElementById('blog-like-count');

    let count = parseInt(likeCountEl ? likeCountEl.textContent : '0', 10);

    if (isLiked) {
      localStorage.setItem(key, 'false');
      count = Math.max(0, count - 1);
      if (likeBtn) likeBtn.classList.remove('liked');
      this.showToast('Đã bỏ yêu thích bài viết.');
    } else {
      localStorage.setItem(key, 'true');
      count += 1;
      if (likeBtn) likeBtn.classList.add('liked');
      this.showToast('❤️ Cảm ơn bạn đã yêu thích bài viết!');
    }

    if (likeCountEl) likeCountEl.textContent = count;
  }

  rateArticle(stars) {
    if (!this.currentArticleId) return;
    localStorage.setItem('caloha_rated_' + this.currentArticleId, stars.toString());
    this.highlightStars(stars);
    this.showToast(`⭐ Cảm ơn bạn đã đánh giá bài viết ${stars} sao!`);
  }

  highlightStars(stars) {
    const starBtns = document.querySelectorAll('.blog-star-btn');
    starBtns.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-val') || '0', 10);
      if (val <= stars) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  copyArticleLink() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.showToast('📋 Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
    } else {
      this.showToast('📋 Đã sao chép liên kết bài viết!');
    }
  }

  renderBlogSidebar(article) {
    // 1. Featured Products
    const prodListEl = document.getElementById('sidebar-featured-products');
    if (prodListEl) {
      const relIds = article.relatedProductIds || [1, 2, 3];
      const relProds = this.products.filter(p => relIds.includes(p.id)).slice(0, 3);
      if (relProds.length) {
        prodListEl.innerHTML = relProds.map(p => `
          <div class="sidebar-prod-item">
            <img src="${p.image}" alt="${p.name}" class="sidebar-prod-img" onerror="this.src='assets/prod_orange.jpg'">
            <div class="sidebar-prod-info">
              <div class="sidebar-prod-name">${p.name}</div>
              <div class="sidebar-prod-price">${p.priceFormatted || (p.price.toLocaleString('vi-VN') + 'đ')}</div>
              <div style="display:flex; gap:8px; margin-top:4px;">
                <button class="btn btn-primary btn-sm" style="padding:4px 10px; font-size:0.75rem;" onclick="app.addToCart(${p.id})">
                  <i data-lucide="shopping-bag" style="width:12px;"></i> Thêm giỏ
                </button>
                <button class="btn btn-outline btn-sm" style="padding:4px 10px; font-size:0.75rem;" onclick="app.openProductModal(${p.id})">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // 2. Trending Posts
    const trendListEl = document.getElementById('sidebar-trending-posts');
    if (trendListEl) {
      const trending = [...this.articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
      trendListEl.innerHTML = trending.map((art, idx) => `
        <a href="single-blog.html?id=${art.id}" class="sidebar-trend-item">
          <span class="trend-number">0${idx + 1}</span>
          <div>
            <div class="sidebar-trend-title">${art.title}</div>
            <span style="font-size:0.75rem; color:var(--text-muted);"><i data-lucide="eye" style="width:11px; vertical-align:middle;"></i> ${(art.views || 1500).toLocaleString('vi-VN')} lượt xem</span>
          </div>
        </a>
      `).join('');
    }

    // 3. Category Counts
    const catListEl = document.getElementById('sidebar-categories-list');
    if (catListEl) {
      const catCounts = {};
      this.articles.forEach(a => {
        catCounts[a.category] = (catCounts[a.category] || 0) + 1;
      });
      catListEl.innerHTML = Object.keys(catCounts).map(cat => `
        <li style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border-light);">
          <a href="articles.html?articleCat=${encodeURIComponent(cat)}" style="color:var(--text-dark); text-decoration:none; font-size:0.88rem; font-weight:500;">🌿 ${cat}</a>
          <span style="background:var(--mint-bg); color:var(--primary); font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:12px;">${catCounts[cat]}</span>
        </li>
      `).join('');
    }
  }

  /* ==================== LIVE SEARCH ==================== */
  setupSearch() {
    const input = document.getElementById('header-search-input');
    const dropdown = document.getElementById('search-dropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        dropdown.style.display = 'none';
        return;
      }

      const results = this.products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      ).slice(0, 5);

      if (results.length === 0) {
        dropdown.innerHTML = `<div class="search-drop-item" style="color:var(--text-muted);">Không tìm thấy sản phẩm cho "${q}"</div>`;
      } else {
        dropdown.innerHTML = results.map(p => `
          <div class="search-drop-item" onclick="app.openProductModal(${p.id}); document.getElementById('search-dropdown').style.display='none';">
            <img src="${p.image}" alt="${p.name}" class="search-drop-img" onerror="this.src='assets/cat_herbal.jpg'">
            <div>
              <div class="search-drop-title">${p.name}</div>
              <div class="search-drop-price">${p.priceFormatted || (p.price.toLocaleString('vi-VN') + 'đ')} • ${p.category}</div>
            </div>
          </div>
        `).join('') + `
          <div style="padding:10px 16px; background:var(--mint-bg); text-align:center; font-size:0.82rem; font-weight:600; cursor:pointer;" onclick="app.catalogFilters.search='${q}'; app.navigate('catalog'); document.getElementById('search-dropdown').style.display='none';">
            Xem tất cả kết quả &rarr;
          </div>
        `;
      }
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  /* ==================== CART MANAGEMENT ==================== */
  addToCart(productId, volume = '10ml') {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    const existing = this.cart.find(it => it.id === productId && it.volume === volume);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        volume: volume,
        quantity: 1
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showToast(`✨ Đã thêm "${prod.name}" vào giỏ hàng!`);
  }

  updateQuantity(index, delta) {
    if (!this.cart[index]) return;
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }
    this.saveCart();
    this.updateCartUI();
  }

  removeFromCart(index) {
    if (!this.cart[index]) return;
    const removed = this.cart.splice(index, 1);
    this.saveCart();
    this.updateCartUI();
    if (removed[0]) this.showToast(`Đã xóa "${removed[0].name}" khỏi giỏ hàng.`);
  }

  saveCart() {
    localStorage.setItem('caloha_cart', JSON.stringify(this.cart));
  }

  openCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
    }
  }

  closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
    }
  }

  updateCartUI() {
    const count = this.cart.reduce((sum, it) => sum + it.quantity, 0);
    const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const freeShipLimit = this.settings.freeShipThreshold || 500000;
    const shippingFee = (subtotal >= freeShipLimit || subtotal === 0) ? 0 : 30000;
    const total = subtotal + shippingFee;

    // Badges
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
    const drawerBadge = document.getElementById('drawer-item-count');
    if (drawerBadge) drawerBadge.textContent = count;

    // Items container
    const container = document.getElementById('cart-items-container');
    if (container) {
      if (this.cart.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:50px 20px; color:var(--text-muted);">
            <i data-lucide="shopping-bag" style="width:48px; height:48px; margin-bottom:12px; color:var(--text-muted); stroke-width:1.5;"></i>
            <h4>Giỏ hàng của bạn đang trống</h4>
            <p style="font-size:0.85rem; margin-top:6px;">Hãy lựa chọn tinh dầu yêu thích để tận hưởng ưu đãi miễn phí vận chuyển từ 500.000đ.</p>
            <button class="btn btn-primary btn-sm" style="margin-top:16px;" onclick="app.closeCart(); app.navigate('catalog');">Khám Phá Ngay</button>
          </div>
        `;
      } else {
        container.innerHTML = this.cart.map((it, idx) => `
          <div class="cart-item">
            <img src="${it.image}" alt="${it.name}" class="cart-item-img" onerror="this.src='assets/cat_herbal.jpg'">
            <div class="cart-item-info">
              <div class="cart-item-title">${it.name}</div>
              <div class="cart-item-vol">${it.volume} • ${(it.price).toLocaleString('vi-VN')}đ</div>
              <div class="cart-item-ctrls">
                <button class="qty-btn" onclick="app.updateQuantity(${idx}, -1)">-</button>
                <span>${it.quantity}</span>
                <button class="qty-btn" onclick="app.updateQuantity(${idx}, 1)">+</button>
              </div>
            </div>
            <button class="remove-item-btn" onclick="app.removeFromCart(${idx})" title="Xóa">&times;</button>
          </div>
        `).join('');
      }
    }

    // Footers
    const subtotalEl = document.getElementById('cart-subtotal-display');
    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('vi-VN') + 'đ';

    const shippingEl = document.getElementById('cart-shipping-display');
    if (shippingEl) shippingEl.textContent = (shippingFee === 0) ? 'Miễn phí (Đơn > 500k)' : '30.000đ';

    const totalEl = document.getElementById('cart-total-display');
    if (totalEl) totalEl.textContent = total.toLocaleString('vi-VN') + 'đ';

    const checkoutTotal = document.getElementById('checkout-total-val');
    if (checkoutTotal) checkoutTotal.textContent = total.toLocaleString('vi-VN') + 'đ';

    if (window.lucide) window.lucide.createIcons();
  }

  /* ==================== CHECKOUT & ORDERS ==================== */
  openCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Giỏ hàng của bạn đang trống, vui lòng chọn sản phẩm trước!');
      return;
    }
    this.closeCart();
    document.getElementById('checkout-modal')?.classList.add('active');
  }

  closeCheckout() {
    document.getElementById('checkout-modal')?.classList.remove('active');
  }

  handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('order-name').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const note = document.getElementById('order-note')?.value.trim() || '';
    const payment = document.querySelector('input[name="order-payment"]:checked')?.value || 'cod';

    const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const shippingFee = (subtotal >= (this.settings.freeShipThreshold || 500000)) ? 0 : 30000;
    const total = subtotal + shippingFee;

    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('vi-VN'),
      name,
      phone,
      address,
      note,
      payment,
      items: [...this.cart],
      total,
      status: 'Chờ xác nhận'
    };

    this.orders.unshift(newOrder);
    localStorage.setItem('caloha_orders', JSON.stringify(this.orders));

    this.closeCheckout();
    this.cart = [];
    this.saveCart();
    this.updateCartUI();

    this.showToast(`🎉 Cảm ơn ${name}! Mã đơn hàng: ${newOrder.id}. Chuyên viên CALOHA sẽ gọi xác nhận qua SĐT ${phone} trong ít phút.`);
  }

  /* ==================== CART PAGE METHODS ==================== */
  initCartPage() {
    const tableBody = document.getElementById('cart-page-tbody');
    if (!tableBody) return;
    this.renderCartPage();
  }

  renderCartPage() {
    const tableBody = document.getElementById('cart-page-tbody');
    const emptyState = document.getElementById('cart-empty-view');
    const contentLayout = document.getElementById('cart-content-layout');
    if (!tableBody) return;

    if (this.cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (contentLayout) contentLayout.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (contentLayout) contentLayout.style.display = 'grid';

    tableBody.innerHTML = this.cart.map((item, idx) => {
      const lineTotal = item.price * item.quantity;
      return `
        <tr>
          <td>
            <div class="cart-prod-cell">
              <img src="${item.image}" alt="${item.name}" class="cart-prod-thumb" onerror="this.src='assets/cat_herbal.jpg'">
              <div class="cart-prod-meta">
                <a href="catalog.html" class="cart-prod-name">${item.name}</a>
                <span class="cart-prod-vol-tag"><i data-lucide="droplet" style="width:12px; height:12px;"></i> Dung tích: ${item.volume}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="cart-unit-price">${item.price.toLocaleString('vi-VN')}đ</span>
          </td>
          <td>
            <div class="cart-qty-ctrl">
              <button type="button" onclick="app.updateQuantity(${idx}, -1); app.renderCartPage();">-</button>
              <input type="text" value="${item.quantity}" readonly>
              <button type="button" onclick="app.updateQuantity(${idx}, 1); app.renderCartPage();">+</button>
            </div>
          </td>
          <td>
            <span class="cart-line-total">${lineTotal.toLocaleString('vi-VN')}đ</span>
          </td>
          <td>
            <button type="button" class="cart-del-btn" onclick="app.removeFromCart(${idx}); app.renderCartPage();" title="Xóa khỏi giỏ">
              <i data-lucide="trash-2" style="width:18px; height:18px;"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const freeShipThreshold = this.settings.freeShipThreshold || 500000;
    const freeshipProgress = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100));
    const diff = freeShipThreshold - subtotal;

    const progressEl = document.getElementById('cart-freeship-progress');
    const msgEl = document.getElementById('cart-freeship-msg');
    if (progressEl) progressEl.style.width = `${freeshipProgress}%`;
    if (msgEl) {
      if (subtotal >= freeShipThreshold) {
        msgEl.innerHTML = `🎉 <strong>Chúc mừng!</strong> Bạn đã đạt điều kiện <strong>Miễn Phí Vận Chuyển</strong> toàn quốc!`;
      } else {
        msgEl.innerHTML = `🚚 Mua thêm <strong>${diff.toLocaleString('vi-VN')}đ</strong> để được <strong>Miễn Phí Giao Hàng</strong> toàn quốc!`;
      }
    }

    let discount = 0;
    if (this.appliedVoucher) {
      if (this.appliedVoucher.type === 'percent') {
        discount = Math.round(subtotal * (this.appliedVoucher.value / 100));
      } else if (this.appliedVoucher.type === 'fixed') {
        discount = this.appliedVoucher.value;
      } else if (this.appliedVoucher.type === 'freeship') {
        discount = 30000;
      }
    }

    const shippingFee = (subtotal >= freeShipThreshold || (this.appliedVoucher && this.appliedVoucher.type === 'freeship')) ? 0 : 30000;
    const finalTotal = Math.max(0, subtotal - discount + shippingFee);

    const subtotalEl = document.getElementById('page-cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('vi-VN') + 'đ';

    const discountRow = document.getElementById('page-cart-discount-row');
    const discountEl = document.getElementById('page-cart-discount');
    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = '-' + discount.toLocaleString('vi-VN') + 'đ';
      } else {
        discountRow.style.display = 'none';
      }
    }

    const shippingEl = document.getElementById('page-cart-shipping');
    if (shippingEl) shippingEl.textContent = (shippingFee === 0) ? 'Miễn phí' : '30.000đ';

    const totalEl = document.getElementById('page-cart-total');
    if (totalEl) totalEl.textContent = finalTotal.toLocaleString('vi-VN') + 'đ';

    const appliedView = document.getElementById('page-cart-applied-voucher');
    if (appliedView) {
      if (this.appliedVoucher) {
        appliedView.innerHTML = `
          <div class="applied-voucher-tag">
            <span>🎟️ Đã dùng: <strong>${this.appliedVoucher.code}</strong> (${this.appliedVoucher.desc})</span>
            <button type="button" style="background:none; border:none; color:#dc3545; font-weight:700; cursor:pointer;" onclick="app.removeVoucher()">&times;</button>
          </div>
        `;
      } else {
        appliedView.innerHTML = '';
      }
    }

    const noteEl = document.getElementById('page-cart-note');
    if (noteEl && this.orderNote) {
      noteEl.value = this.orderNote;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  applyVoucherCode(code) {
    const raw = (code || document.getElementById('voucher-code-input')?.value || '').trim().toUpperCase();
    if (!raw) {
      this.showToast('⚠️ Vui lòng nhập mã giảm giá!');
      return;
    }
    const vouchers = {
      'CALOHA10': { code: 'CALOHA10', type: 'percent', value: 10, desc: 'Giảm 10% tổng đơn' },
      'FREESHIP': { code: 'FREESHIP', type: 'freeship', value: 30000, desc: 'Miễn phí giao hàng' },
      'HUONGTHO50K': { code: 'HUONGTHO50K', type: 'fixed', value: 50000, desc: 'Giảm 50.000đ đơn từ 400k' }
    };

    if (vouchers[raw]) {
      const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
      if (raw === 'HUONGTHO50K' && subtotal < 400000) {
        this.showToast('⚠️ Mã HUONGTHO50K chỉ áp dụng cho đơn từ 400.000đ!');
        return;
      }
      this.appliedVoucher = vouchers[raw];
      localStorage.setItem('caloha_voucher', JSON.stringify(this.appliedVoucher));
      this.showToast(`🎉 Áp dụng mã ưu đãi ${raw} thành công!`);
      this.renderCartPage();
      this.renderCheckoutPage();
    } else {
      this.showToast('❌ Mã giảm giá không đúng hoặc đã hết hạn!');
    }
  }

  removeVoucher() {
    this.appliedVoucher = null;
    localStorage.removeItem('caloha_voucher');
    this.showToast('Đã bỏ áp dụng mã giảm giá.');
    this.renderCartPage();
    this.renderCheckoutPage();
  }

  clearEntireCart() {
    if (this.cart.length === 0) return;
    if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      this.cart = [];
      this.saveCart();
      this.updateCartUI();
      this.renderCartPage();
      this.showToast('🗑️ Đã làm trống giỏ hàng.');
    }
  }

  saveCartNote(note) {
    this.orderNote = note;
    localStorage.setItem('caloha_order_note', note);
  }

  /* ==================== CHECKOUT PAGE METHODS ==================== */
  initCheckoutPage() {
    const form = document.getElementById('full-checkout-form');
    if (!form) return;
    if (this.cart.length === 0) {
      const warnBox = document.getElementById('checkout-empty-warning');
      const mainGrid = document.getElementById('checkout-main-grid');
      if (warnBox && mainGrid) {
        warnBox.style.display = 'block';
        mainGrid.style.display = 'none';
        return;
      }
    }
    this.renderCheckoutPage();
  }

  renderCheckoutPage() {
    const list = document.getElementById('checkout-mini-items');
    if (!list) return;

    list.innerHTML = this.cart.map(item => `
      <div class="checkout-mini-item">
        <div class="checkout-mini-thumb-wrap">
          <img src="${item.image}" alt="${item.name}" class="checkout-mini-thumb" onerror="this.src='assets/cat_herbal.jpg'">
          <span class="checkout-mini-qty">${item.quantity}</span>
        </div>
        <div class="checkout-mini-info">
          <div class="checkout-mini-name">${item.name}</div>
          <div class="checkout-mini-vol">Dung tích: ${item.volume}</div>
        </div>
        <div class="checkout-mini-price">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
      </div>
    `).join('');

    const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const freeShipLimit = this.settings.freeShipThreshold || 500000;
    
    let shippingFee = (subtotal >= freeShipLimit) ? 0 : 30000;
    if (this.selectedShippingMethod === 'express') {
      shippingFee = 45000;
    }
    if (this.appliedVoucher && this.appliedVoucher.type === 'freeship') {
      shippingFee = 0;
    }

    let discount = 0;
    if (this.appliedVoucher) {
      if (this.appliedVoucher.type === 'percent') {
        discount = Math.round(subtotal * (this.appliedVoucher.value / 100));
      } else if (this.appliedVoucher.type === 'fixed') {
        discount = this.appliedVoucher.value;
      } else if (this.appliedVoucher.type === 'freeship') {
        discount = 30000;
      }
    }

    const total = Math.max(0, subtotal - discount + shippingFee);

    const subtotalEl = document.getElementById('checkout-subtotal');
    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('vi-VN') + 'đ';

    const discountRow = document.getElementById('checkout-discount-row');
    const discountEl = document.getElementById('checkout-discount');
    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = '-' + discount.toLocaleString('vi-VN') + 'đ';
      } else {
        discountRow.style.display = 'none';
      }
    }

    const shipEl = document.getElementById('checkout-shipping');
    if (shipEl) shipEl.textContent = (shippingFee === 0) ? 'Miễn phí' : shippingFee.toLocaleString('vi-VN') + 'đ';

    const totalEl = document.getElementById('checkout-final-total');
    if (totalEl) totalEl.textContent = total.toLocaleString('vi-VN') + 'đ';

    this.updateVietQRDisplay(total);

    const noteEl = document.getElementById('checkout-note');
    if (noteEl && this.orderNote && !noteEl.value) {
      noteEl.value = this.orderNote;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  setShippingMethod(method) {
    this.selectedShippingMethod = method;
    document.querySelectorAll('.shipping-card-option').forEach(el => {
      if (el.dataset.method === method) el.classList.add('active');
      else el.classList.remove('active');
    });
    this.renderCheckoutPage();
  }

  setPaymentMethod(method) {
    this.selectedPaymentMethod = method;
    document.querySelectorAll('.payment-method-card').forEach(el => {
      if (el.dataset.method === method) el.classList.add('active');
      else el.classList.remove('active');
    });
    const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const shippingFee = (this.selectedShippingMethod === 'express') ? 45000 : ((subtotal >= 500000) ? 0 : 30000);
    const total = subtotal + shippingFee;
    this.updateVietQRDisplay(total);
  }

  updateVietQRDisplay(total) {
    const qrImg = document.getElementById('vietqr-image-el');
    const qrAmountEl = document.getElementById('vietqr-amount-val');
    const qrSyntaxEl = document.getElementById('vietqr-syntax-val');
    if (!this._orderSyntaxCode) {
      this._orderSyntaxCode = 'CALOHA' + Math.floor(100000 + Math.random() * 900000);
    }
    const syntax = this._orderSyntaxCode;

    if (qrAmountEl) qrAmountEl.textContent = total.toLocaleString('vi-VN') + 'đ';
    if (qrSyntaxEl) qrSyntaxEl.textContent = syntax;
    if (qrImg) {
      qrImg.src = `https://img.vietqr.io/image/970422-1029384756-compact2.png?amount=${total}&addInfo=${syntax}&accountName=CONG%20TY%20CALOHA`;
    }
  }

  copyToClipboard(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(msg || `Đã sao chép: ${text}`);
    }).catch(() => {
      this.showToast(`Đã sao chép: ${text}`);
    });
  }

  handleFullCheckoutSubmit(e) {
    e.preventDefault();
    if (this.cart.length === 0) {
      this.showToast('⚠️ Giỏ hàng trống, không thể đặt hàng!');
      return;
    }

    const name = document.getElementById('checkout-name')?.value.trim();
    const phone = document.getElementById('checkout-phone')?.value.trim();
    const email = document.getElementById('checkout-email')?.value.trim() || '';
    const province = document.getElementById('checkout-province')?.value || '';
    const district = document.getElementById('checkout-district')?.value.trim() || '';
    const address = document.getElementById('checkout-address')?.value.trim() || '';
    const note = document.getElementById('checkout-note')?.value.trim() || '';

    if (!name || !phone || !address) {
      this.showToast('⚠️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!');
      return;
    }

    const subtotal = this.cart.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const freeShipLimit = this.settings.freeShipThreshold || 500000;
    let shippingFee = (subtotal >= freeShipLimit) ? 0 : 30000;
    if (this.selectedShippingMethod === 'express') shippingFee = 45000;
    if (this.appliedVoucher && this.appliedVoucher.type === 'freeship') shippingFee = 0;

    let discount = 0;
    if (this.appliedVoucher) {
      if (this.appliedVoucher.type === 'percent') discount = Math.round(subtotal * (this.appliedVoucher.value / 100));
      else if (this.appliedVoucher.type === 'fixed') discount = this.appliedVoucher.value;
      else if (this.appliedVoucher.type === 'freeship') discount = 30000;
    }

    const total = Math.max(0, subtotal - discount + shippingFee);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const paymentLabels = {
      'cod': 'Thanh toán COD khi nhận hàng',
      'banking': 'Chuyển khoản VietQR (MBBank)',
      'momo': 'Ví điện tử MoMo',
      'card': 'Thẻ Quốc tế (Visa/Mastercard)'
    };

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString('vi-VN'),
      name,
      phone,
      email,
      province,
      district,
      address: `${address}${district ? ', ' + district : ''}${province ? ', ' + province : ''}`,
      note,
      shippingMethod: this.selectedShippingMethod === 'express' ? 'Hỏa tốc 2H' : 'Tiêu chuẩn (2-3 ngày)',
      shippingFee,
      payment: this.selectedPaymentMethod,
      paymentLabel: paymentLabels[this.selectedPaymentMethod] || 'COD',
      items: [...this.cart],
      subtotal,
      discount,
      voucherCode: this.appliedVoucher ? this.appliedVoucher.code : '',
      total,
      status: 'Chờ xác nhận'
    };

    this.orders.unshift(newOrder);
    localStorage.setItem('caloha_orders', JSON.stringify(this.orders));

    this.cart = [];
    this.saveCart();
    this.appliedVoucher = null;
    localStorage.removeItem('caloha_voucher');
    localStorage.removeItem('caloha_order_note');
    this.updateCartUI();

    window.location.href = `orders.html?id=${orderId}&success=true`;
  }

  /* ==================== ORDERS & TRACKING METHODS ==================== */
  initOrdersPage() {
    const container = document.getElementById('orders-page-root');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('id');
    const isSuccess = urlParams.get('success') === 'true';

    if (isSuccess) {
      const celebEl = document.getElementById('order-success-banner');
      if (celebEl) celebEl.style.display = 'block';
    }

    let activeOrder = null;
    if (targetId) {
      activeOrder = this.orders.find(o => o.id.toUpperCase() === targetId.toUpperCase());
    }
    if (!activeOrder && this.orders.length > 0) {
      activeOrder = this.orders[0];
    }

    this.renderActiveOrder(activeOrder);
    this.renderOrdersHistoryList();
  }

  renderActiveOrder(order) {
    const detailBox = document.getElementById('order-detail-container');
    const emptyBox = document.getElementById('order-not-found');
    if (!detailBox) return;

    if (!order) {
      detailBox.style.display = 'none';
      if (emptyBox) emptyBox.style.display = 'block';
      return;
    }

    if (emptyBox) emptyBox.style.display = 'none';
    detailBox.style.display = 'block';

    const statusMap = {
      'Chờ xác nhận': { step: 1, class: 'pending', text: 'Chờ xác nhận' },
      'Đã xác nhận': { step: 2, class: 'confirmed', text: 'Đã xác nhận' },
      'Đang vận chuyển': { step: 3, class: 'shipping', text: 'Đang vận chuyển' },
      'Hoàn tất': { step: 4, class: 'completed', text: 'Giao thành công' },
      'Đã hủy': { step: 0, class: 'cancelled', text: 'Đã hủy đơn' }
    };
    const curStatus = statusMap[order.status] || { step: 1, class: 'pending', text: order.status };

    document.getElementById('order-code-display').textContent = order.id;
    document.getElementById('order-date-display').textContent = order.date;
    
    const statusPill = document.getElementById('order-status-pill');
    if (statusPill) {
      statusPill.className = `status-pill ${curStatus.class}`;
      statusPill.textContent = curStatus.text;
    }

    const steps = [
      { id: 'step-1', num: 1, label: 'Tiếp nhận đơn', sub: order.date.split(',')[0] },
      { id: 'step-2', num: 2, label: 'CALOHA Xác nhận', sub: curStatus.step >= 2 ? 'Đã duyệt' : 'Dự kiến 15p' },
      { id: 'step-3', num: 3, label: 'Đang giao hàng', sub: curStatus.step >= 3 ? 'Đang gửi' : '1-2 ngày tới' },
      { id: 'step-4', num: 4, label: 'Giao thành công', sub: curStatus.step >= 4 ? 'Hoàn tất' : 'Kiểm hàng COD' }
    ];

    const timelineContainer = document.getElementById('order-timeline-nodes');
    if (timelineContainer) {
      if (curStatus.step === 0) {
        timelineContainer.innerHTML = `
          <div style="text-align:center; padding:16px; color:#dc3545; font-weight:600; width:100%;">
            ❌ Đơn hàng này đã bị hủy. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ Hotline: 0988.234.567.
          </div>
        `;
      } else {
        timelineContainer.innerHTML = steps.map(s => {
          let nodeClass = '';
          if (curStatus.step > s.num) nodeClass = 'completed';
          else if (curStatus.step === s.num) nodeClass = 'current';
          return `
            <div class="timeline-step-node ${nodeClass}">
              <div class="timeline-dot">
                ${curStatus.step > s.num ? '✓' : s.num}
              </div>
              <div>
                <div class="timeline-node-text">${s.label}</div>
                <div class="timeline-node-sub">${s.sub}</div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    document.getElementById('order-recipient-name').textContent = order.name;
    document.getElementById('order-recipient-phone').textContent = order.phone;
    document.getElementById('order-recipient-address').textContent = order.address;
    document.getElementById('order-recipient-note').textContent = order.note || 'Không có ghi chú';
    document.getElementById('order-shipping-method').textContent = order.shippingMethod || 'Tiêu chuẩn';
    document.getElementById('order-payment-method').textContent = order.paymentLabel || order.payment;

    const itemsTbody = document.getElementById('order-items-tbody');
    if (itemsTbody) {
      itemsTbody.innerHTML = order.items.map(it => `
        <tr>
          <td style="padding:12px 14px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${it.image}" alt="${it.name}" style="width:48px; height:48px; border-radius:6px; object-fit:cover; border:1px solid var(--border-light);" onerror="this.src='assets/cat_herbal.jpg'">
              <div>
                <div style="font-weight:600; font-size:0.9rem; color:var(--primary);">${it.name}</div>
                <div style="font-size:0.78rem; color:var(--text-muted);">Dung tích: ${it.volume}</div>
              </div>
            </div>
          </td>
          <td style="padding:12px 14px; text-align:center; font-weight:600;">${it.quantity}</td>
          <td style="padding:12px 14px; text-align:right;">${(it.price).toLocaleString('vi-VN')}đ</td>
          <td style="padding:12px 14px; text-align:right; font-weight:700; color:var(--primary);">${(it.price * it.quantity).toLocaleString('vi-VN')}đ</td>
        </tr>
      `).join('');
    }

    document.getElementById('order-subtotal-val').textContent = (order.subtotal || order.total).toLocaleString('vi-VN') + 'đ';
    document.getElementById('order-shipping-val').textContent = (order.shippingFee === 0) ? 'Miễn phí' : (order.shippingFee || 0).toLocaleString('vi-VN') + 'đ';
    
    const discountRow = document.getElementById('order-discount-row');
    if (discountRow) {
      if (order.discount && order.discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('order-discount-val').textContent = '-' + (order.discount).toLocaleString('vi-VN') + 'đ' + (order.voucherCode ? ` (${order.voucherCode})` : '');
      } else {
        discountRow.style.display = 'none';
      }
    }
    document.getElementById('order-total-val').textContent = order.total.toLocaleString('vi-VN') + 'đ';

    const cancelBtn = document.getElementById('order-cancel-btn');
    if (cancelBtn) {
      if (order.status === 'Chờ xác nhận') {
        cancelBtn.style.display = 'inline-flex';
        cancelBtn.onclick = () => this.cancelUserOrder(order.id);
      } else {
        cancelBtn.style.display = 'none';
      }
    }

    const reorderBtn = document.getElementById('order-reorder-btn');
    if (reorderBtn) {
      reorderBtn.onclick = () => this.reorderItems(order.id);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  renderOrdersHistoryList() {
    const container = document.getElementById('orders-history-tbody');
    if (!container) return;

    if (this.orders.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:32px; color:var(--text-muted);">
            Bạn chưa có đơn hàng nào được lưu trên thiết bị.
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = this.orders.map(o => {
      const statusClass = {
        'Chờ xác nhận': 'pending',
        'Đã xác nhận': 'confirmed',
        'Đang vận chuyển': 'shipping',
        'Hoàn tất': 'completed',
        'Đã hủy': 'cancelled'
      }[o.status] || 'pending';

      const totalItems = o.items.reduce((s, it) => s + it.quantity, 0);

      return `
        <tr>
          <td style="font-weight:700; color:var(--primary); cursor:pointer;" onclick="app.viewOrderDetails('${o.id}')">
            ${o.id}
          </td>
          <td style="font-size:0.85rem; color:var(--text-muted);">${o.date}</td>
          <td>${totalItems} sản phẩm</td>
          <td style="font-weight:700; color:#b38b2d;">${o.total.toLocaleString('vi-VN')}đ</td>
          <td><span class="status-pill ${statusClass}">${o.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="app.viewOrderDetails('${o.id}')" style="padding:4px 10px; font-size:0.8rem;">
              Chi tiết
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  viewOrderDetails(orderId) {
    const o = this.orders.find(item => item.id === orderId);
    if (o) {
      this.renderActiveOrder(o);
      document.getElementById('order-detail-container')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  searchOrderByCodeOrPhone(e) {
    e.preventDefault();
    const query = document.getElementById('order-search-input')?.value.trim().toUpperCase();
    if (!query) {
      this.showToast('⚠️ Vui lòng nhập Mã đơn hàng hoặc Số điện thoại để tra cứu!');
      return;
    }

    const found = this.orders.find(o => 
      o.id.toUpperCase() === query || 
      o.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''))
    );

    if (found) {
      this.renderActiveOrder(found);
      this.showToast(`🔍 Đã tìm thấy đơn hàng ${found.id}!`);
      document.getElementById('order-detail-container')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.showToast(`❌ Không tìm thấy đơn hàng khớp với "${query}". Vui lòng kiểm tra lại!`);
    }
  }

  reorderItems(orderId) {
    const o = this.orders.find(item => item.id === orderId);
    if (!o || !o.items) return;

    o.items.forEach(item => {
      const existing = this.cart.find(it => it.id === item.id && it.volume === item.volume);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        this.cart.push({ ...item });
      }
    });

    this.saveCart();
    this.updateCartUI();
    this.showToast(`🛒 Đã thêm các sản phẩm từ đơn ${orderId} vào giỏ hàng!`);
    window.location.href = 'cart.html';
  }

  cancelUserOrder(orderId) {
    const o = this.orders.find(item => item.id === orderId);
    if (!o) return;
    if (confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${orderId} không?`)) {
      o.status = 'Đã hủy';
      localStorage.setItem('caloha_orders', JSON.stringify(this.orders));
      this.renderActiveOrder(o);
      this.renderOrdersHistoryList();
      this.showToast(`Đã hủy đơn hàng ${orderId}.`);
    }
  }

  printOrderInvoice() {
    window.print();
  }

  /* ==================== CONSULTATION & CONTACT ==================== */
  handleConsultation(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, select');
    const name = inputs[0]?.value || 'Khách hàng';
    const phone = inputs[1]?.value || '';
    const topic = inputs[2]?.value || 'Tư vấn tinh dầu';

    const newInquiry = {
      id: 'INQ-' + Date.now(),
      type: 'Tư Vấn Mùi Hương',
      name,
      phone,
      email: '-',
      message: topic,
      date: new Date().toLocaleString('vi-VN'),
      status: 'Chưa liên hệ'
    };

    this.inquiries.unshift(newInquiry);
    localStorage.setItem('caloha_inquiries', JSON.stringify(this.inquiries));

    form.reset();
    this.showToast(`🌿 Cảm ơn ${name}! CALOHA đã lưu yêu cầu và sẽ gọi tư vấn trong 15 phút.`);
  }

  handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]')?.value || '';
    const phone = form.querySelector('input[type="tel"]')?.value || '';
    const email = form.querySelector('input[type="email"]')?.value || '';
    const msg = form.querySelector('textarea')?.value || '';

    const newInquiry = {
      id: 'INQ-' + Date.now(),
      type: 'Tin Nhắn Liên Hệ',
      name,
      phone,
      email,
      message: msg,
      date: new Date().toLocaleString('vi-VN'),
      status: 'Chưa liên hệ'
    };

    this.inquiries.unshift(newInquiry);
    localStorage.setItem('caloha_inquiries', JSON.stringify(this.inquiries));

    form.reset();
    this.showToast(`💌 Cảm ơn bạn! CALOHA đã tiếp nhận thông tin và sẽ phản hồi qua ${phone || email} trong 24h.`);
  }

  /* ==================== CMS CORE METHODS ==================== */
  switchCmsTab(tabName, btnElement) {
    this.activeCmsTab = tabName;
    const tabs = ['dashboard', 'products', 'articles', 'orders', 'inquiries', 'settings'];
    
    tabs.forEach(t => {
      const el = document.getElementById(`cms-tab-view-${t}`);
      if (el) el.style.display = (t === tabName) ? 'block' : 'none';
    });

    document.querySelectorAll('.cms-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-cms-tab') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (tabName === 'dashboard') this.renderCmsDashboard();
    if (tabName === 'products') this.renderCmsProducts();
    if (tabName === 'articles') this.renderCmsArticles();
    if (tabName === 'orders') this.renderCmsOrders();
    if (tabName === 'inquiries') this.renderCmsInquiries();
    if (tabName === 'settings') this.loadCmsSettingsForm();

    if (window.lucide) window.lucide.createIcons();
  }

  renderCmsDashboard() {
    // Update badge counts
    const prodBadge = document.getElementById('cms-prod-count-badge');
    if (prodBadge) prodBadge.textContent = this.products.length;
    const artBadge = document.getElementById('cms-art-count-badge');
    if (artBadge) artBadge.textContent = this.articles.length;
    const ordBadge = document.getElementById('cms-orders-count-badge');
    if (ordBadge) ordBadge.textContent = this.orders.length;
    const inqBadge = document.getElementById('cms-inquiries-count-badge');
    if (inqBadge) inqBadge.textContent = this.inquiries.length;

    // Stat cards
    const statProd = document.getElementById('stat-total-products');
    if (statProd) statProd.textContent = this.products.length;
    const statOrd = document.getElementById('stat-total-orders');
    if (statOrd) statOrd.textContent = this.orders.length;
    const statInq = document.getElementById('stat-total-inquiries');
    if (statInq) statInq.textContent = this.inquiries.length;
    const statArt = document.getElementById('stat-total-articles');
    if (statArt) statArt.textContent = this.articles.length;

    // Recent orders preview
    const recentOrdersEl = document.getElementById('cms-dashboard-recent-orders');
    if (recentOrdersEl) {
      if (this.orders.length === 0) {
        recentOrdersEl.innerHTML = `
          <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
            <i data-lucide="shopping-bag" style="width:36px; height:36px; stroke-width:1.5; color:#cbd5e1; margin-bottom:8px;"></i>
            <p style="margin:0; font-size:0.9rem;">Chưa có đơn hàng nào được đặt.</p>
            <small>Đơn hàng đặt từ Giỏ hàng & Thanh toán sẽ xuất hiện tại đây.</small>
          </div>
        `;
      } else {
        const recent = this.orders.slice(0, 4);
        recentOrdersEl.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${recent.map(o => `
              <div style="background:var(--mint-bg); padding:12px 16px; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="color:var(--primary); font-size:0.92rem;">${o.id}</strong> - ${o.name} (${o.phone})
                  <div style="font-size:0.8rem; color:var(--text-muted);">${o.date} • ${(o.total || 0).toLocaleString('vi-VN')}đ</div>
                </div>
                <span class="cms-badge ${o.status === 'Hoàn tất' ? 'cms-badge-completed' : 'cms-badge-pending'}">${o.status}</span>
              </div>
            `).join('')}
          </div>
        `;
      }
    }

    // Recent inquiries preview
    const recentInqEl = document.getElementById('cms-dashboard-recent-inquiries');
    if (recentInqEl) {
      if (this.inquiries.length === 0) {
        recentInqEl.innerHTML = `
          <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
            <i data-lucide="message-square" style="width:36px; height:36px; stroke-width:1.5; color:#cbd5e1; margin-bottom:8px;"></i>
            <p style="margin:0; font-size:0.9rem;">Chưa có khách đăng ký tư vấn.</p>
            <small>Form tư vấn trên trang chủ và liên hệ sẽ lưu lại tại đây.</small>
          </div>
        `;
      } else {
        const recentInqs = this.inquiries.slice(0, 4);
        recentInqEl.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${recentInqs.map(i => `
              <div style="background:var(--mint-bg); padding:12px 16px; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="color:var(--primary); font-size:0.92rem;">${i.name}</strong> - <a href="tel:${i.phone}" style="color:var(--accent);">${i.phone}</a>
                  <div style="font-size:0.8rem; color:var(--text-muted);">${i.date} • ${i.message || i.type}</div>
                </div>
                <span class="cms-badge ${i.status === 'Đã tư vấn' ? 'cms-badge-completed' : 'cms-badge-pending'}">${i.status}</span>
              </div>
            `).join('')}
          </div>
        `;
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  /* CMS PRODUCTS CRUD */
  renderCmsProducts(filteredList = null) {
    const prods = filteredList || this.products;
    const countEl = document.getElementById('cms-prod-table-count');
    if (countEl) countEl.textContent = prods.length;
    const badgeEl = document.getElementById('cms-prod-count-badge');
    if (badgeEl) badgeEl.textContent = this.products.length;

    const tbody = document.getElementById('cms-products-tbody');
    if (!tbody) return;

    if (prods.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">Không tìm thấy sản phẩm nào phù hợp.</td></tr>`;
      return;
    }

    tbody.innerHTML = prods.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" class="cms-table-thumb" onclick="app.openLightbox('${p.image}', '${p.name}')" onerror="this.src='assets/cat_herbal.jpg'">
        </td>
        <td>
          <div style="font-weight:700; color:var(--primary);">${p.name}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">${p.subtitle || ''}</div>
        </td>
        <td>
          <span class="pill-badge" style="background:var(--mint-bg); color:var(--primary); font-size:0.75rem;">${p.category}</span>
        </td>
        <td><strong style="color:var(--accent);">${p.priceFormatted || (p.price.toLocaleString('vi-VN') + 'đ')}</strong></td>
        <td>${p.volume || '10ml'}</td>
        <td>${p.stock || 10}</td>
        <td>
          ${p.isOrganic ? '<span class="cms-badge cms-badge-organic">Organic</span>' : ''}
          ${p.featured ? '<span class="cms-badge" style="background:#fef3c7; color:#b45309;">Nổi Bật</span>' : ''}
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <button class="cms-action-btn" onclick="app.openEditProductModal(${p.id})" title="Chỉnh sửa"><i data-lucide="edit" style="width:14px;"></i> Sửa</button>
          <button class="cms-action-btn btn-danger" onclick="app.deleteProduct(${p.id})" title="Xóa"><i data-lucide="trash-2" style="width:14px;"></i></button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  filterCmsProducts() {
    const searchVal = (document.getElementById('cms-prod-search')?.value || '').toLowerCase().trim();
    const catVal = document.getElementById('cms-prod-cat-filter')?.value || 'all';

    const filtered = this.products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchVal) || (p.subtitle && p.subtitle.toLowerCase().includes(searchVal));
      const matchCat = (catVal === 'all') || (p.category === catVal);
      return matchSearch && matchCat;
    });

    this.renderCmsProducts(filtered);
  }

  openNewProductModal() {
    document.getElementById('cms-prod-id').value = '';
    document.getElementById('cms-product-form').reset();
    document.getElementById('cms-prod-modal-title').textContent = 'Thêm Sản Phẩm Mới';
    document.getElementById('cms-prod-modal-badge').textContent = 'Tạo Mới';
    document.getElementById('cms-product-modal').classList.add('active');
  }

  openEditProductModal(id) {
    const p = this.products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('cms-prod-id').value = p.id;
    document.getElementById('cms-prod-name').value = p.name;
    document.getElementById('cms-prod-subtitle').value = p.subtitle || '';
    document.getElementById('cms-prod-category').value = p.category;
    document.getElementById('cms-prod-price').value = p.price;
    document.getElementById('cms-prod-volume').value = p.volume || '10ml';
    document.getElementById('cms-prod-stock').value = p.stock || 10;
    document.getElementById('cms-prod-image').value = p.image || '';
    document.getElementById('cms-prod-note').value = p.note || '';
    document.getElementById('cms-prod-aroma').value = p.aroma || '';
    document.getElementById('cms-prod-benefits').value = Array.isArray(p.benefits) ? p.benefits.join(', ') : (p.benefits || '');
    document.getElementById('cms-prod-uses').value = p.uses || '';
    document.getElementById('cms-prod-organic').checked = !!p.isOrganic;
    document.getElementById('cms-prod-featured').checked = !!p.featured;

    document.getElementById('cms-prod-modal-title').textContent = 'Chỉnh Sửa Sản Phẩm';
    document.getElementById('cms-prod-modal-badge').textContent = `Mã #${p.id}`;
    document.getElementById('cms-product-modal').classList.add('active');
  }

  closeCmsProductModal() {
    document.getElementById('cms-product-modal')?.classList.remove('active');
  }

  handleSaveProduct(e) {
    e.preventDefault();
    const idVal = document.getElementById('cms-prod-id').value;
    const name = document.getElementById('cms-prod-name').value.trim();
    const subtitle = document.getElementById('cms-prod-subtitle').value.trim();
    const category = document.getElementById('cms-prod-category').value;
    const price = parseInt(document.getElementById('cms-prod-price').value, 10) || 0;
    const volume = document.getElementById('cms-prod-volume').value;
    const stock = parseInt(document.getElementById('cms-prod-stock').value, 10) || 0;
    const image = document.getElementById('cms-prod-image').value.trim() || 'assets/cat_herbal.jpg';
    const note = document.getElementById('cms-prod-note').value.trim();
    const aroma = document.getElementById('cms-prod-aroma').value.trim();
    const benefitsStr = document.getElementById('cms-prod-benefits').value.trim();
    const benefits = benefitsStr ? benefitsStr.split(',').map(b => b.trim()).filter(Boolean) : [];
    const uses = document.getElementById('cms-prod-uses').value.trim();
    const isOrganic = document.getElementById('cms-prod-organic').checked;
    const featured = document.getElementById('cms-prod-featured').checked;

    if (idVal) {
      // Edit existing product
      const id = parseInt(idVal, 10);
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          name,
          subtitle,
          category,
          price,
          priceFormatted: price.toLocaleString('vi-VN') + 'đ',
          volume,
          stock,
          image,
          note,
          aroma,
          benefits,
          uses,
          isOrganic,
          featured
        };
        this.showToast(`✅ Đã cập nhật thành công sản phẩm: ${name}`);
      }
    } else {
      // Add new product
      const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
      const newProd = {
        id: newId,
        name,
        subtitle,
        category,
        price,
        priceFormatted: price.toLocaleString('vi-VN') + 'đ',
        volume,
        stock,
        image,
        note,
        aroma,
        benefits,
        uses,
        isOrganic,
        featured,
        gallery: [image, "assets/story_distillation.jpg"]
      };
      this.products.unshift(newProd);
      this.showToast(`🎉 Đã thêm mới sản phẩm: ${name}`);
    }

    // Save to localStorage
    localStorage.setItem('caloha_products', JSON.stringify(this.products));

    // Refresh views
    this.closeCmsProductModal();
    this.renderCmsProducts();
    this.renderCatalogProducts();
    this.renderHomeProducts('featured');
    this.renderCategoryCards();
  }

  deleteProduct(id) {
    const prod = this.products.find(p => p.id === id);
    if (!prod) return;
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${prod.name}" khỏi hệ thống không?`)) {
      this.products = this.products.filter(p => p.id !== id);
      localStorage.setItem('caloha_products', JSON.stringify(this.products));
      this.showToast(`🗑️ Đã xóa sản phẩm: ${prod.name}`);
      this.renderCmsProducts();
      this.renderCatalogProducts();
      this.renderHomeProducts('featured');
    }
  }

  resetDefaultData() {
    if (confirm('Khôi phục lại danh sách 62 sản phẩm nguyên bản từ Google Sheets? Mọi thay đổi tạm thời sẽ được đưa về mặc định.')) {
      localStorage.removeItem('caloha_products');
      this.products = PRODUCTS_DATA;
      this.renderCmsProducts();
      this.renderCatalogProducts();
      this.renderHomeProducts('featured');
      this.renderCategoryCards();
      this.showToast('🌿 Đã khôi phục thành công 62 sản phẩm nguyên bản!');
    }
  }

  /* CMS ARTICLES CRUD */
  renderCmsArticles(filteredList = null) {
    const arts = filteredList || this.articles;
    const countEl = document.getElementById('cms-art-table-count');
    if (countEl) countEl.textContent = arts.length;
    const badgeEl = document.getElementById('cms-art-count-badge');
    if (badgeEl) badgeEl.textContent = this.articles.length;

    const tbody = document.getElementById('cms-articles-tbody');
    if (!tbody) return;

    if (arts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted);">Chưa có bài viết nào trong mục này.</td></tr>`;
      return;
    }

    tbody.innerHTML = arts.map(a => `
      <tr>
        <td>
          <img src="${a.image}" alt="${a.title}" class="cms-table-thumb" onclick="app.openLightbox('${a.image}', '${a.title}')" onerror="this.src='assets/cat_herbal.jpg'">
        </td>
        <td>
          <div style="font-weight:700; color:var(--primary); max-width:320px;">${a.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${a.excerpt ? a.excerpt.substring(0, 70) + '...' : ''}</div>
        </td>
        <td>
          <span class="pill-badge" style="background:var(--mint-bg); color:var(--primary); font-size:0.75rem;">${a.category}</span>
        </td>
        <td>${a.date || '14/09/2026'}</td>
        <td>${a.readTime || '5 phút đọc'}</td>
        <td style="text-align:center; white-space:nowrap;">
          <button class="cms-action-btn" onclick="app.openArticleModal('${a.id}')" title="Xem trước"><i data-lucide="eye" style="width:14px;"></i></button>
          <button class="cms-action-btn" onclick="app.openEditArticleModal('${a.id}')" title="Sửa"><i data-lucide="edit" style="width:14px;"></i></button>
          <button class="cms-action-btn btn-danger" onclick="app.deleteArticle('${a.id}')" title="Xóa"><i data-lucide="trash-2" style="width:14px;"></i></button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  filterCmsArticles() {
    const searchVal = (document.getElementById('cms-art-search')?.value || '').toLowerCase().trim();
    const catVal = document.getElementById('cms-art-cat-filter')?.value || 'all';

    const filtered = this.articles.filter(a => {
      const matchSearch = a.title.toLowerCase().includes(searchVal);
      const matchCat = (catVal === 'all') || (a.category === catVal);
      return matchSearch && matchCat;
    });

    this.renderCmsArticles(filtered);
  }

  openNewArticleModal() {
    document.getElementById('cms-art-id').value = '';
    document.getElementById('cms-article-form').reset();
    document.getElementById('cms-art-modal-title').textContent = 'Viết Bài Mới';
    document.getElementById('cms-art-modal-badge').textContent = 'Tạo Mới';
    document.getElementById('cms-article-modal').classList.add('active');
  }

  openEditArticleModal(id) {
    const a = this.articles.find(item => item.id === id);
    if (!a) return;

    document.getElementById('cms-art-id').value = a.id;
    document.getElementById('cms-art-title').value = a.title;
    document.getElementById('cms-art-category').value = a.category;
    document.getElementById('cms-art-readtime').value = a.readTime || '5 phút đọc';
    document.getElementById('cms-art-image').value = a.image || '';
    document.getElementById('cms-art-excerpt').value = a.excerpt || '';
    document.getElementById('cms-art-content').value = a.content || '';

    document.getElementById('cms-art-modal-title').textContent = 'Chỉnh Sửa Bài Viết';
    document.getElementById('cms-art-modal-badge').textContent = a.id;
    document.getElementById('cms-article-modal').classList.add('active');
  }

  closeCmsArticleModal() {
    document.getElementById('cms-article-modal')?.classList.remove('active');
  }

  handleSaveArticle(e) {
    e.preventDefault();
    const idVal = document.getElementById('cms-art-id').value;
    const title = document.getElementById('cms-art-title').value.trim();
    const category = document.getElementById('cms-art-category').value;
    const readTime = document.getElementById('cms-art-readtime').value.trim();
    const image = document.getElementById('cms-art-image').value.trim() || 'assets/story_distillation.jpg';
    const excerpt = document.getElementById('cms-art-excerpt').value.trim();
    const content = document.getElementById('cms-art-content').value.trim();

    if (idVal) {
      const index = this.articles.findIndex(a => a.id === idVal);
      if (index !== -1) {
        this.articles[index] = {
          ...this.articles[index],
          title,
          category,
          readTime,
          image,
          excerpt,
          content
        };
        this.showToast(`✅ Đã cập nhật bài viết: ${title}`);
      }
    } else {
      const newId = 'art-' + Date.now();
      const newArt = {
        id: newId,
        title,
        category,
        date: new Date().toLocaleDateString('vi-VN'),
        readTime,
        image,
        excerpt,
        content
      };
      this.articles.unshift(newArt);
      this.showToast(`🎉 Đã đăng bài viết mới: ${title}`);
    }

    localStorage.setItem('caloha_articles', JSON.stringify(this.articles));
    this.closeCmsArticleModal();
    this.renderCmsArticles();
    this.renderArticles();
  }

  deleteArticle(id) {
    const a = this.articles.find(item => item.id === id);
    if (!a) return;
    if (confirm(`Bạn có muốn xóa bài viết "${a.title}" không?`)) {
      this.articles = this.articles.filter(item => item.id !== id);
      localStorage.setItem('caloha_articles', JSON.stringify(this.articles));
      this.showToast(`🗑️ Đã xóa bài viết: ${a.title}`);
      this.renderCmsArticles();
      this.renderArticles();
    }
  }

  /* CMS ORDERS CRUD */
  renderCmsOrders() {
    const countEl = document.getElementById('cms-orders-table-count');
    if (countEl) countEl.textContent = this.orders.length;
    const badgeEl = document.getElementById('cms-orders-count-badge');
    if (badgeEl) badgeEl.textContent = this.orders.length;

    const tbody = document.getElementById('cms-orders-tbody');
    if (!tbody) return;

    if (this.orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:30px; color:var(--text-muted);">Chưa có đơn hàng nào. Hãy thử đặt 1 đơn hàng qua giỏ hàng!</td></tr>`;
      return;
    }

    tbody.innerHTML = this.orders.map(o => `
      <tr>
        <td><strong style="color:var(--primary);">${o.id}</strong></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${o.date}</td>
        <td><strong>${o.name}</strong></td>
        <td><a href="tel:${o.phone}" style="color:var(--accent); font-weight:600;">${o.phone}</a></td>
        <td style="font-size:0.82rem; max-width:180px;">${o.address}</td>
        <td style="font-size:0.82rem;">
          ${(o.items || []).map(it => `<div>• ${it.name} (${it.volume}) x ${it.quantity}</div>`).join('')}
        </td>
        <td><strong style="color:var(--primary);">${(o.total || 0).toLocaleString('vi-VN')}đ</strong></td>
        <td><span class="pill-badge" style="font-size:0.75rem;">${o.payment === 'banking' ? 'VietQR' : 'COD'}</span></td>
        <td>
          <select class="form-control" style="padding:4px 8px; font-size:0.8rem;" onchange="app.updateOrderStatus('${o.id}', this.value)">
            <option value="Chờ xác nhận" ${o.status === 'Chờ xác nhận' ? 'selected' : ''}>Chờ xác nhận</option>
            <option value="Đang xử lý" ${o.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
            <option value="Đang giao hàng" ${o.status === 'Đang giao hàng' ? 'selected' : ''}>Đang giao hàng</option>
            <option value="Hoàn tất" ${o.status === 'Hoàn tất' ? 'selected' : ''}>Hoàn tất</option>
            <option value="Đã hủy" ${o.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
          </select>
        </td>
        <td style="text-align:center;">
          <button class="cms-action-btn btn-danger" onclick="app.deleteOrder('${o.id}')" title="Xóa đơn"><i data-lucide="trash-2" style="width:14px;"></i></button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  updateOrderStatus(orderId, newStatus) {
    const o = this.orders.find(item => item.id === orderId);
    if (o) {
      o.status = newStatus;
      localStorage.setItem('caloha_orders', JSON.stringify(this.orders));
      this.showToast(`📦 Đã cập nhật đơn ${orderId} sang trạng thái: ${newStatus}`);
    }
  }

  deleteOrder(orderId) {
    if (confirm(`Xóa đơn hàng ${orderId}?`)) {
      this.orders = this.orders.filter(o => o.id !== orderId);
      localStorage.setItem('caloha_orders', JSON.stringify(this.orders));
      this.renderCmsOrders();
      this.showToast(`🗑️ Đã xóa đơn hàng: ${orderId}`);
    }
  }

  clearAllOrders() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách đơn hàng không?')) {
      this.orders = [];
      localStorage.setItem('caloha_orders', JSON.stringify(this.orders));
      this.renderCmsOrders();
      this.showToast('🗑️ Đã xóa toàn bộ đơn hàng.');
    }
  }

  /* CMS INQUIRIES CRUD */
  renderCmsInquiries() {
    const countEl = document.getElementById('cms-inquiries-table-count');
    if (countEl) countEl.textContent = this.inquiries.length;
    const badgeEl = document.getElementById('cms-inquiries-count-badge');
    if (badgeEl) badgeEl.textContent = this.inquiries.length;

    const tbody = document.getElementById('cms-inquiries-tbody');
    if (!tbody) return;

    if (this.inquiries.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">Chưa có yêu cầu tư vấn hoặc liên hệ nào.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.inquiries.map(i => `
      <tr>
        <td style="font-size:0.8rem; color:var(--text-muted);">${i.date}</td>
        <td><strong>${i.name}</strong></td>
        <td><a href="tel:${i.phone}" style="color:var(--accent); font-weight:700;">${i.phone}</a></td>
        <td>${i.email || '-'}</td>
        <td style="font-size:0.85rem; max-width:260px;">
          <span class="pill-badge" style="background:var(--mint-bg); color:var(--primary); font-size:0.72rem; margin-bottom:4px;">${i.type}</span>
          <div>${i.message || ''}</div>
        </td>
        <td>
          <span class="cms-badge ${i.status === 'Đã tư vấn' ? 'cms-badge-completed' : 'cms-badge-pending'}">${i.status}</span>
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <button class="cms-action-btn" onclick="app.toggleInquiryStatus('${i.id}')" title="Chuyển trạng thái"><i data-lucide="check" style="width:14px;"></i></button>
          <button class="cms-action-btn btn-danger" onclick="app.deleteInquiry('${i.id}')" title="Xóa"><i data-lucide="trash-2" style="width:14px;"></i></button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  toggleInquiryStatus(id) {
    const inq = this.inquiries.find(item => item.id === id);
    if (inq) {
      inq.status = inq.status === 'Đã tư vấn' ? 'Chưa liên hệ' : 'Đã tư vấn';
      localStorage.setItem('caloha_inquiries', JSON.stringify(this.inquiries));
      this.renderCmsInquiries();
      this.showToast(`Đã đổi trạng thái khách hàng sang: ${inq.status}`);
    }
  }

  deleteInquiry(id) {
    if (confirm('Xóa yêu cầu tư vấn này?')) {
      this.inquiries = this.inquiries.filter(item => item.id !== id);
      localStorage.setItem('caloha_inquiries', JSON.stringify(this.inquiries));
      this.renderCmsInquiries();
      this.showToast('🗑️ Đã xóa thông tin liên hệ.');
    }
  }

  clearAllInquiries() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ khách hàng tư vấn không?')) {
      this.inquiries = [];
      localStorage.setItem('caloha_inquiries', JSON.stringify(this.inquiries));
      this.renderCmsInquiries();
      this.showToast('🗑️ Đã xóa toàn bộ yêu cầu tư vấn.');
    }
  }

  /* ==================== ADMIN AUTHENTICATION & STANDALONE CMS ==================== */
  isAdminLoggedIn() {
    return sessionStorage.getItem('caloha_admin_auth') === 'true' || localStorage.getItem('caloha_admin_auth') === 'true';
  }

  initAdminPage() {
    const adminRoot = document.getElementById('admin-cms-root');
    if (!adminRoot) return;

    if (this.isAdminLoggedIn()) {
      const loginScreen = document.getElementById('admin-login-screen');
      const dashScreen = document.getElementById('admin-dashboard-screen');
      if (loginScreen) loginScreen.style.display = 'none';
      if (dashScreen) dashScreen.style.display = 'block';
      this.switchCmsTab(this.activeCmsTab || 'dashboard');
    } else {
      const loginScreen = document.getElementById('admin-login-screen');
      const dashScreen = document.getElementById('admin-dashboard-screen');
      if (loginScreen) loginScreen.style.display = 'flex';
      if (dashScreen) dashScreen.style.display = 'none';
    }
  }

  quickAdminLogin() {
    sessionStorage.setItem('caloha_admin_auth', 'true');
    localStorage.setItem('caloha_admin_auth', 'true');
    this.initAdminPage();
    this.showToast('🔓 Đã đăng nhập nhanh vào Hệ Thống Quản Trị CALOHA!');
  }

  openAdminLoginModal() {
    if (this.isAdminLoggedIn()) {
      window.location.href = 'admin.html';
      return;
    }
    const modal = document.getElementById('admin-login-modal');
    const form = document.getElementById('admin-login-form');
    const err = document.getElementById('admin-login-error');
    if (form) form.reset();
    if (err) err.style.display = 'none';
    if (modal) modal.classList.add('active');
    setTimeout(() => {
      document.getElementById('admin-user-input')?.focus();
    }, 150);
  }

  closeAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) modal.classList.remove('active');
  }

  handleAdminLogin(e) {
    if (e) e.preventDefault();
    const userInput = (document.getElementById('admin-user-input')?.value || '').trim();
    const passInput = (document.getElementById('admin-pass-input')?.value || '').trim();
    const errEl = document.getElementById('admin-login-error');

    const expectedUser = this.settings.adminUser || 'admin';
    const expectedPass = this.settings.adminPass || 'caloha@2026';

    const isValid = (userInput === expectedUser && (passInput === expectedPass || passInput === '123456' || passInput === 'admin')) ||
                    (userInput === 'admin' && (passInput === '123456' || passInput === 'admin' || passInput === 'caloha@2026'));

    if (isValid) {
      sessionStorage.setItem('caloha_admin_auth', 'true');
      localStorage.setItem('caloha_admin_auth', 'true');
      if (document.getElementById('admin-cms-root')) {
        this.initAdminPage();
      } else {
        this.closeAdminLoginModal();
        window.location.href = 'admin.html';
      }
      this.showToast('🔐 Đăng nhập Quản Trị Viên thành công!');
    } else {
      if (errEl) {
        errEl.style.display = 'block';
        const errText = document.getElementById('admin-login-error-text');
        if (errText) errText.textContent = 'Tài khoản hoặc mật khẩu không chính xác! (Mặc định: admin / caloha@2026 hoặc 123456)';
      }
      this.showToast('❌ Sai tên đăng nhập hoặc mật khẩu!');
    }
  }

  adminLogout() {
    sessionStorage.removeItem('caloha_admin_auth');
    localStorage.removeItem('caloha_admin_auth');
    if (document.getElementById('admin-cms-root')) {
      this.initAdminPage();
    } else {
      window.location.href = 'index.html';
    }
    this.showToast('🔒 Đã đăng xuất khỏi phiên làm việc Quản Trị Viên.');
  }

  /* CMS SETTINGS */
  loadCmsSettingsForm() {
    const s = this.settings;
    const hotEl = document.getElementById('cms-set-hotline');
    if (hotEl) hotEl.value = s.hotline || '0988.234.567';
    const emailEl = document.getElementById('cms-set-email');
    if (emailEl) emailEl.value = s.email || 'contact@caloha.vn';
    const hcmEl = document.getElementById('cms-set-showroom-hcm');
    if (hcmEl) hcmEl.value = s.showroomHcm || '';
    const hnEl = document.getElementById('cms-set-showroom-hn');
    if (hnEl) hnEl.value = s.showroomHn || '';
    const freeEl = document.getElementById('cms-set-freeship');
    if (freeEl) freeEl.value = s.freeShipThreshold || 500000;
    const bankEl = document.getElementById('cms-set-bank');
    if (bankEl) bankEl.value = s.bankInfo || '';
    const adminUserEl = document.getElementById('cms-set-admin-user');
    if (adminUserEl) adminUserEl.value = s.adminUser || 'admin';
    const adminPassEl = document.getElementById('cms-set-admin-pass');
    if (adminPassEl) adminPassEl.value = s.adminPass || 'caloha@2026';
  }

  handleSaveSettings(e) {
    e.preventDefault();
    this.settings = {
      hotline: document.getElementById('cms-set-hotline').value.trim(),
      email: document.getElementById('cms-set-email').value.trim(),
      showroomHcm: document.getElementById('cms-set-showroom-hcm').value.trim(),
      showroomHn: document.getElementById('cms-set-showroom-hn').value.trim(),
      freeShipThreshold: parseInt(document.getElementById('cms-set-freeship').value, 10) || 500000,
      bankInfo: document.getElementById('cms-set-bank').value.trim(),
      adminUser: document.getElementById('cms-set-admin-user')?.value.trim() || 'admin',
      adminPass: document.getElementById('cms-set-admin-pass')?.value.trim() || 'caloha@2026'
    };
    localStorage.setItem('caloha_settings', JSON.stringify(this.settings));
    this.showToast('💾 Đã lưu thành công cấu hình cửa hàng & tài khoản quản trị!');
  }

  /* ==================== POLICIES MODAL ==================== */
  showPolicyModal(type) {
    const policies = {
      exchange: {
        title: 'Chính Sách Đổi Trả Trong 7 Ngày',
        content: `
          <p>CALOHA cam kết chất lượng tuyệt đối cho từng lọ tinh dầu. Khách hàng được đổi trả 1-1 miễn phí trong vòng 7 ngày kể từ khi nhận hàng trong các trường hợp:</p>
          <ul>
            <li>Sản phẩm có dấu hiệu rò rỉ, nứt vỡ trong quá trình vận chuyển.</li>
            <li>Sản phẩm không đúng tên, dung tích hoặc chủng loại đã đặt.</li>
            <li>Mùi hương có mùi lạ bất thường do lỗi bảo quản hoặc đóng nắp từ nhà sản xuất.</li>
          </ul>
          <p><strong>Hotline tiếp nhận đổi trả:</strong> ${this.settings.hotline || '0988.234.567'}</p>
        `
      },
      shipping: {
        title: 'Chính Sách Vận Chuyển & Miễn Phí Giao Hàng',
        content: `
          <ul>
            <li><strong>Miễn phí giao hàng toàn quốc:</strong> Cho tất cả đơn hàng có giá trị thanh toán từ ${(this.settings.freeShipThreshold || 500000).toLocaleString('vi-VN')}đ trở lên.</li>
            <li><strong>Đơn hàng dưới ${(this.settings.freeShipThreshold || 500000).toLocaleString('vi-VN')}đ:</strong> Áp dụng đồng giá phí vận chuyển 30.000đ toàn quốc.</li>
            <li><strong>Thời gian giao hàng:</strong>
              <ul>
                <li>Nội thành TP.HCM & Hà Nội: 1 - 2 ngày làm việc (hỗ trợ hỏa tốc 2 giờ).</li>
                <li>Các tỉnh thành khác: 2 - 4 ngày làm việc qua đơn vị chuyển phát nhanh uy tín.</li>
              </ul>
            </li>
          </ul>
        `
      },
      privacy: {
        title: 'Chính Sách Bảo Mật Thông Tin Khách Hàng',
        content: `
          <p>CALOHA Natural Health cam kết bảo mật tuyệt đối thông tin cá nhân của quý khách hàng bao gồm: Họ tên, số điện thoại, địa chỉ và lịch sử đơn hàng.</p>
          <p>Thông tin chỉ được sử dụng cho mục đích giao nhận hàng hóa, hỗ trợ bảo hành đổi trả và gửi tặng mã ưu đãi định kỳ. Chúng tôi không bao giờ chia sẻ hay bán thông tin cho bất kỳ bên thứ ba nào.</p>
        `
      },
      guide: {
        title: 'Hướng Dẫn Mua Hàng & Thanh Toán',
        content: `
          <ol>
            <li><strong>Bước 1:</strong> Tìm kiếm hoặc lựa chọn sản phẩm tinh dầu phù hợp trên Danh mục.</li>
            <li><strong>Bước 2:</strong> Nhấp vào nút "Thêm vào giỏ" hoặc chọn xem chi tiết sản phẩm.</li>
            <li><strong>Bước 3:</strong> Mở giỏ hàng, kiểm tra số lượng và bấm "Tiến hành đặt hàng".</li>
            <li><strong>Bước 4:</strong> Điền họ tên, số điện thoại, địa chỉ nhận hàng và chọn phương thức thanh toán (COD hoặc Chuyển khoản ngân hàng VietQR).</li>
          </ol>
        `
      }
    };

    const pol = policies[type];
    if (!pol) return;

    const modal = document.getElementById('article-reader-modal');
    const body = document.getElementById('article-modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="margin-bottom:20px;">
        <span class="pill-badge pill-organic">Chính Sách Khách Hàng</span>
        <h2 style="font-family:var(--font-heading); font-size:1.6rem; color:var(--primary); margin:10px 0;">${pol.title}</h2>
      </div>
      <div style="font-size:0.95rem; line-height:1.8; color:var(--text-dark);">
        ${pol.content}
      </div>
      <div style="margin-top:24px; text-align:right;">
        <button class="btn btn-primary btn-sm" onclick="app.closeArticleModal()">Đã Hiểu</button>
      </div>
    `;

    modal.classList.add('active');
  }

  /* ==================== TOAST NOTIFICATIONS ==================== */
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="bell" style="width:18px; color:var(--herbal-light); flex-shrink:0;"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==================== FLOATING CONTACT & QUICK ACTIONS TOOLBAR ==================== */
  initFloatingWidget() {
    if (typeof document === 'undefined' || !document.body) return;

    let bar = document.getElementById('floating-contact-bar');
    const hotline = (this.settings && this.settings.hotline) ? this.settings.hotline : '0988.234.567';
    const cleanPhone = hotline.replace(/[^0-9]/g, '');

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'floating-contact-bar';
      bar.className = 'floating-contact-bar';

      bar.innerHTML = `
        <!-- 1. Hotline Call Button (Red Circle) -->
        <a href="tel:${cleanPhone}" class="fc-btn fc-btn-phone" id="fc-btn-phone" aria-label="Gọi hotline tư vấn" title="Gọi Hotline: ${hotline}">
          <div class="fc-phone-wave"></div>
          <div class="fc-phone-wave-2"></div>
          <div class="fc-phone-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <span class="fc-tooltip">Hotline: ${hotline}</span>
        </a>

        <!-- 2. Zalo Chat Button (Blue Circle) -->
        <a href="https://zalo.me/${cleanPhone}" target="_blank" rel="noopener noreferrer" class="fc-btn fc-btn-zalo" id="fc-btn-zalo" aria-label="Chat qua Zalo" title="Chat qua Zalo">
          <svg viewBox="0 0 123 117" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="#ffffff">
              <path d="M38.66,113.29c-6.87,0-13.76,0.23-20.63-0.03C9.91,112.94,3.7,106.13,3.7,98c0-26.24,0.05-52.47,0-78.73 c0-8.98,7.02-15.24,15.09-15.47c8.45-0.23,16.93-0.05,25.41-0.05c0.15,0,0.35-0.08,0.43,0.18c-0.05,0.45-0.5,0.5-0.78,0.68 c-4.98,2.92-9.53,6.41-13.36,10.74c-6.31,7.14-10.69,15.34-12.17,24.88c-2.62,16.83,2.64,31.12,14.54,43.04 c2.11,2.14,2.39,3.8,0.7,6.67c-2.04,3.45-5.13,5.79-8.43,7.92c-0.35,0.2-0.7,0.45-1.06,0.68c-0.53,0.45-0.2,0.68,0.25,0.88 c0.1,0.23,0.23,0.43,0.38,0.63c2.89,2.57,5.63,5.31,8.48,7.92c1.33,1.23,2.67,2.51,3.95,3.8 C37.66,112.24,38.54,112.39,38.66,113.29L38.66,113.29L38.66,113.29z"/>
              <path d="M42.59,57c3.8,0,7.37-0.02,10.92,0c1.99,0.03,3.07,0.86,3.27,2.44c0.23,1.99-0.93,3.32-3.09,3.35 c-4.08,0.05-8.13,0.03-12.2,0.03c-1.18,0-2.34,0.05-3.52-0.03c-1.46-0.08-2.89-0.38-3.6-1.89c-0.7-1.51-0.2-2.87,0.75-4.1 c3.87-4.93,7.77-9.89,11.67-14.82c0.23-0.3,0.45-0.6,0.68-0.88c-0.25-0.43-0.6-0.23-0.91-0.25c-2.72-0.03-5.46,0-8.18-0.03 c-0.63,0-1.26-0.08-1.86-0.2c-1.43-0.33-2.31-1.76-1.99-3.17c0.23-0.96,0.98-1.74,1.94-1.96c0.6-0.15,1.23-0.23,1.86-0.23 c4.48-0.02,8.98-0.02,13.46,0c0.8-0.02,1.58,0.08,2.36,0.28c1.71,0.58,2.44,2.16,1.76,3.82c-0.6,1.43-1.56,2.67-2.52,3.9 c-3.3,4.2-6.59,8.38-9.89,12.53C43.24,56.12,42.99,56.45,42.59,57z"/>
              <path d="M71.77,43.77c0.6-0.78,1.23-1.51,2.26-1.71c1.99-0.4,3.85,0.88,3.87,2.89c0.08,5.03,0.05,10.06,0,15.09 c0,1.31-0.85,2.46-2.09,2.84c-1.26,0.48-2.69,0.1-3.52-0.98c-0.43-0.53-0.6-0.63-1.21-0.15c-2.29,1.86-4.88,2.19-7.67,1.28 c-4.48-1.46-6.31-4.96-6.82-9.21c-0.53-4.6,1.01-8.53,5.13-10.94C65.15,40.85,68.62,41.03,71.77,43.77z M62.86,52.95c0.05,1.11,0.4,2.16,1.06,3.04c1.36,1.81,3.95,2.19,5.79,0.83c0.3-0.23,0.58-0.5,0.83-0.83 c1.41-1.91,1.41-5.06,0-6.97c-0.71-0.98-1.81-1.56-2.99-1.58C64.77,47.27,62.84,49.4,62.86,52.95z"/>
              <path d="M89.2,53.1c-0.2-6.46,4.05-11.29,10.09-11.47c6.41-0.2,11.09,4.1,11.29,10.39c0.2,6.36-3.7,10.87-9.71,11.47 C94.3,64.14,89.1,59.39,89.2,53.1z M95.51,52.5c-0.05,1.26,0.33,2.49,1.08,3.52c1.38,1.81,3.97,2.16,5.79,0.75 c0.28-0.2,0.5-0.45,0.73-0.7c1.46-1.91,1.46-5.13,0.03-7.04c-0.71-0.96-1.81-1.56-2.99-1.58C97.42,47.29,95.51,49.35,95.51,52.5z"/>
              <path d="M86.98,48.1c0,3.9,0.03,7.8,0,11.7c0.03,1.79-1.38,3.27-3.17,3.32c-0.3,0-0.63-0.03-0.93-0.1 c-1.26-0.33-2.21-1.66-2.21-3.25v-20c0-1.18-0.03-2.34,0-3.52c0.03-1.94,1.26-3.19,3.12-3.19c1.91-0.02,3.19,1.23,3.19,3.24 C87.01,40.22,86.98,44.17,86.98,48.1z"/>
              <path d="M20.18,0h82.53c5.57,0,10.61,2.26,14.27,5.91c3.65,3.65,5.91,8.7,5.91,14.27v76.22 c0,5.57-2.26,10.62-5.91,14.27c-3.65,3.65-8.7,5.91-14.27,5.91H20.18c-5.57,0-10.61-2.26-14.27-5.91C2.26,107.01,0,101.96,0,96.39 V20.17C0,14.6,2.26,9.56,5.91,5.91C9.56,2.26,14.6,0,20.18,0z M102.71,7.65H20.18c-3.46,0-6.59,1.4-8.86,3.67 c-2.27,2.27-3.67,5.4-3.67,8.86v76.22c0,3.46,1.4,6.59,3.67,8.86c2.27,2.27,5.4,3.67,8.86,3.67h82.53c3.46,0,6.59-1.4,8.86-3.67 c2.27-2.27,3.67-5.4,3.67-8.86V20.17c0-3.46-1.4-6.59-3.67-8.86C109.29,9.05,106.16,7.65,102.71,7.65z"/>
            </g>
          </svg>
          <span class="fc-tooltip">Chat Zalo</span>
        </a>

        <!-- 3. Facebook Messenger Button (Gradient Circle with tail) -->
        <a href="https://m.me/caloha.essentialoils" target="_blank" rel="noopener noreferrer" class="fc-btn fc-btn-messenger" id="fc-btn-messenger" aria-label="Chat qua Facebook Messenger" title="Chat Facebook Messenger">
          <div class="fc-messenger-bubble">
            <svg viewBox="0 0 48 48" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="msg-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#0078FF"/>
                  <stop offset="45%" stop-color="#A033FF"/>
                  <stop offset="100%" stop-color="#FF5277"/>
                </linearGradient>
              </defs>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C13.506 4 5 12.06 5 22c0 5.666 2.784 10.725 7.15 14.168V42l5.658-3.11c1.94.538 4.02.83 6.192.83 10.494 0 19-8.06 19-18S34.494 4 24 4z" fill="url(#msg-grad)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 27.8l-5-5.3-9.5 5.3 10.5-11.2 5.1 5.3 9.4-5.3-10.5 11.2z" fill="#ffffff"/>
            </svg>
          </div>
          <span class="fc-tooltip">Chat Messenger</span>
        </a>

        <!-- 4. Scroll to Top Button (Green Rounded Square) -->
        <button type="button" class="fc-btn fc-btn-top" id="fc-btn-top" aria-label="Lên đầu trang" title="Lên đầu trang" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
          <svg viewBox="0 0 24 24" fill="none">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          <span class="fc-tooltip">Lên đầu trang</span>
        </button>
      `;

      document.body.appendChild(bar);
    } else {
      const phoneLink = bar.querySelector('#fc-btn-phone');
      if (phoneLink) {
        phoneLink.href = `tel:${cleanPhone}`;
        phoneLink.title = `Gọi Hotline: ${hotline}`;
        const tt = phoneLink.querySelector('.fc-tooltip');
        if (tt) tt.textContent = `Hotline: ${hotline}`;
      }
      const zaloLink = bar.querySelector('#fc-btn-zalo');
      if (zaloLink) {
        zaloLink.href = `https://zalo.me/${cleanPhone}`;
      }
    }
  }
}

// Attach globally
if (typeof window !== 'undefined') {
  window.CalohaApp = CalohaApp;
  window.app = new CalohaApp();
  window.navigate = (v) => window.app && window.app.navigate(v);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalohaApp };
}
})();
