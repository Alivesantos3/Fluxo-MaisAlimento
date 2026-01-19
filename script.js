/* ANIMAÇÃO DAS SEÇÕES */
const sections = document.querySelectorAll('section');

if (sections.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    sections.forEach(section => observer.observe(section));
}

/* HEADER AO ROLAR*/
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

/* BOTÃO VOLTAR AO TOPO */
const btnTopo = document.getElementById('topo');

window.addEventListener('scroll', () => {
    if (btnTopo) {
        // Altura total da página
        const alturaPagina = document.documentElement.scrollHeight;
        // Quanto já rolou da página
        const scrollAtual = window.scrollY + window.innerHeight;
        
        // Mostrar o botão quando faltar 500px para o fim
        btnTopo.style.display = (alturaPagina - scrollAtual) < 400 ? 'block' : 'none';
    }
});

if (btnTopo) {
    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* CAMPANHAS */
const lista = document.getElementById('listaCampanhas');
const filtroLocal = document.getElementById('filtroLocal');

if (lista && filtroLocal) {

    const campanhas = [
        { instituicao: "Igreja Quadrangular", local: "Jardim das Rosas A", media: 28, arrecadado: 8 },
        { instituicao: "Assembleia de Deus Chama Viva", local: "Jardim Rosário", media: 7, arrecadado: 3 },
        { instituicao: "Igreja Quadrangular", local: "Palmeiras", media: 12, arrecadado: 4 }
    ];

    function renderizar() {
        lista.innerHTML = '';

        const localDigitado = filtroLocal.value.toLowerCase();

        campanhas
            .filter(c =>
                localDigitado === '' ||
                c.local.toLowerCase().includes(localDigitado)
            )
            .forEach(c => {
                const pct = (c.arrecadado / c.media) * 100;

                const div = document.createElement('div');
                div.className = 'card';
                div.innerHTML = `
                    <h3>${c.instituicao}</h3>
                    <p><strong>Local:</strong> ${c.local}</p>
                    <div class="barra">
                        <span style="width:${pct}%"></span>
                    </div>
                    <button onclick="abrirModal(
                        '${c.instituicao}',
                        'Media de Doações Mensais: ${c.media} cestas | Arrecadado: ${c.arrecadado} cestas'
                    )">
                        Ver detalhes
                    </button>
                `;

                lista.appendChild(div);
            });
    }

    filtroLocal.addEventListener('input', renderizar);

    renderizar();
}

/* INTERAÇÃO ALIMENTOS */

const alimentos = document.querySelectorAll('.lista-alimentos li');

alimentos.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
    });
});

/* COMO DOAR */

const etapas = [
    { icon: "📦", texto: "Escolha uma Instituição" },
    { icon: "📍", texto: "Encontre o ponto de coleta" },
    { icon: "❤️", texto: "Entregue sua doação" },
    { icon: "👥", texto: "Acompanhe os resultados" }
];

const container = document.getElementById('cards-container');

etapas.forEach(etapa => {
    // Cria o card
    const card = document.createElement('div');
    card.className = 'card';

    // Icone
    const icon = document.createElement('div');
    icon.className = 'card-icon';
    icon.textContent = etapa.icon;

    // Texto
    const text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = etapa.texto;

    // Adiciona ao card
    card.appendChild(icon);
    card.appendChild(text);

    // Adiciona o card ao container
    container.appendChild(card);
});

// Card de divulgação
const cardDivulgar = document.createElement('div');
cardDivulgar.className = 'instituicao-card-divulgar';

// efeito hover
cardDivulgar.addEventListener('mouseover', () => {
    cardDivulgar.style.transform = 'translateY(-5px)';
    cardDivulgar.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
});

cardDivulgar.addEventListener('mouseout', () => {
    cardDivulgar.style.transform = 'translateY(0)';
    cardDivulgar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
});

// conteúdo do card com emoji de envelope
cardDivulgar.innerHTML = `
    <div style="font-size: 2rem;">📧</div>
    <h4>Quer divulgar sua instituição?</h4>
    <p>Entre em contato pelo email: <strong>fluxomaisalimento@gmail.com</strong></p>
`;

// adiciona ao container
container.appendChild(cardDivulgar);
/* MODAL */
function abrirModal(titulo, info) {
    const modal = document.getElementById('modal');
    if (!modal) return;

    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalInfo').innerText = info;
    modal.style.display = 'flex';
}

function fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
