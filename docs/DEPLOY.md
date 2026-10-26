# Guia de deploy em outro domínio

## Escopo e ponto de partida

Esta entrega copia o **site institucional e comercial**, não a infraestrutura que executa o serviço vendido. Origem: https://segundabanca.com.br. Snapshot: versão 10, commit de origem `bceccfe35647134a15b93452147913d72b5be1c9`, conferido em 26/10/2026. Os 15 arquivos de `public/` estão listados com SHA-256 em `snapshot.json`.

Páginas a preservar:

| Caminho no novo domínio | Arquivo de origem |
| --- | --- |
| `/` | `public/index.html` |
| `/monitor-djen/` | `public/monitor-djen/index.html` |
| `/solucoes-gratuitas/` | `public/solucoes-gratuitas/index.html` |

Os assets usam caminhos absolutos iniciados por `/`. A cópia foi preparada para a raiz de um domínio, não para uma subpasta como `usuario.github.io/repositorio/`. Preserve a estrutura das pastas e a leitura de `index.html` em diretórios. Não configure um fallback de SPA que devolva a página inicial para arquivos inexistentes.

## Dados que o desenvolvedor precisa definir

- O novo domínio e a conta/projeto da nova hospedagem.
- Registros DNS fornecidos por essa hospedagem. Não há IP ou CNAME de destino definido nesta entrega.
- HTTPS válido no novo domínio e preferência por domínio com ou sem `www`.
- Política de indexação: o build usa canonical próprio para o novo domínio. Se o proprietário preferir que o domínio atual continue sendo a referência para buscas, ajuste os canonicals da cópia conscientemente; não crie redirecionamento entre os dois sites.

## Build local

1. Use Node.js 20 ou superior; os scripts não dependem de bibliotecas externas.
2. Execute `node scripts/check.mjs` para conferir o snapshot e os arquivos referenciados.
3. Execute `node scripts/build.mjs --site-url https://DOMINIO-REAL` com a origem HTTPS real, sem subpasta. O build também aceita a variável de ambiente `SITE_URL`.
4. Confira `dist/` com `node scripts/serve.mjs dist`. A prévia abre em `127.0.0.1:4173`.
5. Publique os arquivos de `dist/` na raiz da nova hospedagem.

O arquivo `.env.example` documenta a variável. Ele não é carregado automaticamente: configure a variável na hospedagem ou passe `--site-url`. O build rejeita uma URL ausente, inválida ou o domínio de exemplo. `dist/` gerada tem um marcador para impedir sobreposição acidental em uma pasta estranha. Para uma versão com arquivos removidos ou renomeados, gere em uma cópia limpa do projeto para não conservar arquivos antigos.

Para editar conteúdo futuramente, altere `public/`, gere novamente e revise os hashes do snapshot se a mudança foi intencional. Os hashes desta entrega documentam o estado original; uma alteração autorizada deve ser registrada no histórico do Git.

## Hospedagem com build automático

- Framework: estático / Other / nenhum framework.
- Root directory: raiz deste repositório.
- Build command: `npm run build`.
- Output / publish directory: `dist`.
- Variável de build: `SITE_URL=https://DOMINIO-REAL`.
- Node: 22, ou outra versão suportada a partir de 20.

Há configurações iniciais `netlify.toml` e `vercel.json`. A integração do repositório com qualquer hospedagem deve ser feita em um **novo projeto**; cadastrar somente o domínio novo. Os arquivos de configuração não contêm credenciais e não publicam nada sozinhos.

## Hospedagem comum: cPanel, Apache ou Nginx

Gere `dist/` localmente e envie **o conteúdo** dessa pasta para o document root do novo domínio (por exemplo, a pasta definida no painel da hospedagem). Não envie `public/` como subpasta do domínio. Nenhuma execução de Node será necessária no servidor para servir a saída pronta.

O servidor deve usar `index.html` como índice e responder 404 para arquivos inexistentes. Em Nginx, o comportamento equivalente é `index index.html;` e `try_files $uri $uri/ =404;` dentro do bloco do site novo; o desenvolvedor deve integrar isso à configuração da hospedagem e ao HTTPS, sem substituir a configuração do site original.

## Links e serviços externos

Consulte `INTEGRACOES.md`. Checkout, e-mail de suporte, Instagram, vídeo e calculadora continuam com os destinos atuais. A cópia não duplica esses serviços nem cria novas contas ou novos endereços de e-mail.

Se houver uma política de segurança CSP na nova hospedagem, ela precisa permitir as fontes Google, imagens locais e o iframe `https://www.youtube-nocookie.com`. A página de demonstração contém JavaScript e CSS inline já existentes; uma política restritiva exige configuração adequada de hashes/nonces ou extração desses blocos. Não há CSP rígida adicionada por este pacote.

## Conferência após o deploy

- Abrir as três páginas e atualizar cada uma diretamente pela URL.
- Conferir desktop e celular, menu e âncoras.
- Reproduzir o vídeo `F1raKJ5xzoI` e conferir o link “Abrir no YouTube”.
- Abrir o PDF e ampliar/fechar as duas imagens do relatório.
- Conferir os botões de checkout sem realizar compra.
- Conferir FAQ, contato, Instagram e LegalCalc.
- Conferir canonical e `og:url` no HTML de cada página do novo domínio.
- Conferir HTTPS e redirecionamento entre `www` e sem `www`, se aplicável, somente no novo domínio.
- Conferir que https://segundabanca.com.br/monitor-djen/ continua no endereço original.

## Observação preexistente no conteúdo

A página de soluções gratuitas contém o link `/#grupo-piloto`, mas a página inicial do snapshot não contém esse ID. A cópia preserva esse comportamento para não alterar o conteúdo aprovado. O script de conferência registra esse ponto como aviso. O desenvolvedor pode pedir orientação ao proprietário antes de substituir o link.

## Fora desta entrega

Não foram configurados o domínio de destino, DNS, certificados, contas de hospedagem, cobrança, credenciais, operação do monitoramento DJEN nem envio de e-mails. O site atual não foi republicado nem teve sua configuração alterada por esta exportação.
