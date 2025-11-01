// Toggle descrição dos produtos
document.querySelectorAll('.toggleDesc').forEach(button => {
  button.addEventListener('click', () => {
    const descricao = button.nextElementSibling.nextElementSibling; // botão comprar e depois div descrição
    if (descricao.style.display === 'block') {
      descricao.style.display = 'none';
      button.textContent = 'Descrição';
    } else {
      descricao.style.display = 'block';
      button.textContent = 'Fechar';
    }
  });
});

// Carrinho
const carrinhoBtn = document.getElementById('carrinhoBtn');
const carrinho = document.getElementById('carrinho');
const fecharCarrinhoBtn = document.getElementById('fecharCarrinho');
const itensCarrinhoDiv = document.getElementById('itensCarrinho');
const finalizarBtn = document.getElementById('finalizar');

let carrinhoItens = [];

// Abre e fecha carrinho
carrinhoBtn.addEventListener('click', () => {
  carrinho.classList.add('aberto');
  renderizarCarrinho();
});
fecharCarrinhoBtn.addEventListener('click', () => {
  carrinho.classList.remove('aberto');
});

// Adiciona produto ao carrinho
document.querySelectorAll('.comprar').forEach(botao => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    const nome = card.querySelector('h3').textContent;
    const precoTexto = card.querySelector('span').textContent;
    const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
    
    // Verifica se já tem no carrinho
    const itemExistente = carrinhoItens.find(item => item.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinhoItens.push({ nome, preco, quantidade: 1 });
    }
  });
});

// Renderiza carrinho
function renderizarCarrinho() {
  if (carrinhoItens.length === 0) {
    itensCarrinhoDiv.innerHTML = '<p>Carrinho vazio</p>';
    finalizarBtn.disabled = true;
    return;
  }
  finalizarBtn.disabled = false;
  itensCarrinhoDiv.innerHTML = '';
  carrinhoItens.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <div class="item-info">
        <strong>${item.nome}</strong><br />
        <span>Preço: R$ ${item.preco.toFixed(2).replace('.', ',')}</span><br />
        <span class="item-quantidade">Qtd: ${item.quantidade}</span><br />
        <span class="item-total">Total: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
      </div>
      <button class="remover" data-index="${index}">&times;</button>
    `;
    itensCarrinhoDiv.appendChild(div);
  });

  // Eventos remover
  document.querySelectorAll('.remover').forEach(botao => {
    botao.addEventListener('click', () => {
      const index = parseInt(botao.dataset.index);
      carrinhoItens.splice(index, 1);
      renderizarCarrinho();
    });
  });
}

// Finalizar compra (apenas simula)
finalizarBtn.addEventListener('click', () => {
  if (carrinhoItens.length === 0) return alert('O carrinho está vazio!');
  alert('Compra finalizada com sucesso! Obrigado.');
  carrinhoItens = [];
  renderizarCarrinho();
  carrinho.classList.remove('aberto');
});

// Barra de pesquisa
const barraPesquisa = document.getElementById('barraPesquisa');
barraPesquisa.addEventListener('input', () => {
  const texto = barraPesquisa.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const nome = card.querySelector('h3').textContent.toLowerCase();
    if (nome.includes(texto)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});



