# WizzOS — Contexto para Codex
> Gerado por Claude em Apr 19 2026. Atualizar via /sync no Cérebro ao fim de cada sessão.
> AVISO: Este arquivo é a fonte de verdade para o Codex. Não editar manualmente.

---

## O que é este projeto

**WizzOS** é um fork do [WizzOS](https://github.com/agencywizz/wizz-nexus) — um sistema operacional multi-agente construído sobre o Claude Code CLI. É o cockpit interno do founder (Junior Dameto / Wizz! comms.) e também um **produto SaaS** a ser vendido em 3 tiers.

O fork original é `WizzOS` da `Wizz! comms.`. Todo o branding foi/será substituído por `WizzOS` da `Wizz! comms.`

---

## Dono

| Campo | Valor |
|-------|-------|
| Nome | Junior Dameto |
| Empresa | Wizz! comms. (nunca Agency Wizz, nunca wIZZ!) |
| Site | wizzcomms.com |
| Email (suporte) | support@wizzcomms.com |
| Git author | agencywizz / wizzdigitalagency@gmail.com |

---

## Stack

```
Backend:   Flask + SQLAlchemy + WebSocket (Python 3.11+, uv)
Frontend:  React 19 + TypeScript + Tailwind CSS
Agentes:   38 arquivos .md em .claude/agents/
Skills:    175+ em .claude/skills/
Scheduler: Python (ADWs/scheduler.py)
Docker:    docker-compose.yml
```

---

## Design System — Wizz! comms.

### Cores (aplicar no dashboard frontend)
```css
--bg:        #0D0D0D;   /* background */
--surface:   #1A1A1A;   /* cards, containers */
--accent:    #FF4500;   /* Wizz Orange — CTAs, links ativos, borders */
--hover:     #CC3700;   /* Deep Orange — hover states */
--text:      #F0F0F0;   /* body text */
--muted:     #666666;   /* texto secundário */
```

### Tipografia
```css
font-family: 'Space Grotesk', sans-serif;
/* Pesos: 300, 400, 500, 600, 700 */
/* Import: https://fonts.google.com/specimen/Space+Grotesk */
```

### Logos (fonte: /Users/juniordameto/Documents/projects/trabalhos/wizzbranding/logos/)
| Variante | Arquivo fonte | Destino no repo |
|----------|--------------|-----------------|
| Navbar / header | `SITE 300X80/1.png` | `public/logo.png` |
| Dark background | `SEM FUNDO/1.png` | `public/logo-dark.png` |
| Avatar / ícone | `PERFIL/1.png` | `public/logo-icon.png` |

---

## Plano de execução — Fase 1: Branding

### TAREFA 1 — Renomear produto (find & replace em todo o repo)

Substituições globais (case-sensitive onde indicado):

| De | Para | Arquivos alvo |
|----|------|---------------|
| `WizzOS` | `WizzOS` | todos os .md, .py, .ts, .tsx, .html, .yaml |
| `wizz-os` | `wizz-os` | todos os arquivos |
| `wizz_os` | `wizz_os` | todos os .py |
| `Wizz! comms.` | `Wizz! comms.` | todos os arquivos |
| `wizzcomms.com` | `wizzcomms.com` | todos os arquivos |
| `agencywizz/wizz-nexus` | `agencywizz/wizz-nexus` | README.md, docs/ |
| `@agencywizz/wizz-os` | `@agencywizz/wizz-os` | README.md, package.json |
| `npx @agencywizz/wizz-os` | `npx @agencywizz/wizz-os` | README.md, docs/ |

**Exceções — NÃO substituir:**
- Referências a `Evolution API` (integração WhatsApp — é um produto externo, não o fork)
- Conteúdo de `.git/` 
- Arquivo `NOTICE.md` (créditos de licença — manter intacto)
- Arquivo `CHANGELOG.md` (histórico do upstream — manter referências originais)

---

### TAREFA 2 — Copiar logos

```bash
# Copiar logos oficiais para public/
cp "/Users/juniordameto/Documents/projects/trabalhos/wizzbranding/logos/SITE 300X80/1.png" public/logo.png
cp "/Users/juniordameto/Documents/projects/trabalhos/wizzbranding/logos/SEM FUNDO/1.png" public/logo-dark.png
cp "/Users/juniordameto/Documents/projects/trabalhos/wizzbranding/logos/PERFIL/1.png" public/logo-icon.png
```

---

### TAREFA 3 — Dashboard frontend: aplicar design system

**Arquivo principal:** `dashboard/frontend/src/index.css` ou equivalente global CSS

1. Adicionar import da font Space Grotesk no `<head>` do HTML base (`dashboard/frontend/index.html` ou `_document.tsx`)
2. Substituir variáveis CSS existentes pelos tokens da Wizz (ver seção Design System acima)
3. Substituir qualquer logo/imagem referenciada no header/navbar pelo novo `public/logo.png`
4. Atualizar título da página: `<title>WizzOS</title>`
5. Atualizar meta description: `"WizzOS — Plataforma de automação e agentes inteligentes"`

**Verificar os componentes:**
- `dashboard/frontend/src/components/` — procurar por "WizzOS" ou logos hardcoded
- `dashboard/frontend/src/App.tsx` ou `Layout.tsx` — header/navbar com logo

---

### TAREFA 4 — Setup wizard: atualizar defaults

**Arquivo:** `setup.py`

Substituir valores default no wizard:
- Empresa sugerida: `Wizz! comms.`
- Site sugerido: `wizzcomms.com`
- Qualquer referência a WizzOS no texto de boas-vindas → WizzOS

---

### TAREFA 5 — Criar branch de customização

```bash
git init  # (repo não tem git ainda após o cp)
git add -A
git commit -m "chore: initial wizz-os fork from wizz-os"
git checkout -b wizz
```

**Estratégia de fork safety** (para updates futuros do upstream):
- Branch `main` = upstream puro
- Branch `wizz` = todas as customizações Wizz
- Customizações exclusivas ficam em arquivos com prefixo `wizz-` ou na pasta `wizz/`
- Ao atualizar: `git fetch upstream` → merge em `main` → cherry-pick/rebase para `wizz`

---

### TAREFA 6 — Agentes: atualizar identidade

**Arquivo:** `.claude/agents/oracle.md` (agent card principal)

Substituir:
- Nome do produto no system prompt
- URL do projeto
- Referências à Wizz! comms.

**Arquivo:** `.claude/rules/agents.md`
- Substituir referências ao nome original

---

## Arquitetura produto (WizzOS como SaaS)

### 3 Tiers planejados
| Tier | Nome sugerido | Target |
|------|--------------|--------|
| 1 | Starter | Freelancers / solopreneurs |
| 2 | Agency | Agências digitais (core use case Wizz) |
| 3 | Enterprise | Empresas com múltiplas equipes |

### Multi-tenant chat
- Já existe como `WizzChat` (iframe do evo-crm fork) no repo atual
- A aba de chat no dashboard já suporta múltiplas organizações
- Para SaaS: cada cliente terá sua própria instância isolada (Docker Compose por org ou schema Postgres separado)

### Relação com outros produtos Wizz
```
WizzOS          → cockpit do founder + produto SaaS a vender
  ├── Systems   → links para CopyDrop, Booking client, n8n dos clientes
  ├── WizzChat  → multi-tenant chat (já no fork)
  └── Agentes   → automações internas

CopyDrop        → SaaS para copywriters (separado)
Booking client  → painel separado para cliente de booking (separado)
```

WizzOS é o cockpit de operação do founder. Cada produto tem seu próprio dashboard — não fundir.

---

## Estado atual

### O que está funcionando (Apr 19 2026)
- ✅ 38 agentes em `.claude/agents/`
- ✅ 175+ skills em `.claude/skills/`
- ✅ Branding Fase 1 aplicado — branch `wizz`, commit `2099857`
- ✅ Design system Wizz no dashboard (Space Grotesk + `#FF4500` + `#0D0D0D`)
- ✅ Logos e favicon oficial (`wizz-icon-orange.svg`) aplicados
- ✅ `make setup` executado com defaults reais (`Wizz! comms.`, `wizzcomms.com`, `Europe/Dublin`)
- ✅ `make dashboard-app` validado — dashboard em `http://localhost:8080` (HTTP 200)
- ✅ Suporte a OpenRouter já nativo (via OpenClaude)

### O que falta (próximas fases)
- [ ] Criar conta admin em `http://localhost:8080`
- [ ] Configurar `.env` com chaves reais (n8n, Discord, Stripe, etc.)
- [ ] Deploy VPS (systemd via `install-service.sh`)
- [ ] Definir 3 tiers de SaaS e pricing
- [ ] Decidir estratégia de chat (WizzChat ou alternativa)
- [ ] Decidir se integra n8n dos clientes via "Systems"

---

## Comandos úteis

```bash
make setup          # wizard interativo (gera config/, .env, CLAUDE.md)
make dashboard-app  # inicia dashboard em localhost:8080
make scheduler      # inicia rotinas automáticas
make morning        # briefing matinal
make logs           # logs JSONL
make help           # todos os comandos disponíveis
```

---

## Convenções de código (todos os projetos Wizz)

- Git author: `user.name=agencywizz` / `user.email=wizzdigitalagency@gmail.com`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`)
- Sem `console.log` em produção
- Sem secrets hardcoded — sempre `.env`
- Tabelas Supabase: `saas_{empresa}_{funcao}` (se migrar pra Supabase no futuro)
