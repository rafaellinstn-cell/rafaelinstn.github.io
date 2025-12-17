document.addEventListener('DOMContentLoaded', ()=>{
  const menuBtn = document.getElementById('menu-btn');
  const sideMenu = document.getElementById('side-menu');
  const brandBtns = document.querySelectorAll('.brand-btn');
  const productsGrid = document.getElementById('products-grid');
  const yearEl = document.getElementById('year');
  const shopNow = document.getElementById('shop-now');

  yearEl.textContent = new Date().getFullYear();

  // Toggle menu
  function openMenu(){
    menuBtn.classList.add('open');
    sideMenu.classList.add('open');
    menuBtn.setAttribute('aria-expanded','true');
    sideMenu.setAttribute('aria-hidden','false');
  }
  function closeMenu(){
    menuBtn.classList.remove('open');
    sideMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    sideMenu.setAttribute('aria-hidden','true');
  }
  menuBtn.addEventListener('click', ()=>{
    if(menuBtn.classList.contains('open')) closeMenu(); else openMenu();
  });

  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e)=>{
    if(!sideMenu.contains(e.target) && !menuBtn.contains(e.target) && sideMenu.classList.contains('open')){
      closeMenu();
    }
  });

  // Render products
  function renderProducts(list){
    productsGrid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.dataset.brand = p.brand;

      const thumb = document.createElement('div');
      thumb.className = 'product-thumb';
      const img = document.createElement('img');
      img.src = p.img;
      img.alt = p.name;
      thumb.appendChild(img);

      const info = document.createElement('div');
      info.className = 'product-info';
      const name = document.createElement('div'); name.className='model'; name.textContent = p.name;
      const price = document.createElement('div'); price.className='price'; price.textContent = p.price;
      info.appendChild(name); info.appendChild(price);

      card.appendChild(thumb);
      card.appendChild(info);

      // make the card clickable (open product detail placeholder)
      card.addEventListener('click', ()=>{alert(`${p.brand} — ${p.name} — ${p.price}`)});

      productsGrid.appendChild(card);
    });
  }

  // Initial render
  renderProducts(PRODUCTS);

  // Filter by brand
  function filterByBrand(brand){
    if(brand === 'ALL'){ renderProducts(PRODUCTS); return }
    const filtered = PRODUCTS.filter(p => p.brand === brand);
    renderProducts(filtered);
  }

  brandBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
      const b = btn.dataset.brand;
      filterByBrand(b);
      // highlight active state
      brandBtns.forEach(x=>x.classList.remove('active'))
      btn.classList.add('active');
      // close menu for mobile
      closeMenu();
    });
    btn.addEventListener('mouseenter', ()=> btn.classList.add('hover'))
    btn.addEventListener('mouseleave', ()=> btn.classList.remove('hover'))
  });

  // CTA behavior
  shopNow.addEventListener('click', ()=>{
    window.location.hash = '#products';
    // small effect
    document.querySelector('#products .section-title').scrollIntoView({behavior:'smooth'});
  });

  // Add entrance animation to hero sneaker
  const hero = document.getElementById('hero');
  setTimeout(()=> hero.classList.add('mounted'), 120);

  // Accessibility: close menu with Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && sideMenu.classList.contains('open')) closeMenu();
  });

});
