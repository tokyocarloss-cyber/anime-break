# Anime Break

**Anime Break** é um protótipo de jogo de luta 3D para Android, inspirado na linguagem visual e na energia de animes de batalha, mas com personagens e identidade próprios/paródicos.

> **Estado atual:** esta build ainda é um **blockout técnico**. Os lutadores em formas simples, arena básica e partes da HUD são temporários e servem para validar combate, câmera, controles e desempenho. **Não representam a direção visual final.**

## Alpha técnica implementada

- movimentação touch e suporte inicial a controle físico
- câmera livre e lock-on de alvo
- ataque corpo a corpo e cadeia simples de combos
- dash / esquiva direcional
- defesa e janela de defesa perfeita
- três slots de habilidade
- vida e energia com regeneração
- IA simples para X1 offline
- configuração de tempo, dano, FPS e energia infinita
- finalização de K.O. com painel estilo mangá
- registro local básico de highlights
- wrapper Android em tela cheia

## Próximo marco: vertical slice visual

O próximo passo é substituir o blockout por uma pequena amostra já próxima da qualidade pretendida: personagem 3D leve com cel-shading, animações mais naturais, VFX de anime, câmera de impacto, cenário trabalhado e HUD polida, mantendo desempenho em celular como prioridade.

## APK Android

O projeto contém um pipeline em `.github/workflows/build-apk.yml`.

Ao chegar na branch `main`, alterações relevantes disparam uma build de Android que gera um APK de depuração e publica o artefato:

`anime-break-alpha-apk`

## Estrutura de bootstrap

`web/index.html` contém a interface da alpha. Durante o CI, `web/game.js` e `web/style.css` são reconstruídos temporariamente a partir dos arquivos em `source_chunks/` antes da compilação do APK. Esse empacotamento em partes é apenas uma solução de bootstrap e poderá ser removido quando o pipeline estiver estabilizado.
