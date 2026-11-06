const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 18",
            preco: 4999.90,
            categoria: "Celulares",
            imagem: "assets/img/iphone-18.jpg",
            descricao: "Smartphone Apple iPhone 18 com 128GB.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Galaxy S24",
            preco: 3999.90,
            categoria: "Celulares",
            imagem: "assets/img/samsung-galaxy-s24.jpg",
            descricao: "Smartphone Samsung Galaxy S24.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Lenovo",
            preco: 2899.90,
            categoria: "Notebooks",
            imagem: "assets/img/notebook-lenovo.jpg",
            descricao: "Notebook Lenovo para estudos e trabalho.",
            emEstoque: true
        },

        {
            id: 5,
            nome: "Mouse Gamer",
            preco: 149.90,
            categoria: "Acessórios",
            imagem: "assets/img/mouse-gamer.jpg",
            descricao: "Mouse gamer com iluminação RGB.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico",
            preco: 249.90,
            categoria: "Acessórios",
            imagem: "assets/img/teclado-mecanico.jpg",

            descricao: "Teclado mecânico para jogos e trabalho.",
            emEstoque: true
        },

        {
            id: 7,
            nome: "Minecraft",
            preco: 99.90,
            categoria: "Games",
            imagem: "assets/img/minecraft.png",
            descricao: "Jogo Minecraft para PC.",
            emEstoque: true,
            destaque: true
        },

        {
            id: 8,
            nome: "EA Sports FC 27",
            preco: 299.90,
            categoria: "Games",
            imagem: "assets/img/ea27.png",
            descricao: "Jogo de futebol EA Sports FC 27.",
            emEstoque: false
        },

        {
            id: 9,
            nome: "Grand Theft Auto VI",
            preco: null,
            categoria: "Games",
            imagem: "assets/img/gta6.jpg",
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
const btnRender = document.querySelector("#btnRender");

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
    btnDestacar.innerHTML = "Destacar";

    btnDestacar.addEventListener("click", function () {
        card.classList.add("highlight");
    });

    card.appendChild(imagem);
    card.appendChild(nome);
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

    btnRender.addEventListener("click", function () {
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

        detalhesProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
<p><strong>Código do produto:</strong> ${produto.id}</p>
            <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
            <p><strong>Status:</strong> ${estoque}</p>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
        `;
    } else {
        detalhesProduto.innerHTML = "<p>Produto não encontrado.</p>";
    }
}
