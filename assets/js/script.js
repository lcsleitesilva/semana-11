const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 18",
            preco: 4999.90,
            categoria: "Celulares",
            imagem: "assets/img/iphone-18.jpg",
            descricao: "Smartphone Apple iPhone 18 com 128GB.",
            emEstoque: true,
            galeria: [{ titulo: "Imagem do produto", imagem: "assets/img/iphone-18.jpg" }]
        },
        {
            id: 2,
            nome: "Galaxy S24",
            preco: 3999.90,
            categoria: "Celulares",
            imagem: "assets/img/samsung-galaxy-s24.jpg",
            descricao: "Smartphone Samsung Galaxy S24.",
            emEstoque: true,
            galeria: [{ titulo: "Vista do produto", imagem: "assets/img/samsung-galaxy-s24.jpg" }]
        },
        {
            id: 3,
            nome: "Notebook Lenovo",
            preco: 2899.90,
            categoria: "Notebooks",
            imagem: "assets/img/notebook-lenovo.jpg",
            descricao: "Notebook Lenovo para estudos e trabalho.",
            emEstoque: true,
            galeria: [{ titulo: "Vista do produto", imagem: "assets/img/notebook-lenovo.jpg" }]
        },

        {
            id: 5,
            nome: "Mouse Gamer",
            preco: 149.90,
            categoria: "Acessórios",
            imagem: "assets/img/mouse-gamer.jpg",
            descricao: "Mouse gamer com iluminação RGB.",
            emEstoque: true,
            galeria: [{ titulo: "Vista do produto", imagem: "assets/img/mouse-gamer.jpg" }]
        },
        {
            id: 6,
            nome: "Teclado Mecânico",
            preco: 249.90,
            categoria: "Acessórios",
            imagem: "assets/img/teclado-mecanico.jpg",

            descricao: "Teclado mecânico para jogos e trabalho.",
            emEstoque: true,
            galeria: [{ titulo: "Vista do produto", imagem: "assets/img/teclado-mecanico.jpg" }]
        },

        {
            id: 7,
            nome: "Minecraft",
            preco: 99.90,
            categoria: "Games",
            imagem: "assets/img/minecraft.png",
            descricao: "Jogo Minecraft para PC.",
            emEstoque: true,
            destaque: true,
            galeria: [{ titulo: "Capa do Minecraft", imagem: "assets/img/minecraft.png" }]
        },

        {
            id: 8,
            nome: "EA Sports FC 27",
            preco: 299.90,
            categoria: "Games",
            imagem: "assets/img/ea27.png",
            descricao: "Jogo de futebol EA Sports FC 27.",
            emEstoque: false,
            galeria: [{ titulo: "Capa do EA Sports FC 27", imagem: "assets/img/ea27.png" }]
        },

        {
            id: 9,
            nome: "Grand Theft Auto VI",
            preco: null,
            categoria: "Games",
            imagem: "assets/img/gta6.jpg",

            galeria: [
                { titulo: "Arte principal do GTA VI", imagem: "assets/img/gta6.jpg" },
                { titulo: "Vice City — paisagem", imagem: "assets/img/Vice_City_27.0d2e~w_r93hmh.jpg" },
                { titulo: "Cartão-postal de Vice City", imagem: "assets/img/Vice_City_Postcard_landscape.jpg" }
            ],

            descricao: "Explore Vice City e o estado de Leonida em uma nova aventura da Rockstar Games.",
            emEstoque: false,
            destaque: true
        }

    ]
};

// Seleção dos elementos
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const listaDestaques = document.getElementById("lista-destaques");


const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");


// Formata o preço

function formatPrice(preco) {
    if (preco === null) {
        return "Preço a anunciar";
    }

    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Destaques escolhidos pelo visitante, salvos no navegador.
const favoritos = new Set(JSON.parse(localStorage.getItem("nexusFavoritos") || "[]"));

// Cria um card de produto
function createProductCard(produto) {
    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);
    card.classList.add("card");

    // Uso obrigatório de style pelo enunciado
    card.style.padding = "15px";

    const imagem = document.createElement("img");
    imagem.setAttribute("src", produto.imagem);
    imagem.setAttribute("alt", produto.nome);

    const nome = document.createElement("h3");
    nome.innerHTML = produto.nome;

    const preco = document.createElement("p");
    preco.innerHTML = "<strong>Preço:</strong> " + formatPrice(produto.preco);

    const categoria = document.createElement("p");
    categoria.innerHTML = "<strong>Categoria:</strong> " + produto.categoria;

    const btnDetalhes = document.createElement("button");
    btnDetalhes.innerHTML = "Ver detalhes";


    btnDetalhes.addEventListener("click", function () {
        window.location.href = "detalhe.html?id=" + produto.id;
    });


    const btnDestacar = document.createElement("button");
    btnDestacar.classList.add("btn-favorito");
    btnDestacar.setAttribute("aria-pressed", String(favoritos.has(produto.id)));
    btnDestacar.innerHTML = favoritos.has(produto.id) ? "★ Destacado" : "☆ Destacar";
    card.classList.toggle("favorito", favoritos.has(produto.id));

    btnDestacar.addEventListener("click", function () {
        if (favoritos.has(produto.id)) favoritos.delete(produto.id);
        else favoritos.add(produto.id);
        localStorage.setItem("nexusFavoritos", JSON.stringify([...favoritos]));
        card.classList.toggle("favorito", favoritos.has(produto.id));
        btnDestacar.setAttribute("aria-pressed", String(favoritos.has(produto.id)));
        btnDestacar.innerHTML = favoritos.has(produto.id) ? "★ Destacado" : "☆ Destacar";
    });

    // A imagem e o titulo tambem abrem a pagina de detalhes.
    const linkImagem = document.createElement("a");
    linkImagem.href = "detalhe.html?id=" + produto.id;
    linkImagem.setAttribute("aria-label", "Ver detalhes de " + produto.nome);
    linkImagem.appendChild(imagem);

    const linkNome = document.createElement("a");
    linkNome.href = "detalhe.html?id=" + produto.id;
    linkNome.style.textDecoration = "none";
    linkNome.style.color = "inherit";
    linkNome.appendChild(nome);

    card.appendChild(linkImagem);
    card.appendChild(linkNome);
    card.appendChild(preco);
    card.appendChild(categoria);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}

// Mostra os produtos
function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(function (produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    // querySelectorAll obrigatório
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        console.log("Card renderizado - data-id:", card.getAttribute("data-id"));
    });
}

/* Monta o carrossel de produtos em destaque */
function renderDestaques() {
    if (!listaDestaques) return;

    listaDestaques.innerHTML = "";


    const destaques = data.produtos.filter(function (produto) {
        return produto.destaque === true;
    });

    destaques.sort(function (a, b) {
        if (a.nome === "Grand Theft Auto VI") return -1;
        if (b.nome === "Grand Theft Auto VI") return 1;
        return 0;
    });

    destaques.forEach(function (produto, index) {
        const slide = document.createElement("div");

        slide.className = "carousel-item";

        if (index === 0) {
            slide.classList.add("active");
        }

        slide.innerHTML = `
            <div class="text-center p-4">
                <img src="${produto.imagem}"
                     alt="${produto.nome}"
                     class="d-block mx-auto img-fluid">

                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
            </div>
        `;

        listaDestaques.appendChild(slide);
    });
}


// Preenche as categorias
function renderCategories() {
    const categorias = [];

    data.produtos.forEach(function (produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorySelect.innerHTML = '<option value="Todas">Todas</option>';

    categorias.forEach(function (categoria) {
        const option = document.createElement("option");

        option.setAttribute("value", categoria);
        option.innerHTML = categoria;

        categorySelect.appendChild(option);
    });
}

// Mostra detalhes
function showProductDetails(produto) {
    const estoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${estoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

// Filtra os produtos
function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    const produtosFiltrados = data.produtos.filter(function (produto) {
        const nomeCombina = produto.nome.toLowerCase().includes(texto);

        const categoriaCombina =
            categoria === "Todas" || produto.categoria === categoria;

        return nomeCombina && categoriaCombina;
    });

    return produtosFiltrados;
}


// Eventos e inicialização da página inicial
if (productList) {
    searchInput.addEventListener("input", function () {
        renderProducts(filterProducts());
    });

    categorySelect.addEventListener("change", function () {
        renderProducts(filterProducts());
    });


    renderCategories();
    renderProducts(data.produtos);
    renderDestaques();
}


// Página de detalhes
const detalhesProduto = document.getElementById("detalhes-produto");

if (detalhesProduto) {
    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));

    const produto = data.produtos.find(function (item) {
        return item.id === id;
    });

    if (produto) {
        const estoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";
        const fotos = produto.galeria && produto.galeria.length ? produto.galeria : [{ titulo: produto.nome, imagem: produto.imagem }];
        detalhesProduto.innerHTML = `
            <div class="produto-detalhe-layout">
                <div class="galeria-lateral">
                    <div class="galeria-miniaturas" aria-label="Fotos do produto"></div>
                    <div class="foto-principal">
                        <img id="foto-principal" src="${fotos[0].imagem}" alt="${fotos[0].titulo}">
                        <p id="legenda-principal">${fotos[0].titulo}</p>
                    </div>
                </div>
                <div class="informacoes-produto">
                    <h3>${produto.nome}</h3>
                    <p><strong>Código do produto:</strong> ${produto.id}</p>
                    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Status:</strong> ${estoque}</p>
                    <p><strong>Descrição:</strong> ${produto.descricao}</p>
                </div>
            </div>
            <h3 class="titulo-fotos">Fotos vinculadas ao produto</h3>
            <div class="grade-fotos"></div>
        `;
        const miniaturas = detalhesProduto.querySelector(".galeria-miniaturas");
        const grade = detalhesProduto.querySelector(".grade-fotos");
        const fotoPrincipal = detalhesProduto.querySelector("#foto-principal");
        const legendaPrincipal = detalhesProduto.querySelector("#legenda-principal");
        if (fotos.length === 1) {
            detalhesProduto.querySelector(".galeria-lateral").classList.add("galeria-unica");
        }
        fotos.forEach(function (foto, indice) {
            const miniatura = document.createElement("button");
            miniatura.type = "button";
            miniatura.className = "miniatura" + (indice === 0 ? " selecionada" : "");
            miniatura.setAttribute("aria-label", "Mostrar " + foto.titulo);
            miniatura.innerHTML = `<img src="${foto.imagem}" alt="${foto.titulo}">`;
            miniatura.addEventListener("click", function () {
                fotoPrincipal.src = foto.imagem;
                fotoPrincipal.alt = foto.titulo;
                legendaPrincipal.textContent = foto.titulo;
                miniaturas.querySelectorAll(".miniatura").forEach(function (item) { item.classList.remove("selecionada"); });
                miniatura.classList.add("selecionada");
            });
            if (fotos.length > 1) miniaturas.appendChild(miniatura);
            const cardFoto = document.createElement("div");
            cardFoto.className = "foto-galeria";
            cardFoto.innerHTML = `<img src="${foto.imagem}" alt="${foto.titulo}"><h4>${foto.titulo}</h4>`;
            grade.appendChild(cardFoto);
        });
    } else {
        detalhesProduto.innerHTML = "<p>Produto não encontrado.</p>";
    }
}
