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

    // Orders state with localStorage persistence
    this.orders = JSON.parse(localStorage.getItem('caloha_orders') || '[]');

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
    if (!fullGrid) return;

    let list = [...this.articles];
    if (this.activeArticleCategory !== 'all') {
      list = list.filter(a => a.category === this.activeArticleCategory);
    }

    fullGrid.innerHTML = list.map(art => `
      <div class="article-card" onclick="app.openArticleModal('${art.id}')">
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
          <p class="article-desc">${art.excerpt}</p>
          <span class="article-more">Đọc bài viết chi tiết &rarr;</span>
        </div>
      </div>
    `).join('');

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
      <div style="margin-top:30px; padding-top:20px; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.85rem; color:var(--text-muted);">CALOHA Aromatherapy Knowledge Base</span>
        <button class="btn btn-primary btn-sm" onclick="app.navigate('catalog'); app.closeArticleModal();">Xem Sản Phẩm Tinh Dầu</button>
      </div>
    `;

    modal.classList.add('active');
  }

  closeArticleModal() {
    const modal = document.getElementById('article-reader-modal');
    if (modal) modal.classList.remove('active');
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

  /* ==================== ADMIN AUTHENTICATION ==================== */
  isAdminLoggedIn() {
    return sessionStorage.getItem('caloha_admin_auth') === 'true';
  }

  openAdminLoginModal() {
    if (this.isAdminLoggedIn()) {
      this.navigate('cms');
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
    e.preventDefault();
    const userInput = document.getElementById('admin-user-input').value.trim();
    const passInput = document.getElementById('admin-pass-input').value;
    const errEl = document.getElementById('admin-login-error');

    const expectedUser = this.settings.adminUser || 'admin';
    const expectedPass = this.settings.adminPass || 'caloha@2026';

    if (userInput === expectedUser && passInput === expectedPass) {
      sessionStorage.setItem('caloha_admin_auth', 'true');
      this.closeAdminLoginModal();
      this.navigate('cms');
      this.showToast('🔐 Đăng nhập Quản Trị Viên thành công!');
    } else {
      if (errEl) {
        errEl.style.display = 'block';
        document.getElementById('admin-login-error-text').textContent = 'Tên đăng nhập hoặc mật khẩu không chính xác!';
      }
    }
  }

  adminLogout() {
    sessionStorage.removeItem('caloha_admin_auth');
    this.navigate('home');
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
