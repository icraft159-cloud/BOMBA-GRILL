'use strict';

/* ========== CONFIG ========== */
const CONFIG = {
  whatsappNumber: '5585994034254',
  whatsappDisplay: '(85) 99403-4254',
  businessName: 'BOMBA GRILL',
  deliveryFee: null,
  deliveryFeeText: 'A combinar',
  estimatedDelivery: '40 minutos',
  hours: 'Ter a Dom: 18h às 23h<br>Segunda: Fechado',
  address: 'Consulte nosso endereço pelo WhatsApp',
  currency: 'BRL'
};

/* ========== PRODUTOS ========== */
const produtos = [
  { id:'p1', nome:'Picanha na Chapa', categoria:'pratos', descricao:'Picanha grelhada na brasa, arroz soltinho, farofa crocante, vinagrete fresco e batata frita.', preco:54.90, imagem:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', badge:'vendido', maisVendido:true, adicionais:[{nome:'Queijo coalho',preco:6},{nome:'Ovo frito',preco:3},{nome:'Porção extra de arroz',preco:5}] },
  { id:'p2', nome:'Frango ao Molho Madeira', categoria:'pratos', descricao:'Peito de frango grelhado com molho madeira cremoso, arroz e legumes salteados.', preco:39.90, imagem:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80', adicionais:[{nome:'Queijo gratinado',preco:5},{nome:'Batata palha',preco:3}] },
  { id:'p3', nome:'Costela no Bafo', categoria:'pratos', descricao:'Costela bovina cozida lentamente, desmanchando, com mandioca e arroz.', preco:59.90, imagem:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', badge:'novidade', adicionais:[{nome:'Farofa especial',preco:4},{nome:'Vinagrete extra',preco:3}] },
  { id:'l1', nome:'Burger Bomba Grill', categoria:'lanches', descricao:'Pão brioche artesanal, blend 180g, cheddar duplo, bacon crocante e molho da casa.', preco:32.90, imagem:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', badge:'vendido', maisVendido:true, adicionais:[{nome:'Bacon extra',preco:5},{nome:'Cheddar extra',preco:4},{nome:'Ovo',preco:3},{nome:'Cebola caramelizada',preco:3.5}] },
  { id:'l2', nome:'X-Tudo Especial', categoria:'lanches', descricao:'Dois blends 150g, queijo, presunto, ovo, bacon, alface, tomate e maionese da casa.', preco:38.90, imagem:'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=80', badge:'favorito', adicionais:[{nome:'Blend extra',preco:10},{nome:'Bacon extra',preco:5}] },
  { id:'l3', nome:'Pizza de Churrasco', categoria:'lanches', descricao:'Massa artesanal, molho de tomate, mussarela, calabresa, cebola e borda recheada.', preco:49.90, imagem:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', adicionais:[{nome:'Borda recheada catupiry',preco:8},{nome:'Porção extra de queijo',preco:6}] },
  { id:'b1', nome:'Suco Natural 500ml', categoria:'bebidas', descricao:'Laranja, abacaxi com hortelã, maracujá ou morango. Feito na hora.', preco:14.90, imagem:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', adicionais:[] },
  { id:'b2', nome:'Chopp Artesanal 500ml', categoria:'bebidas', descricao:'Chopp pilsen gelado, perfeito para acompanhar o grill.', preco:18.90, imagem:'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80', adicionais:[] },
  { id:'b3', nome:'Refrigerante Lata', categoria:'bebidas', descricao:'Coca-Cola, Guaraná, Fanta ou Sprite. Geladíssimo.', preco:7.90, imagem:'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=600&q=80', adicionais:[] },
  { id:'s1', nome:'Pudim de Leite', categoria:'sobremesas', descricao:'Receita tradicional da casa com calda de caramelo.', preco:16.90, imagem:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', badge:'favorito', adicionais:[] },
  { id:'s2', nome:'Brownie com Sorvete', categoria:'sobremesas', descricao:'Brownie quentinho com nozes e bola de sorvete de creme.', preco:22.90, imagem:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80', badge:'novidade', adicionais:[{nome:'Calda de chocolate',preco:3},{nome:'Bola extra de sorvete',preco:5}] }
];

const combos = [
  { id:'c1', nome:'Combo Bomba', descricao:'Burger Bomba Grill + Batata Frita M + Suco Natural 500ml', precoOriginal:59.70, precoPromo:47.90, imagem:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
  { id:'c2', nome:'Combo Casal', descricao:'2 Burgers Bomba + Batata Frita G + 2 Refrigerantes', precoOriginal:105.50, precoPromo:84.90, imagem:'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80' },
  { id:'c3', nome:'Combo Família', descricao:'Picanha na Chapa + 4 Refrigerantes + Pudim de Leite', precoOriginal:135.40, precoPromo:109.90, imagem:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' }
];

const avaliacoes = [];

/* ========== ESTADO ========== */
const STORAGE_KEY = 'bombagrill_carrinho_v3';
let carrinho = [];
let categoriaAtual = 'todos';
let produtoModalAtual = null;
let tipoModalAtual = null;
let itemEditandoId = null;
let qtdModal = 1;
let toastTimer = null;

const $ = id => document.getElementById(id);
const moeda = new Intl.NumberFormat('pt-BR', { style:'currency', currency:CONFIG.currency });
const formatarMoeda = v => moeda.format(v);
const gerarId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
const escapar = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badgeTexto = { vendido:'🔥 Mais Vendido', novidade:'✨ Novidade', favorito:'❤️ Favorito' };

/* ========== PERSISTÊNCIA ========== */
function salvarCarrinho() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho)); }
  catch(e) { console.warn('Erro ao salvar carrinho:', e); }
}
function carregarCarrinho() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (!d) return;
    const p = JSON.parse(d);
    if (Array.isArray(p)) carrinho = p.filter(i => i && typeof i.nome==='string' && typeof i.preco==='number' && i.preco>=0 && typeof i.qtd==='number' && i.qtd>0);
  } catch(e) { console.warn('Erro ao carregar carrinho:', e); carrinho=[]; }
}

/* ========== CÁLCULOS ========== */
const calcularSubtotal = () => carrinho.reduce((t,i) => t + i.preco*i.qtd, 0);
function calcularTotal() { return calcularSubtotal() + (typeof CONFIG.deliveryFee==='number' ? CONFIG.deliveryFee : 0); }
function textoEntrega() { return typeof CONFIG.deliveryFee==='number' ? formatarMoeda(CONFIG.deliveryFee) : CONFIG.deliveryFeeText; }

/* ========== RENDER ========== */
function renderizarCombos() {
  $('combosGrid').innerHTML = combos.map(c => {
    const desc = Math.round((1 - c.precoPromo/c.precoOriginal)*100);
    return `<div class="combo-card"><div class="combo-image"><img src="${c.imagem}" alt="${escapar(c.nome)}" loading="lazy"><span class="combo-discount">-${desc}%</span></div><div class="combo-info"><h3>${escapar(c.nome)}</h3><p>${escapar(c.descricao)}</p><div class="combo-prices"><span class="combo-old-price">${formatarMoeda(c.precoOriginal)}</span><span class="combo-new-price">${formatarMoeda(c.precoPromo)}</span></div><button class="btn btn-primary" data-combo="${c.id}">Pedir Combo</button></div></div>`;
  }).join('');
}
function cardProdutoHTML(p) {
  return `<div class="menu-item"><div class="menu-item-image"><img src="${p.imagem}" alt="${escapar(p.nome)}" loading="lazy">${p.badge?`<span class="menu-item-badge badge-${p.badge}">${badgeTexto[p.badge]}</span>`:''}</div><div class="menu-item-info"><h3>${escapar(p.nome)}</h3><p>${escapar(p.descricao)}</p><div class="menu-item-footer"><span class="menu-item-price">${formatarMoeda(p.preco)}</span><button class="btn-add" data-produto="${p.id}">Adicionar +</button></div></div></div>`;
}
function renderizarProdutos() {
  const busca = $('searchInput').value.trim().toLowerCase();
  const f = produtos.filter(p => (categoriaAtual==='todos'||p.categoria===categoriaAtual) && (!busca||p.nome.toLowerCase().includes(busca)||p.descricao.toLowerCase().includes(busca)));
  $('menuGrid').innerHTML = f.length ? f.map(cardProdutoHTML).join('') : '<div class="no-results"><h3>Nenhum produto encontrado</h3><p>Tente outro termo ou categoria.</p></div>';
}
function renderizarMaisVendidos() {
  const tops = produtos.filter(p => p.maisVendido);
  $('bestsellersGrid').innerHTML = tops.length ? tops.map(cardProdutoHTML).join('') : '<div class="no-results"><h3>Em breve</h3><p>Os destaques aparecerão aqui.</p></div>';
}
function renderizarAvaliacoes() {
  if (!avaliacoes.length) { $('testimonialsGrid').innerHTML = '<div class="testimonials-empty"><p>As avaliações de clientes serão exibidas aqui quando forem cadastradas.</p></div>'; return; }
  $('testimonialsGrid').innerHTML = avaliacoes.map(a => `<div class="testimonial-card"><div class="stars">${'★'.repeat(a.nota)}${'☆'.repeat(5-a.nota)}</div><p>"${escapar(a.texto)}"</p><div class="testimonial-author"><div class="author-avatar">${escapar(a.nome.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase())}</div><div><h4>${escapar(a.nome)}</h4><span>${escapar(a.data||'')}</span></div></div></div>`).join('');
}

/* ========== CARRINHO UI ========== */
function atualizarCarrinhoUI() {
  const totalItens = carrinho.reduce((a,i)=>a+i.qtd,0);
  $('cartCount').textContent = totalItens;
  if (!carrinho.length) {
    $('cartItems').innerHTML = '<div class="empty-cart"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><h4>Seu carrinho está vazio</h4><p>Adicione itens deliciosos do nosso cardápio!</p></div>';
    $('cartFooter').style.display='none'; atualizarResumoCheckout(); return;
  }
  $('cartFooter').style.display='block';
  $('cartItems').innerHTML = carrinho.map(item => {
    const sub = item.preco*item.qtd;
    const ad = item.adicionais?.length ? `<div class="cart-item-details">${item.adicionais.map(a=>`<span>+ ${escapar(a.nome)} (${formatarMoeda(a.preco)})</span>`).join('')}</div>` : '';
    const obs = item.observacoes ? `<div class="cart-item-obs">📝 ${escapar(item.observacoes)}</div>` : '';
    return `<div class="cart-item"><div class="cart-item-header"><div><div class="cart-item-name">${escapar(item.nome)}</div><div class="cart-item-details"><span>${item.qtd}x ${formatarMoeda(item.preco)}</span></div></div><div class="cart-item-price">${formatarMoeda(sub)}</div></div>${ad}${obs}<div class="cart-item-controls"><div class="qty-control"><button data-acao="diminuir" data-id="${item.idUnico}" aria-label="Diminuir">−</button><span>${item.qtd}</span><button data-acao="aumentar" data-id="${item.idUnico}" aria-label="Aumentar">+</button></div><div class="cart-item-actions"><button class="cart-item-edit" data-acao="editar" data-id="${item.idUnico}">Editar</button><button class="cart-item-remove" data-acao="remover" data-id="${item.idUnico}">Remover</button></div></div></div>`;
  }).join('');
  $('cartSubtotal').textContent = formatarMoeda(calcularSubtotal());
  $('deliveryText').textContent = textoEntrega();
  $('cartTotal').textContent = formatarMoeda(calcularTotal());
  atualizarResumoCheckout();
}
function atualizarResumoCheckout() {
  $('checkoutSubtotal').textContent = formatarMoeda(calcularSubtotal());
  $('checkoutDelivery').textContent = textoEntrega();
  $('checkoutTotal').textContent = formatarMoeda(calcularTotal());
}

/* ========== AÇÕES CARRINHO ========== */
function alterarQtdCarrinho(id,delta) {
  const item = carrinho.find(i=>i.idUnico===id); if(!item) return;
  item.qtd += delta;
  if (item.qtd<=0) { carrinho=carrinho.filter(i=>i.idUnico!==id); mostrarToast('Item removido','error'); }
  salvarCarrinho(); atualizarCarrinhoUI();
}
function removerDoCarrinho(id) { carrinho=carrinho.filter(i=>i.idUnico!==id); salvarCarrinho(); atualizarCarrinhoUI(); mostrarToast('Item removido','error'); }
function limparCarrinho() {
  if(!carrinho.length) return;
  if(confirm('Limpar o carrinho?')) { carrinho=[]; salvarCarrinho(); atualizarCarrinhoUI(); mostrarToast('Carrinho limpo','error'); }
}
function editarItemCarrinho(id) {
  const item = carrinho.find(i=>i.idUnico===id); if(!item) return;
  if(item.tipo==='combo') { const c=combos.find(x=>x.id===item.produtoId); if(c){fecharCarrinho();abrirModalCombo(c,item);} }
  else { const p=produtos.find(x=>x.id===item.produtoId); if(p){fecharCarrinho();abrirModalProduto(p,item);} }
}

/* ========== MODAIS ========== */
function abrirModal(id){$(id).classList.add('active');$(id).setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function fecharModal(id){$(id).classList.remove('active');$(id).setAttribute('aria-hidden','true');if(!document.querySelector('.modal.active')&&!$('cartSidebar').classList.contains('active'))document.body.classList.remove('modal-open')}
function abrirCarrinho(){$('cartSidebar').classList.add('active');$('cartOverlay').classList.add('active');document.body.classList.add('modal-open')}
function fecharCarrinho(){$('cartSidebar').classList.remove('active');$('cartOverlay').classList.remove('active');if(!document.querySelector('.modal.active'))document.body.classList.remove('modal-open')}

function preencherModal(tipo,dados,itemExistente=null) {
  tipoModalAtual=tipo; produtoModalAtual=dados; itemEditandoId=itemExistente?itemExistente.idUnico:null; qtdModal=itemExistente?itemExistente.qtd:1;
  const precoBase = tipo==='combo'?dados.precoPromo:dados.preco;
  const adicionais = tipo==='combo'?[]:(dados.adicionais||[]);
  const badge = tipo==='combo'?null:dados.badge;
  $('modalProductImage').src=dados.imagem; $('modalProductImage').alt=dados.nome;
  $('modalProductName').textContent=dados.nome; $('modalProductDesc').textContent=dados.descricao;
  $('modalProductPrice').textContent=formatarMoeda(precoBase); $('modalQtd').textContent=qtdModal;
  $('modalObservacoes').value=itemExistente?(itemExistente.observacoes||''):'';
  $('modalAddBtn').textContent=itemExistente?'Salvar Alterações':'Adicionar ao Carrinho';
  const b=$('modalProductBadge');
  if(badge){b.textContent=badgeTexto[badge];b.className=`product-badge badge-${badge}`;b.style.display='inline-block'}else b.style.display='none';
  const sec=$('modalAdicionaisSection'), lista=$('modalAdicionais');
  if(adicionais.length){
    sec.style.display='block';
    const sel=itemExistente?.adicionais?.map(a=>a.nome)||[];
    lista.innerHTML=adicionais.map((ad,i)=>{const ck=sel.includes(ad.nome);return `<div class="adicional-item ${ck?'selected':''}"><label><input type="checkbox" data-idx="${i}" ${ck?'checked':''}><span>${escapar(ad.nome)}</span></label><span class="adicional-price">+ ${formatarMoeda(ad.preco)}</span></div>`}).join('');
  } else { sec.style.display='none'; lista.innerHTML=''; }
  atualizarTotalModal(); abrirModal('productModal');
}
function abrirModalProduto(p,i=null){preencherModal('produto',p,i)}
function abrirModalCombo(c,i=null){preencherModal('combo',c,i)}
function fecharModalProduto(){fecharModal('productModal');produtoModalAtual=null;tipoModalAtual=null;itemEditandoId=null;qtdModal=1}
function adicionaisSelecionadosModal() {
  if(!produtoModalAtual||tipoModalAtual==='combo') return [];
  const ad=produtoModalAtual.adicionais||[];
  return Array.from(document.querySelectorAll('#modalAdicionais input:checked')).map(cb=>{const a=ad[Number(cb.dataset.idx)];return a?{nome:a.nome,preco:a.preco}:null}).filter(Boolean);
}
function atualizarTotalModal() {
  if(!produtoModalAtual) return;
  const base=tipoModalAtual==='combo'?produtoModalAtual.precoPromo:produtoModalAtual.preco;
  $('modalTotal').textContent=formatarMoeda((base+adicionaisSelecionadosModal().reduce((s,a)=>s+a.preco,0))*qtdModal);
}
function confirmarModal() {
  if(!produtoModalAtual||!tipoModalAtual) return;
  const nome=produtoModalAtual.nome;
  const base=tipoModalAtual==='combo'?produtoModalAtual.precoPromo:produtoModalAtual.preco;
  const adicionais=adicionaisSelecionadosModal();
  const item={idUnico:itemEditandoId||gerarId(),tipo:tipoModalAtual,produtoId:produtoModalAtual.id,nome,preco:base+adicionais.reduce((s,a)=>s+a.preco,0),qtd:qtdModal,observacoes:$('modalObservacoes').value.trim(),adicionais};
  if(itemEditandoId){const idx=carrinho.findIndex(i=>i.idUnico===itemEditandoId);if(idx>=0)carrinho[idx]=item;mostrarToast('Item atualizado!','success')}
  else {carrinho.push(item);mostrarToast(`${nome} adicionado!`,'success')}
  salvarCarrinho(); atualizarCarrinhoUI(); fecharModalProduto();
}

/* ========== CHECKOUT / WHATSAPP ========== */
function abrirCheckout() {
  if(!carrinho.length){mostrarToast('Carrinho vazio!','error');return}
  atualizarResumoCheckout(); fecharCarrinho(); abrirModal('checkoutModal'); setTimeout(()=>$('checkoutNome').focus(),100);
}
function fecharCheckout(){fecharModal('checkoutModal')}
function toggleTroco(){const p=$('checkoutPagamento').value;$('trocoGroup').style.display=p==='Dinheiro'?'block':'none';if(p!=='Dinheiro')$('checkoutTroco').value=''}

function montarPayloadCozinha(dados) {
  return {
    customer:{nome:dados.nome,telefone:dados.telefone,endereco:dados.endereco,complemento:dados.complemento},
    payment:{metodo:dados.pagamento,troco:dados.troco},
    notes:dados.obsGeral,
    deliveryFee:typeof CONFIG.deliveryFee==='number'?CONFIG.deliveryFee:null,
    deliveryFeeText:textoEntrega(),
    items:carrinho.map(i=>({produtoId:i.produtoId,tipo:i.tipo,nome:i.nome,qtd:i.qtd,preco:i.preco,adicionais:i.adicionais||[],observacoes:i.observacoes||''}))
  };
}
function montarMensagemPedido(dados, numero='') {
  const sub=calcularSubtotal(), tot=calcularTotal();
  let m=`🔥 *NOVO PEDIDO - ${CONFIG.businessName}* 🔥\n\n`;
  if(numero) m=`🧾 *PEDIDO #${numero}*\n\n`+m;
  m+='👤 *DADOS DO CLIENTE*\n'+`• Nome: ${dados.nome}\n• Telefone: ${dados.telefone}\n\n`;
  m+='📍 *ENDEREÇO DE ENTREGA*\n'+`• ${dados.endereco}\n`;
  if(dados.complemento)m+=`• Complemento: ${dados.complemento}\n`;
  m+='\n🛒 *ITENS DO PEDIDO*\n━━━━━━━━━━━━━━━━━━\n';
  carrinho.forEach((i,idx)=>{
    m+=`\n*${idx+1}. ${i.nome}*\n   ${i.qtd}x ${formatarMoeda(i.preco)} = *${formatarMoeda(i.preco*i.qtd)}*\n`;
    if(i.adicionais?.length)m+=`   🧀 ${i.adicionais.map(a=>`${a.nome} (+${formatarMoeda(a.preco)})`).join(', ')}\n`;
    if(i.observacoes)m+=`   📝 Obs: ${i.observacoes}\n`;
  });
  m+='\n━━━━━━━━━━━━━━━━━━\n\n💰 *RESUMO*\n'+`• Subtotal: ${formatarMoeda(sub)}\n• Entrega: ${textoEntrega()}\n• *TOTAL: ${formatarMoeda(tot)}*\n\n`;
  m+='💳 *PAGAMENTO*\n'+`• Forma: ${dados.pagamento}\n`;
  if(dados.pagamento==='Dinheiro'&&dados.troco)m+=`• Troco para: ${dados.troco}\n`;
  if(dados.obsGeral)m+=`\n📝 *OBSERVAÇÕES GERAIS*\n${dados.obsGeral}\n`;
  m+=`\n✅ _Pedido gerado pelo site ${CONFIG.businessName}_`;
  return m;
}
async function enviarPedidoWhatsApp(e) {
  e.preventDefault();
  const dados = {
    nome: $('checkoutNome').value.trim(),
    telefone: $('checkoutTelefone').value.trim(),
    endereco: $('checkoutEndereco').value.trim(),
    complemento: $('checkoutComplemento').value.trim(),
    pagamento: $('checkoutPagamento').value,
    troco: $('checkoutTroco').value.trim(),
    obsGeral: $('checkoutObs').value.trim()
  };
  if (!dados.nome || !dados.telefone || !dados.endereco || !dados.pagamento) {
    mostrarToast('Preencha todos os campos obrigatórios.', 'error');
    return;
  }
  if (!carrinho.length) {
    mostrarToast('Carrinho vazio!', 'error');
    fecharCheckout();
    return;
  }

  const enviarZap = $('enviarWhatsApp').checked;
  const btn = $('sendOrderBtn');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = 'Registrando pedido...';

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const r = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(montarPayloadCozinha(dados)),
      signal: ctrl.signal
    });
    clearTimeout(t);
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || 'Não foi possível registrar o pedido.');

    const numeroPedido = d.order.numero;

    if (enviarZap) {
      const msg = montarMensagemPedido(dados, numeroPedido);
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      const win = window.open(url, '_blank');
      if (!win || win.closed) window.location.href = url;
      mostrarToast(`✅ Pedido #${numeroPedido} registrado e WhatsApp aberto!`, 'success');
    } else {
      mostrarToast(`✅ Pedido #${numeroPedido} registrado na cozinha com sucesso!`, 'success');
    }

    carrinho = [];
    salvarCarrinho();
    atualizarCarrinhoUI();
    $('checkoutForm').reset();
    $('enviarWhatsApp').checked = true;
    toggleTroco();
    fecharCheckout();
  } catch (err) {
    mostrarToast(err.message || 'Erro ao enviar. Verifique o servidor.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = original;
  }
}

/* ========== FAQ / MENU / TOAST ========== */
function toggleFaq(btn) {
  const item=btn.parentElement, ativo=item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('active');i.querySelector('.faq-question').setAttribute('aria-expanded','false')});
  if(!ativo){item.classList.add('active');btn.setAttribute('aria-expanded','true')}
}
function toggleMenu(){const m=$('navMenu'),t=$('menuToggle'),a=m.classList.toggle('active');t.classList.toggle('active',a);t.setAttribute('aria-expanded',String(a))}
function fecharMenu(){$('navMenu').classList.remove('active');$('menuToggle').classList.remove('active');$('menuToggle').setAttribute('aria-expanded','false')}
function mostrarToast(msg,tipo='success'){const t=$('toast');clearTimeout(toastTimer);t.textContent=msg;t.className=`toast show ${tipo}`;toastTimer=setTimeout(()=>t.className='toast',3500)}

/* ========== INFO COMERCIAL ========== */
function atualizarLinksWhatsApp(){const b=`https://wa.me/${CONFIG.whatsappNumber}`;['whatsappFloat','contactWhatsappBtn','footerWhatsappBtn','footerWhatsappLink'].forEach(id=>{const e=$(id);if(e)e.href=b})}
function preencherInfoComercial(){$('contactAddress').textContent=CONFIG.address;$('contactPhone').textContent=CONFIG.whatsappDisplay;$('contactHours').innerHTML=CONFIG.hours;$('footerHours').innerHTML=CONFIG.hours;$('currentYear').textContent=new Date().getFullYear()}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho(); preencherInfoComercial(); atualizarLinksWhatsApp();
  renderizarCombos(); renderizarProdutos(); renderizarMaisVendidos(); renderizarAvaliacoes(); atualizarCarrinhoUI();

  window.addEventListener('scroll', () => $('navbar').classList.toggle('scrolled', window.scrollY>50), {passive:true});
  $('menuToggle').addEventListener('click', toggleMenu);
  document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',fecharMenu));
  $('cartBtn').addEventListener('click',abrirCarrinho);
  $('cartClose').addEventListener('click',fecharCarrinho);
  $('cartOverlay').addEventListener('click',fecharCarrinho);
  $('checkoutBtn').addEventListener('click',abrirCheckout);
  $('clearCartBtn').addEventListener('click',limparCarrinho);
  $('searchInput').addEventListener('input',renderizarProdutos);
  $('categoryFilters').addEventListener('click',e=>{const b=e.target.closest('.filter-btn');if(!b)return;categoriaAtual=b.dataset.cat;document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderizarProdutos()});
  const abrir=id=>{const p=produtos.find(x=>x.id===id);if(p)abrirModalProduto(p)};
  $('menuGrid').addEventListener('click',e=>{const b=e.target.closest('[data-produto]');if(b)abrir(b.dataset.produto)});
  $('bestsellersGrid').addEventListener('click',e=>{const b=e.target.closest('[data-produto]');if(b)abrir(b.dataset.produto)});
  $('combosGrid').addEventListener('click',e=>{const b=e.target.closest('[data-combo]');if(!b)return;const c=combos.find(x=>x.id===b.dataset.combo);if(c)abrirModalCombo(c)});
  $('productClose').addEventListener('click',fecharModalProduto);
  $('productOverlay').addEventListener('click',fecharModalProduto);
  $('modalQtyMinus').addEventListener('click',()=>{qtdModal=Math.max(1,qtdModal-1);$('modalQtd').textContent=qtdModal;atualizarTotalModal()});
  $('modalQtyPlus').addEventListener('click',()=>{qtdModal=Math.min(99,qtdModal+1);$('modalQtd').textContent=qtdModal;atualizarTotalModal()});
  $('modalAdicionais').addEventListener('change',e=>{if(e.target.type==='checkbox'){e.target.closest('.adicional-item').classList.toggle('selected',e.target.checked);atualizarTotalModal()}});
  $('modalAddBtn').addEventListener('click',confirmarModal);
  $('cartItems').addEventListener('click',e=>{const b=e.target.closest('[data-acao]');if(!b)return;const id=b.dataset.id,a=b.dataset.acao;if(a==='aumentar')alterarQtdCarrinho(id,1);if(a==='diminuir')alterarQtdCarrinho(id,-1);if(a==='remover')removerDoCarrinho(id);if(a==='editar')editarItemCarrinho(id)});
  $('checkoutClose').addEventListener('click',fecharCheckout);
  $('checkoutOverlay').addEventListener('click',fecharCheckout);
  $('checkoutPagamento').addEventListener('change',toggleTroco);
  $('checkoutForm').addEventListener('submit',enviarPedidoWhatsApp);
  document.querySelectorAll('.faq-question').forEach(b=>b.addEventListener('click',()=>toggleFaq(b)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('checkoutModal').classList.contains('active'))fecharCheckout();else if($('productModal').classList.contains('active'))fecharModalProduto();else if($('cartSidebar').classList.contains('active'))fecharCarrinho();else fecharMenu()}});
});