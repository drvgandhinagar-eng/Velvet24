/* menu.js — collapsible category cards with images + search + modal
   Overwrite your old menu.js with this file.
*/

(async function(){

  // tiny helpers
  function el(tag, attrs={}, children=[]){
    const e = document.createElement(tag);
    for(const k in attrs){
      if(k.startsWith('on') && typeof attrs[k] === 'function'){
        e.addEventListener(k.substring(2), attrs[k]);
      } else if(k === 'html'){
        e.innerHTML = attrs[k];
      } else {
        e.setAttribute(k, attrs[k]);
      }
    }
    (Array.isArray(children)?children:[children]).forEach(c=>{
      if(!c) return;
      if(typeof c === 'string') e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    });
    return e;
  }

  // slug helper (must match image filenames)
  function slug(s){ return String(s||'').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,''); }

  // load json
  const dataUrl = window.MENU_DATA_FILE || 'menu-data.json';
  let menuData = {};
  try {
    const res = await fetch(dataUrl);
    menuData = await res.json();
  } catch(err){
    console.error("Failed to load menu-data.json", err);
    document.getElementById('menuGrid').innerHTML = '<p style="color:#fff">Failed to load menu-data.json — check file path.</p>';
    return;
  }

  // DOM refs
  const menuGrid = document.getElementById('menuGrid');
  const categoryNav = document.getElementById('categoryNav');
  const searchInput = document.getElementById('menuSearch');
  const categoryFilter = document.getElementById('categoryFilter');

  // categories array
  const categories = Object.keys(menuData);

  /* ---------- Render category cards grid (top visual navigation) ---------- */
  function renderCategoryCards(){
    categoryNav.innerHTML = ''; // reuse nav for cards area (horizontal)
    const cardsWrap = el('div',{class:'category-cards-wrap'});
    categories.forEach(cat=>{
      const catSlug = slug(cat);
      const card = el('button',{
        class:'category-card',
        onclick: ()=>{ // scroll to that category and open it
          const target = document.getElementById('cat-'+catSlug);
          if(target){
            // open this category if collapsed
            const list = target.querySelector('.items-collapsible');
            if(list && list.classList.contains('collapsed')){
              toggleCollapse(list);
            }
            target.scrollIntoView({behavior:'smooth', block:'start'});
          }
        }
      });

      // image path: images/categories/<slug>.jpg (fallback to svg placeholder)
      const imgPath = `images/categories/${catSlug}.jpg`;
      const img = el('img',{class:'cat-thumb', src: imgPath, alt: cat});
      // on image error show transparent placeholder (prevents broken icon)
      img.addEventListener('error', ()=>{ img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="160"><rect width="100%" height="100%" fill="#3b0f26"/><text x="50%" y="50%" fill="#cc9b33" font-size="18" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">`+cat+`</text></svg>`); });

      const label = el('div',{class:'cat-label'}, cat);
      card.appendChild(img);
      card.appendChild(label);
      cardsWrap.appendChild(card);

      // also add option to categoryFilter
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
    categoryNav.appendChild(cardsWrap);
  }

  /* ---------- Render the magazine columns but with collapsible categories ---------- */
  function renderAll(filterText=''){
    menuGrid.innerHTML = '';

    // create three columns for magazine-like look
    const cols = [el('div',{class:'column'}), el('div',{class:'column'}), el('div',{class:'column'})];
    menuGrid.appendChild(cols[0]);
    menuGrid.appendChild(cols[1]);
    menuGrid.appendChild(cols[2]);

    let colIndex = 0;
    const q = (filterText||'').trim().toLowerCase();

    categories.forEach(cat=>{
      const items = menuData[cat].filter(it=>{
        if(!q) return true;
        const hay = (it.name + ' ' + (it.description||'')).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      if(items.length === 0) return;

      const block = el('div',{class:'category-block', id:'cat-'+slug(cat)});
      // heading + optional image below
      const heading = el('h3',{}, cat);
      block.appendChild(heading);

      // image under heading in the block (optional)
      const img = el('img',{class:'category-block-img', src:`images/categories/${slug(cat)}.jpg`, alt:cat});
      img.addEventListener('error', ()=>{ img.style.display='none'; });
      block.appendChild(img);

      // collapse control (button)
      const toggleBtn = el('button',{class:'collapse-toggle', onclick: (e)=>{ e.preventDefault(); toggleCollapse(itemsWrap); } }, "Show items");
      block.appendChild(toggleBtn);

      // collapsible items container (initially collapsed)
      const itemsWrap = el('div',{class:'items-collapsible collapsed'});
      items.forEach(it=>{
        const itemEl = el('div',{class:'menu-item'});
        const left = el('div',{class:'mi-left'});
        const title = el('h4',{}, it.name);
        if(it.description && it.description.trim()) left.appendChild(el('p',{class:'desc'}, it.description));
        left.appendChild(document.createElement('div')); // spacer
        const right = el('div',{class:'mi-right'}, it.price ? (typeof it.price === 'number' ? '₹'+it.price : it.price) : '');
        itemEl.appendChild(left);
        itemEl.appendChild(right);

        // clicking item opens modal for details
        itemEl.addEventListener('click', ()=> openModal(it) );

        itemsWrap.appendChild(itemEl);
      });

      block.appendChild(itemsWrap);

      // append block to column (round-robin to balance)
      cols[colIndex % cols.length].appendChild(block);
      colIndex++;
    });
  }

  // collapse toggle behavior
  function toggleCollapse(node){
    if(!node) return;
    node.classList.toggle('collapsed');
    const btn = node.previousSibling && node.previousSibling.classList && node.previousSibling.class.contains && node.previousSibling;
    // find the toggle button (we inserted it before itemsWrap)
    // simpler: toggle the text on the nearest button
    const parent = node.parentElement;
    if(parent){
      const tBtn = parent.querySelector('.collapse-toggle');
      if(tBtn){
        tBtn.textContent = node.classList.contains('collapsed') ? 'Show items' : 'Hide items';
      }
    }
  }

  /* ---------- Modal ---------- */
  const modal = document.getElementById('itemModal');
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  function openModal(item){
    modalName.textContent = item.name || '';
    modalPrice.textContent = item.price ? (typeof item.price === 'number' ? '₹'+item.price : item.price) : '';
    modalDesc.textContent = item.description || '';
    modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  /* ---------- Search and filter handlers ---------- */
  renderCategoryCards();
  renderAll();

  // search
  let searchTimer = null;
  searchInput.addEventListener('input', (e)=>{
    clearTimeout(searchTimer);
    searchTimer = setTimeout(()=>{ renderAll(searchInput.value); }, 150);
  });

  categoryFilter.addEventListener('change', ()=>{
    const val = categoryFilter.value;
    if(val === '') { renderAll(searchInput.value); return; }
    // render only selected category (open it automatically)
    menuGrid.innerHTML = '';
    const col = el('div',{class:'column'});
    menuGrid.appendChild(col);
    const cat = val;
    const items = menuData[cat] || [];
    if(items.length){
      const block = el('div',{class:'category-block', id:'cat-'+slug(cat)});
      block.appendChild(el('h3',{}, cat));
      const img = el('img',{class:'category-block-img', src:`images/categories/${slug(cat)}.jpg`, alt:cat});
      img.addEventListener('error', ()=>{ img.style.display='none'; });
      block.appendChild(img);
      const itemsWrap = el('div',{class:'items-collapsible'}); // open by default
      items.forEach(it=>{
        const itemEl = el('div',{class:'menu-item'});
        const left = el('div',{class:'mi-left'});
        left.appendChild(el('h4',{}, it.name));
        if(it.description) left.appendChild(el('p',{class:'desc'}, it.description));
        const right = el('div',{class:'mi-right'}, it.price ? (typeof it.price === 'number' ? '₹'+it.price : it.price) : '');
        itemEl.appendChild(left); itemEl.appendChild(right);
        itemEl.addEventListener('click', ()=> openModal(it));
        itemsWrap.appendChild(itemEl);
      });
      block.appendChild(itemsWrap);
      col.appendChild(block);
      itemsWrap.classList.remove('collapsed');
      const btn = block.querySelector('.collapse-toggle');
      if(btn) btn.textContent = 'Hide items';
    }
  });

  // Order button fallback (open Swiggy)
  const orderBtn = document.getElementById('orderNowBtn');
  if(orderBtn) orderBtn.addEventListener('click', ()=> window.open('https://www.swiggy.com/city/ahmedabad/velvet-24-restaurant-and-banquet-gandhinagar-rest1133323','_blank'));

})();
