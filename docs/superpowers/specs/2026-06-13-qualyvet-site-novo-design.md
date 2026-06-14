# Qualyvet Site Novo — Design Spec

**Data:** 2026-06-13
**Projeto:** qualyvet-site-novo
**Cliente:** Qualyvet Consultoria e Assessoria LTDA (CNPJ 24.184.899/0001-08)
**Stack:** HTML + CSS (custom properties) + Vanilla JS — sem framework, sem jQuery
**Referência visual aprovada:** `homepage-light.html` no visual companion

---

## 1. Contexto

O site atual (repositório `/qualyvet`) é baseado no template TemplateMo 570, com subpáginas quebradas (404), zero prova social, CTA fraco e diferencial tecnológico (QualySys) enterrado. O novo site substitui completamente o atual com código próprio, reutilizando assets (logo, imagens, textos) do site existente.

**Público-alvo:** Donos e gestores de agroindústrias de Produtos de Origem Animal (frigoríficos, laticínios, abatedouros, beneficiadoras de pescado, produtores de ovos e mel) no Rio Grande do Sul.

**Objetivo principal do site:** Gerar contato via WhatsApp.

---

## 2. Arquitetura de Arquivos

```
qualyvet-site-novo/
├── index.html                          # Homepage
├── sobre.html                          # Quem Somos
├── contato.html                        # Fale Conosco
├── trabalhe-conosco.html               # Trabalhe Conosco
├── servicos/
│   ├── gestao-de-qualidade.html
│   ├── planejamento-industrial.html
│   ├── treinamento-e-capacitacao.html
│   ├── assessoria-e-consultoria.html
│   ├── acompanhamento-de-processos.html
│   └── sistemas-informatizados.html
├── artigos/
│   ├── index.html                      # Listagem de artigos
│   ├── o-que-e-sif.html
│   ├── sisbi-poa-vs-sif.html
│   ├── programas-de-autocontrole.html
│   ├── como-obter-registro-mapa.html
│   └── haccp-o-que-e.html
└── assets/
    ├── css/
    │   └── style.css                   # Design system completo
    ├── js/
    │   └── main.js                     # Nav mobile, smooth scroll
    └── images/                         # Copiadas de /qualyvet/assets/images/
```

**Total:** 16 páginas HTML estáticas.

---

## 3. Design System

### 3.1 Paleta de Cores (CSS Custom Properties)

```css
--color-primary:       #2f6535;   /* Verde marca */
--color-primary-dark:  #1a3d1f;   /* Hero / títulos / footer */
--color-primary-light: #4a8c52;   /* Hover states */
--color-accent:        #99b533;   /* Destaque / badges / números */
--color-text:          #1e1e1e;   /* Texto principal */
--color-text-muted:    #666666;   /* Texto secundário */
--color-surface:       #f4f7f4;   /* Fundo alternado (seções) */
--color-bg:            #ffffff;   /* Fundo principal */
--color-border:        #e0e8e0;   /* Bordas e divisórias */
--color-footer:        #111e12;   /* Fundo do footer */
--color-whatsapp:      #25d366;   /* Botão WhatsApp */
```

### 3.2 Tipografia

- **Fonte:** Roboto (Google Fonts) — weights 400, 500, 700, 900
- **Fonte de destaque:** Roboto Slab — weights 700, 900 (H1 e H2 principais)
- **Hierarquia:**
  - H1: Roboto Slab 52px / 900 / #1a3d1f / line-height 1.05
  - H2: Roboto Slab 34px / 900 / #1a3d1f / line-height 1.15
  - H3: Roboto 18px / 700 / #1a3d1f
  - Body: Roboto 16px / 400 / #555 / line-height 1.75
  - Label: Roboto 11px / 700 / #2f6535 / uppercase / letter-spacing 2px

### 3.3 Espaçamento

- Section padding: `80px 48px` (desktop) → `48px 24px` (tablet) → `40px 16px` (mobile)
- Gap entre cards: `14px`
- Border radius padrão: `12px`

### 3.4 Componentes Reutilizáveis

**Botões:**
- `.btn-primary` — fundo #25d366 (WhatsApp), texto branco, shadow verde
- `.btn-outline` — borda 2px #2f6535, texto #2f6535
- `.btn-white` — fundo branco, texto #2f6535 (uso em fundos escuros)
- `.btn-ghost` — borda semi-transparente branca (uso em fundos escuros)

**Cards:**
- `.service-card` — fundo branco, borda top 4px #2f6535, hover com shadow
- `.service-card.accent-lime` — borda top #99b533
- `.service-card.dark` — fundo #1a3d1f, texto branco (card QualySys)
- `.article-card` — fundo #f4f7f4, hover com translateY(-2px)
- `.testimonial-card` — fundo branco, borda left 4px colorida

**Badges regulatórios:**
- `.badge-green` — fundo #f0f7f0, texto #2f6535, borda #b8d4b8
- `.badge-lime` — fundo #f5f8e8, texto #6a7e1a, borda #c8d870

**Section label:** texto 11px verde uppercase com letter-spacing, sempre acima do título.

---

## 4. Layout da Homepage (index.html)

Seções em ordem, de cima a baixo:

| # | Seção | Fundo | Descrição |
|---|---|---|---|
| 1 | Header sticky | #fff | Logo + nav + botões WhatsApp e Plataforma |
| 2 | Hero split-screen | #fff / foto | Texto à esquerda, foto com stats à direita |
| 3 | Badges bar | #fff | Faixa com credenciais regulatórias |
| 4 | Stats strip | #1a3d1f | 4 números em destaque (#99b533) |
| 5 | Serviços | #f4f7f4 | Grid 3×2 de service cards |
| 6 | Quem Somos | #fff | Texto à esquerda, foto à direita |
| 7 | QualySys | #1a3d1f | Destaque do diferencial + mockup |
| 8 | Depoimentos | #f4f7f4 | 2 cards lado a lado |
| 9 | Artigos | #fff | 3 cards de artigos SEO |
| 10 | CTA Final | #2f6535 | Chamada para WhatsApp |
| 11 | Footer | #111e12 | 4 colunas: info, serviços, artigos, links |

### Hero (Seção 2)
- **Layout:** `grid-template-columns: 1fr 1fr`
- **Esquerda:** tag badge verde, H1 "Conformidade que vira resultado.", subtítulo, 2 botões (WhatsApp + outline)
- **Direita:** foto `qualyvet.jpg` com overlay claro (linear-gradient branco→verde transparente), 4 stat cards com glassmorphism (2 brancos + 2 verdes escuros)
- **Headline final aprovada:** "Conformidade que vira resultado."
- **Subtítulo:** "Gestão da qualidade, registro junto ao MAPA e planejamento industrial para agroindústrias de Produtos de Origem Animal no Rio Grande do Sul."

---

## 5. Layout das Páginas de Serviço

Cada uma das 6 páginas segue o mesmo template:

```
Header
├── Page Hero (fundo #1a3d1f, título do serviço + breadcrumb)
├── Conteúdo principal (2 colunas: texto + imagem)
├── Lista de programas / o que inclui (grid de itens com ✓)
├── CTA intermediário (WhatsApp)
├── Serviços relacionados (3 cards)
└── Footer
```

**Conteúdo reutilizado do site atual:** textos de `quality-management.html`, `industrial-planning.html`, `training.html`, `consultant.html`, `follow-up.html` e seção de sistemas.

---

## 6. Layout dos Artigos

### Listagem (`artigos/index.html`)
- Grid 3 colunas de article cards
- Filtro por categoria (Registro, Inspeção, Qualidade) — via JS simples com data-attributes

### Artigo individual
```
Header
├── Article Hero (categoria badge + título + data + tempo de leitura)
├── Conteúdo (max-width 720px centralizado, tipografia otimizada para leitura)
├── Sidebar (sticky): CTA WhatsApp + artigos relacionados
└── Footer
```

**5 artigos iniciais com conteúdo baseado nos temas:**
1. `o-que-e-sif.html` — O que é o SIF e como conseguir o registro federal?
2. `sisbi-poa-vs-sif.html` — SISBI-POA vs SIF: qual sistema de inspeção escolher?
3. `programas-de-autocontrole.html` — Programas de Autocontrole: guia completo para POA
4. `como-obter-registro-mapa.html` — Como obter registro no MAPA passo a passo
5. `haccp-o-que-e.html` — O que é HACCP/APPCC e por que sua empresa precisa?

---

## 7. Responsividade

**Breakpoints:**
- Desktop: > 1024px — layouts em grid/flex multi-coluna
- Tablet: 768px–1024px — hero em coluna única, grids 2 colunas
- Mobile: < 768px — tudo em coluna única, nav em hambúrguer

**Regras mobile críticas:**
- Hero split-screen vira stack vertical (foto em cima, texto embaixo) no mobile
- Stats strip: grid 2×2
- Services grid: 1 coluna no mobile, 2 no tablet
- Header: logo + botão WhatsApp visível, demais links em menu hambúrguer (JS toggle)
- Footer: 1 coluna no mobile
- Font-size H1: 52px → 36px → 28px

---

## 8. JavaScript (main.js)

Funcionalidades mínimas — sem jQuery, sem bibliotecas:

1. **Nav hambúrguer** — toggle de classe `.open` no menu mobile
2. **Sticky header** — adiciona classe `.scrolled` ao header após 50px de scroll (shadow mais pronunciado)
3. **Smooth scroll** — `scroll-behavior: smooth` via CSS + fallback JS para âncoras
4. **Active nav link** — destaca link ativo com base na URL atual
5. **Filtro de artigos** (na listagem) — filtra cards por categoria via data-attributes

---

## 9. SEO

- `<title>` único por página com padrão: `[Página] | Qualyvet Consultoria`
- Meta description única por página (< 160 chars)
- Open Graph tags em todas as páginas
- Schema.org `ProfessionalService` na homepage
- Schema.org `Article` nos artigos
- `robots.txt` e `sitemap.xml` atualizados
- Imagens com `alt` descritivo
- Heading hierarchy respeitada (H1 → H2 → H3, sem pular)

---

## 10. Assets do Site Atual

Reutilizar diretamente de `/Users/andersonrodrigues/iCloud Drive (Archive)/Desktop/Workspace/qualyvet/`:

| Asset | Uso no novo site |
|---|---|
| `assets/images/qualyvet.png` | Logo no header |
| `assets/images/white-logo.png` | Logo no footer |
| `assets/images/qualyvet.jpg` | Foto hero e quem somos |
| `assets/images/qualidade1.jpg` / `qualidade2.jpg` | Páginas de serviço |
| `assets/images/industrial1-3.jpg` | Planejamento industrial |
| `assets/images/treinamento1-3.jpg` | Treinamento |
| `assets/images/assesoria1-2.jpeg` | Assessoria |
| `assets/images/acompanhamento.jpeg` | Acompanhamento |
| `assets/images/favicon.png` | Favicon |

---

## 11. O que NÃO será reutilizado

- Template TemplateMo CSS (`templatemo-chain-app-dev.css`)
- Bootstrap (substituído por CSS grid/flexbox nativo)
- jQuery e plugins (owl-carousel, isotope, popup)
- Animações WOW.js
- Preloader JS
- Template HTML original

---

## 12. Critérios de Sucesso

- [ ] Todas as 16 páginas renderizam sem erros
- [ ] Zero links quebrados (404)
- [ ] Site responsivo: funciona em 320px, 768px e 1440px
- [ ] Lighthouse Performance ≥ 90 no mobile
- [ ] Lighthouse SEO ≥ 95
- [ ] WhatsApp CTA visível em todas as páginas
- [ ] Nav hambúrguer funcional no mobile
- [ ] Artigos indexáveis pelo Google (schema + meta)
