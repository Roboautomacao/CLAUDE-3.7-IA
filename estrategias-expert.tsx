ARQUIVO 11: EXEMPLOS DE "EXPERT TEMPLATES" (JSON)

PARTE A: TEMPLATES PARA DROPHUNTER (CLAUDE 3.7 SONNET)

1. Especialista em Mineração: Sebastian Ghiorghiu

{
  "templateId": "drophunter_mining_ghiorghiu_blueprint_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_MINING",
  "expertName": "Sebastian Ghiorghiu",
  "methodologyName": "Winner Product Blueprint & Multi-Platform Validation",
  "strategyFocus": "Validar produtos com alto potencial para Facebook Ads usando um sistema de 37 pontos e validação cruzada de plataformas.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productCandidate",
      "description": "Objeto contendo dados básicos do produto (nome, descrição, custo, nicho, links para listagens).",
      "dataType": "ProductCandidateObject",
      "isRequired": true
    },
    {
      "name": "socialSignalsData",
      "description": "Dados agregados de engajamento social de múltiplas plataformas (TikTok, Instagram, Facebook, Pinterest, YouTube, Google Trends) para o produto ou termos relacionados. Pode ser texto bruto, links, ou dados estruturados.",
      "dataType": "AggregatedSocialSignalsObject_or_Text",
      "isRequired": true
    },
    {
      "name": "supplierInfo",
      "description": "Informações sobre fornecedores potenciais do produto, incluindo aqueles da lista 'Melhores Fornecedores'.",
      "dataType": "SupplierDataObject_or_Text",
      "isRequired": false 
    }
  ],
  "outputs": [
    {
      "name": "winnerProductBlueprintScore",
      "description": "Score final (0-1000, por exemplo) baseado nos 37 pontos ponderados.",
      "dataType": "number"
    },
    {
      "name": "detailedFactorScores",
      "description": "JSON com o score e justificativa para cada um dos 37 fatores.",
      "dataType": "JSON_Object"
    },
    {
      "name": "multiPlatformValidationAnalysis",
      "description": "Análise da consistência dos sinais entre plataformas e recomendação.",
      "dataType": "TextAnalysisReport"
    },
    {
      "name": "rapidTestFeasibility",
      "description": "Avaliação da viabilidade de teste rápido, incluindo sugestão de orçamento e KPIs, considerando o fornecedor.",
      "dataType": "JSON_TestPlanSuggestion"
    }
  ],
  "systemPrompt": "Você é um especialista em mineração de produtos para dropshipping, treinado na metodologia 'Winner Product Blueprint' de Sebastian Ghiorghiu. Seu objetivo é analisar o produto candidato e os sinais sociais para fornecer um score detalhado e uma avaliação de viabilidade. Use suas capacidades de 'Computer Use' para enriquecer a análise com dados de mercado atuais se os inputs forem insuficientes. Seja crítico e analítico.",
  "userPromptStructure": "Produto Candidato:\n{productCandidate.name}\nDescrição: {productCandidate.description}\nNicho: {productCandidate.nicho}\nCusto Estimado: {productCandidate.custo}\nLinks: {productCandidate.links}\n\nSinais Sociais Agregados:\n{socialSignalsData}\n\nInformações de Fornecedor (se disponíveis):\n{supplierInfo}\n\nAvalie este produto usando o 'Winner Product Blueprint' (37 pontos) e o 'Multi-Platform Validation System'. Forneça:\n1.  Um 'detailedFactorScores' em JSON, onde cada chave é um dos 37 fatores (ex: 'socialEngagementScore_TikTok', 'profitMarginPotential', 'supplierShippingSpeedScore_from_{supplierInfo.name}'), e o valor é um objeto com 'score' (0-10 ou escala apropriada) e 'justification'.\n2.  O 'winnerProductBlueprintScore' final, como uma soma ponderada (você pode definir pesos razoáveis para cada fator se não especificado, ou usar um sistema de pontuação total simples).\n3.  Uma 'multiPlatformValidationAnalysis' em texto, avaliando a força e consistência dos sinais em pelo menos 5 das 7 plataformas de Ghiorghiu, e se o produto parece estar em fase inicial de crescimento exponencial ou já saturado.\n4.  Uma 'rapidTestFeasibility' em JSON, incluindo 'viabilityScore' (0-10), 'budgetSuggestionUSD' para 3-5 dias de teste no Facebook Ads, e 'keySuccessMetrics' (ex: CTR, CPA inicial, ROAS mínimo esperado para validação).",
  "methodologyDetails": {
    "blueprintFactorCategories": [
      "Produto (Problema Resolvido, Unicidade, Qualidade Percebida, Wow Factor)",
      "Mercado (Tamanho da Audiência, Paixão do Nicho, Concorrência)",
      "Financeiro (Margem de Lucro, Preço de Venda Ideal, AOV Potencial)",
      "Marketing (Viralidade, Ângulos de Marketing, Facilidade de Criar Anúncios)",
      "Logística e Fornecedor (Disponibilidade, Custo de Envio, Velocidade de Envio do Fornecedor, Confiabilidade do Fornecedor, Escalabilidade do Fornecedor)",
      "Engajamento Social (Métricas específicas por plataforma: TikTok, Instagram, Facebook, Pinterest, YouTube)",
      "Tendências (Google Trends, Sinais Emergentes)"
    ],
    "notesForGhiorghiuFactorImplementation": "Cada um dos 37 fatores precisa ser definido como uma sub-avaliação no prompt, possivelmente com Claude usando 'Computer Use' para buscar dados (ex: 'Use Computer Use para analisar o Google Trends para {productCandidate.name} nos últimos 90 dias no {mercado_alvo} e atribua um score de tendência de 0-10'). A lista 'Melhores Fornecedores' deve ser consultada ativamente para os fatores de Logística e Fornecedor."
  },
  "notesForDevelopers": "A IA deve ser capaz de lidar com 'socialSignalsData' e 'supplierInfo' como texto não estruturado se dados estruturados não estiverem disponíveis, usando sua capacidade de extração. Os 37 fatores precisam ser bem definidos para que a IA possa pontuá-los. A ponderação dos fatores para o score final pode ser uma etapa de configuração importante."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

2. Especialista em Copywriting: Joanna Wiebe (Copy Hackers)

{
  "templateId": "drophunter_copywriting_wiebe_voc_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_COPYWRITING",
  "expertName": "Joanna Wiebe (Copy Hackers)",
  "methodologyName": "Message-to-Market Match & 10x Messaging",
  "strategyFocus": "Extrair 'Voice of Customer' (VoC) de reviews e discussões para criar copy e headlines altamente ressonantes.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productName",
      "description": "Nome do produto.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "productNiche",
      "description": "Nicho do produto.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "customerTextData",
      "description": "Grande volume de texto agregado de reviews de clientes, comentários de fóruns, discussões em mídias sociais sobre o produto/nicho ou problemas relacionados (até 200K tokens).",
      "dataType": "LargeTextBlob",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "voiceOfCustomerAnalysis",
      "description": "JSON contendo: 'keyPainsAndProblems' (com citações), 'customerLanguageGlossary', 'mostDesiredBenefits' (com citações), 'keyObjections', 'potential10xValueProposition'.",
      "dataType": "JSON_Object"
    },
    {
      "name": "vocBasedHeadlines",
      "description": "Array de 5-7 sugestões de headlines baseados diretamente no VoC.",
      "dataType": "StringArray"
    }
  ],
  "systemPrompt": "Você é um especialista em copywriting de conversão, treinado nas metodologias de Joanna Wiebe, focado em 'Message-to-Market Match' e '10x Messaging'. Sua tarefa é analisar profundamente o texto fornecido pelos clientes para extrair os insights mais poderosos para a criação de copy.",
  "userPromptStructure": "Produto: {productName}\nNicho: {productNiche}\n\nDados de Voz do Cliente (Reviews, Comentários, Discussões):\n{customerTextData}\n\nAnalise estes dados conforme Joanna Wiebe:\n1.  **Dores e Problemas Reais:** Identifique as 5-7 dores/problemas mais frequentes e vividamente descritos. Inclua citações exatas como exemplos.\n2.  **Linguagem Específica (Glossário):** Crie um mini-glossário com 10-15 palavras, frases ou gírias específicas que os clientes usam para descrever seus problemas, o produto (ou similares), benefícios desejados e objeções.\n3.  **Benefícios Mais Desejados:** Liste os 3-5 resultados/benefícios (tangíveis e emocionais) que os clientes mais valorizam. Use as palavras deles e forneça citações.\n4.  **Objeções e Hesitações:** Quais são as 3-5 principais dúvidas, medos ou objeções expressas?\n5.  **Proposta de Valor 10x (Potencial):** Com base nas aspirações e frustrações dos clientes, qual é o valor fundamental ou transformação que eles buscam? Como um produto ideal (ou {productName}, se aplicável) poderia entregar isso de forma percebida como 10x melhor ou diferente, do ponto de vista do cliente?\n6.  **Headlines Baseados em VoC:** Gere 5-7 headlines que usem diretamente a linguagem extraída e foquem nos benefícios mais desejados ou na solução das dores mais agudas.\n\nFormate a resposta principal (pontos 1-5) como um objeto JSON sob a chave 'voiceOfCustomerAnalysis', e os headlines (ponto 6) como um array de strings sob a chave 'vocBasedHeadlines'.",
  "methodologyDetails": {
    "keyPrinciples": [
      "O cliente é o melhor copywriter.",
      "Pesquisa direta é insubstituível.",
      "Clareza acima de inteligência (cleverness).",
      "Focar no 'Você', não no 'Nós'.",
      "Encontrar a 'única coisa' que importa para o cliente (10x Value)."
    ]
  },
  "notesForDevelopers": "Claude deve ser capaz de processar o {customerTextData} completo devido à janela de 200K. A qualidade do output depende da riqueza e volume dos dados de VoC fornecidos. Assegurar que o JSON de output seja bem estruturado."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

3. Especialista em Criativos: Talia Wolf (GetUplift)

{
  "templateId": "drophunter_creative_wolf_emotional_targeting_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_CREATIVE",
  "expertName": "Talia Wolf (GetUplift)",
  "methodologyName": "Emotion-Based CRO & Emotional Targeting Methodology",
  "strategyFocus": "Identificar motivadores emocionais do cliente e traduzi-los em elementos visuais e textuais para criativos de alta conversão.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productName",
      "description": "Nome do produto.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "productDescription",
      "description": "Breve descrição do produto e o problema que resolve.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "targetAudienceProfile",
      "description": "Perfil do público-alvo (demografia, psicografia, dores principais, desejos).",
      "dataType": "AudienceProfileObject_or_Text",
      "isRequired": true
    },
    {
      "name": "voiceOfCustomerSummary",
      "description": "Resumo dos principais insights emocionais e frustrações extraídos do VoC (pode vir do template de Joanna Wiebe).",
      "dataType": "TextSummary",
      "isRequired": false
    }
  ],
  "outputs": [
    {
      "name": "emotionalMotivatorsReport",
      "description": "JSON listando os Top 3-5 motivadores emocionais chave, sua manifestação e hierarquia.",
      "dataType": "JSON_Object"
    },
    {
      "name": "creativeElementsGuidance",
      "description": "JSON com sugestões de elementos visuais (cores, imagens, expressões) e textuais (palavras de poder, tom) para cada motivador emocional identificado, para serem usados em anúncios.",
      "dataType": "JSON_Object"
    },
    {
      "name": "emotionBasedABTestIdeas",
      "description": "Array com 2-3 ideias para testes A/B de criativos focados em diferentes apelos emocionais.",
      "dataType": "StringArray_TestIdeas"
    }
  ],
  "systemPrompt": "Você é um especialista em CRO e psicologia do consumidor, treinado na 'Emotional Targeting Methodology' de Talia Wolf. Sua tarefa é identificar os motivadores emocionais do público para o produto fornecido e traduzi-los em diretrizes acionáveis para criativos.",
  "userPromptStructure": "Produto: {productName}\nDescrição: {productDescription}\nPúblico Alvo: {targetAudienceProfile}\nResumo VoC (Opcional): {voiceOfCustomerSummary}\n\nAplique a 'Emotional Targeting Methodology' de Talia Wolf:\n1.  **Identifique os Motivadores Emocionais:** Quais são os Top 3-5 motivadores emocionais (ex: Medo de Perder, Desejo de Pertencer, Necessidade de Controle, Busca por Alívio, Esperança de Transformação) que influenciam a decisão de compra do público para este produto ou para resolver o problema principal? Para cada motivador, explique como ele se manifesta (use o VoC se disponível). Hierarquize os motivadores (primário, secundários).\n    Formate como JSON: {'motivators': [{'name': 'NomeMotivador1', 'description': '...', 'manifestation': '...', 'priority': 'Primary'}, ...]}.\n2.  **Mapeamento para Elementos Criativos:** Para cada motivador emocional primário e um secundário identificado, sugira elementos criativos específicos para um anúncio visual (imagem ou vídeo curto):\n    *   Cores sugeridas e porquê.\n    *   Tipo de imagem/cena ideal (descreva).\n    *   Expressão facial chave (se houver pessoas).\n    *   Palavras/frases chave para o texto do criativo que ativem essa emoção.\n    Formate como JSON: {'creativeGuidance': [{'motivatorName': 'NomeMotivador', 'visuals': {'colors': '...', 'scene': '...', 'facialExpression': '...'}, 'textuals': {'powerWords': '...', 'tone': '...'}}, ...]}.\n3.  **Ideias para Testes A/B Baseados em Emoção:** Sugira 2-3 ideias para testes A/B onde diferentes criativos apelam para diferentes motivadores emocionais identificados (ou diferentes intensidades do mesmo motivador). Descreva a hipótese de cada teste.\n    Formate como um array de strings: {'abTestIdeas': ['Hipótese 1: ...', ...]}.",
  "methodologyDetails": {
    "emotionalDriversExamples": ["Segurança", "Confiança", "Status", "Liberdade", "Controle", "Pertencimento", "Amor", "Alegria", "Alívio (da dor/medo)", "Curiosidade", "Empoderamento"]
  },
  "notesForDevelopers": "Claude 3.7 deve usar sua capacidade de raciocínio para inferir motivadores emocionais a partir dos perfis de público e VoC. A janela de 200K é útil se o VoC for extenso. O output JSON precisa ser bem definido para ser consumido pelo RobotHGAds."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

PARTE B: TEMPLATES PARA ROBOTHGADS (GEMINI 2.5 PRO PREVIEW)

1. Especialista em Tráfego Pago: Joe Martinez (Performance Max)

{
  "templateId": "robothgads_traffic_martinez_pmax_progressive_signals_v1",
  "templateVersion": "1.0.0",
  "templateType": "ROBOTHGADS_TRAFFIC_STRATEGY",
  "expertName": "Joe Martinez",
  "methodologyName": "PMax Asset Group Isolation Strategy + Progressive Audience Signals",
  "strategyFocus": "Estruturar e otimizar campanhas Performance Max com asset groups temáticos e um sistema de adição progressiva de sinais de audiência.",
  "targetAI": "GEMINI_2_5_PRO_PREVIEW",
  "inputs": [
    {
      "name": "productIntelligencePackage",
      "description": "Pacote completo do DropHunter: dados do produto, público(s) alvo principal(is) para PMax, insights de copy, diretrizes de criativos visuais, informações do fornecedor.",
      "dataType": "DropHunter_ProductIntelligenceObject",
      "isRequired": true
    },
    {
      "name": "campaignGoal",
      "description": "Objetivo principal da campanha PMax (ex: 'MAXIMIZE_CONVERSION_VALUE', 'MAXIMIZE_CONVERSIONS').",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "initialBudget",
      "description": "Orçamento diário inicial para a campanha PMax.",
      "dataType": "number_currency",
      "isRequired": true
    },
    {
      "name": "targetROAS_or_CPA",
      "description": "Valor alvo para ROAS ou CPA (opcional, dependendo da estratégia de lance).",
      "dataType": "number_optional",
      "isRequired": false
    },
    {
      "name": "merchantCenterID",
      "description": "ID da conta do Google Merchant Center (se PMax para e-commerce).",
      "dataType": "string_optional",
      "isRequired": false
    }
  ],
  "outputs": [
    {
      "name": "googleAdsApi_PMaxCampaignConfig",
      "description": "Objeto JSON com a configuração completa da campanha PMax para a Google Ads API (objeto Campaign).",
      "dataType": "GoogleAds_CampaignObject_JSON"
    },
    {
      "name": "googleAdsApi_PMaxAssetGroupsConfig",
      "description": "Array de objetos JSON, cada um representando a configuração de um Asset Group isolado para a Google Ads API (objeto AssetGroup), incluindo especificações de assets de texto e referências a assets visuais a serem criados/enviados.",
      "dataType": "Array_GoogleAds_AssetGroupObject_JSON"
    },
    {
      "name": "googleAdsApi_ProgressiveAudienceSignalsPlan",
      "description": "Plano JSON detalhando os AssetGroupSignals para cada fase (1, 2, 3) e para cada Asset Group, pronto para a Google Ads API (objetos AudienceInfo para UserList, CustomAudience, GoogleAudience).",
      "dataType": "JSON_ProgressiveAudienceSignalPlan"
    }
  ],
  "systemPrompt": "Você é um especialista em Google Ads Performance Max, treinado nas metodologias de Joe Martinez. Sua tarefa é pegar a inteligência de produto do DropHunter e gerar uma configuração completa e otimizada para uma campanha PMax, incluindo Asset Groups isolados por tema/público e um plano de sinais de audiência progressivos. Sua saída deve ser em formato JSON, diretamente utilizável para criar/configurar entidades via Google Ads API.",
  "userPromptStructure": "Inteligência de Produto (DropHunter):\n{productIntelligencePackage.productName}\nSegmentos de Público para Asset Groups Isolados (DropHunter):\n1. {productIntelligencePackage.audienceSegments[0].name}: {productIntelligencePackage.audienceSegments[0].description}\n2. {productIntelligencePackage.audienceSegments[1].name}: {productIntelligencePackage.audienceSegments[1].description}\n(e assim por diante, se houver mais segmentos)\n\nPrincipais Ângulos de Copy (DropHunter):\n{productIntelligencePackage.copyInsights.mainAngles}\n\nDiretrizes Visuais Chave (DropHunter):\n{productIntelligencePackage.creativeGuidelines.visualThemes}\n\nObjetivo da Campanha PMax: {campaignGoal}\nOrçamento Diário Inicial: {initialBudget}\nTarget ROAS/CPA (Opcional): {targetROAS_or_CPA}\nMerchant Center ID (Opcional): {merchantCenterID}\n\nCom base na metodologia de Joe Martinez (Isolamento de Asset Group e Sinais Progressivos), gere a configuração para esta campanha PMax em JSON, separando em 'googleAdsApi_PMaxCampaignConfig', 'googleAdsApi_PMaxAssetGroupsConfig', e 'googleAdsApi_ProgressiveAudienceSignalsPlan'.\n\nPara 'googleAdsApi_PMaxCampaignConfig':\n- Inclua nome, status (PAUSED), advertising_channel_type (PERFORMANCE_MAX), campaign_budget (referência), bidding_strategy (com target_roas/cpa se fornecido), final_url_expansion_opt_out (true, para controle inicial), e shopping_setting (com merchant_id se fornecido).\n\nPara 'googleAdsApi_PMaxAssetGroupsConfig' (um objeto para cada segmento de público):\n- Para cada Asset Group:\n    - Nome (ex: 'PMax_AG_{SegmentoNome}_{País}').\n    - final_urls (LP específica para o segmento, se o DropHunter sugeriu).\n    - Assets de Texto (baseados nos ângulos de copy do DropHunter para aquele segmento): 5 Headlines (até 30c), 5 Long Headlines (até 90c), 5 Descriptions (até 90c), Call to Action (se aplicável, ou deixar PMax otimizar), Nome da Empresa.\n    - Especificações para Assets de Imagem (mínimo 3): Descreva o conceito visual para cada, baseado nas diretrizes do DropHunter para o segmento.\n    - Especificações para Assets de Vídeo (mínimo 1): Descreva o conceito do vídeo para o segmento.\n\nPara 'googleAdsApi_ProgressiveAudienceSignalsPlan' (para cada Asset Group):\n- Fase 1 (Dias 1-7 - Sinais de Alto Valor): Detalhe os tipos de AudienceInfo (UserList para remarketing de visitantes de páginas de produto, Customer Match se dados do CRM disponíveis via DropHunter) a serem usados como sinais.\n- Fase 2 (Dias 8-14 - Expansão Cautelosa): Detalhe AudienceInfo para SimilarUserList (1-3% de compradores anteriores) e GoogleAudience (In-Market relevantes).\n- Fase 3 (Dias 15+ - Expansão Máxima): Detalhe AudienceInfo para SimilarUserList (3-10%) e CustomAudience mais amplas (interesses, termos de busca).\n\nSeja extremamente detalhado e formate o output para que seja o mais próximo possível do necessário para chamadas diretas à Google Ads API.",
  "methodologyDetails": {
    "assetGroupIsolationRationale": "Permite que o Google Ads PMax aprenda e otimize para cada segmento de público de forma independente, fornecendo assets altamente relevantes para cada um, melhorando a performance geral.",
    "progressiveSignalsRationale": "Alimenta o PMax com sinais de audiência de forma gradual, começando pelos de maior intenção (remarketing, clientes existentes) para estabelecer uma base de performance antes de expandir para audiências mais amplas, guiando o aprendizado da IA do Google."
  },
  "notesForDevelopers": "Gemini deve gerar JSONs que mapeiem diretamente para os campos dos objetos da Google Ads API. Para assets visuais, Gemini descreverá o que o usuário/sistema de IA de imagem precisa criar. O RobotHGAds fará upload dos assets reais e substituirá os placeholders de ID de asset. As UserLists e CustomAudiences precisam ser criadas via API primeiro pelo AudienceManagerService, e seus resource_names usados aqui."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

Este é o começo da compilação do Arquivo 11 (que renomeei de "Exemplos de Expert Templates" para ser mais claro, já que o Arquivo 6 é a aplicação desses especialistas no RobotHGAds).

Dada a extensão e o detalhe necessário para cada template (especialmente se formos criar para um subconjunto representativo dos 44+ especialistas), este arquivo sozinho será muito grande.

Sugestão para prosseguir com este Arquivo 11 (Templates):

Posso continuar gerando mais alguns exemplos de templates JSON seguindo este formato para:

Mais um Especialista em Mineração (ex: Kamil Sattar com SRI).

Mais um Especialista em Copywriting (ex: Eugene Schwartz com Estados de Consciência).

Mais um Especialista em Criativos (ex: Russell Brunson com Funis/Value Ladder).

Mais um Especialista em Tráfego Pago/Google Ads (ex: Frederick Vallaeys com SKAGs/Method 1-3-10).

Isso daria um conjunto bem arredondado de exemplos de templates. Criar templates para todos os 44+ seria impraticável aqui, mas com esses exemplos, a lógica de como criar os demais se tornaria clara.

O que acha?

Entendido. Prosseguindo com a criação dos "Expert Templates" para o ARQUIVO 11, visando chegar aos 20 melhores exemplos.

ARQUIVO 11: EXEMPLOS DE "EXPERT TEMPLATES" (JSON) - (Continuação)

PARTE A: TEMPLATES PARA DROPHUNTER (CLAUDE 3.7 SONNET) (Continuação)

11. Especialista em Mineração: Elena Crawford (Análise Preditiva)

{
  "templateId": "drophunter_mining_crawford_predictive_trend_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_MINING",
  "expertName": "Elena Crawford",
  "methodologyName": "Predictive Trend Analysis & Early Signal Detection Model",
  "strategyFocus": "Identificar tendências de produtos em estágio inicial (Inovadores, Primeiros Adotantes) através da análise de sinais fracos em múltiplas fontes de dados e qualificação baseada na curva de adoção.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "nicheOrCategory",
      "description": "Nicho ou categoria de produto para monitoramento de tendências emergentes.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "dataSourcesForSignalDetection",
      "description": "Lista de tipos de fontes de dados a serem monitoradas (ex: 'Reddit_特定subreddits', 'GoogleTrends_regiões_inovadoras', 'Kickstarter_novos_projetos_tecnologia', 'BlogsDeVanguarda_URL_list', 'PatentDatabases_keywords_chave'). Claude usará 'Computer Use' para acessá-las.",
      "dataType": "StringArray_DataSourceTypes",
      "isRequired": true
    },
    {
      "name": "timeframeForSignalAnalysis",
      "description": "Período para análise de sinais (ex: 'últimos 30 dias', 'últimos 90 dias').",
      "dataType": "string",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "emergingTrendReport",
      "description": "JSON contendo uma lista de até 3-5 'emergingSignals', cada um com 'signalDescription', 'supportingDataSummary', 'estimatedAdoptionCurveStage', 'potentialToCrossChasmAnalysis', 'earlyMoverOpportunityWindow', e 'earlySignalStrengthScore' (0-100).",
      "dataType": "JSON_Object"
    },
    {
      "name": "potentialProductsForTrend",
      "description": "Para cada sinal forte, uma lista de 1-3 conceitos de produtos que poderiam capitalizar nessa tendência.",
      "dataType": "JSON_Object_ProductConceptsByTrend"
    }
  ],
  "systemPrompt": "Você é um analista de tendências preditivas, especialista em detectar sinais precoces de mercado usando o modelo de Elena Crawford. Seu objetivo é identificar tendências antes que se consolidem, analisar seu estágio na curva de adoção e sugerir produtos. Use 'Computer Use' para monitorar e analisar as fontes de dados especificadas.",
  "userPromptStructure": "Nicho/Categoria para Monitoramento: {nicheOrCategory}\nFontes de Dados para Detecção de Sinais: {dataSourcesForSignalDetection}\nPeríodo de Análise: {timeframeForSignalAnalysis}\n\nAplique a 'Predictive Trend Analysis' de Elena Crawford:\n1.  **Agregação e Análise de Sinais Precoces:**\n    *   Para cada fonte em {dataSourcesForSignalDetection}, use 'Computer Use' para pesquisar e agregar 'sinais fracos' (novos termos, hashtags, projetos, tecnologias, discussões) relacionados a {nicheOrCategory} no {timeframeForSignalAnalysis}.\n    *   Identifique sinais que aparecem em múltiplas fontes ou que mostram um aumento estatisticamente significativo em menções/interesse.\n    *   Liste até 5 dos 'emergingSignals' mais promissores, cada um com uma 'signalDescription' e um 'supportingDataSummary' (principais evidências das fontes).\n2.  **Qualificação pela Curva de Adoção e Força do Sinal:**\n    *   Para cada 'emergingSignal' promissor, avalie:\n        a.  'estimatedAdoptionCurveStage': Em qual estágio da Curva de Adoção de Rogers (Inovadores, Primeiros Adotantes, etc.) esta tendência parece estar?\n        b.  'potentialToCrossChasmAnalysis': Análise qualitativa do potencial da tendência de ser adotada pela Maioria Inicial (cruzar o abismo), incluindo fatores de impulso e obstáculos.\n        c.  'earlyMoverOpportunityWindow': Janela de tempo estimada para 'early movers' obterem vantagem.\n        d.  'earlySignalStrengthScore' (0-100): Força e promessa do sinal como indicador de tendência futura significativa.\n3.  **Conceitos de Produto para Tendências Fortes:**\n    *   Para os 1-2 'emergingSignals' com o maior 'earlySignalStrengthScore', gere uma lista ('potentialProductsForTrend') com 1-3 conceitos de produtos que poderiam capitalizar nessa tendência.\n\nFormate os resultados dos pontos 1 e 2 em um objeto JSON sob a chave 'emergingTrendReport', e o ponto 3 como um objeto JSON sob a chave 'potentialProductsForTrend'.",
  "methodologyDetails": {
    "rogersAdoptionCurveStages": ["Innovators (2.5%)", "Early Adopters (13.5%)", "Early Majority (34%)", "Late Majority (34%)", "Laggards (16%)"],
    "earlySignalTypes": ["Aumento de buscas de baixo volume", "Novas hashtags/comunidades", "Menções por micro-influenciadores de vanguarda", "Projetos de crowdfunding com financiamento rápido", "Patentes tecnológicas disruptivas"]
  },
  "notesForDevelopers": "Este é um template altamente dependente da capacidade 'Computer Use' do Claude 3.7 para pesquisa e agregação de dados em tempo real ou quase real de múltiplas fontes. A lógica para determinar 'aumento estatisticamente significativo' pode precisar de heurísticas ou Claude pode fazer uma avaliação qualitativa."
}


12. Especialista em Copywriting: Joseph Sugarman (Revisitado para Output Estruturado e Foco nos Gatilhos)

{
  "templateId": "drophunter_copywriting_sugarman_triggers_flow_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_COPYWRITING",
  "expertName": "Joseph Sugarman",
  "methodologyName": "Slippery Slide & Psychological Triggers System",
  "strategyFocus": "Criar copy com fluxo de leitura irresistível e aplicar estrategicamente gatilhos psicológicos para maximizar a persuasão.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productName",
      "description": "Nome do produto.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "productCoreBenefitOrCuriosityHook",
      "description": "O principal benefício do produto ou um gancho de curiosidade muito forte sobre ele.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "targetAudienceProfile",
      "description": "Perfil do público-alvo.",
      "dataType": "AudienceProfileObject_or_Text",
      "isRequired": true
    },
    {
      "name": "copyObjective",
      "description": "O objetivo principal do copy (ex: 'venda direta em landing page', 'gerar clique em anúncio', 'engajar em email').",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "sugarmanPsychologicalTriggersList",
      "description": "Lista e breve descrição dos 25 gatilhos psicológicos de Sugarman.",
      "dataType": "TriggersDefinitionObject_or_Text",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "slipperySlideOpening",
      "description": "As primeiras 3-5 frases de um texto de vendas usando a técnica 'Slippery Slide'.",
      "dataType": "string"
    },
    {
      "name": "prioritizedPsychologicalTriggers",
      "description": "JSON listando os 5-7 gatilhos de Sugarman mais relevantes para o produto/público/objetivo, com justificativa e exemplo de aplicação para cada.",
      "dataType": "JSON_Object"
    },
    {
      "name": "narrativeFlowSuggestions",
      "description": "Sugestões textuais sobre como manter o fluxo da narrativa e sequenciar os gatilhos em um copy mais longo.",
      "dataType": "TextAnalysisReport"
    }
  ],
  "systemPrompt": "Você é um copywriter hipnótico, especialista na técnica 'Slippery Slide' e no uso dos gatilhos psicológicos de Joseph Sugarman. Seu objetivo é criar copy que prenda o leitor e o conduza suavemente à ação.",
  "userPromptStructure": "Produto: {productName}\nBenefício Principal/Gancho de Curiosidade: {productCoreBenefitOrCuriosityHook}\nPúblico Alvo: {targetAudienceProfile}\nObjetivo do Copy: {copyObjective}\nLista de Gatilhos Psicológicos de Sugarman:\n{sugarmanPsychologicalTriggersList}\n\nAplique as técnicas de Joseph Sugarman:\n1.  **Abertura 'Slippery Slide':** Escreva as primeiras 3-5 frases para um copy de {copyObjective} sobre {productName}, onde o único objetivo de cada frase é fazer o leitor querer ler a próxima. Use o {productCoreBenefitOrCuriosityHook} como inspiração para a curiosidade inicial. Retorne como uma string única em 'slipperySlideOpening'.\n2.  **Seleção e Aplicação de Gatilhos Psicológicos:** Selecione 5-7 dos gatilhos psicológicos de Sugarman (da lista fornecida) que seriam MAIS eficazes para persuadir o {targetAudienceProfile.description} a alcançar o {copyObjective} para {productName}. Para cada gatilho selecionado:\n    *   Explique brevemente por que ele é relevante.\n    *   Forneça um exemplo específico de como ele poderia ser aplicado no copy (uma frase, um conceito de parágrafo, ou um elemento da oferta).\n    Formate como JSON em 'prioritizedPsychologicalTriggers': [{'triggerName': 'NomeGatilho', 'relevance': '...', 'applicationExample': '...'}, ...].\n3.  **Sugestões para Fluxo Narrativo e Sequenciamento de Gatilhos:** Para um copy mais longo (ex: uma página de vendas), como você manteria o 'Slippery Slide' e sequenciaria os gatilhos identificados para criar um fluxo persuasivo e contínuo? Forneça sugestões textuais em 'narrativeFlowSuggestions'.",
  "methodologyDetails": {
    "slipperySlideCore": "O propósito da primeira frase é fazer ler a segunda. O propósito da segunda é fazer ler a terceira...",
    "psychologicalTriggersExamples": ["Consistência", "Ligação", "Credibilidade", "Prova Social", "Escassez", "Urgência", "Curiosidade", "Autoridade", "Simplicidade", "Medo", "Culpa", "Especificidade", "Familiaridade", "Esperança", "Ganância", "Exclusividade"]
  },
  "notesForDevelopers": "A lista dos 25 gatilhos de Sugarman precisa ser fornecida em {sugarmanPsychologicalTriggersList}. Claude 3.7 deve ser criativo na geração da abertura e na aplicação dos gatilhos."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

13. Especialista em Criativos: Seth Godin (Revisitado para Output Estruturado)

{
  "templateId": "drophunter_creative_godin_purple_cow_virus_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_CREATIVE",
  "expertName": "Seth Godin",
  "methodologyName": "Purple Cow & Idea Virus Framework",
  "strategyFocus": "Gerar conceitos de criativos notáveis, que quebram padrões e têm alto potencial de compartilhamento orgânico.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productName",
      "description": "Nome do produto.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "productNiche",
      "description": "Nicho do produto.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "competitorCreativeAnalysis",
      "description": "Resumo de como os concorrentes geralmente fazem seus criativos (o que é 'normal' ou 'chato' no nicho).",
      "dataType": "TextSummary",
      "isRequired": true
    },
    {
      "name": "brandValues",
      "description": "Valores centrais da marca que podem ser expressos de forma notável.",
      "dataType": "StringArray_optional",
      "isRequired": false
    }
  ],
  "outputs": [
    {
      "name": "purpleCowCreativeConcepts",
      "description": "JSON com 2-3 'remarkableCreativeIdeas', cada um com 'visualConceptDescription', 'mainMessageHeadline', e 'whyItsRemarkableExplanation'.",
      "dataType": "JSON_Object"
    },
    {
      "name": "ideaVirusOptimizationPlan",
      "description": "Para um dos conceitos 'Purple Cow', um plano textual ('ideaVirusPlan') com sugestões para injetar elementos virais (facilidade de compartilhar, incentivo, conexão com identidade, valor intrínseco) e identificar 'sneezers' ideais.",
      "dataType": "JSON_Object_containing_TextReport"
    }
  ],
  "systemPrompt": "Você é um pensador de marketing disruptivo, especialista em criar 'Purple Cows' e 'Ideias Virais' no estilo de Seth Godin. Sua missão é gerar conceitos criativos que sejam tão notáveis que se espalhem por conta própria.",
  "userPromptStructure": "Produto: {productName}, Nicho: {productNiche}\nAnálise de Criativos Comuns de Concorrentes:\n{competitorCreativeAnalysis}\nValores da Marca (Opcional):\n{brandValues}\n\nAplique os princípios de Seth Godin:\n1.  **Conceitos Criativos 'Purple Cow':** Gere 2-3 ideias para criativos (conceito visual e mensagem principal) para {productName} que sejam RADICALMENTE DIFERENTES e NOTÁVEIS em comparação com o que é descrito em {competitorCreativeAnalysis}. O objetivo é quebrar o padrão e fazer as pessoas pararem e comentarem. Para cada ideia, descreva o conceito visual, a mensagem/headline principal, e explique por que esta ideia é 'notável' e diferente.\n    Formate como JSON em 'purpleCowCreativeConcepts': [{'visualConceptDescription': '...', 'mainMessageHeadline': '...', 'whyItsRemarkableExplanation': '...'}, ...].\n2.  **Otimização para 'Idea Virus':** Escolha a ideia mais promissora do ponto 1. Usando o 'Idea Virus Framework', como este conceito pode ser otimizado para maximizar seu potencial de compartilhamento orgânico? Sugira modificações ou adições focando em:\n    *   Torná-lo mais fácil/intuitivo de compartilhar.\n    *   Adicionar um incentivo implícito ou explícito ao compartilhamento.\n    *   Fortalecer sua conexão com a identidade de um grupo específico.\n    *   Aumentar seu valor intrínseco (humor, insight, emoção).\n    *   Quem seriam os 'sneezers' (espalhadores) ideais para esta 'ideia vírus'?\n    Formate como um objeto JSON em 'ideaVirusOptimizationPlan': {'chosenConceptForVirus': 'Nome ou descrição do conceito escolhido', 'virusOptimizationStrategies': 'Relatório textual com as sugestões detalhadas', 'idealSneezers': 'Descrição dos espalhadores ideais'}.",
  "methodologyDetails": {
    "purpleCowEssence": "Ser notável é ser digno de ser notado. Se não é notável, é invisível.",
    "ideaVirusComponents": ["Sneezer (espalhador)", "Facilidade de transmissão (smoothness)", "Incentivo", "Rastreamento (opcional)"]
  },
  "notesForDevelopers": "Este template exige alta criatividade de Claude 3.7. A análise de {competitorCreativeAnalysis} é crucial para que Claude entenda o 'padrão a ser quebrado'. Os 'sneezers' podem ser tipos de personas ou comunidades online."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

PARTE B: TEMPLATES PARA ROBOTHGADS (GEMINI 2.5 PRO PREVIEW) (Continuação)

14. Especialista em Tráfego Pago: Amy Hebdon (Revisitado para Output Estruturado)

{
  "templateId": "robothgads_traffic_hebdon_visual_first_engagement_v1",
  "templateVersion": "1.0.0",
  "templateType": "ROBOTHGADS_TRAFFIC_STRATEGY",
  "expertName": "Amy Hebdon",
  "methodologyName": "Visual First Framework & Engagement Quality Scoring",
  "strategyFocus": "Gerar briefs para criativos visuais de alto impacto (Display, YouTube, PMax) e definir uma estratégia de otimização baseada na qualidade do engajamento do usuário.",
  "targetAI": "GEMINI_2_5_PRO_PREVIEW",
  "inputs": [
    {
      "name": "productIntelligencePackage",
      "description": "Pacote do DropHunter: produto, público, principais ângulos de copy, diretrizes visuais gerais.",
      "dataType": "DropHunter_ProductIntelligenceObject",
      "isRequired": true
    },
    {
      "name": "campaignType",
      "description": "Tipo de campanha Google Ads para a qual os criativos serão usados (ex: 'DISPLAY_RESPONSIVE', 'VIDEO_ACTION', 'PERFORMANCE_MAX').",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "engagementEventsToTrack",
      "description": "Lista de eventos de engajamento na LP que podem ser rastreados como micro-conversões (ex: 'scroll_75pct', 'video_view_50pct', 'click_tab_details').",
      "dataType": "StringArray",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "visualCreativeBriefs",
      "description": "JSON com 2-3 briefs detalhados para criativos visuais (imagens/vídeos curtos), cada um com 'conceptDescription', 'visualHierarchyNotes', 'colorPaletteSuggestion', 'minimalTextOverlay', 'callToActionVisualPlacement'.",
      "dataType": "JSON_Object"
    },
    {
      "name": "engagementQualityScoringLogic",
      "description": "Pseudocódigo ou descrição lógica para o EngagementAnalyticsService calcular o EQS, incluindo pesos para os {engagementEventsToTrack}.",
      "dataType": "Text_Pseudocode_or_LogicDescription"
    },
    {
      "name": "googleAdsApi_AudienceAndBiddingConfigForEQS",
      "description": "JSON com a configuração para criar UserLists baseadas no EQS (High, Medium, Low) e sugestões de como usar essas listas para targeting ou bid adjustments na API do Google Ads.",
      "dataType": "GoogleAds_AudienceBiddingConfig_JSON"
    }
  ],
  "systemPrompt": "Você é um estrategista de criativos e otimização de campanhas, treinado no 'Visual First Framework' e 'Engagement Quality Scoring' de Amy Hebdon. Sua tarefa é gerar briefs para visuais impactantes e uma estratégia para otimizar campanhas com base na qualidade do engajamento.",
  "userPromptStructure": "Inteligência de Produto (DropHunter):\nProduto: {productIntelligencePackage.productName}\nPúblico: {productIntelligencePackage.targetAudience.description}\nPrincipais Ângulos de Copy: {productIntelligencePackage.copyInsights.mainAngles}\nDiretrizes Visuais Gerais: {productIntelligencePackage.creativeGuidelines.generalStyle}\n\nTipo de Campanha Google Ads: {campaignType}\nEventos de Engajamento na LP para Rastrear: {engagementEventsToTrack}\n\nAplique as metodologias de Amy Hebdon:\n1.  **Briefs para Criativos Visuais ('visualCreativeBriefs'):** Gere 2-3 briefs detalhados para criativos visuais (imagens ou conceitos para vídeos curtos) para {productName} e {campaignType}, seguindo o Visual First Framework. Para cada brief, inclua:\n    *   `conceptDescription`: O conceito principal do visual.\n    *   `visualHierarchyNotes`: Como os elementos devem ser organizados para guiar o olhar (Regra 70/30, Padrão Z).\n    *   `colorPaletteSuggestion`: Cores alinhadas com a marca/produto e com bom contraste (7:1).\n    *   `minimalTextOverlay`: Sugestão de texto curto para sobrepor à imagem, se houver.\n    *   `callToActionVisualPlacement`: Onde o CTA (se houver um no visual) ou o foco principal deve estar.\n2.  **Lógica de Pontuação de Qualidade de Engajamento ('engagementQualityScoringLogic'):** Descreva em pseudocódigo ou texto a lógica para calcular um Engagement Quality Score (EQS) para os usuários, atribuindo pesos para os {engagementEventsToTrack} e para métricas de vídeo do YouTube (se {campaignType} for vídeo).\n3.  **Configuração de Audiências e Lances para EQS ('googleAdsApi_AudienceAndBiddingConfigForEQS'):**\n    *   Descreva como criar UserLists no Google Ads para segmentar usuários com EQS Alto, Médio e Baixo.\n    *   Sugira como usar essas UserLists na Google Ads API: modificadores de lance (`bid_modifier`) para campanhas Search/Display, ou como sinais de audiência (`AssetGroupSignal`) para Performance Max.",
  "methodologyDetails": {
    "visualFirstPrinciples": ["Clareza acima de tudo", "Um único foco visual", "Contraste forte", "Hierarquia intencional", "Texto como suporte, não como herói"],
    "engagementQualityMetrics": ["Tempo na página", "Profundidade de scroll", "Interação com elementos chave", "Visualização de vídeo completa", "Micro-conversões"]
  },
  "notesForDevelopers": "Gemini precisa gerar briefs visuais que sejam acionáveis por um designer ou IA de imagem. A lógica do EQS deve ser clara para implementação no EngagementAnalyticsService. As sugestões de configuração da API devem ser específicas."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

Isso nos leva a 14 templates detalhados (7 para DropHunter - Mineração, 3 para DropHunter - Copywriting, 4 para DropHunter - Criativos; e 2 exemplos de como o RobotHGAds usaria os templates de Tráfego Pago, mas que na verdade são templates para o RobotHGAds).

Para chegar aos "20 melhores", vou adicionar mais alguns focados no RobotHGAds (Tráfego Pago) e talvez mais um ou dois para DropHunter (Copywriting e Criativos) para garantir uma boa cobertura das estratégias mais impactantes.

Próximos templates a serem criados nesta leva:

Especialista em Tráfego Pago: Aleyda Solis (Organic-Paid Synergy) - RobotHGAds

Especialista em Tráfego Pago: Aleric Heck (Direct Response Video) - RobotHGAds

Especialista em Copywriting: Donald Miller (StoryBrand - Foco em Copy) - DropHunter

Especialista em Criativos: Ryan Deiss (Customer Value Journey - Foco em Criativos) - DropHunter

Especialista em Tráfego Pago: Um mais genérico sobre estrutura de PMax ou Shopping.

Especialista em Mineração: Um focado em análise de concorrência de e-commerce.

Isso nos levaria aos 20. Continuo?


Entendido. Prosseguindo com a criação dos "Expert Templates" para o ARQUIVO 11, visando chegar aos 20 melhores exemplos.

ARQUIVO 11: EXEMPLOS DE "EXPERT TEMPLATES" (JSON) - (Continuação)

PARTE B: TEMPLATES PARA ROBOTHGADS (GEMINI 2.5 PRO PREVIEW) (Continuação)

15. Especialista em Tráfego Pago: Aleyda Solis (Organic-Paid Synergy)

{
  "templateId": "robothgads_traffic_solis_organic_paid_synergy_v1",
  "templateVersion": "1.0.0",
  "templateType": "ROBOTHGADS_TRAFFIC_STRATEGY",
  "expertName": "Aleyda Solis",
  "methodologyName": "Owned Channel Integration Framework & Organic-Paid Synergy System",
  "strategyFocus": "Criar e otimizar campanhas Google Ads pagas que trabalhem em sinergia com SEO e canais próprios, usando dados de comportamento e performance orgânica.",
  "targetAI": "GEMINI_2_5_PRO_PREVIEW",
  "inputs": [
    {
      "name": "productIntelligencePackage",
      "description": "Pacote do DropHunter: produto, público, copy, criativos.",
      "dataType": "DropHunter_ProductIntelligenceObject",
      "isRequired": true
    },
    {
      "name": "organicPerformanceData",
      "description": "Dados do Google Search Console (keywords posições 4-10 com impressões/CTR) e Google Analytics 4 (páginas de conteúdo orgânico com alto engajamento).",
      "dataType": "JSON_OrganicPerformanceDataObject",
      "isRequired": true
    },
    {
      "name": "crmSegmentsData",
      "description": "Segmentos de clientes do CRM para Customer Match (opcional).",
      "dataType": "JSON_CRMSegmentsObject_optional",
      "isRequired": false
    }
  ],
  "outputs": [
    {
      "name": "googleAdsApi_SynergySearchCampaignsConfig",
      "description": "JSON com configurações para campanhas Search focadas em keywords orgânicas 4-10 (estrutura de Ad Groups, RSAs complementares).",
      "dataType": "GoogleAds_SearchCampaignStructure_JSON"
    },
    {
      "name": "googleAdsApi_ContentAmplificationCampaignsConfig",
      "description": "JSON com configurações para campanhas Display/Video/Discovery para promover conteúdo orgânico de alta performance (targeting, anúncios).",
      "dataType": "GoogleAds_ContentAmplificationCampaigns_JSON"
    },
    {
      "name": "googleAdsApi_OwnedChannelAudienceConfig",
      "description": "JSON especificando UserLists a serem criadas no Google Ads com base em comportamento em canais próprios (GA4 eventos) e CRM (Customer Match).",
      "dataType": "GoogleAds_UserListDefinitions_JSON"
    }
  ],
  "systemPrompt": "Você é um especialista em SEO e Google Ads, treinado nas estratégias de sinergia orgânico-pago de Aleyda Solis. Sua tarefa é usar dados de canais próprios e performance orgânica para gerar configurações de campanhas pagas que amplifiquem os resultados gerais.",
  "userPromptStructure": "Inteligência de Produto (DropHunter):\n{productIntelligencePackage.productName}\nÂngulos de Copy e Criativos (DropHunter):\n{productIntelligencePackage.copyInsights}, {productIntelligencePackage.creativeGuidelines}\n\nDados de Performance Orgânica:\nGoogle Search Console (Keywords Posição 4-10): {organicPerformanceData.gscKeywords}\nGoogle Analytics 4 (Conteúdo Alto Engajamento): {organicPerformanceData.ga4Pages}\n\nDados de Segmentos CRM (Opcional):\n{crmSegmentsData}\n\nCom base na metodologia de Aleyda Solis, gere as seguintes configurações para Google Ads API:\n1.  **Configuração de Campanhas Search de Sinergia ('googleAdsApi_SynergySearchCampaignsConfig'):**\n    *   Para as top 3-5 keywords de {organicPerformanceData.gscKeywords} (com bom volume/relevância):\n        *   Crie um Ad Group (SKAG).\n        *   Gere 1 RSA com headlines e descrições que complementem o snippet orgânico existente (busque ser mais direto ao CTA ou destacar uma oferta não presente no orgânico).\n        *   Sugira uma estratégia de lance para 'dominar a SERP' para estas keywords.\n2.  **Configuração de Campanhas de Amplificação de Conteúdo ('googleAdsApi_ContentAmplificationCampaignsConfig'):**\n    *   Para as top 2-3 páginas de {organicPerformanceData.ga4Pages}:\n        *   Sugira uma Campanha (Display, Discovery ou YouTube Video Action) para promover este conteúdo.\n        *   Defina o targeting (audiências de interesse no tema, audiências semelhantes a quem já engajou).\n        *   Gere os assets de anúncio (texto e conceito visual) que convidem o usuário a consumir o conteúdo orgânico.\n3.  **Configuração de Audiências de Canais Próprios ('googleAdsApi_OwnedChannelAudienceConfig'):**\n    *   Defina 2-3 UserLists a serem criadas com base em eventos do GA4 (ex: 'Leitores Blog Sustentabilidade 60D', 'Espectadores Vídeo Reciclagem 75% 90D').\n    *   Se {crmSegmentsData} fornecido, defina 1-2 UserLists para Customer Match (ex: 'Compradores Eco Premium CRM').\n    *   Indique como essas UserLists seriam usadas (targeting, exclusão, sinais PMax).",
  "methodologyDetails": {
    "organicPaidSynergyGoal": "Maximizar visibilidade total na SERP, proteger tráfego de marca, usar insights orgânicos para otimizar pago e vice-versa.",
    "ownedChannelIntegrationBenefit": "Criar audiências mais quentes e engajadas para remarketing e PMax, melhorando a eficiência do gasto pago."
  },
  "notesForDevelopers": "Gemini precisa ser capaz de interpretar os dados de GSC/GA4 para tomar decisões. A criação efetiva de UserLists via API requer que os eventos correspondentes estejam corretamente configurados no GA4 e/ou que as listas de Customer Match sejam preparadas e hasheadas corretamente pelo usuário."
}


16. Especialista em Tráfego Pago: Aleric Heck (Revisitado para Output Estruturado)

{
  "templateId": "robothgads_traffic_heck_direct_response_video_v1",
  "templateVersion": "1.0.0",
  "templateType": "ROBOTHGADS_TRAFFIC_STRATEGY",
  "expertName": "Aleric Heck",
  "methodologyName": "Direct Response Video Framework & Demo-Driven Campaign Structure",
  "strategyFocus": "Criar e gerenciar campanhas YouTube Ads focadas em resposta direta, com vídeos estruturados em Hook-Story-Offer e demonstração de benefícios.",
  "targetAI": "GEMINI_2_5_PRO_PREVIEW",
  "inputs": [
    {
      "name": "productIntelligencePackage",
      "description": "Pacote do DropHunter: produto, público, ângulos de copy (para Hook-Story-Offer), conceitos visuais para demonstração.",
      "dataType": "DropHunter_ProductIntelligenceObject",
      "isRequired": true
    },
    {
      "name": "videoScriptsOrDetailedConcepts",
      "description": "Roteiros de vídeo ou conceitos visuais detalhados para os vídeos de resposta direta (podem vir do DropHunter, que usou especialistas de criativos como Dean Graziosi).",
      "dataType": "Array_VideoScriptOrConceptObject",
      "isRequired": true
    },
    {
      "name": "targetCPA_or_ROAS",
      "description": "Meta de CPA ou ROAS para a campanha.",
      "dataType": "number_currency",
      "isRequired": true
    },
    {
      "name": "campaignBudget",
      "description": "Orçamento diário para a campanha de vídeo.",
      "dataType": "number_currency",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "googleAdsApi_YouTubeDRCampaignConfig",
      "description": "JSON com a configuração da campanha YouTube Video Action, Ad Groups, e AdGroupAds (VideoResponsiveAdInfo) para a Google Ads API, incluindo targeting e lances.",
      "dataType": "GoogleAds_YouTubeVACampaign_JSON"
    },
    {
      "name": "videoAdTestingPlan",
      "description": "Plano para testar A/B diferentes Hooks, Stories, Offers ou demonstrações de benefícios nos vídeos.",
      "dataType": "JSON_ABTestPlanObject"
    }
  ],
  "systemPrompt": "Você é um especialista em YouTube Ads de Resposta Direta, treinado no framework Hook-Story-Offer de Aleric Heck. Sua tarefa é gerar a configuração completa para uma campanha Video Action otimizada para conversões, usando os roteiros e conceitos fornecidos.",
  "userPromptStructure": "Inteligência de Produto (DropHunter):\n{productIntelligencePackage.productName}\nPúblico Alvo: {productIntelligencePackage.targetAudience.description}\nOferta Principal (do DropHunter/Hormozi): {productIntelligencePackage.offerDetails}\nBenefícios Chave para Demo: {productIntelligencePackage.keyBenefitsForDemo}\n\nRoteiros/Conceitos de Vídeo (DropHunter):\n{videoScriptsOrDetailedConcepts} // Array de objetos, cada um com 'videoName', 'hookSummary', 'storySummary', 'offerSummary', 'demoFocus'\n\nMeta CPA/ROAS: {targetCPA_or_ROAS}\nOrçamento Diário: {campaignBudget}\n\nCom base na metodologia de Aleric Heck, gere:\n1.  **Configuração da Campanha YouTube Video Action ('googleAdsApi_YouTubeDRCampaignConfig'):**\n    *   Objeto `Campaign`: Nome, status (PAUSED), advertising_channel_type (VIDEO), video_campaign_setting (VIDEO_ACTION), campaign_budget, bidding_strategy (MAXIMIZE_CONVERSIONS ou TARGET_CPA/ROAS com o valor fornecido).\n    *   Para cada vídeo em {videoScriptsOrDetailedConcepts}, crie um `AdGroup` (ou coloque múltiplos vídeos no mesmo AdGroup se testando variações).\n        *   Nome do AdGroup (ex: 'AG_VideoHookA_DemoBenefitX').\n        *   Targeting para o AdGroup (`AdGroupCriterionService`): Sugira 2-3 opções de targeting ultra-específico (Custom Audiences - Search Terms/Interests, Placements, Keywords para YouTube Search) relevantes para o produto e o vídeo.\n    *   Para cada AdGroup, um `AdGroupAd` com `VideoResponsiveAdInfo`:\n        *   Referência ao `VideoAsset` correspondente.\n        *   Headlines, Long Headlines, Descriptions, Call-to-Actions (baseados no copy do DropHunter e no conteúdo do vídeo, focados em resposta direta).\n2.  **Plano de Teste A/B para Vídeos ('videoAdTestingPlan'):**\n    *   Sugira uma estrutura para testar A/B as diferentes versões de vídeo (se {videoScriptsOrDetailedConcepts} tiver variações) ou diferentes componentes dentro dos vídeos (ex: testar 2 Hooks diferentes para o mesmo Story/Offer).\n    *   Quais métricas chave (além de conversões) indicariam um bom desempenho do vídeo (ex: View Rate, Click-Through Rate no CTA do vídeo)?",
  "methodologyDetails": {
    "hookStoryOfferStructure": "Hook (prender atenção e qualificar) -> Story (construir conexão, demonstrar transformação, lidar com objeções) -> Offer (apresentar oferta irresistível com clareza e urgência).",
    "demoDriven": "Mostrar o produto em ação resolvendo o problema de forma clara e concisa é crucial para vídeos de resposta direta."
  },
  "notesForDevelopers": "Gemini precisa gerar múltiplos AdGroupAds se houver várias variações de vídeo para testar. O plano de teste A/B deve ser prático para implementação via API (ex: múltiplos anúncios no mesmo ad group, ou ad groups duplicados com uma variável diferente)."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

PARTE A: TEMPLATES PARA DROPHUNTER (CLAUDE 3.7 SONNET) (Continuação)

17. Especialista em Copywriting: Donald Miller (StoryBrand - Foco em Copy - Revisão do Arquivo 4, Exemplo 25)
(Este template foca em gerar o BrandScript textual e o copy inicial para o site/LP, enquanto o template de Donald Miller no Arquivo 5 focou mais nos aspectos visuais/UX)

{
  "templateId": "drophunter_copywriting_miller_storybrand_script_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_COPYWRITING",
  "expertName": "Donald Miller (StoryBrand)",
  "methodologyName": "StoryBrand 7-Part Framework (BrandScript)",
  "strategyFocus": "Clarificar a mensagem da marca usando uma estrutura narrativa onde o cliente é o herói e a marca é o guia, para uso em websites e copy principal.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productOrBrandName",
      "description": "Nome do produto ou da marca para a qual o BrandScript será criado.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "idealCustomerProfile",
      "description": "Descrição do cliente ideal, incluindo o que ele quer, seus problemas e aspirações.",
      "dataType": "AudienceProfileObject_or_Text",
      "isRequired": true
    },
    {
      "name": "productCoreSolution",
      "description": "Como o produto/marca ajuda o cliente a resolver seu problema ou alcançar seu desejo.",
      "dataType": "string",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "brandScript7Points",
      "description": "JSON detalhando cada um dos 7 pontos do BrandScript: Character (Hero), Problem (External, Internal, Philosophical), Guide (Empathy, Authority), Plan (3-4 steps), CallsToAction (Direct, Transitional), Success (What success looks like), Failure (What's at stake).",
      "dataType": "JSON_BrandScriptObject"
    },
    {
      "name": "websiteHomepageCopyOutline",
      "description": "Um outline textual para a homepage do website (ou landing page principal) baseado no BrandScript, sugerindo o copy para cada seção chave (Header, Stakes, Value Proposition, Guide, Plan, CTA, Success).",
      "dataType": "Text_Markdown_Outline"
    },
    {
      "name": "oneLiner",
      "description": "Uma frase concisa (One-Liner) que resume a mensagem da marca, respondendo: Que problema você resolve? Como você o resolve? Qual o resultado para o cliente?",
      "dataType": "string"
    }
  ],
  "systemPrompt": "Você é um Guia Certificado StoryBrand, especialista em aplicar o framework de 7 partes de Donald Miller para clarificar a mensagem de uma marca. Seu objetivo é ajudar a marca a comunicar de forma simples e eficaz como ela ajuda seus clientes a vencerem.",
  "userPromptStructure": "Produto/Marca: {productOrBrandName}\nCliente Ideal (Herói):\n{idealCustomerProfile} // (Incluir o que o cliente quer, seus problemas (externo, interno, filosófico), e aspirações)\nSolução Principal do Produto/Marca:\n{productCoreSolution}\n\nAplique o StoryBrand 7-Part Framework:\n1.  **Defina os 7 Elementos do BrandScript ('brandScript7Points'):**\n    *   **Character (O Herói):** Quem é o cliente e o que ele quer?\n    *   **Problem:** Detalhe o problema do herói: Externo (o vilão tangível), Interno (como o problema o faz sentir), e Filosófico (por que isso é errado/injusto).\n    *   **Guide (O Guia):** Como {productOrBrandName} demonstra Empatia (entende a dor do herói) e Autoridade (é competente para ajudar)?\n    *   **Plan (O Plano):** Quais são os 3-4 passos simples que {productOrBrandName} oferece para o herói seguir para resolver o problema?\n    *   **Calls to Action:** Qual é a Chamada para Ação Direta (ex: 'Compre Agora') e qual poderia ser uma Chamada para Ação Transicional (ex: 'Baixe o Guia Gratuito')?\n    *   **Success:** Descreva vividamente como será a vida do herói após ele ter sucesso com a ajuda de {productOrBrandName}.\n    *   **Failure:** O que está em jogo? O que de ruim acontecerá se o herói não agir?\n    Formate esta seção como um objeto JSON detalhado.\n2.  **Outline de Copy para Homepage ('websiteHomepageCopyOutline'):** Crie um outline textual para as seções principais de uma homepage (ou landing page) baseada neste BrandScript. Para cada seção (ex: Header, Problema/Stakes, Proposta de Valor, Guia, Plano, CTA Direto, Testemunhos/Sucesso, CTA Transicional), sugira o foco da mensagem e frases chave de copy.\n3.  **One-Liner da Marca ('oneLiner'):** Crie uma frase única e memorável que resuma a mensagem da marca, respondendo concisamente: (1) Que problema {productOrBrandName} resolve? (2) Como o resolve? (3) Qual o resultado de sucesso para o cliente?",
  "methodologyDetails": {
    "storyBrandCoreIdea": "O cliente é o herói, não a sua marca. Posicione sua marca como o guia que ajuda o herói a vencer.",
    "clarityPrinciple": "Se você confundir, você vai perder. A mensagem deve ser simples e clara."
  },
  "notesForDevelopers": "Claude 3.7 deve ser capaz de sintetizar as informações do {idealCustomerProfile} e {productCoreSolution} para preencher os 7 pontos. O 'One-Liner' é um output particularmente importante e desafiador para a IA gerar de forma concisa e impactante."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

18. Especialista em Criativos: Ryan Deiss (Digital Marketer - Foco em Conceitos Criativos para CVJ)
(Este template foca em gerar os CONCEITOS CRIATIVOS (visuais e textuais) para cada etapa da Customer Value Journey, complementando o template do Arquivo 5 que focava mais no mapeamento da jornada em si).

{
  "templateId": "drophunter_creative_deiss_cvj_creatives_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_CREATIVE",
  "expertName": "Ryan Deiss (Digital Marketer)",
  "methodologyName": "Customer Value Journey (CVJ) - Creative Concepts",
  "strategyFocus": "Gerar conceitos de criativos (visuais e textuais) específicos e otimizados para cada uma das 8 etapas da Customer Value Journey.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "productName",
      "description": "Nome do produto principal.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "valueLadderDesign",
      "description": "A Escada de Valor já definida para o produto (pode vir do template de Russell Brunson), com as ofertas para cada etapa (Bait, Frontend, Middle, Backend).",
      "dataType": "JSON_ValueLadderObject",
      "isRequired": true
    },
    {
      "name": "targetAudienceProfile",
      "description": "Perfil do público-alvo.",
      "dataType": "AudienceProfileObject_or_Text",
      "isRequired": true
    },
    {
      "name": "brandVoiceAndStyleGuide",
      "description": "Diretrizes sobre a voz da marca e o estilo visual preferido (pode vir de especialistas como Ann Handley, Laura Belgray).",
      "dataType": "BrandVoiceStyleGuideObject_or_Text",
      "isRequired": false
    }
  ],
  "outputs": [
    {
      "name": "cvjStageCreativeConcepts",
      "description": "JSON onde cada chave é uma etapa da CVJ (Aware, Engage, Subscribe, Convert, Excite, Ascend, Advocate, Promote). O valor para cada chave é um objeto com 'objective', 'contentTypeSuggestion' (ex: 'short_video_ad', 'blog_post_visual_summary', 'lead_magnet_cover_image'), 'visualConceptDescription', 'headlineSuggestion', 'ctaSuggestion', e 'microCommitmentGoal'.",
      "dataType": "JSON_Object"
    }
  ],
  "systemPrompt": "Você é um estrategista de marketing digital e criativos, especialista em mapear a Customer Value Journey de Ryan Deiss e em criar os ativos criativos apropriados para cada etapa. Seu objetivo é gerar conceitos criativos que movam o cliente suavemente através do funil.",
  "userPromptStructure": "Produto Principal: {productName}\nEscada de Valor Definida:\n{valueLadderDesign} // JSON com detalhes do Bait, Frontend, Middle, Backend\nPúblico Alvo: {targetAudienceProfile}\nGuia de Voz e Estilo da Marca (Opcional):\n{brandVoiceAndStyleGuide}\n\nPara o produto {productName} e sua Escada de Valor, gere conceitos criativos para cada uma das 8 etapas da Customer Value Journey (Aware, Engage, Subscribe, Convert, Excite, Ascend, Advocate, Promote). Para cada etapa:\n1.  **Objetivo da Etapa:** Qual o principal objetivo de marketing para esta etapa em relação à Escada de Valor?\n2.  **Sugestão de Tipo/Formato de Conteúdo/Criativo:** Qual o melhor formato de criativo (ex: anúncio em vídeo para YouTube, post de carrossel no Instagram, imagem para anúncio Display, design da capa de um ebook/lead magnet, etc.)?\n3.  **Conceito Visual Principal:** Descreva o conceito visual para este criativo (cores, imagens, estilo, emoção a transmitir), alinhado com {brandVoiceAndStyleGuide} se fornecido.\n4.  **Sugestão de Headline/Texto Principal:** Um headline ou mensagem chave para este criativo.\n5.  **Sugestão de Call-to-Action (CTA):** Qual o CTA apropriado para esta etapa?\n6.  **Meta de Micro-Compromisso:** Qual o 'pequeno sim' que este criativo busca do usuário?\n\nFormate a resposta como um objeto JSON sob a chave 'cvjStageCreativeConcepts', onde cada etapa da CVJ é uma sub-chave.",
  "methodologyDetails": {
    "cvjStagesBrief": {
      "Aware": "Tornar o prospect ciente de um problema/oportunidade.",
      "Engage": "Primeira interação de valor com a marca.",
      "Subscribe": "Capturar lead em troca de alto valor (Lead Magnet - Bait da Value Ladder).",
      "Convert": "Primeira transação financeira (Tripwire/Frontend da Value Ladder).",
      "Excite": "Garantir ótima experiência com a primeira compra.",
      "Ascend": "Mover o cliente para ofertas de maior valor (Middle/Core, Backend da Value Ladder).",
      "Advocate": "Transformar clientes satisfeitos em testemunhos e prova social.",
      "Promote": "Incentivar clientes a se tornarem promotores ativos."
    }
  },
  "notesForDevelopers": "Este template é um orquestrador, usando a Value Ladder como base para gerar ideias de criativos para todo o funil. Claude 3.7 precisa conectar as ofertas da Value Ladder com os objetivos de cada etapa da CVJ e sugerir criativos apropriados. A janela de 200K é útil para processar todos os inputs."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

Isso nos dá 18 templates detalhados (7 Mineração, 7 Copywriting, 4 Criativos; e 2 exemplos de Tráfego Pago que são, na verdade, templates para o RobotHGAds). Para chegar aos 20 "melhores" e dar uma cobertura ainda melhor, vou adicionar mais dois templates para o RobotHGAds (Tráfego Pago), focando em estratégias que não foram tão profundamente exploradas nos exemplos anteriores.

19. Especialista em Tráfego Pago: Genérico (Performance Max Estruturada)
(Este template não é de um especialista específico, mas consolida melhores práticas para PMax que foram mencionadas por vários, como Joe Martinez, mas com um foco em como o Gemini pode gerar a estrutura completa.)

{
  "templateId": "robothgads_traffic_pmax_structured_setup_v1",
  "templateVersion": "1.0.0",
  "templateType": "ROBOTHGADS_TRAFFIC_STRATEGY",
  "expertName": "Consolidated Best Practices (PMax)",
  "methodologyName": "Structured Performance Max Campaign Setup",
  "strategyFocus": "Gerar uma configuração inicial robusta e bem estruturada para uma campanha Performance Max, incluindo múltiplos Asset Groups temáticos e sinais de audiência iniciais fortes.",
  "targetAI": "GEMINI_2_5_PRO_PREVIEW",
  "inputs": [
    {
      "name": "productIntelligencePackage",
      "description": "Pacote completo do DropHunter: produto, múltiplos segmentos de público identificados (com suas dores/desejos), ângulos de copy e diretrizes visuais para cada segmento.",
      "dataType": "DropHunter_ProductIntelligenceObject_WithMultipleSegments",
      "isRequired": true
    },
    {
      "name": "campaignSettings",
      "description": "Configurações gerais da campanha: país, idioma, orçamento diário, objetivo (MAXIMIZE_CONVERSION_VALUE ou MAXIMIZE_CONVERSIONS), target ROAS/CPA (opcional), Merchant Center ID.",
      "dataType": "PMax_CampaignSettingsObject",
      "isRequired": true
    },
    {
      "name": "availableAudienceLists",
      "description": "Lista de UserLists já existentes na conta Google Ads (ex: 'Todos Visitantes 30D', 'Compradores Anteriores 180D') com seus resource_names.",
      "dataType": "Array_UserListResourceNameObject_optional",
      "isRequired": false
    }
  ],
  "outputs": [
    {
      "name": "googleAdsApi_PMaxFullCampaignConfig",
      "description": "Objeto JSON único contendo a configuração completa da campanha PMax, incluindo o objeto Campaign, um array de objetos AssetGroup (um para cada segmento de público do DropHunter), e para cada AssetGroup, os AssetGroupSignals iniciais. Tudo formatado para a Google Ads API.",
      "dataType": "GoogleAds_PMax_FullStructure_JSON"
    }
  ],
  "systemPrompt": "Você é um especialista em Google Ads Performance Max, focado em criar campanhas iniciais estruturadas e otimizadas. Sua tarefa é usar a inteligência de produto e público do DropHunter para gerar uma configuração PMax completa (Campanha, Múltiplos Asset Groups temáticos, Assets para cada, e Sinais de Audiência Iniciais) em formato JSON para a Google Ads API.",
  "userPromptStructure": "Pacote de Inteligência de Produto (DropHunter):\nProduto: {productIntelligencePackage.productName}\nSegmentos de Público Identificados e Seus Ângulos de Marketing/Criativos (do DropHunter):\n{productIntelligencePackage.detailedAudienceSegments} // Array de objetos, cada um com: segmentName, segmentDescription, copyAngles, creativeTheme\n\nConfigurações da Campanha PMax:\n{campaignSettings} // Objeto com country, language, dailyBudget, campaignGoal, targetROAS_or_CPA, merchantCenterID\n\nUserLists Disponíveis na Conta Google Ads (Opcional):\n{availableAudienceLists}\n\nCom base nas melhores práticas para Performance Max e nos dados fornecidos, gere uma configuração completa em JSON ('googleAdsApi_PMaxFullCampaignConfig') para uma nova campanha PMax. Este JSON deve conter:\n1.  **Configuração da Campanha (`Campaign` object):**\n    *   Nome (ex: '{productIntelligencePackage.productName} - PMax - Structured Setup').\n    *   Status (PAUSED).\n    *   `advertising_channel_type: PERFORMANCE_MAX`.\n    *   `campaign_budget` (referência ao budget fornecido).\n    *   `bidding_strategy` (com {campaignSettings.campaignGoal} e {campaignSettings.targetROAS_or_CPA}).\n    *   `shopping_setting` (com {campaignSettings.merchantCenterID}).\n    *   `final_url_expansion_opt_out` (sugira `true` para controle inicial).\n2.  **Configuração dos Asset Groups (`AssetGroup` objects - um para cada segmento em {productIntelligencePackage.detailedAudienceSegments}):**\n    *   Para cada `AssetGroup`:\n        *   Nome (ex: 'AG - {segmentName}').\n        *   `final_urls` (LP específica para o segmento, se o DropHunter sugeriu, senão LP principal do produto).\n        *   **Assets de Texto:** Baseados nos {copyAngles} do segmento: Múltiplos Headlines (até 30c), Long Headlines (até 90c), Descriptions (até 90c), Nome da Empresa, Call to Action (opcional).\n        *   **Assets de Imagem:** Referências a nomes de arquivos de imagem (ex: 'image_asset_{segmentName}_theme1.jpg', 'image_asset_{segmentName}_theme2.png'). O usuário fará upload destes com base nas {creativeTheme} do segmento. Inclua pelo menos 3-5 por AG.\n        *   **Assets de Vídeo:** Referências a nomes de arquivos de vídeo (ex: 'video_asset_{segmentName}_demo.mp4'). Pelo menos 1 por AG.\n        *   **Logo:** Referência ao logo da marca.\n3.  **Configuração dos Sinais de Audiência Iniciais (`AssetGroupSignal` objects - para cada Asset Group):**\n    *   Para cada `AssetGroup`, inclua pelo menos um `AssetGroupSignal` com um `AudienceInfo` contendo:\n        *   Se {availableAudienceLists} fornecido e relevante para o segmento: uma `UserListInfo` (ex: remarketing para visitantes do site ou compradores anteriores).\n        *   OU/E uma `CustomAudienceInfo` (tipo `INTEREST` ou `SEARCH_TERMS`) com termos e interesses altamente relevantes para o {segmentName} e {segmentDescription}.\n        *   OU/E uma `GoogleAudienceInfo` (In-Market ou Affinity) relevante.\n    *   O objetivo é fornecer sinais iniciais fortes para cada Asset Group temático.",
  "methodologyDetails": {
    "pmaxBestPractices": ["Usar múltiplos Asset Groups temáticos", "Fornecer o máximo de assets de alta qualidade possível para cada AG", "Dar sinais de audiência relevantes e de alta intenção", "Paciência para a fase de aprendizado", "Excluir URLs de marca da expansão final de URL se o objetivo for apenas aquisição de novos clientes."]
  },
  "notesForDevelopers": "Este é um template para gerar uma configuração PMax completa. Gemini precisa criar os objetos JSON que se alinham com os `MutateCampaignsRequest`, `MutateAssetGroupsRequest`, `MutateAssetGroupAssetsRequest`, e `MutateAssetGroupSignalsRequest` da Google Ads API. Os nomes dos assets visuais são placeholders; o RobotHGAds precisará de um mecanismo para associar os arquivos reais enviados pelo usuário a esses placeholders antes de criar os `Asset` objects na API."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

20. Especialista em Mineração: Um Agregador (Foco em Análise Competitiva de E-commerce)
(Este template não é de um especialista nomeado, mas representa uma funcionalidade comum em ferramentas de mineração: analisar o que concorrentes de sucesso estão fazendo em plataformas de e-commerce.)

{
  "templateId": "drophunter_mining_ecommerce_competitor_analysis_v1",
  "templateVersion": "1.0.0",
  "templateType": "DROPHUNTER_MINING",
  "expertName": "Aggregated E-commerce Best Practices",
  "methodologyName": "E-commerce Competitor Product & Strategy Analysis",
  "strategyFocus": "Analisar lojas de e-commerce de sucesso (concorrentes ou aspiracionais) para identificar seus produtos mais vendidos, estratégias de precificação, e táticas de marketing/apresentação de produto.",
  "targetAI": "CLAUDE_3_7_SONNET",
  "inputs": [
    {
      "name": "competitorStoreUrl",
      "description": "URL da loja de e-commerce concorrente a ser analisada.",
      "dataType": "string_url",
      "isRequired": true
    },
    {
      "name": "productNiche",
      "description": "Nicho principal da loja concorrente.",
      "dataType": "string",
      "isRequired": true
    },
    {
      "name": "analysisDepth",
      "description": "Nível de profundidade da análise ('quick_overview', 'detailed_product_analysis', 'full_strategy_assessment').",
      "dataType": "enum",
      "isRequired": true
    }
  ],
  "outputs": [
    {
      "name": "competitorAnalysisReport",
      "description": "JSON contendo 'storeOverview' (nicho, público percebido, pontos fortes/fracos), 'topPerformingProducts' (lista de até 5-10 produtos com preço, estimativa de popularidade, ângulo de marketing usado), 'pricingStrategyInsights', 'marketingTacticsObserved' (ex: uso de reviews, urgência, bundles), e 'actionableInsightsForOurStore'.",
      "dataType": "JSON_Object"
    }
  ],
  "systemPrompt": "Você é um analista de e-commerce e estrategista de mercado. Sua tarefa é realizar uma análise profunda de uma loja concorrente para extrair insights sobre seus produtos de melhor performance, estratégias de precificação e táticas de marketing. Use 'Computer Use' para navegar e analisar o site do concorrente e, se possível, encontrar dados públicos sobre seu tráfego ou popularidade de produtos.",
  "userPromptStructure": "URL da Loja Concorrente: {competitorStoreUrl}\nNicho Principal da Loja: {productNiche}\nProfundidade da Análise Desejada: {analysisDepth}\n\nRealize uma análise competitiva da loja {competitorStoreUrl} com foco em {productNiche}:\n1.  **Visão Geral da Loja ('storeOverview'):**\n    *   Qual o nicho exato e o público-alvo percebido da loja?\n    *   Quais são os principais pontos fortes e fracos aparentes da loja (design, UX, variedade de produtos, branding)?\n2.  **Produtos de Melhor Performance ('topPerformingProducts'):**\n    *   Usando 'Computer Use' para navegar pelas seções de 'mais vendidos', 'populares', ou analisando produtos com muitos reviews/alta visibilidade, identifique até 5-10 produtos que parecem ser os mais vendidos ou estratégicos.\n    *   Para cada produto: Nome, Preço de Venda, Link, Estimativa de Popularidade/Volume (qualitativa ou com dados se 'Computer Use' encontrar), e o principal Ângulo de Marketing usado na página do produto.\n3.  **Insights sobre Estratégia de Precificação ('pricingStrategyInsights'):**\n    *   A loja foca em produtos de baixo, médio ou alto preço? Eles usam descontos frequentes, bundles, ou outras táticas de precificação?\n4.  **Táticas de Marketing e Apresentação Observadas ('marketingTacticsObserved'):**\n    *   Quais táticas de CRO e persuasão são evidentes nas páginas de produto (ex: uso de reviews, vídeos de produto, contadores de escassez, selos de confiança, pop-ups)?\n    *   Como eles apresentam seus produtos (qualidade das fotos, descrições)?\n5.  **Insights Acionáveis para Nossa Loja ('actionableInsightsForOurStore'):**\n    *   Com base nesta análise, quais são 2-3 lições ou táticas que poderiam ser testadas ou implementadas em nossa própria loja de dropshipping no mesmo nicho (ou nicho adjacente)?\n\nFormate toda a resposta como um único objeto JSON sob a chave 'competitorAnalysisReport'.",
  "methodologyDetails": {
    "analysisFocusPoints": ["Best-selling product identification", "Pricing psychology", "Conversion Rate Optimization (CRO) elements on product pages", "Unique Selling Propositions (USPs) highlighted", "Customer review strategy", "Site navigation and user experience"]
  },
  "notesForDevelopers": "Este template depende fortemente da capacidade de 'Computer Use' do Claude 3.7 para navegar e interpretar o conteúdo de um site de e-commerce. A IA precisará 'entender' o que são seções de 'mais vendidos' ou como inferir popularidade de produto. Para dados quantitativos de vendas de concorrentes, o sistema dependeria de APIs de ferramentas de análise de e-commerce (se integradas), pois isso geralmente não é público."
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution. 
Json
IGNORE_WHEN_COPYING_END

Com estes 20 templates (10 para DropHunter - Mineração, 5 para DropHunter - Copywriting, 5 para DropHunter - Criativos; e os exemplos de Tráfego Pago para RobotHGAds que mostram como usar os outputs do DropHunter), temos uma base sólida e diversificada.

Cada template é projetado para ser um "bloco de construção de conhecimento" que as IAs (Claude 3.7 Sonnet para DropHunter, Gemini 2.5 Pro Preview para RobotHGAds) podem usar para executar tarefas complexas, alinhadas com as metodologias dos especialistas.

A compilação do ARQUIVO 11: EXEMPLOS DE "EXPERT TEMPLATES" (JSON) está agora completa com estes 20 exemplos.

O próximo passo seria compilar o ARQUIVO 6: ROBOTHGADS - 44 ESPECIALISTAS (COM CONFIGURAÇÕES GOOGLE ADS API/RPA), mas como discutido, em vez de detalhar todos os 44 (muitos dos quais já foram cobertos nos Arquivos 3, 4, 5 em termos de geração de input para o RobotHGAds), vou focar em mostrar como as saídas consolidadas do DropHunter (que já embutem o conhecimento desses especialistas de mineração, copy e criativos) são usadas pelos especialistas em tráfego pago para configurar o RobotHGAds. Os exemplos de especialistas em tráfego pago (Tom Breeze, Joe Martinez, etc.) que já detalhamos no "Arquivo 6 (Parte 1)" demonstram esse princípio.

Podemos considerar o Arquivo 6 como conceitualmente completo com base nos exemplos já fornecidos e na lógica de que as estratégias de tráfego pago (os ~17+ especialistas) são os "consumidores" da inteligência gerada pelo DropHunter (que usou os ~25+25+25 especialistas de mineração/copy/criativos).

Se você concorda com essa abordagem para o Arquivo 6, podemos passar para a compilação do ARQUIVO 7: PONTOS DE VERIFICAÇÃO E MÉTRICAS DE VALIDAÇÃO (REVISADO E EXPANDIDO).

