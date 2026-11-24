# A Jornada dos Gigantes — página de vendas (MF Publicações)

Página estática da trilogia de Michel Freitas Bispo dos Santos. Pronta para GitHub Pages: `index.html`, `styles.css`, `script.js` e `assets/`. Não há etapa de build.

Para ver no computador: na pasta do repositório, `python3 -m http.server` e abra `http://localhost:8000`.

Este repositório não liga o GitHub Pages. Quando for a hora, em Settings → Pages, a branch `main` e a pasta raiz (`/`) servem a página em `https://m1tchelll6840.github.io/a-jornada-dos-gigantes/`.

## Como trocar os links de checkout

Os quatro botões de compra leem os endereços de **um único objeto** no topo de `script.js`:

```js
const CHECKOUT = {
  livro1: '#', // O Reino da Carne — R$ 29,90
  livro2: '#', // O Reino da Alma — R$ 27,90
  livro3: '#', // O Reino do Espírito — R$ 27,90
  combo: '#'   // Trilogia completa — R$ 59,90
};
```

Quando os produtos existirem na Kiwify, substitua cada `'#'` pelo link completo (`https://pay.kiwify.com.br/...`):

| Chave | Produto | Preço |
| --- | --- | --- |
| `livro1` | O Reino da Carne | R$ 29,90 |
| `livro2` | O Reino da Alma | R$ 27,90 |
| `livro3` | O Reino do Espírito | R$ 27,90 |
| `combo` | Trilogia completa | R$ 59,90 |

Não é preciso editar o `index.html`. Os botões usam `data-checkout="livro1"`, `livro2`, `livro3` ou `combo`, e o script copia o endereço na hora do clique.

Enquanto o valor for `#`, o botão permanece na página. O Meta Pixel ainda dispara `InitiateCheckout` (com `value` e `currency: 'BRL'`). Esta página não dispara `Purchase`.

## Preços na página

- Livro 1, *O Reino da Carne*: **R$ 29,90** (de R$ 39,90)
- Livro 2, *O Reino da Alma*: **R$ 27,90** (de R$ 34,90)
- Livro 3, *O Reino do Espírito*: **R$ 27,90** (de R$ 34,90)
- Combo: **R$ 59,90**, mais barato do que os três volumes separados (R$ 85,70)

## Pixel

O Meta Pixel base está no `<head>` de `index.html`, ID `1158202663395932`, evento `PageView`. O clique num botão de compra dispara só `InitiateCheckout`.

## Imagens

Em `assets/`:

- `capa-carne.jpg`, `capa-alma.jpg`, `capa-espirito.jpg` — capas a 800 px de largura
- `banner-trilogia.jpg` e `banner-trilogia-800.jpg` — banner da trilogia
- `og-image.jpg` — 1200×630, usado em `og:image`
- `thumb-carne.jpg`, `thumb-alma.jpg`, `thumb-espirito.jpg`, `thumb-combo.jpg` — quadrados a 720 px
- `autor-retrato.webp` — retrato de Michel na seção Sobre o autor (o mesmo usado em *A Anatomia do Pecado*)

## Redes

No rodapé há um bloco comentado para Instagram e WhatsApp. Preencha os endereços reais antes de remover o comentário.
