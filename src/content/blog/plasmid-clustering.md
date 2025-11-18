---
title: "Projeto Científico: Classificação Hierárquica de Plasmídeos"
description: "Como estou utilizando a Teoria dos Grafos e da Informação para mapear a 'matéria escura' dos elementos genéticos móveis e desvendar sua evolução."
image: "./plasmid.jpg"
publishDate: "2025-11-18"
tags: ["Bioinformática", "Grafos", "Pesquisa", "USP", "Evolução"]
---

# O Desafio dos Plasmídeos na Metagenômica

Sempre fui fascinado pela **interseção entre a complexidade biológica e a elegância matemática**. Meu atual projeto de iniciação científica concentra-se em um dos problemas mais intrigantes pra mim: como classificar **plasmídeos** de forma *sistemática*?

Plasmídeos são **elementos genéticos extracromossômicos**, pequenos anéis de DNA que existem fora do cromossomo principal de uma bactéria. Eles são **fundamentais para a evolução bacteriana**, pois atuam como os **principais vetores de Transferência Horizontal de Genes (THG)**. Em termos simples, eles permitem que bactérias **troquem "superpoderes"**, como a resistência a antibióticos ou fatores de virulência, acelerando a adaptação e o surgimento de patógenos.

No entanto, classificar essa **imensa** diversidade de plasmídeos é um desafio. Os métodos clássicos, que dependem de cultivo em laboratório ou da identificação de marcadores genéticos específicos, **falham miseravelmente** diante do volume e da diversidade desconhecida que a **metagenômica** (o estudo do DNA coletado diretamente do ambiente, como em amostras de solo, água e esgoto) revelou. É a **"matéria escura"** do genoma microbiano, e precisamos de novas ferramentas para iluminá-la.

## 💡 A Intuição Biológica: Por que a Hierarquia é Necessária?

A **biologia não é plana**. A evolução acontece em múltiplas escalas de tempo, e as populações de plasmídeos refletem isso. Minha hipótese central é que sua estrutura de parentesco é intrinsecamente hierárquica:

* **Nível Macroscópico (Grosso):** Os grandes agrupamentos devem refletir características evolutivas antigas e conservadas, como os sistemas de replicação do DNA. Estes são os "troncos" da árvore evolutiva.
* **Nível Microscópico (Fino):** Os subgrupos menores devem revelar especializações mais recentes, adaptações a nichos ecológicos específicos ou aquisições pontuais de genes de virulência. Estes são os "galhos" mais finos.

Para capturar essa nuance, precisamos de uma abordagem que vá **além da similaridade linear simples**. Isto é, não podemos simplesmente agrupar os plasmídeos baseado na semelhança de suas sequências de DNA.

---

## 💻 Metodologia: Traduzindo a Biologia para a Teoria dos Grafos

Para resolver o problema da classificação em múltiplas escalas, estou desenvolvendo uma *pipeline* que traduz a complexidade biológica para a **linguagem da Teoria dos Grafos e da Informação**.

### 1. A Rede de Compartilhamento Gênico (Grafo Bipartido)

Em vez de comparar sequências de DNA individualmente, eu modelo os dados como um **grafo bipartido**. Pense em uma rede com dois tipos de elementos (**nós**):

* **Nós de Plasmídeos:** Representam os elementos genéticos que queremos classificar.
* **Nós de Genes:** Representam os genes ou sequências de proteínas que eles carregam.

As **conexões** (arestas) entre um plasmídeo e um gene são definidas de forma simples: se um plasmídeo carrega um gene específico, há uma conexão com **peso fixo e uniforme** (valor 1). O que torna a rede complexa é a conexão *indireta* entre os próprios genes, pois ela reflete a sua similaridade evolutiva: se dois genes são parecidos, eles são conectados. A força dessa conexão gene-gene é determinada por uma pontuação técnica chamada *bitscore*, que é normalizada pelo valor de autohit (o alinhamento do gene com ele mesmo). Essa normalização é crucial para garantir que genes de tamanhos diferentes sejam comparados de forma justa.

### 2. O Algoritmo de Fluxo de Informação (Infomap)

Para encontrar os grupos ou **comunidades** dentro dessa rede emaranhada, utilizo o algoritmo **Infomap**, que se baseia na **Teoria da Informação**.

A ideia por trás do Infomap é **fascinante e elegante**: o algoritmo simula um "caminhante aleatório" que viaja pela rede, andando de nó em nó seguindo as conexões. Ele, então, tenta **descrever o trajeto desse caminhante gastando a menor quantidade de *bits*** (unidade de informação) possível.

Em linhas gerais:

* Quando o caminhante gasta poucos *bits* para mudar de um nó para o outro, significa que eles pertencem à mesma comunidade (eles andam juntos).
* Quando a mudança requer muitos *bits*, eles estão saltando entre comunidades diferentes.

A chave para a hierarquia está em um parâmetro chamado **"Tempo de Markov"**. Ao ajustar esse tempo da simulação, conseguimos focar em escalas diferentes:

* **Tempos curtos:** O caminhante fica "preso" em comunidades pequenas e coesas, revelando a classificação no nível fino (micro).
* **Tempos longos:** O caminhante salta mais livremente e enxerga apenas as super-comunidades, revelando a classificação no nível grosso (macro).

---

## 🔎 Resultados Preliminares: O Problema dos Transposons

Um resultado inicial notável valida a intuição de que a **estrutura de grafos capta a biologia fundamental**. Durante minhas análises, encontrei um desafio técnico interessante, que eu chamo de **"ruído"** causado pelos **transposons** (os famosos "genes saltadores", capazes de se mover de um local para outro no genoma).

Esses elementos genéticos se movem e se inserem em quase todo lugar, criando **pontes artificiais** no nosso grafo. Eles conectam plasmídeos que não deveriam ter parentesco evolutivo próximo, mas que, por acaso, têm um transposon em comum. Isso pode **mascarar o sinal evolutivo genuíno**.

Minha abordagem para **mitigar isso** envolve o uso de uma métrica chamada *flow* (fluxo), fornecida pelo Infomap após a execução do algoritmo. Eu a utilizo para identificar esses genes de conectividade excessiva (os transposons) e os **remover preventivamente** do processo de agrupamento.

Essa estratégia faz sentido intuitivo: um nó (gene) com alto valor de fluxo foi visitado mais vezes pelo caminhante aleatório, indicando que ele é um ponto central e altamente conectado na rede, exatamente o que se espera de um transposon. O que torna essa análise ainda mais interessante é o fato de que, ao analisar a anotação funcional desses genes (isto é, o que eles "são" ou "fazem"), **foi possível correlacionar os grupos de alto fluxo com anotações inequivocamente associadas a transposons**. A métrica matemática do Infomap, portanto, está detectando, sem saber, a natureza biológica desses elementos de ruído

## 🚀 Próximos Passos 

Atualmente, estou na fase de **validação e refinamento**, comparando meus agrupamentos hierárquicos com taxonomias clássicas e analisando o conteúdo funcional (genes de manutenção *versus* genes acessórios) de cada grupo.

O objetivo final desta pesquisa se divide em três:

1. Entregar uma **estrutura hierárquica robusta** que outros pesquisadores possam utilizar para classificar seus próprios plasmídeos de maneira eficiente, identificando padrões e tendências evolutivas de forma imediata.

2. Prover, junto a essa classificação, um **contexto detalhado sobre as funções e o repertório gênico** de um plasmídeo, indo além da simples taxonomia.

3. Utilizar essa estrutura e os metadados associados às sequências para analisar em escala global as rotas e a dinâmica da Transferência Horizontal de Genes (THG), oferecendo um novo ângulo sobre como esses elementos moldam a saúde humana, a agricultura e a ecologia microbiana.

---
*Este projeto é orientado pelo Prof. Dr. Antônio Camargo no Instituto de Química da USP.*
