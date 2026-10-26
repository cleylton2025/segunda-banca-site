# Segunda Banca / Égide Control

Cópia independente do site, preparada em 26/10/2026 para publicação em **outro domínio**. O site original continuará em https://segundabanca.com.br, sem mudança de hospedagem, DNS ou endereço.

## O que está incluído

- Site completo em `public/`: página inicial, `/monitor-djen/`, `/solucoes-gratuitas/`, estilos, JavaScript, imagens, símbolo e exemplos de relatório em PDF/PNG.
- Vídeo atual do Égide Control: https://www.youtube.com/watch?v=F1raKJ5xzoI (incorporado do YouTube).
- Scripts sem dependências de terceiros para validar, gerar o deploy e visualizar localmente.
- Guia de deploy em [docs/DEPLOY.md](docs/DEPLOY.md), inventário em [docs/INTEGRACOES.md](docs/INTEGRACOES.md) e hashes em [docs/snapshot.json](docs/snapshot.json).

`public/` preserva exatamente os arquivos da versão 10 do site original. Não é necessário React, WordPress, banco de dados, servidor de aplicação ou chave de API para exibir estas páginas. O motor de monitoramento DJEN, o checkout, o envio de relatórios e a LegalCalc são serviços externos; o código desses serviços não faz parte deste site.

## Início rápido para o desenvolvedor

Requisito para os scripts: Node.js 20 ou superior. Nenhum pacote externo precisa ser instalado.

```sh
node scripts/check.mjs
node scripts/serve.mjs public
```

Abra http://127.0.0.1:4173/ e http://127.0.0.1:4173/monitor-djen/.

Para gerar a cópia de produção, substitua pelo domínio real:

```sh
node scripts/build.mjs --site-url https://dominio-real.com.br
node scripts/serve.mjs dist
```

Publique **o conteúdo de `dist/` na raiz do novo domínio**. `public/` não é modificado pelo build. Somente os metadados `canonical` e `og:url` dos HTMLs gerados em `dist/` são adaptados ao novo domínio; conteúdo, identidade visual e links comerciais são preservados.

Também estão disponíveis `npm run check`, `npm run dev`, `npm run build -- --site-url https://dominio-real.com.br` e `npm run preview`. Em uma hospedagem com build automático, use `SITE_URL=https://dominio-real.com.br`, comando `npm run build` e diretório de publicação `dist`.

## Preservar a instalação atual

Este repositório não contém a configuração `.openai/hosting.json`, credenciais ou vínculo de publicação do projeto original. Não há workflow de deploy automático para a hospedagem atual. Cadastre somente o novo domínio em um novo projeto de hospedagem. Não altere os registros DNS do endereço existente.

## Acesso do webdesigner

O repositório é privado. O proprietário pode convidar a conta do desenvolvedor em **Settings → Collaborators → Add people**. O desenvolvedor precisa aceitar o convite. Alternativamente, envie o ZIP completo deste projeto; com os arquivos em mãos, ele não precisa de acesso ao GitHub para fazer o deploy.

## Antes de publicar

Leia o [guia de deploy](docs/DEPLOY.md). O domínio e a hospedagem de destino ainda serão definidos pelo responsável pelo novo deploy. O conteúdo conserva preço, horário de entrega, contato e checkout do site de origem; alterações comerciais dependem de orientação do proprietário.

Os arquivos não recebem uma licença de código aberto nesta entrega. Uso e redistribuição dependem da autorização do proprietário.
