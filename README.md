# NEXUS GAMING — Mini Ecommerce

**Aluno:** Lucas Leite Silva  
**Matrícula:** 931215  
**Curso:** Sistemas de Informação

## Projeto
Mini ecommerce desenvolvido com HTML, CSS, JavaScript e Bootstrap, com catálogo de oito produtos, busca dinâmica, filtro por categoria, destaques em carrossel e página de detalhes gerada conforme o ID do produto.

## Funcionalidades
- Catálogo dinâmico de produtos com imagens, preços e categorias.
- Pesquisa por nome e filtro por categoria, atualizados automaticamente.
- Carrossel de produtos em destaque com navegação.
- Página única `detalhe.html` com dados do produto selecionado por parâmetro `?id=`.
- Galeria com uma foto original titulada por produto; GTA VI possui três imagens diferentes, com miniaturas clicáveis.
- Layout responsivo e identidade visual gamer.

## Estrutura
- `index.html`: catálogo e destaques.
- `detalhe.html`: página dinâmica de detalhes.
- `assets/js/script.js`: dados e funções do catálogo.
- `assets/css/styles.css`: estilos e responsividade.
- `assets/img/`: imagens dos produtos.

## Como executar
Abra `index.html` com o Live Server do VS Code. Para acessar detalhes, clique em **Ver detalhes** no card de um produto.

## Observação
O projeto usa o Bootstrap via CDN; é necessária conexão com a internet para carregar essa biblioteca.

## Recursos adicionais
- Pesquisa automática com campo de busca e filtro por categoria.
- Botão Destacar alterna entre destaque ativado/desativado e guarda a escolha no navegador (localStorage).
- Galeria com miniaturas laterais clicáveis, imagem principal e títulos das fotos.
- Banners verticais com artes de Cal Hampton e DreQuan Priest nas laterais da página inicial, em telas grandes.
- As duas paisagens de Vice City foram adicionadas à galeria do GTA VI.
- Os recortes com zoom dos produtos anteriores foram removidos.
