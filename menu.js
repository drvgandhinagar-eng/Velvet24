/* menu.js
  Loads menu-data.json and renders a magazine-style menu.
  Features:
    - Search (by name + description)
    - Sticky category nav (jump to category)
    - Item detail modal
    - Works with large menus (250+)
*/

(async function(){
  // helper
  function el(tag, attrs={}, children=[]){
    const e = document.createElement(tag);
    for(const k in attrs){ if(k.startsWith('on')) e.addEventListener(k.substring(2), attrs[k]); else if(k==='html') e.innerHTML=attrs[k]; else e.setAttribute(k, attrs[k]); }
    (Array.isArray(children)?children:[children]).forEach(c=>{ if(!c) return; if(typeof c==='string') e.appendChild(document.createTextNode(c)); else e.appendChild(c); });
    return e;
  }

  // load JSON
  const dataUrl = window.MENU_DATA_FILE || 'menu-data.json';
  let menuData = {};
  try {
    const resp = await fetch(dataUrl);
    menuData = await resp.json();
  } catch(err){
    console.error("Failed to load menu data:", err);
    // show message
    document.getElementById('menuGrid').innerHTML = '<p style="color:#900">Failed to load menu-data.json. Check path and commit file.</p>';
    return;
  }

  const menuGrid = document.getElementById('menuGrid');
  const categoryNav = document.getElementById('categoryNav');
  const searchInput = document.getElementById('menuSearch');
  const categoryFilter = document.getElementById('categoryFilter');

  // create category list
  const categories = Object.keys(menuData);
  categories.forEach(cat=>{
    // category nav buttons
    const btn = el('button',{class:'cat-btn', onclick:()=>{ document.getElementById('cat-'+slug(cat)).scrollIntoView({behavior:'smooth', block:'start'}); }}, cat);
    categoryNav.appendChild(btn);
    // category filter option
    const opt = el('option',{value:cat}, cat);
    categoryFilter.appendChild(opt);
  });

  // render categories
  function slug(s){ return s.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,''); }

  function renderFiltered(filterText='', categoryOnly=''){
    menuGrid.innerHTML = '';
    const q = (filterText||'').trim().toLowerCase();

    categories.forEach(cat=>{
      if(categoryOnly && categoryOnly !== '' && cat !== categoryOnly) return;

      const items = menuData[cat].filter(item=>{
        if(!q) return true;
        const hay = (item.name + ' ' + (item.description||'')).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      if(items.length === 0) return;

      const block = el('div',{class:'category-block', id:'cat-'+slug(cat)});
      const heading = el('h3',{}, cat);
      block.appendChild(heading);

      items.forEach(it=>{
        const itemEl = el('div',{class:'menu-item'});
        const left = el('div',{class:'mi-left'});
        const title = el('h4',{}, it.name);
        // optional badges (basic heuristic)
        const nameLower = it.name.toLowerCase();
        if(nameLower.includes('paneer') || nameLower.includes('veg') || (it.tags && it.tags.includes('veg'))){
          const b = el('span',{class:'badge badge--veg'}, 'Veg');
          title.appendChild(b);
        }
        if(nameLower.includes('spicy') || (it.tags && it.tags.includes('spicy'))){
          const b2 = el('span',{class:'badge badge--spicy'}, 'Spicy');
          title.appendChild(b2);
        }
        if(it.tags && it.tags.includes('chef')){
          const b3 = el('span',{class:'badge badge--chef'}, 'Signature');
          title.appendChild(b3);
        }
        left.appendChild(title);
        if(it.description){
          left.appendChild(el('p',{class:'desc'}, it.description));
        }
        const right = el('div',{class:'mi-right'}, it.price ? (typeof it.price === 'number' ? '₹'+it.price : it.price) : '');
        itemEl.appendChild(left);
        itemEl.appendChild(right);

        // click opens modal with details
        itemEl.addEventListener('click', ()=>{
          openModal(it);
        });

        block.appendChild(itemEl);
      });

      menuGrid.appendChild(block);
    });

    // highlight active nav
    setTimeout(()=>{ // small timeout to allow any scroll snap
      document.querySelectorAll('.category-nav button').forEach(btn=>{
        btn.classList.remove('active');
      });
    },50);
  }

  // initial render
  renderFiltered();

  // search handler
  let timer = null;
  searchInput.addEventListener('input', (e)=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{ renderFiltered(searchInput.value, categoryFilter.value); }, 120);
  });

  categoryFilter.addEventListener('change', ()=>{
    renderFiltered(searchInput.value, categoryFilter.value);
  });

  // modal functions
  const modal = document.getElementById('itemModal');
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  function openModal(item){
    modalName.textContent = item.name || '';
    modalPrice.textContent = item.price ? (typeof item.price==='number' ? '₹'+item.price : item.price) : '';
    modalDesc.textContent = item.description || '';
    modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  // order button behavior - opens Order links (swiggy/zomato) or fallback
  const orderBtn = document.getElementById('orderNowBtn');
  if(orderBtn){
    orderBtn.addEventListener('click', ()=>{
      // open Swiggy by default (you can change)
      window.open('https://www.swiggy.com/city/ahmedabad/velvet-24-restaurant-and-banquet-gandhinagar-rest1133323','_blank');
    });
  }

})();
