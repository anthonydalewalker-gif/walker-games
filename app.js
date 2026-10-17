const $=s=>document.querySelector(s);let apps=[],cat='All';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('#yr').textContent=new Date().getFullYear();
fetch('apps.json').then(r=>r.json()).then(d=>{apps=d;renderCats();render();const id=location.hash.slice(5);if(location.hash.startsWith('#app-'))open(id);});
function renderCats(){const cs=['All',...new Set(apps.map(a=>a.category))];$('#cats').innerHTML=cs.map(c=>`<button class="chip ${c===cat?'on':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
 $('#cats').querySelectorAll('button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;renderCats();render();});}
function render(){const q=$('#q').value.toLowerCase();
 const list=apps.filter(a=>(cat==='All'||a.category===cat)&&[a.name,a.description,...(a.tags||[])].join(' ').toLowerCase().includes(q));
 $('#grid').innerHTML=list.map(a=>`<article class="card" data-id="${esc(a.id)}"><span class="price">${a.price==='free'?'FREE':esc(a.price)}</span>
 <img src="${esc(a.icon)}" alt="">${a.featured?"<span class=\"feat\">🔥 FEATURED</span>":""}<h3>${esc(a.name)}</h3><p>${esc(a.description)}</p>${a.premium?'<span class="prem">★ PREMIUM</span> ':''}${(a.tags||[]).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</article>`).join('')||'<p>No apps found.</p>';
 $('#grid').querySelectorAll('.card').forEach(c=>c.onclick=()=>open(c.dataset.id));}
function open(id){const a=apps.find(x=>x.id===id);if(!a)return;history.replaceState(null,'','#app-'+id);
 $('#dlgBody').innerHTML=`<img src="${esc(a.icon)}" width="80" style="border-radius:16px"><h2>${esc(a.name)}</h2><p>${esc(a.description)}</p>
 <p>${(a.tags||[]).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</p><p><b>Category:</b> ${esc(a.category)} · <b>Price:</b> ${a.price==='free'?'Free':esc(a.price)}</p>
 <a class="btn" href="${esc(a.url)}" target="_blank" rel="noopener">▶ Launch / Install</a> ${a.premium&&a.paymentLink?`<a class="prem" style="padding:12px 16px" href="${esc(a.paymentLink)}" target="_blank" rel="noopener">★ Get Premium</a>`:''}
 <p style="color:var(--mut);font-size:.8rem">Tip: after launching, use your browser's “Install” / “Add to Home Screen”.</p>`;$('#dlg').showModal();}
$('#dlg').addEventListener('close',()=>history.replaceState(null,'',location.pathname));
$('#q').oninput=render;
let dp;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('#installHub').hidden=false;});
$('#installHub').onclick=()=>{dp&&dp.prompt();};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
