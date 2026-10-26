# Inventário de dependências e contatos

Dados observados nos arquivos do site copiado. Não são novas credenciais nem serviços contratados para o segundo domínio.

| Item | Destino / arquivo | Papel na cópia |
| --- | --- | --- |
| Vídeo | `https://www.youtube-nocookie.com/embed/F1raKJ5xzoI?rel=0` | Player na primeira dobra do Égide Control |
| Link do vídeo | `https://www.youtube.com/watch?v=F1raKJ5xzoI` | Abrir no YouTube |
| Checkout | `https://pay.kiwify.com.br/75EvnBn` | Contratação; permanece na conta/plataforma atual |
| Suporte | `mailto:contato@segundabanca.com.br` | Contato mantido; não cria caixa postal no domínio novo |
| Instagram | `https://www.instagram.com/dr.cleyltonmendes/` | Perfil externo |
| LegalCalc | `https://legalcalc-46hsysjw.manus.space/` | Calculadora externa; não é hospedada por este site |
| Google Fonts | `fonts.googleapis.com`, `fonts.gstatic.com` | Montserrat, DM Sans e Manrope, com fontes de sistema como alternativa |
| Relatório PDF | `/assets/monitor-demo/relatorio-exemplo.pdf` | Arquivo local incluído, com dados fictícios |
| Imagens de relatório | `/assets/monitor-demo/relatorio-1.png`, `/assets/monitor-demo/relatorio-2.png` | Arquivos locais incluídos; ampliação em diálogo |
| Retrato | `/assets/cleylton.jpg` | Original incluído sem recompressão |
| Marcas | `/assets/simbolo.png`, `/assets/egide-symbol.svg` | Arquivos locais incluídos |

O código inspecionado não chama uma API própria, não recebe cadastros em formulário, não possui banco de dados e não contém chaves de pagamento. Os botões de compra são links para o checkout externo. As funcionalidades do monitor e a entrega dos relatórios são operações externas ao site.

Os preços e condições comerciais continuam nos HTMLs: primeiro mês R$ 9,90; depois R$ 39,90/mês; entrega anunciada às 9h; condições completas nas páginas. Esta exportação não valida nem altera essas condições. Confirme com o proprietário antes de mudar qualquer informação comercial.

Os links de navegação do próprio site são relativos à raiz do domínio e, por isso, passam a navegar na cópia. Os canonicals absolutos do snapshot são adaptados para o domínio informado no build; os links de contato e serviços externos são mantidos.
