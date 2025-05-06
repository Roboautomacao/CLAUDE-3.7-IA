import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Settings, ChevronDown, BarChart2, Download, Upload, 
  ExternalLink, Filter, Copy, Clock, ArrowRight, ArrowLeft, Plus, Trash, 
  FileText, Command, Zap, Layers, Database, Code, Info, CheckCircle, 
  AlertTriangle, Shield, Eye, Share2, PieChart, BarChart, TrendingUp, 
  Tag, Users, Sliders, Save
} from 'lucide-react';

export default function TemplateConfigForm() {
  // Estado principal do formulário
  const [formData, setFormData] = useState({
    // Informações básicas
    basicInfo: {
      name: '',
      type: 'SEARCH', // SEARCH, DISPLAY, VIDEO, SHOPPING, PERFORMANCE_MAX, etc.
      status: 'PAUSED',
      objective: 'WEBSITE_TRAFFIC', // SALES, LEADS, WEBSITE_TRAFFIC, etc.
      expertStrategy: '', // Estratégia do especialista usada
    },
    
    // Orçamento e lances
    budget: {
      budgetType: 'DAILY',
      amount: '',
      deliveryMethod: 'STANDARD', // STANDARD ou ACCELERATED
      biddingStrategy: 'MANUAL_CPC', // MANUAL_CPC, TARGET_CPA, TARGET_ROAS, etc.
      bidModifier: 1.0,
      targetCpa: '',
      targetRoas: '',
      maxCpc: '',
      enhancedCpc: false,
    },
    
    // Datas da campanha
    dates: {
      startDate: '',
      endDate: '',
      useEndDate: false,
    },
    
    // Segmentação
    targeting: {
      locations: [],
      languages: [],
      targetingExpansion: false,
      deviceTargeting: {
        desktop: { enabled: true, bidAdjustment: 0 },
        mobile: { enabled: true, bidAdjustment: 0 },
        tablet: { enabled: true, bidAdjustment: 0 },
      },
      audiences: {
        detailedDemographic: [],
        affinity: [],
        inMarket: [],
        lifeEvents: [],
        customIntent: [],
        remarketing: [],
      },
      adSchedule: [],
    },
    
    // Extensões de anúncio
    extensions: {
      sitelinks: [],
      callouts: [],
      calls: [],
      locations: [],
      prices: [],
      apps: [],
      promotions: [],
      structured_snippets: [],
    },
    
    // Configurações de anúncios
    adConfiguration: {
      responsive_search_ads: {
        headlines: [],
        descriptions: [],
        path1: '',
        path2: '',
        finalUrl: '',
      },
      responsive_display_ads: {
        headlines: [],
        longHeadline: '',
        descriptions: [],
        businessName: '',
        marketingImages: [],
        squareMarketingImages: [],
        logoImages: [],
        finalUrl: '',
      },
      video_ads: {
        headlines: [],
        descriptions: [],
        videoId: '',
        finalUrl: '',
      },
      performance_max_assets: {
        headlines: [],
        descriptions: [],
        longHeadline: '',
        images: [],
        videos: [],
        logos: [],
        finalUrl: '',
      },
      shopping_ads: {
        merchantId: '',
        feedId: '',
        productGroupings: [],
      },
    },
    
    // Configurações avançadas
    advanced: {
      urlOptions: {
        trackingTemplate: '',
        customParameters: [],
      },
      adRotation: 'OPTIMIZE',
      exclusions: {
        negativeKeywords: [],
        excludedPlacement: [],
        contentExclusions: [],
      },
      dynamicSearchSettings: {
        domainName: '',
        languageTargeting: [],
        useSuppliedUrlsOnly: false,
      },
    },
    
    // Meta tags para o template
    meta: {
      categoryTags: [],
      marketTags: [],
      expertTags: [],
      complexityLevel: 2, // 1-3
      suggestedBudgetRange: { min: 0, max: 0 },
      estimatedRoi: '',
      description: '',
    }
  });
  
  // Estado do step atual do formulário
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado para acompanhar a "força" do anúncio
  const [adStrength, setAdStrength] = useState({
    score: 0,
    rating: 'POOR',
    suggestions: []
  });
  
  // Estados auxiliares
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [expertNames, setExpertNames] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  
  // Listas de opções para os selects
  const campaignTypes = [
    { id: 'SEARCH', name: 'Campanha de Pesquisa' },
    { id: 'DISPLAY', name: 'Campanha de Display' },
    { id: 'VIDEO', name: 'Campanha de Vídeo' },
    { id: 'SHOPPING', name: 'Campanha de Shopping' },
    { id: 'PERFORMANCE_MAX', name: 'Campanha Performance Max' },
    { id: 'DISCOVERY', name: 'Campanha Discovery' },
    { id: 'APP', name: 'Campanha de Promoção de App' },
    { id: 'LOCAL', name: 'Campanha Local' },
    { id: 'SMART', name: 'Campanha Smart (Simples)' }
  ];
  
  const biddingStrategies = [
    { id: 'MANUAL_CPC', name: 'CPC Manual' },
    { id: 'ENHANCED_CPC', name: 'CPC Aprimorado' },
    { id: 'TARGET_CPA', name: 'CPA Alvo' },
    { id: 'TARGET_ROAS', name: 'ROAS Alvo' },
    { id: 'MAXIMIZE_CONVERSIONS', name: 'Maximizar Conversões' },
    { id: 'MAXIMIZE_CONVERSION_VALUE', name: 'Maximizar Valor de Conversão' },
    { id: 'TARGET_IMPRESSION_SHARE', name: 'Participação de Impressão Alvo' }
  ];
  
  const objectives = [
    { id: 'SALES', name: 'Vendas' },
    { id: 'LEADS', name: 'Geração de Leads' },
    { id: 'WEBSITE_TRAFFIC', name: 'Tráfego para o Website' },
    { id: 'PRODUCT_AND_BRAND_CONSIDERATION', name: 'Consideração de Produto e Marca' },
    { id: 'BRAND_AWARENESS_AND_REACH', name: 'Reconhecimento de Marca e Alcance' },
    { id: 'APP_PROMOTION', name: 'Promoção de Aplicativo' }
  ];
  
  const adStrengthRatings = [
    { id: 'POOR', color: 'red' },
    { id: 'AVERAGE', color: 'yellow' },
    { id: 'GOOD', color: 'green' },
    { id: 'EXCELLENT', color: 'blue' }
  ];
  
  // Dados dos especialistas baseados no plano (44 especialistas)
  useEffect(() => {
    // Carregar dados dos especialistas
    const experts = [
      { id: 'vallaeys', name: 'Frederick Vallaeys', expertise: 'Method 1-3-10', category: 'search' },
      { id: 'geddes', name: 'Brad Geddes', expertise: 'Método 5-3-10', category: 'search' },
      { id: 'breeze', name: 'Tom Breeze', expertise: 'Emotional Resolution', category: 'video' },
      { id: 'sanchez', name: 'Savannah Sanchez', expertise: 'Sistema 3U', category: 'video' },
      { id: 'defazio', name: 'Akvile DeFazio', expertise: 'Sistema CRAC', category: 'display' },
      { id: 'weintraub', name: 'Marty Weintraub', expertise: 'Segmentação Psicográfica', category: 'display' },
      { id: 'cruz', name: 'Andrea Cruz', expertise: 'Progressive Signals Framework', category: 'performance_max' },
      { id: 'martinez', name: 'Joe Martinez', expertise: 'Asset Group Isolation', category: 'performance_max' },
      { id: 'williams', name: 'Kirk Williams', expertise: 'Priority Segmentation', category: 'shopping' },
      { id: 'gendron', name: 'Nicolas Gendron', expertise: 'Feed Localization Matrix', category: 'shopping' },
      { id: 'hebdon', name: 'Amy Hebdon', expertise: 'Visual First Framework', category: 'discovery' },
      { id: 'finn', name: 'Greg Finn', expertise: 'Radius Optimization Matrix', category: 'local' },
      { id: 'brown', name: 'Duane Brown', expertise: 'Profit Zone Mapping', category: 'search' },
      { id: 'ahava', name: 'Simo Ahava', expertise: 'First-Party Data Leverage', category: 'all' },
      { id: 'patel', name: 'Neil Patel', expertise: 'Content Gap Advertising', category: 'search' },
      { id: 'wiebe', name: 'Joanna Wiebe', expertise: 'Message-Market Match Matrix', category: 'all' },
      { id: 'gardner', name: 'Oli Gardner', expertise: 'Conversion-Centered Design', category: 'all' },
      { id: 'cherepakhin', name: 'Ilya Cherepakhin', expertise: 'Micro-Momento Mapping', category: 'all' },
      { id: 'brooke', name: 'Justin Brooke', expertise: 'Traffic Temperature Strategy', category: 'all' },
      { id: 'binelli', name: 'Gianluca Binelli', expertise: 'Cultural Context Matrix', category: 'all' },
      { id: 'yu', name: 'Dennis Yu', expertise: 'Dollar-a-Day Strategy', category: 'all' },
      { id: 'virji', name: 'Purna Virji', expertise: 'Assistive Search Advertising', category: 'search' },
      { id: 'jakober', name: 'Pauline Jakober', expertise: 'Multi-Variant Testing', category: 'search' },
      { id: 'solis', name: 'Aleyda Solis', expertise: 'Organic-Paid Synergy System', category: 'search' },
      { id: 'donoghue', name: 'Arianne Donoghue', expertise: 'Decision Maker Targeting Framework', category: 'search' },
      { id: 'chen', name: 'John Chen', expertise: 'Cultural Context Matrix para B2B', category: 'all' },
      { id: 'wulfe', name: 'Natalia Wulfe', expertise: 'App User Quality Index', category: 'app' },
      { id: 'petit', name: 'Thomas Petit', expertise: 'Cohort Value Optimization', category: 'app' },
      { id: 'rhodes', name: 'Mike Rhodes', expertise: 'Algorithm Feeding Protocol', category: 'all' },
      { id: 'lorusso', name: 'Gianpaolo Lorusso', expertise: 'Algorithmic Learning Acceleration', category: 'all' },
      { id: 'lara', name: 'Guru Lara', expertise: 'Latin America Market Adaptation', category: 'all' },
      { id: 'rottgerding', name: 'Martin Röttgerding', expertise: 'Engagement Prediction Model', category: 'all' },
      { id: 'burr', name: 'Ruth Burr Reedy', expertise: 'SaaS Revenue Mapping Framework', category: 'all' },
      { id: 'bizzotto', name: 'Luca Bizzotto', expertise: 'GDPR-Compliant Display Framework', category: 'display' },
      { id: 'morgan', name: 'Michelle Morgan', expertise: 'Channel Agnostic Testing Model', category: 'all' },
      { id: 'kruczek', name: 'Elena Kruczek', expertise: 'Regional Performance Matrix', category: 'all' },
      { id: 'ard', name: 'Benji Ard', expertise: 'PMax Lead Qualification System', category: 'performance_max' },
      { id: 'lockard', name: 'Liz Lockard', expertise: 'Title Engineering Framework', category: 'shopping' },
      { id: 'ani', name: 'Menachem Ani', expertise: 'Multi-Market Feed Strategy', category: 'shopping' },
      { id: 'hopkins', name: 'Navah Hopkins', expertise: 'Holistic Quality Score Optimization', category: 'search' },
      { id: 'meijer', name: 'Wijnand Meijer', expertise: 'B2B Decision Cycle Segmentation', category: 'search' },
      { id: 'zirker', name: 'Tara Zirker', expertise: 'Sequential Video Storytelling Framework', category: 'video' },
      { id: 'heck', name: 'Aleric Heck', expertise: 'Direct Response Video Framework', category: 'video' },
      { id: 'dahl', name: 'Louisa Dahl', expertise: 'APAC Market Adaptation System', category: 'all' }
    ];
    
    setExpertNames(experts);
  }, []);
  
  const checkAdStrength = () => {
    // Análise do anúncio com base no formato
    let score = 0;
    const suggestions = [];
    const adType = formData.basicInfo.type;
    
    if (adType === 'SEARCH') {
      const headlines = formData.adConfiguration.responsive_search_ads.headlines;
      const descriptions = formData.adConfiguration.responsive_search_ads.descriptions;
      
      // Verificar número de headlines
      if (headlines.length < 3) {
        suggestions.push("Adicione pelo menos 3 títulos para atender aos requisitos mínimos.");
      } else if (headlines.length < 8) {
        suggestions.push("Adicione mais títulos para melhorar a performance (recomendado: 8-15).");
      } else {
        score += 30;
      }
      
      // Verificar número de descrições
      if (descriptions.length < 2) {
        suggestions.push("Adicione pelo menos 2 descrições para atender aos requisitos mínimos.");
      } else if (descriptions.length < 4) {
        suggestions.push("Adicione mais descrições para melhorar a performance (recomendado: 4).");
      } else {
        score += 30;
      }
      
      // Verificar URL final
      if (!formData.adConfiguration.responsive_search_ads.finalUrl) {
        suggestions.push("Adicione uma URL final para o anúncio.");
      } else {
        score += 40;
      }
    } else if (adType === 'DISPLAY') {
      // Lógica similar para outros tipos de anúncios...
      score = 65; // Exemplo
    } else if (adType === 'VIDEO') {
      // Verificação de anúncios de vídeo
      score = 72; // Exemplo
    } else if (adType === 'PERFORMANCE_MAX') {
      // Verificação de anúncios Performance Max
      score = 80; // Exemplo
    }
    
    // Determinar classificação com base na pontuação
    let rating = 'POOR';
    if (score >= 80) {
      rating = 'EXCELLENT';
    } else if (score >= 65) {
      rating = 'GOOD';
    } else if (score >= 50) {
      rating = 'AVERAGE';
    }
    
    setAdStrength({
      score,
      rating,
      suggestions
    });
  };
  
  // Efeito para verificar força do anúncio quando os dados relevantes mudam
  useEffect(() => {
    checkAdStrength();
  }, [formData.adConfiguration]);
  
  // Manipulador para alterar campos simples
  const handleInputChange = (section, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value
      }
    }));
  };
  
  // Manipulador para campos com objetos aninhados
  const handleNestedInputChange = (section, subSection, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: {
          ...prevState[section][subSection],
          [field]: value
        }
      }
    }));
  };
  
  // Manipulador para arrays
  const handleArrayItemAdd = (section, field, item) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: [...prevState[section][field], item]
      }
    }));
  };
  
  const handleArrayItemRemove = (section, field, index) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: prevState[section][field].filter((_, i) => i !== index)
      }
    }));
  };
  
  // Manipulador para arrays aninhados
  const handleNestedArrayItemAdd = (section, subSection, field, item) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: {
          ...prevState[section][subSection],
          [field]: [...prevState[section][subSection][field], item]
        }
      }
    }));
  };
  
  const handleNestedArrayItemRemove = (section, subSection, field, index) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: {
          ...prevState[section][subSection],
          [field]: prevState[section][subSection][field].filter((_, i) => i !== index)
        }
      }
    }));
  };
  
  // Manipulador para mudança de step
  const handleStepChange = (direction) => {
    if (direction === 'next' && currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else if (direction === 'prev' && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Manipulador para salvar template
  const handleSaveTemplate = async () => {
    setIsLoading(true);
    try {
      // Lógica para salvar template via API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
      
      // Exibir mensagem de sucesso
      alert("Template salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar template:", error);
      // Exibir erro
    } finally {
      setIsLoading(false);
    }
  };
  
  // Manipulador para carregar template de especialista
  const handleLoadExpertTemplate = (expertId) => {
    // Encontrar o especialista selecionado
    const expert = expertNames.find(e => e.id === expertId);
    setSelectedExpert(expert);
    
    // Carregar dados de template baseados no especialista
    // Esta seria uma chamada à API em um cenário real
    // Por enquanto, vamos simular com dados básicos
    
    let templateData = { ...formData };
    
    // Configurar dados baseados no especialista
    if (expert.id === 'vallaeys') {
      // Método 1-3-10 de Frederick Vallaeys
      templateData.basicInfo.type = 'SEARCH';
      templateData.basicInfo.expertStrategy = 'Method 1-3-10';
      templateData.budget.biddingStrategy = 'MANUAL_CPC';
      // Outras configurações específicas...
    } else if (expert.id === 'breeze') {
      // Emotional Resolution de Tom Breeze
      templateData.basicInfo.type = 'VIDEO';
      templateData.basicInfo.expertStrategy = 'Emotional Resolution Framework';
      templateData.budget.biddingStrategy = 'TARGET_ROAS';
      templateData.budget.targetRoas = '1100';
      // Outras configurações específicas...
    } else if (expert.id === 'martinez') {
      // Asset Group Isolation de Joe Martinez
      templateData.basicInfo.type = 'PERFORMANCE_MAX';
      templateData.basicInfo.expertStrategy = 'Asset Group Isolation Strategy';
      templateData.budget.biddingStrategy = 'TARGET_ROAS';
      templateData.budget.targetRoas = '250';
      // Outras configurações específicas...
    }
    // Adicione mais especialistas conforme necessário...
    
    setFormData(templateData);
  };
  
  // Componente para exibição de erro
  const ErrorMessage = ({ message }) => (
    message ? <p className="text-red-600 text-xs mt-1">{message}</p> : null
  );
  
  // Renderização de steps dinamicamente
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfoStep();
      case 2:
        return renderBudgetAndBiddingStep();
      case 3:
        return renderTargetingStep();
      case 4:
        return renderAdExtensionsStep();
      case 5:
        return renderAdConfigurationStep();
      case 6:
        return renderAdvancedSettingsStep();
      case 7:
        return renderExpertStrategyStep();
      case 8:
        return renderReviewStep();
      default:
        return null;
    }
  };
  
  // Step 1: Informações Básicas
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Informações Básicas da Campanha</h2>
      <p className="text-sm text-gray-600">Configure as informações essenciais para sua campanha.</p>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Campanha <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.basicInfo.name}
            onChange={(e) => handleInputChange('basicInfo', 'name', e.target.value)}
            required
          />
          <ErrorMessage message={errors.name} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Campanha <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.basicInfo.type}
            onChange={(e) => handleInputChange('basicInfo', 'type', e.target.value)}
            required
          >
            <option value="">Selecione o tipo de campanha</option>
            {campaignTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <ErrorMessage message={errors.type} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objetivo da Campanha <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.basicInfo.objective}
            onChange={(e) => handleInputChange('basicInfo', 'objective', e.target.value)}
            required
          >
            <option value="">Selecione o objetivo</option>
            {objectives.map((objective) => (
              <option key={objective.id} value={objective.id}>
                {objective.name}
              </option>
            ))}
          </select>
          <ErrorMessage message={errors.objective} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status Inicial
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="status"
                value="ENABLED"
                checked={formData.basicInfo.status === 'ENABLED'}
                onChange={() => handleInputChange('basicInfo', 'status', 'ENABLED')}
              />
              <span className="ml-2 text-sm text-gray-700">Ativa</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="status"
                value="PAUSED"
                checked={formData.basicInfo.status === 'PAUSED'}
                onChange={() => handleInputChange('basicInfo', 'status', 'PAUSED')}
              />
              <span className="ml-2 text-sm text-gray-700">Pausada</span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Início <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.dates.startDate}
              onChange={(e) => handleInputChange('dates', 'startDate', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Término 
              <span className="ml-2 text-xs text-gray-500 font-normal">(opcional)</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.dates.endDate}
                onChange={(e) => handleInputChange('dates', 'endDate', e.target.value)}
                disabled={!formData.dates.useEndDate}
              />
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={formData.dates.useEndDate}
                  onChange={(e) => handleInputChange('dates', 'useEndDate', e.target.checked)}
                />
                <span className="ml-2 text-xs text-gray-600">Usar data de término</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 flex items-center">
            <Info size={16} className="mr-2" />
            Dica de Especialista
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            {formData.basicInfo.type === 'SEARCH' ? 
              "Para campanhas de pesquisa, use nomes descritivos que incluam o objetivo e o público-alvo para facilitar a gestão." :
              formData.basicInfo.type === 'PERFORMANCE_MAX' ?
              "Performance Max funciona melhor quando você fornece Assets diversos e de alta qualidade e configura sinais de audiência claros." :
              "Nomes de campanha organizados facilitam o gerenciamento futuro. Considere incluir informações como mercado-alvo, tipo de produto ou objetivo."}
          </p>
        </div>
      </div>
    </div>
  );
  
  // Step 2: Orçamento e Lances
  const renderBudgetAndBiddingStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Orçamento e Estratégia de Lances</h2>
      <p className="text-sm text-gray-600">Configure o orçamento e a estratégia de lances para sua campanha.</p>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Orçamento <span className="text-red-600">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.budget.budgetType}
              onChange={(e) => handleInputChange('budget', 'budgetType', e.target.value)}
              required
            >
              <option value="DAILY">Diário</option>
              <option value="TOTAL">Total (Campanha completa)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor do Orçamento <span className="text-red-600">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00"
                value={formData.budget.amount}
                onChange={(e) => handleInputChange('budget', 'amount', e.target.value)}
                required
                min="1"
                step="0.01"
              />
            </div>
            <ErrorMessage message={errors.amount} />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Método de Entrega
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="deliveryMethod"
                value="STANDARD"
                checked={formData.budget.deliveryMethod === 'STANDARD'}
                onChange={() => handleInputChange('budget', 'deliveryMethod', 'STANDARD')}
              />
              <span className="ml-2 text-sm text-gray-700">Padrão (distribuído ao longo do dia)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="deliveryMethod"
                value="ACCELERATED"
                checked={formData.budget.deliveryMethod === 'ACCELERATED'}
                onChange={() => handleInputChange('budget', 'deliveryMethod', 'ACCELERATED')}
              />
              <span className="ml-2 text-sm text-gray-700">Acelerado (o mais rápido possível)</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estratégia de Lances <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.budget.biddingStrategy}
            onChange={(e) => handleInputChange('budget', 'biddingStrategy', e.target.value)}
            required
          >
            {biddingStrategies.map((strategy) => (
              <option key={strategy.id} value={strategy.id}>
                {strategy.name}
              </option>
            ))}
          </select>
          <ErrorMessage message={errors.biddingStrategy} />
        </div>
        
        {/* Campos condicionais baseados na estratégia de lance selecionada */}
        {formData.budget.biddingStrategy === 'MANUAL_CPC' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPC Máximo <span className="text-red-600">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00"
                value={formData.budget.maxCpc}
                onChange={(e) => handleInputChange('budget', 'maxCpc', e.target.value)}
                step="0.01"
                min="0.01"
                required
              />
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={formData.budget.enhancedCpc}
                  onChange={(e) => handleInputChange('budget', 'enhancedCpc', e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">Ativar CPC aprimorado</span>
              </label>
            </div>
          </div>
        )}
        
        {formData.budget.biddingStrategy === 'TARGET_CPA' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPA Alvo <span className="text-red-600">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00"
                value={formData.budget.targetCpa}
                onChange={(e) => handleInputChange('budget', 'targetCpa', e.target.value)}
                step="0.01"
                min="0.01"
                required
              />
            </div>
          </div>
        )}
        
        {formData.budget.biddingStrategy === 'TARGET_ROAS' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ROAS Alvo (%) <span className="text-red-600">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 py-2 border border-gray-300 rounded-md"
                placeholder="300"
                value={formData.budget.targetRoas}
                onChange={(e) => handleInputChange('budget', 'targetRoas', e.target.value)}
                step="1"
                min="1"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Por exemplo, para uma meta de 300% de retorno, insira "300"
            </p>
          </div>
        )}
        
        {formData.budget.biddingStrategy === 'TARGET_IMPRESSION_SHARE' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local de Posição Alvo <span className="text-red-600">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.budget.targetImpressionLocation || 'ANYWHERE_ON_PAGE'}
                onChange={(e) => handleInputChange('budget', 'targetImpressionLocation', e.target.value)}
                required
              >
                <option value="ANYWHERE_ON_PAGE">Em qualquer lugar na página</option>
                <option value="TOP_OF_PAGE">Topo da página</option>
                <option value="ABSOLUTE_TOP_OF_PAGE">Topo absoluto da página</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Percentual de Impressões Alvo (%) <span className="text-red-600">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  value={formData.budget.targetImpressionPercentage || ''}
                  onChange={(e) => handleInputChange('budget', 'targetImpressionPercentage', e.target.value)}
                  step="1"
                  min="1"
                  max="100"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPC Máximo <span className="text-red-600">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={formData.budget.maxCpc}
                  onChange={(e) => handleInputChange('budget', 'maxCpc', e.target.value)}
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-yellow-800 flex items-center">
            <AlertTriangle size={16} className="mr-2" />
            Recomendação de Especialista
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            {formData.basicInfo.type === 'SEARCH' && formData.budget.biddingStrategy === 'MANUAL_CPC' ? 
              "Frederick Vallaeys recomenda começar com CPC manual para coletar dados iniciais e depois migrar para estratégias automatizadas após acumular dados suficientes." :
              formData.basicInfo.type === 'PERFORMANCE_MAX' && formData.budget.biddingStrategy === 'TARGET_ROAS' ?
              "Joe Martinez recomenda um período de aprendizado de 2-3 semanas para campanhas Performance Max antes de otimizar o Target ROAS." :
              formData.basicInfo.type === 'VIDEO' ?
              "Tom Breeze sugere usar um orçamento inicial maior nos primeiros dias para coletar dados de performance e depois ajustar com base nos resultados." :
              "Recomendamos um período inicial de 2 semanas para coleta de dados antes de otimizar sua estratégia de lances."}
          </p>
        </div>
      </div>
    </div>
  );
  
  // Step 3: Segmentação
  const renderTargetingStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Segmentação</h2>
      <p className="text-sm text-gray-600">Configure a segmentação geográfica, idiomas e dispositivos.</p>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Segmentação por localização */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Localizações <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Adicionar localização (país, estado, cidade)"
                id="location-input"
              />
              <button
                type="button"
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  const locationInput = document.getElementById('location-input');
                  if (locationInput.value) {
                    handleArrayItemAdd('targeting', 'locations', {
                      name: locationInput.value,
                      type: 'INCLUSION',
                      id: Date.now().toString()
                    });
                    locationInput.value = '';
                  }
                }}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="mt-2 border border-gray-200 rounded-md max-h-48 overflow-y-auto p-2">
              {formData.targeting.locations.length === 0 ? (
                <p className="text-sm text-gray-500 p-2">Nenhuma localização adicionada</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {formData.targeting.locations.map((location, index) => (
                    <li key={location.id} className="flex items-center justify-between py-2 px-1">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full ${location.type === 'INCLUSION' ? 'bg-blue-500' : 'bg-red-500'} mr-2`}></span>
                        <span className="text-sm">{location.name}</span>
                      </div>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleArrayItemRemove('targeting', 'locations', index)}
                      >
                        <Trash size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opções de segmentação
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="targetingOption"
                  value="PRESENCE_OR_INTEREST"
                  checked={formData.targeting.targetingOption === 'PRESENCE_OR_INTEREST'}
                  onChange={() => handleInputChange('targeting', 'targetingOption', 'PRESENCE_OR_INTEREST')}
                />
                <span className="ml-2 text-sm text-gray-700">Presença ou interesse</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="targetingOption"
                  value="PRESENCE"
                  checked={formData.targeting.targetingOption === 'PRESENCE'}
                  onChange={() => handleInputChange('targeting', 'targetingOption', 'PRESENCE')}
                />
                <span className="ml-2 text-sm text-gray-700">Presença</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Segmentação por idioma */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Idiomas <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.targeting.selectedLanguage || ''}
            onChange={(e) => {
              const selectedLanguage = e.target.value;
              if (selectedLanguage && !formData.targeting.languages.includes(selectedLanguage)) {
                handleArrayItemAdd('targeting', 'languages', selectedLanguage);
              }
            }}
          >
            <option value="">Selecione um idioma</option>
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
            <option value="es">Espanhol</option>
            <option value="fr">Francês</option>
            <option value="de">Alemão</option>
            <option value="it">Italiano</option>
            <option value="ja">Japonês</option>
            <option value="zh">Chinês</option>
            <option value="ru">Russo</option>
            <option value="ar">Árabe</option>
            <option value="hi">Hindi</option>
          </select>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.targeting.languages.map((language, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center">
                {language === 'pt' ? 'Português' : 
                 language === 'en' ? 'Inglês' : 
                 language === 'es' ? 'Espanhol' : 
                 language === 'fr' ? 'Francês' : 
                 language === 'de' ? 'Alemão' : 
                 language === 'it' ? 'Italiano' : 
                 language === 'ja' ? 'Japonês' : 
                 language === 'zh' ? 'Chinês' : 
                 language === 'ru' ? 'Russo' : 
                 language === 'ar' ? 'Árabe' : 
                 language === 'hi' ? 'Hindi' : language}
                <button
                  type="button"
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  onClick={() => handleArrayItemRemove('targeting', 'languages', index)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Segmentação por dispositivo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ajustes de Lance por Dispositivo
          </label>
          <div className="mt-2 space-y-4">
            {Object.entries(formData.targeting.deviceTargeting).map(([device, config]) => (
              <div key={device} className="flex items-center space-x-4">
                <label className="inline-flex items-center min-w-[120px]">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={config.enabled}
                    onChange={(e) => {
                      handleNestedInputChange('targeting', 'deviceTargeting', device, {
                        ...config,
                        enabled: e.target.checked
                      });
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {device === 'desktop' ? 'Computadores' : 
                     device === 'mobile' ? 'Dispositivos móveis' : 
                     'Tablets'}
                  </span>
                </label>
                
                {config.enabled && (
                  <div className="flex flex-1 items-center space-x-2">
                    <span className="text-sm text-gray-600">Ajuste:</span>
                    <input
                      type="range"
                      min="-90"
                      max="900"
                      step="10"
                      value={config.bidAdjustment}
                      onChange={(e) => {
                        handleNestedInputChange('targeting', 'deviceTargeting', device, {
                          ...config,
                          bidAdjustment: parseInt(e.target.value)
                        });
                      }}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium w-16 text-right">
                      {config.bidAdjustment >= 0 ? '+' : ''}{config.bidAdjustment}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Os ajustes de lance permitem aumentar ou diminuir seus lances de acordo com o dispositivo. Por exemplo, um ajuste de +30% para dispositivos móveis aumentará os lances em 30% quando o anúncio for exibido em celulares.
          </p>
        </div>
        
        {/* Segmentação por público */}
        {(formData.basicInfo.type === 'DISPLAY' || 
          formData.basicInfo.type === 'VIDEO' || 
          formData.basicInfo.type === 'DISCOVERY' || 
          formData.basicInfo.type === 'PERFORMANCE_MAX') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Segmentação por Público
            </label>
            <div className="border border-gray-200 rounded-md p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Users size={16} className="mr-2" />
                  Públicos detalhados
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.targeting.audiences.detailedDemographic.map((audience, index) => (
                    <div key={index} className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                      {audience}
                      <button
                        type="button"
                        className="ml-2 text-purple-600 hover:text-purple-800"
                        onClick={() => handleNestedArrayItemRemove('targeting', 'audiences', 'detailedDemographic', index)}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-full px-3 py-1 text-sm flex items-center hover:bg-gray-50"
                    onClick={() => {
                      // Implementação de modal ou dropdown para adicionar públicos
                      const audience = prompt("Adicionar público detalhado:");
                      if (audience) {
                        handleNestedArrayItemAdd('targeting', 'audiences', 'detailedDemographic', audience);
                      }
                    }}
                  >
                    <Plus size={14} className="mr-1" />
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Tag size={16} className="mr-2" />
                  Afinidades e interesses
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.targeting.audiences.affinity.map((audience, index) => (
                    <div key={index} className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm flex items-center">
                      {audience}
                      <button
                        type="button"
                        className="ml-2 text-green-600 hover:text-green-800"
                        onClick={() => handleNestedArrayItemRemove('targeting', 'audiences', 'affinity', index)}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-full px-3 py-1 text-sm flex items-center hover:bg-gray-50"
                    onClick={() => {
                      // Implementação de modal ou dropdown para adicionar públicos
                      const audience = prompt("Adicionar afinidade ou interesse:");
                      if (audience) {
                        handleNestedArrayItemAdd('targeting', 'audiences', 'affinity', audience);
                      }
                    }}
                  >
                    <Plus size={14} className="mr-1" />
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  Intenção de compra
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.targeting.audiences.inMarket.map((audience, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center">
                      {audience}
                      <button
                        type="button"
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        onClick={() => handleNestedArrayItemRemove('targeting', 'audiences', 'inMarket', index)}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-full px-3 py-1 text-sm flex items-center hover:bg-gray-50"
                    onClick={() => {
                      // Implementação de modal ou dropdown para adicionar públicos
                      const audience = prompt("Adicionar intenção de compra:");
                      if (audience) {
                        handleNestedArrayItemAdd('targeting', 'audiences', 'inMarket', audience);
                      }
                    }}
                  >
                    <Plus size={14} className="mr-1" />
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Remarketing
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.targeting.audiences.remarketing.map((audience, index) => (
                    <div key={index} className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm flex items-center">
                      {audience}
                      <button
                        type="button"
                        className="ml-2 text-yellow-600 hover:text-yellow-800"
                        onClick={() => handleNestedArrayItemRemove('targeting', 'audiences', 'remarketing', index)}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-white border border-gray-300 rounded-full px-3 py-1 text-sm flex items-center hover:bg-gray-50"
                    onClick={() => {
                      // Implementação de modal ou dropdown para adicionar públicos
                      const audience = prompt("Adicionar lista de remarketing:");
                      if (audience) {
                        handleNestedArrayItemAdd('targeting', 'audiences', 'remarketing', audience);
                      }
                    }}
                  >
                    <Plus size={14} className="mr-1" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Programação de anúncios */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Programação de Anúncios
          </label
          {/* Programação de anúncios */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Programação de Anúncios
        </label>
        <div className="border border-gray-200 rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Ajustar horários de exibição</h3>
            <button
              type="button"
              className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm flex items-center hover:bg-blue-700"
              onClick={() => {
                // Add default ad schedule for all days
                const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
                const newSchedule = {
                  dayOfWeek: days[0],
                  startHour: 8,
                  startMinute: 0,
                  endHour: 20,
                  endMinute: 0,
                  bidModifier: 0
                };
                handleArrayItemAdd('targeting', 'adSchedule', newSchedule);
              }}
            >
              <Plus size={14} className="mr-1" />
              Adicionar programação
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.targeting.adSchedule.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma programação configurada. Seus anúncios serão exibidos 24 horas por dia, 7 dias por semana.</p>
            ) : (
              formData.targeting.adSchedule.map((schedule, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <label className="block text-xs text-gray-500 mb-1">Dia da semana</label>
                      <select
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        value={schedule.dayOfWeek}
                        onChange={(e) => {
                          const updatedSchedule = [...formData.targeting.adSchedule];
                          updatedSchedule[index].dayOfWeek = e.target.value;
                          handleInputChange('targeting', 'adSchedule', updatedSchedule);
                        }}
                      >
                        <option value="MONDAY">Segunda-feira</option>
                        <option value="TUESDAY">Terça-feira</option>
                        <option value="WEDNESDAY">Quarta-feira</option>
                        <option value="THURSDAY">Quinta-feira</option>
                        <option value="FRIDAY">Sexta-feira</option>
                        <option value="SATURDAY">Sábado</option>
                        <option value="SUNDAY">Domingo</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Hora inicial</label>
                      <select
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        value={schedule.startHour}
                        onChange={(e) => {
                          const updatedSchedule = [...formData.targeting.adSchedule];
                          updatedSchedule[index].startHour = parseInt(e.target.value);
                          handleInputChange('targeting', 'adSchedule', updatedSchedule);
                        }}
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={i} value={i}>{i}:00</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Hora final</label>
                      <select
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                        value={schedule.endHour}
                        onChange={(e) => {
                          const updatedSchedule = [...formData.targeting.adSchedule];
                          updatedSchedule[index].endHour = parseInt(e.target.value);
                          handleInputChange('targeting', 'adSchedule', updatedSchedule);
                        }}
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={i} value={i}>{i}:00</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs text-gray-500 mb-1">Ajuste de lance</label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="-90"
                          max="200"
                          step="10"
                          value={schedule.bidModifier}
                          onChange={(e) => {
                            const updatedSchedule = [...formData.targeting.adSchedule];
                            updatedSchedule[index].bidModifier = parseInt(e.target.value);
                            handleInputChange('targeting', 'adSchedule', updatedSchedule);
                          }}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 text-sm w-12">
                          {schedule.bidModifier >= 0 ? '+' : ''}{schedule.bidModifier}%
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-end">
                      <button
                        type="button"
                        className="px-2 py-1 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50"
                        onClick={() => handleArrayItemRemove('targeting', 'adSchedule', index)}
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <p className="mt-3 text-xs text-gray-500">
            Configure horários específicos para exibição dos seus anúncios. Você pode ajustar os lances para aumentar ou diminuir em horários específicos.
          </p>
        </div>
      </div>
      
      {/* Expert Tip */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-medium text-purple-800 flex items-center">
          <Zap size={16} className="mr-2" />
          Dica de Especialista: {selectedExpert ? selectedExpert.name : 'Segmentação Eficaz'}
        </h3>
        <p className="text-sm text-purple-700 mt-1">
          {formData.basicInfo.type === 'SEARCH' ? 
            "Brad Geddes recomenda segmentar por intenção do usuário. Para campanhas de pesquisa, estruture os grupos de anúncios por intenção (informacional, investigativa, transacional) para maximizar a relevância." :
          formData.basicInfo.type === 'PERFORMANCE_MAX' ?
            "Joe Martinez recomenda isolar os asset groups por categoria sem sobreposição, seguindo sua estratégia Asset Group Isolation para evitar competição interna e melhorar o controle por segmento." :
          formData.basicInfo.type === 'VIDEO' ?
            "Tom Breeze sugere alinhar a segmentação com a estrutura AIDA do vídeo. Para anúncios eficazes, combine públicos relevantes com um gancho forte nos primeiros 3 segundos do vídeo." :
          formData.basicInfo.type === 'LOCAL' ?
            "Greg Finn recomenda sua matriz de otimização por raio (Radius Optimization Matrix) com ajustes específicos por densidade populacional: raios menores e lances maiores em áreas urbanas, raios maiores em áreas rurais." :
            "Ilya Cherepakhin recomenda segmentar com base em micro-momentos da jornada do cliente, adaptando a mensagem e a oferta para cada etapa específica do processo de decisão."}
        </p>
      </div>
    </div>
  </div>
);

// Step 4: Extensões de Anúncios
const renderAdExtensionsStep = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Extensões de Anúncio</h2>
    <p className="text-sm text-gray-600">Configure extensões para enriquecer seus anúncios e aumentar o CTR.</p>
    
    <div className="grid grid-cols-1 gap-6">
      {/* Extensões de Sitelink */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.1 1.1" />
              </svg>
              Extensões de Sitelink
            </span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
            onClick={() => {
              // Add a new sitelink
              handleArrayItemAdd('extensions', 'sitelinks', {
                linkText: '',
                finalUrl: '',
                description1: '',
                description2: '',
                id: Date.now().toString()
              });
            }}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Sitelink
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.extensions.sitelinks.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Nenhum sitelink adicionado. Adicione sitelinks para melhorar o CTR.</p>
            </div>
          ) : (
            formData.extensions.sitelinks.map((sitelink, index) => (
              <div key={sitelink.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Texto do Link <span className="text-red-600">*</span>
                      <span className="ml-1 text-gray-400">(25 caracteres máx)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={sitelink.linkText}
                        onChange={(e) => {
                          const updatedSitelinks = [...formData.extensions.sitelinks];
                          updatedSitelinks[index].linkText = e.target.value;
                          handleInputChange('extensions', 'sitelinks', updatedSitelinks);
                        }}
                        maxLength={25}
                        required
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                        {sitelink.linkText?.length || 0}/25
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      URL Final <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={sitelink.finalUrl}
                      onChange={(e) => {
                        const updatedSitelinks = [...formData.extensions.sitelinks];
                        updatedSitelinks[index].finalUrl = e.target.value;
                        handleInputChange('extensions', 'sitelinks', updatedSitelinks);
                      }}
                      required
                      placeholder="https://www.example.com/page"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Descrição 1 <span className="ml-1 text-gray-400">(35 caracteres máx)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={sitelink.description1}
                        onChange={(e) => {
                          const updatedSitelinks = [...formData.extensions.sitelinks];
                          updatedSitelinks[index].description1 = e.target.value;
                          handleInputChange('extensions', 'sitelinks', updatedSitelinks);
                        }}
                        maxLength={35}
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                        {sitelink.description1?.length || 0}/35
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Descrição 2 <span className="ml-1 text-gray-400">(35 caracteres máx)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={sitelink.description2}
                        onChange={(e) => {
                          const updatedSitelinks = [...formData.extensions.sitelinks];
                          updatedSitelinks[index].description2 = e.target.value;
                          handleInputChange('extensions', 'sitelinks', updatedSitelinks);
                        }}
                        maxLength={35}
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                        {sitelink.description2?.length || 0}/35
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-1 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50 flex items-center"
                    onClick={() => handleArrayItemRemove('extensions', 'sitelinks', index)}
                  >
                    <Trash size={14} className="mr-1" />
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Extensões de Callout */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Extensões de Callout
            </span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-green-300 text-green-600 rounded-md text-sm hover:bg-green-50 flex items-center"
            onClick={() => {
              // Add a new callout
              handleArrayItemAdd('extensions', 'callouts', {
                text: '',
                id: Date.now().toString()
              });
            }}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Callout
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.extensions.callouts.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Nenhum callout adicionado. Adicione callouts para destacar características específicas.</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.extensions.callouts.map((callout, index) => (
                  <div key={callout.id} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={callout.text}
                        onChange={(e) => {
                          const updatedCallouts = [...formData.extensions.callouts];
                          updatedCallouts[index].text = e.target.value;
                          handleInputChange('extensions', 'callouts', updatedCallouts);
                        }}
                        maxLength={25}
                        placeholder="Ex: Entrega grátis"
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                        {callout.text?.length || 0}/25
                      </span>
                    </div>
                    <button
                      type="button"
                      className="absolute -right-2 -top-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                      onClick={() => handleArrayItemRemove('extensions', 'callouts', index)}
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Callouts destacam características específicas do seu produto ou serviço (ex: "Entrega Grátis", "Atendimento 24h").
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Extensões de Chamada (Call) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Extensão de Chamada
            </span>
          </label>
          {formData.extensions.calls.length === 0 && (
            <button
              type="button"
              className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
              onClick={() => {
                // Add a call extension
                handleArrayItemAdd('extensions', 'calls', {
                  phoneNumber: '',
                  countryCode: 'BR',
                  callTracking: true,
                  id: Date.now().toString()
                });
              }}
            >
              <Plus size={14} className="mr-1" />
              Adicionar Chamada
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {formData.extensions.calls.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Nenhuma extensão de chamada adicionada. Adicione para permitir que usuários liguem diretamente do anúncio.</p>
            </div>
          ) : (
            formData.extensions.calls.map((call, index) => (
              <div key={call.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Número de Telefone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={call.phoneNumber}
                      onChange={(e) => {
                        const updatedCalls = [...formData.extensions.calls];
                        updatedCalls[index].phoneNumber = e.target.value;
                        handleInputChange('extensions', 'calls', updatedCalls);
                      }}
                      required
                      placeholder="Ex: (11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      País
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={call.countryCode}
                      onChange={(e) => {
                        const updatedCalls = [...formData.extensions.calls];
                        updatedCalls[index].countryCode = e.target.value;
                        handleInputChange('extensions', 'calls', updatedCalls);
                      }}
                    >
                      <option value="BR">Brasil</option>
                      <option value="US">Estados Unidos</option>
                      <option value="UK">Reino Unido</option>
                      <option value="ES">Espanha</option>
                      <option value="IN">Índia</option>
                      <option value="PT">Portugal</option>
                      <option value="MX">México</option>
                      <option value="AR">Argentina</option>
                      <option value="CL">Chile</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={call.callTracking}
                      onChange={(e) => {
                        const updatedCalls = [...formData.extensions.calls];
                        updatedCalls[index].callTracking = e.target.checked;
                        handleInputChange('extensions', 'calls', updatedCalls);
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">Ativar rastreamento de chamadas</span>
                  </label>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-1 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50 flex items-center"
                    onClick={() => handleArrayItemRemove('extensions', 'calls', index)}
                  >
                    <Trash size={14} className="mr-1" />
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Extensões Estruturadas (Structured Snippets) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Extensões Estruturadas (Snippets)
            </span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-purple-300 text-purple-600 rounded-md text-sm hover:bg-purple-50 flex items-center"
            onClick={() => {
              // Add a structured snippet
              handleArrayItemAdd('extensions', 'structured_snippets', {
                header: '',
                values: [],
                id: Date.now().toString()
              });
            }}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Snippet
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.extensions.structured_snippets.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Nenhum snippet estruturado adicionado. Adicione para destacar categorias específicas.</p>
            </div>
          ) : (
            formData.extensions.structured_snippets.map((snippet, index) => (
              <div key={snippet.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Cabeçalho <span className="text-red-600">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={snippet.header}
                      onChange={(e) => {
                        const updatedSnippets = [...formData.extensions.structured_snippets];
                        updatedSnippets[index].header = e.target.value;
                        handleInputChange('extensions', 'structured_snippets', updatedSnippets);
                      }}
                      required
                    >
                      <option value="">Selecione o cabeçalho</option>
                      <option value="BRANDS">Marcas</option>
                      <option value="FEATURES">Recursos</option>
                      <option value="TYPES">Tipos</option>
                      <option value="SERVICES">Serviços</option>
                      <option value="CATEGORIES">Categorias</option>
                      <option value="MODELS">Modelos</option>
                      <option value="COURSES">Cursos</option>
                      <option value="DEGREE_PROGRAMS">Programas de Graduação</option>
                      <option value="DESTINATIONS">Destinos</option>
                      <option value="AMENITIES">Comodidades</option>
                      <option value="STYLES">Estilos</option>
                      <option value="INSURANCE_COVERAGE">Cobertura de Seguro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Valores <span className="text-red-600">*</span> <span className="text-gray-400">(Min 3, Max 10)</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Adicionar valor (ex: Modelo X)"
                        id={`snippet-value-${snippet.id}`}
                        maxLength={25}
                      />
                      <button
                        type="button"
                        className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        onClick={() => {
                          const valueInput = document.getElementById(`snippet-value-${snippet.id}`);
                          if (valueInput.value && snippet.values.length < 10) {
                            const updatedSnippets = [...formData.extensions.structured_snippets];
                            updatedSnippets[index].values.push(valueInput.value);
                            handleInputChange('extensions', 'structured_snippets', updatedSnippets);
                            valueInput.value = '';
                          }
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {snippet.values.map((value, valueIndex) => (
                        <div key={valueIndex} className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                          {value}
                          <button
                            type="button"
                            className="ml-2 text-purple-600 hover:text-purple-800"
                            onClick={() => {
                              const updatedSnippets = [...formData.extensions.structured_snippets];
                              updatedSnippets[index].values.splice(valueIndex, 1);
                              handleInputChange('extensions', 'structured_snippets', updatedSnippets);
                            }}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {snippet.values.length < 3 && (
                      <p className="mt-1 text-xs text-red-600">
                        Adicione pelo menos 3 valores para este snippet.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-1 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50 flex items-center"
                    onClick={() => handleArrayItemRemove('extensions', 'structured_snippets', index)}
                  >
                    <Trash size={14} className="mr-1" />
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Expert Tip */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 flex items-center">
          <Zap size={16} className="mr-2" />
          Dica de Especialista: Extensões de Anúncio
        </h3>
        <p className="text-sm text-blue-700 mt-1">
          Segundo Frederick Vallaeys, as extensões de anúncio podem aumentar o CTR em até 15%. Utilize pelo menos 4 tipos diferentes de extensões por campanha. Para melhor desempenho, personalize as extensões conforme a intenção do usuário em cada grupo de anúncios.
        </p>
        <p className="text-sm text-blue-700 mt-2">
          {formData.basicInfo.type === 'SEARCH' ? 
            "Para campanhas de pesquisa, priorize sitelinks e callouts. Adicione pelo menos 6 sitelinks para maximizar a ocupação de espaço." :
            formData.basicInfo.type === 'PERFORMANCE_MAX' ?
            "Em campanhas Performance Max, as extensões aumentam o alcance do algoritmo. Inclua o máximo de extensões possível com informações variadas." :
            "Personalize as extensões com base no objetivo da campanha. Para geração de leads, priorize extensões de chamada e formulários."}
        </p>
      </div>
    </div>
  </div>
);

// Step 5: Configuração de Anúncios
const renderAdConfigurationStep = () => {
  // Renderização condicional com base no tipo de campanha
  switch (formData.basicInfo.type) {
    case 'SEARCH':
      return renderSearchAdsConfig();
    case 'DISPLAY':
      return renderDisplayAdsConfig();
    case 'VIDEO':
      return renderVideoAdsConfig();
    case 'PERFORMANCE_MAX':
      return renderPerformanceMaxAdsConfig();
    case 'SHOPPING':
      return renderShoppingAdsConfig();
    default:
      return renderSearchAdsConfig(); // Default to search ads
  }
};

// Anúncios de Pesquisa (Search Ads)
const renderSearchAdsConfig = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Configuração de Anúncios de Pesquisa</h2>
    <p className="text-sm text-gray-600">Configure seus anúncios responsivos de pesquisa (RSA).</p>
    
    <div className="grid grid-cols-1 gap-6">
      {/* URL final */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL Final <span className="text-red-600">*</span>
        </label>
        <input
          type="url"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={formData.adConfiguration.responsive_search_ads.finalUrl}
          onChange={(e) => handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'finalUrl', e.target.value)}
          placeholder="https://www.exemplo.com.br"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          URL para onde os usuários serão direcionados ao clicar no anúncio.
        </p>
      </div>
      
      {/* Path */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caminho de Exibição 1 <span className="text-gray-400">(15 caracteres máx)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.adConfiguration.responsive_search_ads.path1}
              onChange={(e) => handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'path1', e.target.value)}
              maxLength={15}
              placeholder="produtos"
            />
            <span className="absolute right-2 bottom-2 text-xs text-gray-400">
              {formData.adConfiguration.responsive_search_ads.path1?.length || 0}/15
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caminho de Exibição 2 <span className="text-gray-400">(15 caracteres máx)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.adConfiguration.responsive_search_ads.path2}
              onChange={(e) => handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'path2', e.target.value)}
              maxLength={15}
              placeholder="ofertas"
            />
            <span className="absolute right-2 bottom-2 text-xs text-gray-400">
              {formData.adConfiguration.responsive_search_ads.path2?.length || 0}/15
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-600">URL de exibição final:</p>
            <p className="text-sm font-medium">
              www.{new URL(formData.adConfiguration.responsive_search_ads.finalUrl || 'https://exemplo.com.br').hostname.replace('www.', '')}
              {formData.adConfiguration.responsive_search_ads.path1 ? `/${formData.adConfiguration.responsive_search_ads.path1}` : ''}
              {formData.adConfiguration.responsive_search_ads.path2 ? `/${formData.adConfiguration.responsive_search_ads.path2}` : ''}
            </p>
          </div>
        </div>
      </div>
      
      {/* Headlines */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Títulos <span className="text-red-600">*</span> <span className="text-gray-400">(3-15 títulos, 30 caracteres máx cada)</span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
            onClick={() => {
              if (formData.adConfiguration.responsive_search_ads.headlines.length < 15) {
                handleNestedArrayItemAdd('adConfiguration', 'responsive_search_ads', 'headlines', {
                  text: '',
                  pinned: false,
                  id: Date.now().toString()
                });
              }
            }}
            disabled={formData.adConfiguration.responsive_search_ads.headlines.length >= 15}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Título
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.adConfiguration.responsive_search_ads.headlines.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Adicione pelo menos 3 títulos (recomendado: 8-15).</p>
            </div>
          ) : (
            formData.adConfiguration.responsive_search_ads.headlines.map((headline, index) => (
              <div key={headline.id || index} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={headline.text}
                    onChange={(e) => {
                      const updatedHeadlines = [...formData.adConfiguration.responsive_search_ads.headlines];
                      updatedHeadlines[index].text = e.target.value;
                      handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'headlines', updatedHeadlines);
                    }}
                    maxLength={30}
                    placeholder={`Título ${index + 1}`}
                  />
                  <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                    {headline.text?.length || 0}/30
                  </span>
                </div>
                
                <label className="inline-flex items-center whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={headline.pinned}
                    onChange={(e) => {
                      const updatedHeadlines = [...formData.adConfiguration.responsive_search_ads.headlines];
                      updatedHeadlines[index].pinned = e.target.checked;
                      // Unpin other headlines if this one is pinned
                      if (e.target.checked) {
                        updatedHeadlines.forEach((h, i) => {
                          if (i !== index) h.pinned = false;
                        });
                      }
                      handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'headlines', updatedHeadlines);
                    }}
                  />
                  <span className="ml-2 text-xs text-gray-600">Fixar na posição {index + 1}</span>
                </label>
                
                <button
                  type="button"
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  onClick={() => {
                    const updatedHeadlines = [...formData.adConfiguration.responsive_search_ads.headlines];
                    updatedHeadlines.splice(index, 1);
                    handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'headlines', updatedHeadlines);
                  }}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))
          )}
          
          {formData.adConfiguration.responsive_search_ads.headlines.length < 3 && (
            <p className="mt-1 text-xs text-red-600">
              Adicione pelo menos 3 títulos para seu anúncio.
            </p>
          )}
        </div>
      </div>
      
      {/* Descriptions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Descrições <span className="text-red-600">*</span> <span className="text-gray-400">(2-4 descrições, 90 caracteres máx cada)</span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
            onClick={() => {
              if (formData.adConfiguration.responsive_search_ads.descriptions.length < 4) {
                handleNestedArrayItemAdd('adConfiguration', 'responsive_search_ads', 'descriptions', {
                  text: '',
                  pinned: false,
                  id: Date.now().toString()
                });
              }
            }}
            disabled={formData.adConfiguration.responsive_search_ads.descriptions.length >= 4}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Descrição
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.adConfiguration.responsive_search_ads.descriptions.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Adicione pelo menos 2 descrições (recomendado: 4).</p>
            </div>
          ) : (
            formData.adConfiguration.responsive_search_ads.descriptions.map((description, index) => (
              <div key={description.id || index} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={description.text}
                    onChange={(e) => {
                      const updatedDescriptions = [...formData.adConfiguration.responsive_search_ads.descriptions];
                      updatedDescriptions[index].text = e.target.value;
                      handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'descriptions', updatedDescriptions);
                    }}
                    maxLength={90}
                    placeholder={`Descrição ${index + 1}`}
                    rows={2}
                  />
                  <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                    {description.text?.length || 0}/90
                  </span>
                </div>
                
                <label className="inline-flex items-center whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={description.pinned}
                    onChange={(e) => {
                      const updatedDescriptions = [...formData.adConfiguration.responsive_search_ads.descriptions];
                      updatedDescriptions[index].pinned = e.target.checked;
                      // Unpin other descriptions if this one is pinned
                      if (e.target.checked) {
                        updatedDescriptions.forEach((d, i) => {
                          if (i !== index) d.pinned = false;
                        });
                      }
                      handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'descriptions', updatedDescriptions);
                    }}
                  />
                  <span className="ml-2 text-xs text-gray-600">Fixar na posição {index + 1}</span>
                </label>
                
                <button
                  type="button"
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  onClick={() => {
                    const updatedDescriptions = [...formData.adConfiguration.responsive_search_ads.descriptions];
                    updatedDescriptions.splice(index, 1);
                    handleNestedInputChange('adConfiguration', 'responsive_search_ads', 'descriptions', updatedDescriptions);
                  }}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))
          )}
          
          {formData.adConfiguration.responsive_search_ads.descriptions.length < 2 && (
            <p className="mt-1 text-xs text-red-600">
              Adicione pelo menos 2 descrições para seu anúncio.
            </p>
          )}
        </div>
      </div>
      
      {/* Ad Strength */}
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Força do Anúncio</h3>
        
        <div className="mb-3">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${
                adStrength.rating === 'EXCELLENT' ? 'bg-blue-600' : 
                adStrength.rating === 'GOOD' ? 'bg-green-600' : 
                adStrength.rating === 'AVERAGE' ? 'bg-yellow-500' : 
                'bg-red-600'
              }`}
              style={{ width: `${adStrength.score}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">Fraco</span>
            <span className={`text-sm font-medium ${
              adStrength.rating === 'EXCELLENT' ? 'text-blue-600' : 
              adStrength.rating === 'GOOD' ? 'text-green-600' : 
              adStrength.rating === 'AVERAGE' ? 'text-yellow-500' : 
              'text-red-600'
            }`}>
              {adStrength.rating === 'EXCELLENT' ? 'Excelente' : 
               adStrength.rating === 'GOOD' ? 'Bom' : 
               adStrength.rating === 'AVERAGE' ? 'Médio' : 
               'Fraco'}
            </span>
            <span className="text-xs text-gray-500">Excelente</span>
          </div>
        </div>
        
        {adStrength.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Sugestões para melhorar:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {adStrength.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Expert Tip */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 flex items-center">
          <Zap size={16} className="mr-2" />
          Dica de Especialista: Anúncios Responsivos (RSA)
        </h3>
        <p className="text-sm text-blue-700 mt-1">
          {selectedExpert?.name === 'Frederick Vallaeys' ? 
            "Frederick Vallaeys recomenda utilizar pelo menos 10 títulos e 4 descrições para maximizar as combinações possíveis e permitir que o algoritmo de aprendizado de máquina encontre as melhores combinações para cada consulta." :
            "Os especialistas recomendam incluir pelo menos 8-10 títulos variados e todas as 4 descrições possíveis para maximizar as combinações. Inclua pelo menos um título e uma descrição com sua palavra-chave principal para aumentar a relevância."}
        </p>
      </div>
    </div>
  </div>
);

// Configuração de Anúncios de Display
const renderDisplayAdsConfig = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Configuração de Anúncios de Display</h2>
    <p className="text-sm text-gray-600">Configure seus anúncios responsivos de display.</p>
    
    {/* Conteúdo para anúncios de display */}
    <div className="grid grid-cols-1 gap-6">
      {/* URL final */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL Final <span className="text-red-600">*</span>
        </label>
        <input
          type="url"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={formData.adConfiguration.responsive_display_ads.finalUrl}
          onChange={(e) => handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'finalUrl', e.target.value)}
          placeholder="https://www.exemplo.com.br"
          required
        />
      </div>
      
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome da Empresa <span className="text-red-600">*</span> <span className="text-gray-400">(25 caracteres máx)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.adConfiguration.responsive_display_ads.businessName}
            onChange={(e) => handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'businessName', e.target.value)}
            maxLength={25}
            required
            placeholder="Nome da sua empresa"
          />
          <span className="absolute right-2 bottom-2 text-xs text-gray-400">
            {formData.adConfiguration.responsive_display_ads.businessName?.length || 0}/25
          </span>
        </div>
      </div>
      
      {/* Headlines */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Títulos Curtos <span className="text-red-600">*</span> <span className="text-gray-400">(min 3, 30 caracteres máx cada)</span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
            onClick={() => {
              if (formData.adConfiguration.responsive_display_ads.headlines.length < 5) {
                handleNestedArrayItemAdd('adConfiguration', 'responsive_display_ads', 'headlines', {
                  text: '',
                  id: Date.now().toString()
                });
              }
            }}
            disabled={formData.adConfiguration.responsive_display_ads.headlines.length >= 5}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Título
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.adConfiguration.responsive_display_ads.headlines.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Adicione pelo menos 3 títulos curtos.</p>
            </div>
          ) : (
            formData.adConfiguration.responsive_display_ads.headlines.map((headline, index) => (
              <div key={headline.id || index} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={headline.text}
                    onChange={(e) => {
                      const updatedHeadlines = [...formData.adConfiguration.responsive_display_ads.headlines];
                      updatedHeadlines[index].text = e.target.value;
                      handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'headlines', updatedHeadlines);
                    }}
                    maxLength={30}
                    placeholder={`Título curto ${index + 1}`}
                  />
                  <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                    {headline.text?.length || 0}/30
                  </span>
                </div>
                
                <button
                  type="button"
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  onClick={() => {
                    const updatedHeadlines = [...formData.adConfiguration.responsive_display_ads.headlines];
                    updatedHeadlines.splice(index, 1);
                    handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'headlines', updatedHeadlines);
                  }}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Long Headline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título Longo <span className="text-red-600">*</span> <span className="text-gray-400">(90 caracteres máx)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.adConfiguration.responsive_display_ads.longHeadline}
            onChange={(e) => handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'longHeadline', e.target.value)}
            maxLength={90}
            required
            placeholder="Título longo principal do anúncio"
          />
          <span className="absolute right-2 bottom-2 text-xs text-gray-400">
            {formData.adConfiguration.responsive_display_ads.longHeadline?.length || 0}/90
          </span>
        </div>
      </div>
      
      {/* Descriptions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Descrições <span className="text-red-600">*</span> <span className="text-gray-400">(min 2, 90 caracteres máx cada)</span>
          </label>
          <button
            type="button"
            className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
            onClick={() => {
              if (formData.adConfiguration.responsive_display_ads.descriptions.length < 5) {
                handleNestedArrayItemAdd('adConfiguration', 'responsive_display_ads', 'descriptions', {
                  text: '',
                  id: Date.now().toString()
                });
              }
            }}
            disabled={formData.adConfiguration.responsive_display_ads.descriptions.length >= 5}
          >
            <Plus size={14} className="mr-1" />
            Adicionar Descrição
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.adConfiguration.responsive_display_ads.descriptions.length === 0 ? (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">Adicione pelo menos 2 descrições.</p>
            </div>
          ) : (
            formData.adConfiguration.responsive_display_ads.descriptions.map((description, index) => (
              <div key={description.id || index} className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={description.text}
                      onChange={(e) => {
                        const updatedDescriptions = [...formData.adConfiguration.responsive_display_ads.descriptions];
                        updatedDescriptions[index].text = e.target.value;
                        handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'descriptions', updatedDescriptions);
                      }}
                      maxLength={90}
                      placeholder={`Descrição ${index + 1}`}
                      rows={2}
                    />
                    <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                      {description.text?.length || 0}/90
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    onClick={() => {
                      const updatedDescriptions = [...formData.adConfiguration.responsive_display_ads.descriptions];
                      updatedDescriptions.splice(index, 1);
                      handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'descriptions', updatedDescriptions);
                    }}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Images Section */}
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-2">Imagens</h3>
          
          {/* Marketing Images */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Imagens de Marketing <span className="text-red-600">*</span>
              </label>
              <button
                type="button"
                className="px-3 py-1 border border-green-300 text-green-600 rounded-md text-sm hover:bg-green-50 flex items-center"
                onClick={() => {
                  // Modal or file upload logic
                  alert("Funcionalidade de upload de imagem será implementada em breve");
                }}
              >
                <Upload size={14} className="mr-1" />
                Adicionar Imagem
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 mb-2">
                Formatos recomendados: 1200×628, 1200×1200 e outros formatos padrão.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                {formData.adConfiguration.responsive_display_ads.marketingImages?.length > 0 ? (
                  formData.adConfiguration.responsive_display_ads.marketingImages.map((image, index) => (
                    <div key={index} className="relative bg-gray-100 rounded-md aspect-video flex items-center justify-center border border-gray-300">
                      <div className="text-gray-400">
                        <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs mt-1">{image.assetName || 'Imagem'}</p>
                      </div>
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                        onClick={() => {
                          const updatedImages = [...formData.adConfiguration.responsive_display_ads.marketingImages];
                          updatedImages.splice(index, 1);
                          handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'marketingImages', updatedImages);
                        }}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-6">
                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Nenhuma imagem adicionada</p>
                    <p className="mt-1 text-xs text-gray-400">Adicione pelo menos uma imagem de marketing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Logo Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Imagens de Logo (opcional)
              </label>
              <button
                type="button"
                className="px-3 py-1 border border-green-300 text-green-600 rounded-md text-sm hover:bg-green-50 flex items-center"
                onClick={() => {
                  // Modal or file upload logic
                  alert("Funcionalidade de upload de logo será implementada em breve");
                }}
              >
                <Upload size={14} className="mr-1" />
                Adicionar Logo
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-500 mb-2">
                Formato recomendado: Quadrado 1:1 (1200×1200).
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                {formData.adConfiguration.responsive_display_ads.logoImages?.length > 0 ? (
                  formData.adConfiguration.responsive_display_ads.logoImages.map((image, index) => (
                    <div key={index} className="relative bg-gray-100 rounded-md aspect-square flex items-center justify-center border border-gray-300">
                      <div className="text-gray-400">
                        <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs mt-1">{image.assetName || 'Logo'}</p>
                      </div>
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                        onClick={() => {
                          const updatedImages = [...formData.adConfiguration.responsive_display_ads.logoImages];
                          updatedImages.splice(index, 1);
                          handleNestedInputChange('adConfiguration', 'responsive_display_ads', 'logoImages', updatedImages);
                        }}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-6">
                    <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Nenhum logo adicionado</p>
                    <p className="mt-1 text-xs text-gray-400">Opcional, mas recomendado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Expert Tip */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-medium text-green-800 flex items-center">
            <Zap size={16} className="mr-2" />
            Dica de Especialista: Anúncios de Display
          </h3>
          <p className="text-sm text-green-700 mt-1">
            {selectedExpert?.name === 'Marty Weintraub' ? 
              "Marty Weintraub recomenda usar segmentação psicográfica avançada combinada com imagens que tenham alto contraste visual. Teste vários formatos de imagem para descobrir quais geram maior engajamento para cada segmento de audiência." :
              selectedExpert?.name === 'Akvile DeFazio' ?
              "Akvile DeFazio recomenda utilizar o Sistema CRAC para remarketing: Contexto relevante, Relevância da mensagem, Ação clara, e Conexão com a experiência anterior do usuário." :
              "Amy Hebdon recomenda seu Visual First Framework: use uma hierarquia visual clara com contraste de 7:1 entre o elemento principal e o fundo. Mantenha o objeto principal ocupando 70% do espaço visual para maximizar o impacto."}
          </p>
        </div>
      </div>
    </div>
  );
  
  // Configuração de anúncios de vídeo
  const renderVideoAdsConfig = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Configuração de Anúncios de Vídeo</h2>
      <p className="text-sm text-gray-600">Configure seus anúncios de vídeo para YouTube.</p>
      
      <div className="grid grid-cols-1 gap-6">
        {/* URL final */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Final <span className="text-red-600">*</span>
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.adConfiguration.video_ads.finalUrl}
            onChange={(e) => handleNestedInputChange('adConfiguration', 'video_ads', 'finalUrl', e.target.value)}
            placeholder="https://www.exemplo.com.br"
            required
          />
        </div>
        
        {/* YouTube Video ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID do Vídeo do YouTube <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.adConfiguration.video_ads.videoId}
                onChange={(e) => handleNestedInputChange('adConfiguration', 'video_ads', 'videoId', e.target.value)}
                placeholder="Ex: dQw4w9WgXcQ"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                O ID é a parte final da URL do YouTube (Ex: youtube.com/watch?v=<span className="font-medium">dQw4w9WgXcQ</span>)
              </p>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center justify-center"
                onClick={() => {
                  if (formData.adConfiguration.video_ads.videoId) {
                    window.open(`https://www.youtube.com/watch?v=${formData.adConfiguration.video_ads.videoId}`, '_blank');
                  } else {
                    alert("Por favor, insira um ID de vídeo válido");
                  }
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Verificar Vídeo
              </button>
            </div>
          </div>
        </div>
        
        {/* Video Preview */}
        {formData.adConfiguration.video_ads.videoId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pré-visualização do Vídeo
            </label>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {/* This would be an iframe with the YouTube video in a real implementation */}
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <p className="mt-2 text-sm text-gray-600">ID: {formData.adConfiguration.video_ads.videoId}</p>
                <p className="text-xs text-gray-500">Pré-visualização disponível no YouTube</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Headlines for video */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Títulos <span className="text-red-600">*</span> <span className="text-gray-400">(15 caracteres máx)</span>
            </label>
            <button
              type="button"
              className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
              onClick={() => {
                if (formData.adConfiguration.video_ads.headlines.length < 5) {
                  handleNestedArrayItemAdd('adConfiguration', 'video_ads', 'headlines', {
                    text: '',
                    id: Date.now().toString()
                  });
                }
              }}
              disabled={formData.adConfiguration.video_ads.headlines.length >= 5}
            >
              <Plus size={14} className="mr-1" />
              Adicionar Título
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.adConfiguration.video_ads.headlines.length === 0 ? (
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <p className="text-sm text-gray-500 text-center">Adicione pelo menos 1 título.</p>
              </div>
            ) : (
              formData.adConfiguration.video_ads.headlines.map((headline, index) => (
                <div key={headline.id || index} className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={headline.text}
                      onChange={(e) => {
                        const updatedHeadlines = [...formData.adConfiguration.video_ads.headlines];
                        updatedHeadlines[index].text = e.target.value;
                        handleNestedInputChange('adConfiguration', 'video_ads', 'headlines', updatedHeadlines);
                      }}
                      maxLength={15}
                      placeholder={`Título ${index + 1}`}
                    />
                    <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                      {headline.text?.length || 0}/15
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    onClick={() => {
                      const updatedHeadlines = [...formData.adConfiguration.video_ads.headlines];
                      updatedHeadlines.splice(index, 1);
                      handleNestedInputChange('adConfiguration', 'video_ads', 'headlines', updatedHeadlines);
                    }}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Descriptions for video */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Descrições <span className="text-red-600">*</span> <span className="text-gray-400">(20 caracteres máx)</span>
            </label>
            <button
              type="button"
              className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
              onClick={() => {
                if (formData.adConfiguration.video_ads.descriptions.length < 5) {
                  handleNestedArrayItemAdd('adConfiguration', 'video_ads', 'descriptions', {
                    text: '',
                    id: Date.now().toString()
                  });
                }
              }}
              disabled={formData.adConfiguration.video_ads.descriptions.length >= 5}
            >
              <Plus size={14} className="mr-1" />
              Adicionar Descrição
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.adConfiguration.video_ads.descriptions.length === 0 ? (
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <p className="text-sm text-gray-500 text-center">Adicione pelo menos 1 descrição.</p>
              </div>
            ) : (
              formData.adConfiguration.video_ads.descriptions.map((description, index) => (
                <div key={description.id || index} className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={description.text}
                      onChange={(e) => {
                        const updatedDescriptions = [...formData.adConfiguration.video_ads.descriptions];
                        updatedDescriptions[index].text = e.target.value;
                        handleNestedInputChange('adConfiguration', 'video_ads', 'descriptions', updatedDescriptions);
                      }}
                      maxLength={20}
                      placeholder={`Descrição ${index + 1}`}
                    />
                    <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                      {description.text?.length || 0}/20
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    onClick={() => {
                      const updatedDescriptions = [...formData.adConfiguration.video_ads.descriptions];
                      updatedDescriptions.splice(index, 1);
                      handleNestedInputChange('adConfiguration', 'video_ads', 'descriptions', updatedDescriptions);
                    }}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Video Ad Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Formato do Anúncio de Vídeo
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-start hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600 mt-1"
                name="videoFormat"
                value="inStream"
                checked={formData.adConfiguration.video_ads.format === 'inStream'}
                onChange={() => handleNestedInputChange('adConfiguration', 'video_ads', 'format', 'inStream')}
              />
              <div className="ml-3">
                <span className="block font-medium text-gray-700">In-stream</span>
                <span className="block text-sm text-gray-500 mt-1">
                  Anúncios que aparecem antes, durante ou depois de vídeos no YouTube e em sites de parceiros de vídeo.
                </span>
              </div>
            </label>
            
            <label className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-start hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600 mt-1"
                name="videoFormat"
                value="discovery"
                checked={formData.adConfiguration.video_ads.format === 'discovery'}
                onChange={() => handleNestedInputChange('adConfiguration', 'video_ads', 'format', 'discovery')}
              />
              <div className="ml-3">
                <span className="block font-medium text-gray-700">Discovery</span>
                <span className="block text-sm text-gray-500 mt-1">
                  Anúncios que aparecem ao lado de vídeos relacionados, nos resultados de busca do YouTube e na página inicial.
                </span>
              </div>
            </label>
          </div>
        </div>
        
        {/* Expert Tip */}
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="font-medium text-red-800 flex items-center">
            <Zap size={16} className="mr-2" />
            Dica de Especialista: Anúncios de Vídeo
          </h3>
          <p className="text-sm text-red-700 mt-1">
            {selectedExpert?.name === 'Tom Breeze' ? 
              "Tom Breeze recomenda utilizar o framework AIDA (Atenção, Interesse, Desejo, Ação) para estruturar seus vídeos. Capture a atenção nos primeiros 3 segundos com um gancho forte, desenvolva o interesse com uma história relacionável, crie desejo mostrando a solução em ação, e termine com um CTA claro." :
              selectedExpert?.name === 'Savannah Sanchez' ?
              "Savannah Sanchez recomenda o Sistema 3U para vídeos de alto engajamento: Urgência (comece com frases impactantes nos primeiros 3 segundos), Utilidade (demonstre claramente o produto resolvendo um problema) e Unicidade (destaque o que faz seu produto diferente da concorrência)." :
              "Para anúncios de vídeo de alto desempenho, garanta que os primeiros 5 segundos sejam extremamente cativantes para evitar o skip. Use o contraste visual, movimento inesperado e áudio de impacto para capturar a atenção imediatamente."}
          </p>
        </div>
      </div>
    </div>
  );
  
  // Configuração de Performance Max
  const renderPerformanceMaxAdsConfig = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Configuração de Performance Max</h2>
      <p className="text-sm text-gray-600">Configure os assets para sua campanha Performance Max.</p>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Informações do Asset Group */}
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-2">Informações do Asset Group</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Final URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Final <span className="text-red-600">*</span>
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.adConfiguration.performance_max_assets.finalUrl}
                onChange={(e) => handleNestedInputChange('adConfiguration', 'performance_max_assets', 'finalUrl', e.target.value)}
                placeholder="https://www.exemplo.com.br"
                required
              />
            </div>
            
            {/* Asset Group Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Grupo de Assets <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.adConfiguration.performance_max_assets.name || ''}
                onChange={(e) => handleNestedInputChange('adConfiguration', 'performance_max_assets', 'name', e.target.value)}
                placeholder="Ex: Produtos Principal"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Text Assets */}
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-2">Assets de Texto</h3>
          
          {/* Headlines */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Títulos <span className="text-red-600">*</span> <span className="text-gray-400">(min 3, max 5)</span>
              </label>
              <button
                type="button"
                className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
                onClick={() => {
                  if (formData.adConfiguration.performance_max_assets.headlines.length < 5) {
                    handleNestedArrayItemAdd('adConfiguration', 'performance_max_assets', 'headlines', {
                      text: '',
                      id: Date.now().toString()
                    });
                  }
                }}
                disabled={formData.adConfiguration.performance_max_assets.headlines.length >= 5}
              >
                <Plus size={14} className="mr-1" />
                Adicionar Título
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.adConfiguration.performance_max_assets.headlines.length === 0 ? (
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 text-center">Adicione pelo menos 3 títulos.</p>
                </div>
              ) : (
                formData.adConfiguration.performance_max_assets.headlines.map((headline, index) => (
                  <div key={headline.id || index} className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={headline.text}
                        onChange={(e) => {
                          const updatedHeadlines = [...formData.adConfiguration.performance_max_assets.headlines];
                          updatedHeadlines[index].text = e.target.value;
                          handleNestedInputChange('adConfiguration', 'performance_max_assets', 'headlines', updatedHeadlines);
                        }}
                        maxLength={30}
                        placeholder={`Título ${index + 1}`}
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                        {headline.text?.length || 0}/30
                      </span>
                    </div>
                    
                    <button
                      type="button"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      onClick={() => {
                        const updatedHeadlines = [...formData.adConfiguration.performance_max_assets.headlines];
                        updatedHeadlines.splice(index, 1);
                        handleNestedInputChange('adConfiguration', 'performance_max_assets', 'headlines', updatedHeadlines);
                      }}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Long Headline */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título Longo <span className="text-red-600">*</span> <span className="text-gray-400">(90 caracteres máx)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.adConfiguration.performance_max_assets.longHeadline}
                onChange={(e) => handleNestedInputChange('adConfiguration', 'performance_max_assets', 'longHeadline', e.target.value)}
                maxLength={90}
                required
                placeholder="Título longo principal"
              />
              <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                {formData.adConfiguration.performance_max_assets.longHeadline?.length || 0}/90
              </span>
            </div>
          </div>
          
          {/* Descriptions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Descrições <span className="text-red-600">*</span> <span className="text-gray-400">(min 2, max 5)</span>
              </label>
              <button
                type="button"
                className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
                onClick={() => {
                  if (formData.adConfiguration.performance_max_assets.descriptions.length < 5) {
                    handleNestedArrayItemAdd('adConfiguration', 'performance_max_assets', 'descriptions', {
                      text: '',
                      id: Date.now().toString()
                    });
                  }
                }}
                disabled={formData.adConfiguration.performance_max_assets.descriptions.length >= 5}
              >
                <Plus size={14} className="mr-1" />
                Adicionar Descrição
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.adConfiguration.performance_max_assets.descriptions.length === 0 ? (
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 text-center">Adicione pelo menos 2 descrições.</p>
                </div>
              ) : (
                formData.adConfiguration.performance_max_assets.descriptions.map((description, index) => (
                  <div key={description.id || index} className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={description.text}
                        onChange={(e) => {
                          const updatedDescriptions = [...formData.adConfiguration.performance_max_assets.descriptions];
                          updatedDescriptions[index].text = e.target.value;
                          handleNestedInputChange('adConfiguration', 'performance_max_assets', 'descriptions', updatedDescriptions);
                        }}
                        maxLength={90}
                        placeholder={`Descrição ${index + 1}`}
                        rows={2}
                      />
                      <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                        {description.text?.length || 0}/90
                      </span>
                    </div>
                    
                    <button
                      type="button"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      onClick={() => {
                        const updatedDescriptions = [...formData.adConfiguration.performance_max_assets.descriptions];
                        updatedDescriptions.splice(index, 1);
                        handleNestedInputChange('adConfiguration', 'performance_max_assets', 'descriptions', updatedDescriptions);
                      }}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Image Assets */}
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-2">Assets de Imagem</h3>
          
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">
              Adicione imagens em vários formatos para maximizar o desempenho da sua campanha Performance Max.
            </p>
            
            <div className="space-y-4">
              {/* Marketing Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Imagens de Marketing <span className="text-red-600">*</span> <span className="text-gray-400">(min 1)</span>
                  </label>
                  <button
                    type="button"
                    className="px-3 py-1 border border-green-300 text-green-600 rounded-md text-sm hover:bg-green-50 flex items-center"
                    onClick={() => {
                      // Modal or file upload logic
                      alert("Funcionalidade de upload de imagem será implementada em breve");
                    }}
                  >
                    <Upload size={14} className="mr-1" />
                    Adicionar Imagem
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {formData.adConfiguration.performance_max_assets.images?.length > 0 ? (
                    formData.adConfiguration.performance_max_assets.images.map((image, index) => (
                      <div key={index} className="relative bg-gray-100 rounded-md aspect-video flex items-center justify-center border border-gray-300">
                        <div className="text-gray-400">
                          <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs mt-1">{image.assetName || `Imagem ${index + 1}`}</p>
                        </div>
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                          onClick={() => {
                            const updatedImages = [...formData.adConfiguration.performance_max_assets.images];
                            updatedImages.splice(index, 1);
                            handleNestedInputChange('adConfiguration', 'performance_max_assets', 'images', updatedImages);
                          }}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-4">
                      <p className="text-sm text-gray-500">Nenhuma imagem adicionada</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Logos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Logos <span className="text-red-600">*</span> <span className="text-gray-400">(min 1)</span>
                  </label>
                  <button
                    type="button"
                    className="px-3 py-1 border border-green-300 text-green-600 rounded-md text-sm hover:bg-green-50 flex items-center"
                    onClick={() => {
                      // Modal or file upload logic
                      alert("Funcionalidade de upload de logo será implementada em breve");
                    }}
                  >
                    <Upload size={14} className="mr-1" />
                    Adicionar Logo
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {formData.adConfiguration.performance_max_assets.logos?.length > 0 ? (
                    formData.adConfiguration.performance_max_assets.logos.map((logo, index) => (
                      <div key={index} className="relative bg-gray-100 rounded-md aspect-square flex items-center justify-center border border-gray-300">
                        <div className="text-gray-400">
                          <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs mt-1">{logo.assetName || `Logo ${index + 1}`}</p>
                        </div>
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                          onClick={() => {
                            const updatedLogos = [...formData.adConfiguration.performance_max_assets.logos];
                            updatedLogos.splice(index, 1);
                            handleNestedInputChange('adConfiguration', 'performance_max_assets', 'logos', updatedLogos);
                          }}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-4">
                      <p className="text-sm text-gray-500">Nenhum logo adicionado</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Videos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Vídeos <span className="text-gray-400">(recomendado)</span>
                  </label>
                  <button
                    type="button"
                    className="px-3 py-1 border border-green-300 text-green-600 rounded-md text-sm hover:bg-green-50 flex items-center"
                    onClick={() => {
                      // Modal to add YouTube video ID
                      const videoId = prompt("Insira o ID do vídeo do YouTube:");
                      if (videoId) {
                        handleNestedArrayItemAdd('adConfiguration', 'performance_max_assets', 'videos', {
                          videoId,
                          assetName: `Vídeo ${formData.adConfiguration.performance_max_assets.videos?.length + 1 || 1}`,
                          id: Date.now().toString()
                        });
                      }
                    }}
                  >
                    <Upload size={14} className="mr-1" />
                    Adicionar Vídeo
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {formData.adConfiguration.performance_max_assets.videos?.length > 0 ? (
                    formData.adConfiguration.performance_max_assets.videos.map((video, index) => (
                      <div key={index} className="relative bg-gray-100 rounded-md aspect-video flex items-center justify-center border border-gray-300">
                        <div className="text-center">
                          <svg className="w-8 h-8 mx-auto text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                          <p className="text-xs mt-1 text-gray-600">{video.assetName || `Vídeo ${index + 1}`}</p>
                          <p className="text-xs text-gray-500">{video.videoId}</p>
                        </div>
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                          onClick={() => {
                            const updatedVideos = [...formData.adConfiguration.performance_max_assets.videos];
                            updatedVideos.splice(index, 1);
                            handleNestedInputChange('adConfiguration', 'performance_max_assets', 'videos', updatedVideos);
                          }}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-4">
                      <p className="text-sm text-gray-500">Nenhum vídeo adicionado</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Expert Tip */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-medium text-purple-800 flex items-center">
            <Zap size={16} className="mr-2" />
            Dica de Especialista: Performance Max
          </h3>
          <p className="text-sm text-purple-700 mt-1">
            {selectedExpert?.name === 'Joe Martinez' ? 
              "Joe Martinez recomenda a Strategy de Asset Group Isolation: crie asset groups completamente isolados por categoria de produto, sem sobreposição entre grupos. Isso proporciona maior controle e evita a competição interna." :
              selectedExpert?.name === 'Andrea Cruz' ?
              "Andrea Cruz recomenda o Progressive Signals Framework para Performance Max: comece com sinais básicos (semanas 1-2), expanda para sinais intermediários (semanas 3-4) e só depois adicione sinais avançados (mês 2+). Essa abordagem permite que o algoritmo aprenda progressivamente." :
              "Para Performance Max, forneça a maior variedade possível de assets de alta qualidade. Inclua todos os formatos de texto, imagem e vídeo para maximizar as combinações possíveis e permitir que o algoritmo encontre as melhores opções para cada audiência."}
          </p>
        </div>
      </div>
    </div>
  );
  
  // Configuração de Shopping Ads
  const renderShoppingAdsConfig = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Configuração de Campanha Shopping</h2>
      <p className="text-sm text-gray-600">Configure suas campanhas de Shopping.</p>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Merchant Center */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID do Merchant Center <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.adConfiguration.shopping_ads.merchantId}
            onChange={(e) => handleNestedInputChange('adConfiguration', 'shopping_ads', 'merchantId', e.target.value)}
            placeholder="Ex: 12345678"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            ID da sua conta do Merchant Center que contém os produtos que você deseja anunciar.
          </p>
        </div>
        
        {/* Feed ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID do Feed <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.adConfiguration.shopping_ads.feedId}
            onChange={(e) => handleNestedInputChange('adConfiguration', 'shopping_ads', 'feedId', e.target.value)}
            placeholder="Ex: 12345678"
          />
          <p className="mt-1 text-xs text-gray-500">
            Se você tiver múltiplos feeds, especifique o ID do feed específico para esta campanha.
          </p>
        </div>
        
        {/* Product Groups */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Grupos de Produtos
            </label>
            <button
              type="button"
              className="px-3 py-1 border border-blue-300 text-blue-600 rounded-md text-sm hover:bg-blue-50 flex items-center"
              onClick={() => {
                // Add a new product group
                handleNestedArrayItemAdd('adConfiguration', 'shopping_ads', 'productGroupings', {
                  name: `Grupo ${formData.adConfiguration.shopping_ads.productGroupings?.length + 1 || 1}`,
                  type: 'CATEGORY',
                  value: '',
                  bid: '',
                  id: Date.now().toString()
                });
              }}
            >
              <Plus size={14} className="mr-1" />
              Adicionar Grupo
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.adConfiguration.shopping_ads.productGroupings?.length === 0 ? (
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <p className="text-sm text-gray-500 text-center">Nenhum grupo de produtos adicionado. Se não especificado, todos os produtos do feed serão anunciados.</p>
              </div>
            ) : (
              formData.adConfiguration.shopping_ads.productGroupings.map((group, index) => (
                <div key={group.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Nome do Grupo
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={group.name}
                        onChange={(e) => {
                          const updatedGroups = [...formData.adConfiguration.shopping_ads.productGroupings];
                          updatedGroups[index].name = e.target.value;
                          handleNestedInputChange('adConfiguration', 'shopping_ads', 'productGroupings', updatedGroups);
                        }}
                        placeholder="Nome do grupo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Tipo de Segmentação
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={group.type}
                        onChange={(e) => {
                          const updatedGroups = [...formData.adConfiguration.shopping_ads.productGroupings];
                          updatedGroups[index].type = e.target.value;
                          handleNestedInputChange('adConfiguration', 'shopping_ads', 'productGroupings', updatedGroups);
                        }}
                      >
                        <option value="CATEGORY">Categoria</option>
                        <option value="BRAND">Marca</option>
                        <option value="PRODUCT_TYPE">Tipo de Produto</option>
                        <option value="CONDITION">Condição</option>
                        <option value="ITEM_ID">ID do Item</option>
                        <option value="CHANNEL">Canal</option>
                        <option value="CUSTOM_LABEL">Custom Label</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Valor
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={group.value}
                        onChange={(e) => {
                          const updatedGroups = [...formData.adConfiguration.shopping_ads.productGroupings];
                          updatedGroups[index].value = e.target.value;
                          handleNestedInputChange('adConfiguration', 'shopping_ads', 'productGroupings', updatedGroups);
                        }}
                        placeholder="Ex: Eletrônicos"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Lance
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                          placeholder="0.00"
                          value={group.bid}
                          onChange={(e) => {
                            const updatedGroups = [...formData.adConfiguration.shopping_ads.productGroupings];
                            updatedGroups[index].bid = e.target.value;
                            handleNestedInputChange('adConfiguration', 'shopping_ads', 'productGroupings', updatedGroups);
                          }}
                          step="0.01"
                          min="0.01"
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-end justify-end">
                      <button
                        type="button"
                        className="px-3 py-1.5 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50 flex items-center"
                        onClick={() => {
                          const updatedGroups = [...formData.adConfiguration.shopping_ads.productGroupings];
                          updatedGroups.splice(index, 1);
                          handleNestedInputChange('adConfiguration', 'shopping_ads', 'productGroupings', updatedGroups);
                        }}
                      >
                        <Trash size={14} className="mr-1.5" />
                        Remover Grupo
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Campaign Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridade da Campanha
          </label>
          <div className="grid grid-cols-3 gap-4">
            <label className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-start hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600 mt-1"
                name="campaignPriority"
                value="HIGH"
                checked={formData.adConfiguration.shopping_ads.campaignPriority === 'HIGH'}
                onChange={() => handleNestedInputChange('adConfiguration', 'shopping_ads', 'campaignPriority', 'HIGH')}
              />
              <div className="ml-3">
                <span className="block font-medium text-gray-700">Alta</span>
                <span className="block text-xs text-gray-500 mt-1">
                  Prioridade máxima quando os produtos se sobrepõem entre campanhas.
                </span>
              </div>
            </label>
            
            <label className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-start hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600 mt-1"
                name="campaignPriority"
                value="MEDIUM"
                checked={formData.adConfiguration.shopping_ads.campaignPriority === 'MEDIUM'}
                onChange={() => handleNestedInputChange('adConfiguration', 'shopping_ads', 'campaignPriority', 'MEDIUM')}
              />
              <div className="ml-3">
                <span className="block font-medium text-gray-700">Média</span>
                <span className="block text-xs text-gray-500 mt-1">
                  Prioridade intermediária para campanhas equilibradas.
                </span>
              </div>
            </label>
            
            <label className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-start hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600 mt
               // Continuing from where the implementation stopped at ad scheduling

          <div className="mt-4">
            {formData.targeting.adSchedule.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Dia</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Horário</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Ajuste de Lance</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.targeting.adSchedule.map((schedule, index) => {
                      const dayMap = {
                        "MONDAY": "Segunda-feira",
                        "TUESDAY": "Terça-feira",
                        "WEDNESDAY": "Quarta-feira",
                        "THURSDAY": "Quinta-feira",
                        "FRIDAY": "Sexta-feira",
                        "SATURDAY": "Sábado",
                        "SUNDAY": "Domingo"
                      };
                      
                      return (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-500">{dayMap[schedule.dayOfWeek]}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            {schedule.startHour}:00 - {schedule.endHour}:00
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            <span className={schedule.bidModifier >= 0 ? "text-green-600" : "text-red-600"}>
                              {schedule.bidModifier >= 0 ? '+' : ''}{schedule.bidModifier}%
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleArrayItemRemove('targeting', 'adSchedule', index)}
                            >
                              <Trash size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Expert Tip */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-medium text-purple-800 flex items-center">
          <Zap size={16} className="mr-2" />
          Dica de Especialista: {selectedExpert ? selectedExpert.name : 'Segmentação Eficaz'}
        </h3>
        <p className="text-sm text-purple-700 mt-1">
          {formData.basicInfo.type === 'SEARCH' ? 
            "Brad Geddes recomenda segmentar por intenção do usuário. Para campanhas de pesquisa, estruture os grupos de anúncios por intenção (informacional, investigativa, transacional) para maximizar a relevância." :
          formData.basicInfo.type === 'PERFORMANCE_MAX' ?
            "Joe Martinez recomenda isolar os asset groups por categoria sem sobreposição, seguindo sua estratégia Asset Group Isolation para evitar competição interna e melhorar o controle por segmento." :
          formData.basicInfo.type === 'VIDEO' ?
            "Tom Breeze sugere alinhar a segmentação com a estrutura AIDA do vídeo. Para anúncios eficazes, combine públicos relevantes com um gancho forte nos primeiros 3 segundos do vídeo." :
          formData.basicInfo.type === 'LOCAL' ?
            "Greg Finn recomenda sua matriz de otimização por raio (Radius Optimization Matrix) com ajustes específicos por densidade populacional: raios menores e lances maiores em áreas urbanas, raios maiores em áreas rurais." :
            "Ilya Cherepakhin recomenda segmentar com base em micro-momentos da jornada do cliente, adaptando a mensagem e a oferta para cada etapa específica do processo de decisão."}
        </p>
      </div>
    </div>
  );
};

// Step 4: Extensões de Anúncios (já implementado)

// Step 5: Configuração de Anúncios
const renderAdConfigurationStep = () => {
  // Renderização condicional com base no tipo de campanha
  switch (formData.basicInfo.type) {
    case 'SEARCH':
      return renderSearchAdsConfig();
    case 'DISPLAY':
      return renderDisplayAdsConfig();
    case 'VIDEO':
      return renderVideoAdsConfig();
    case 'PERFORMANCE_MAX':
      return renderPerformanceMaxAdsConfig();
    case 'SHOPPING':
      return renderShoppingAdsConfig();
    default:
      return renderSearchAdsConfig(); // Default to search ads
  }
};

// Step 6: Configurações Avançadas
const renderAdvancedSettingsStep = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Configurações Avançadas</h2>
    <p className="text-sm text-gray-600">Configure opções avançadas para personalizar sua campanha.</p>
    
    <div className="grid grid-cols-1 gap-6">
      {/* URL Options */}
      <div>
        <h3 className="text-md font-medium text-gray-800 mb-2">Opções de URL</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template de Rastreamento
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.advanced.urlOptions.trackingTemplate}
              onChange={(e) => handleNestedInputChange('advanced', 'urlOptions', 'trackingTemplate', e.target.value)}
              placeholder="Ex: {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use {lpurl} para inserir a URL final; {campaignid}, {adgroupid}, etc. para parâmetros dinâmicos.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parâmetros Personalizados
            </label>
            <div className="space-y-2">
              {formData.advanced.urlOptions.customParameters.map((param, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={param.key}
                    onChange={(e) => {
                      const updatedParams = [...formData.advanced.urlOptions.customParameters];
                      updatedParams[index] = { ...param, key: e.target.value };
                      handleNestedInputChange('advanced', 'urlOptions', 'customParameters', updatedParams);
                    }}
                    placeholder="Chave (ex: promocao)"
                    maxLength={16}
                  />
                  <span className="text-gray-500">=</span>
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={param.value}
                    onChange={(e) => {
                      const updatedParams = [...formData.advanced.urlOptions.customParameters];
                      updatedParams[index] = { ...param, value: e.target.value };
                      handleNestedInputChange('advanced', 'urlOptions', 'customParameters', updatedParams);
                    }}
                    placeholder="Valor (ex: verao2025)"
                    maxLength={200}
                  />
                  <button
                    type="button"
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    onClick={() => {
                      const updatedParams = [...formData.advanced.urlOptions.customParameters];
                      updatedParams.splice(index, 1);
                      handleNestedInputChange('advanced', 'urlOptions', 'customParameters', updatedParams);
                    }}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-3 py-2 border border-gray-300 text-blue-600 rounded-md text-sm hover:bg-gray-50 flex items-center"
                onClick={() => {
                  const newParam = { key: '', value: '' };
                  const updatedParams = [...formData.advanced.urlOptions.customParameters, newParam];
                  handleNestedInputChange('advanced', 'urlOptions', 'customParameters', updatedParams);
                }}
              >
                <Plus size={14} className="mr-1" />
                Adicionar Parâmetro
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Parâmetros personalizados serão incluídos em todas as URLs da campanha.
            </p>
          </div>
        </div>
      </div>
      
      {/* Ad Rotation */}
      <div>
        <h3 className="text-md font-medium text-gray-800 mb-2">Rotação de Anúncios</h3>
        <div className="space-y-2">
          <div>
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="adRotation"
                    value="OPTIMIZE"
                    checked={formData.advanced.adRotation === 'OPTIMIZE'}
                    onChange={() => handleInputChange('advanced', 'adRotation', 'OPTIMIZE')}
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">Otimizado</span>
                </label>
                <p className="mt-1 text-xs text-gray-500 ml-6">
                  Prioriza anúncios com melhor probabilidade de performance com base nos seus objetivos.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="adRotation"
                    value="ROTATE_FOREVER"
                    checked={formData.advanced.adRotation === 'ROTATE_FOREVER'}
                    onChange={() => handleInputChange('advanced', 'adRotation', 'ROTATE_FOREVER')}
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">Rotação Indefinida</span>
                </label>
                <p className="mt-1 text-xs text-gray-500 ml-6">
                  Exibe seus anúncios com frequência mais uniforme, sem otimização automática.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Exclusions */}
      <div>
        <h3 className="text-md font-medium text-gray-800 mb-2">Exclusões</h3>
        
        {/* Negative Keywords */}
        {(formData.basicInfo.type === 'SEARCH' || formData.basicInfo.type === 'SHOPPING') && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Palavras-chave Negativas
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  id="negative-keyword-input"
                  placeholder="Ex: grátis, usado, barato"
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  id="negative-keyword-match-type"
                  defaultValue="BROAD"
                >
                  <option value="BROAD">Ampla</option>
                  <option value="PHRASE">Frase</option>
                  <option value="EXACT">Exata</option>
                </select>
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    const keywordInput = document.getElementById('negative-keyword-input') as HTMLInputElement;
                    const matchTypeInput = document.getElementById('negative-keyword-match-type') as HTMLSelectElement;
                    
                    if (keywordInput.value) {
                      const newKeyword = {
                        text: keywordInput.value,
                        matchType: matchTypeInput.value,
                        id: Date.now().toString()
                      };
                      
                      handleNestedArrayItemAdd(
                        'advanced', 
                        'exclusions', 
                        'negativeKeywords', 
                        newKeyword
                      );
                      
                      keywordInput.value = '';
                    }
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="mt-2 border border-gray-200 rounded-md max-h-48 overflow-y-auto p-2">
                {formData.advanced.exclusions.negativeKeywords.length === 0 ? (
                  <p className="text-sm text-gray-500 p-2">Nenhuma palavra-chave negativa adicionada</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {formData.advanced.exclusions.negativeKeywords.map((keyword, index) => (
                      <li key={keyword.id} className="flex items-center justify-between py-2 px-1">
                        <div className="flex items-center">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            keyword.matchType === 'EXACT' ? 'bg-blue-100 text-blue-800' : 
                            keyword.matchType === 'PHRASE' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {keyword.matchType === 'EXACT' ? 'Exata' : 
                             keyword.matchType === 'PHRASE' ? 'Frase' : 
                             'Ampla'}
                          </span>
                          <span className="ml-2 text-sm">
                            {keyword.matchType === 'EXACT' ? `[${keyword.text}]` : 
                             keyword.matchType === 'PHRASE' ? `"${keyword.text}"` : 
                             keyword.text}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            const updatedKeywords = [...formData.advanced.exclusions.negativeKeywords];
                            updatedKeywords.splice(index, 1);
                            handleNestedInputChange('advanced', 'exclusions', 'negativeKeywords', updatedKeywords);
                          }}
                        >
                          <Trash size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Excluded Placements */}
        {(formData.basicInfo.type === 'DISPLAY' || formData.basicInfo.type === 'VIDEO') && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posicionamentos Excluídos
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  id="excluded-placement-input"
                  placeholder="Ex: example.com"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    const placementInput = document.getElementById('excluded-placement-input') as HTMLInputElement;
                    
                    if (placementInput.value) {
                      const newPlacement = {
                        url: placementInput.value,
                        id: Date.now().toString()
                      };
                      
                      handleNestedArrayItemAdd(
                        'advanced',
                        'exclusions',
                        'excludedPlacement',
                        newPlacement
                      );
                      
                      placementInput.value = '';
                    }
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="mt-2 border border-gray-200 rounded-md max-h-48 overflow-y-auto p-2">
                {formData.advanced.exclusions.excludedPlacement.length === 0 ? (
                  <p className="text-sm text-gray-500 p-2">Nenhum posicionamento excluído</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {formData.advanced.exclusions.excludedPlacement.map((placement, index) => (
                      <li key={placement.id} className="flex items-center justify-between py-2 px-1">
                        <div className="flex items-center">
                          <span className="text-sm">{placement.url}</span>
                        </div>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            const updatedPlacements = [...formData.advanced.exclusions.excludedPlacement];
                            updatedPlacements.splice(index, 1);
                            handleNestedInputChange('advanced', 'exclusions', 'excludedPlacement', updatedPlacements);
                          }}
                        >
                          <Trash size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Content Exclusions */}
        {(formData.basicInfo.type === 'DISPLAY' || formData.basicInfo.type === 'VIDEO') && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exclusões de Conteúdo
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { id: 'TRAGEDY', label: 'Tragédias e conflitos' },
                  { id: 'SENSITIVE_SOCIAL_ISSUES', label: 'Questões sociais sensíveis' },
                  { id: 'PROFANITY', label: 'Palavrões e linguagem grosseira' },
                  { id: 'SEXUALLY_SUGGESTIVE', label: 'Conteúdo sexualmente sugestivo' },
                  { id: 'GAMBLING', label: 'Jogos de azar' },
                  { id: 'VIOLENCE', label: 'Violência' }
                ].map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`content-exclusion-${category.id}`}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={formData.advanced.exclusions.contentExclusions.includes(category.id)}
                      onChange={(e) => {
                        const currentExclusions = [...formData.advanced.exclusions.contentExclusions];
                        if (e.target.checked) {
                          if (!currentExclusions.includes(category.id)) {
                            handleNestedInputChange(
                              'advanced',
                              'exclusions',
                              'contentExclusions',
                              [...currentExclusions, category.id]
                            );
                          }
                        } else {
                          handleNestedInputChange(
                            'advanced',
                            'exclusions',
                            'contentExclusions',
                            currentExclusions.filter(id => id !== category.id)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`content-exclusion-${category.id}`} className="ml-2 text-sm text-gray-700">
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dynamic Search Ads Settings */}
      {formData.basicInfo.type === 'SEARCH' && (
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-2">Configurações de Anúncios de Pesquisa Dinâmica</h3>
          <div className="space-y-4 border border-gray-200 rounded-md p-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={formData.advanced.dynamicSearchSettings.enabled || false}
                  onChange={(e) => handleNestedInputChange('advanced', 'dynamicSearchSettings', 'enabled', e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700 font-medium">Ativar Anúncios de Pesquisa Dinâmica</span>
              </label>
              <p className="mt-1 text-xs text-gray-500 ml-6">
                Os Anúncios de Pesquisa Dinâmica utilizam o conteúdo do seu site para direcionar seus anúncios e gerar títulos automaticamente.
              </p>
            </div>
            
            {formData.advanced.dynamicSearchSettings.enabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Domínio <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.advanced.dynamicSearchSettings.domainName}
                    onChange={(e) => handleNestedInputChange('advanced', 'dynamicSearchSettings', 'domainName', e.target.value)}
                    placeholder="Ex: exemplo.com.br"
                    required={formData.advanced.dynamicSearchSettings.enabled}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idiomas para targeting
                  </label>
                  <div className="space-y-2">
                    {['pt', 'en', 'es', 'fr'].map(lang => {
                      const langNames = {
                        'pt': 'Português',
                        'en': 'Inglês',
                        'es': 'Espanhol',
                        'fr': 'Francês'
                      };
                      
                      return (
                        <div key={lang} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`dsa-lang-${lang}`}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            checked={formData.advanced.dynamicSearchSettings.languageTargeting.includes(lang)}
                            onChange={(e) => {
                              const currentLanguages = [...formData.advanced.dynamicSearchSettings.languageTargeting];
                              if (e.target.checked) {
                                if (!currentLanguages.includes(lang)) {
                                  handleNestedInputChange(
                                    'advanced',
                                    'dynamicSearchSettings',
                                    'languageTargeting',
                                    [...currentLanguages, lang]
                                  );
                                }
                              } else {
                                handleNestedInputChange(
                                  'advanced',
                                  'dynamicSearchSettings',
                                  'languageTargeting',
                                  currentLanguages.filter(l => l !== lang)
                                );
                              }
                            }}
                          />
                          <label htmlFor={`dsa-lang-${lang}`} className="ml-2 text-sm text-gray-700">
                            {langNames[lang]}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={formData.advanced.dynamicSearchSettings.useSuppliedUrlsOnly}
                      onChange={(e) => handleNestedInputChange('advanced', 'dynamicSearchSettings', 'useSuppliedUrlsOnly', e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-700">Usar apenas URLs fornecidas</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500 ml-6">
                    Se ativado, o Google usará apenas páginas especificamente listadas por você.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Expert Tip */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 flex items-center">
          <Zap size={16} className="mr-2" />
          Dica de Especialista: Configurações Avançadas
        </h3>
        <p className="text-sm text-blue-700 mt-1">
          {formData.basicInfo.type === 'SEARCH' ? 
            "Frederick Vallaeys recomenda usar palavras-chave negativas de forma estratégica para evitar sobreposição entre campanhas e aumentar a relevância dos anúncios. Revisão semanal de termos de pesquisa é essencial." :
            formData.basicInfo.type === 'DISPLAY' || formData.basicInfo.type === 'VIDEO' ?
            "Marty Weintraub sugere utilizar exclusões de conteúdo para garantir brand safety, mas recomenda testar o impacto dessas exclusões no alcance e desempenho da campanha antes de aplicar amplamente." :
            "Configurações avançadas podem impactar significativamente o desempenho. Para campanhas de e-commerce, Kirk Williams recomenda estruturar URLs com parâmetros que facilitem a análise de desempenho por categoria de produto."}
        </p>
      </div>
    </div>
  </div>
);

// Step 7: Estratégias de Especialistas
const renderExpertStrategyStep = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Estratégias de Especialistas</h2>
    <p className="text-sm text-gray-600">Escolha e configure estratégias avançadas baseadas em especialistas reconhecidos.</p>
    
    <div className="grid grid-cols-1 gap-6">
      {/* Expert Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Selecione um Especialista
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {expertNames.map(expert => (
            <div key={expert.id}>
              <button
                type="button"
                className={`w-full p-4 border rounded-lg text-left transition ${
                  selectedExpert?.id === expert.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
                onClick={() => handleLoadExpertTemplate(expert.id)}
              >
                <div className="flex items-start">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${
                    expert.category === 'search' ? 'bg-blue-600' :
                    expert.category === 'video' ? 'bg-red-600' :
                    expert.category === 'display' ? 'bg-green-600' :
                    expert.category === 'performance_max' ? 'bg-purple-600' :
                    expert.category === 'shopping' ? 'bg-yellow-600' :
                    expert.category === 'discovery' ? 'bg-pink-600' :
                    expert.category === 'local' ? 'bg-indigo-600' :
                    expert.category === 'app' ? 'bg-orange-600' :
                    'bg-gray-600'
                  }`}>
                    {expert.name.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{expert.name}</h3>
                    <p className="text-xs text-gray-500">{expert.expertise}</p>
                    <p className="text-xs text-gray-400 mt-1 capitalize">{expert.category}</p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Expert Strategy Details */}
      {selectedExpert && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 text-lg">Estratégia: {selectedExpert.expertise}</h3>
          
          <div className="mt-4 space-y-4">
            {/* Expert Description */}
            <div>
              <h4 className="text-sm font-medium text-gray-700">Descrição da Estratégia</h4>
              <p className="mt-1 text-sm text-gray-600">
                {selectedExpert.id === 'vallaeys' ? 
                  "O Method 1-3-10 de Frederick Vallaeys é uma abordagem estruturada para gestão de campanhas com monitoramento diário de métricas críticas, otimização semanal (a cada 3 semanas) e planejamento estratégico com ciclo de 10 meses. Foca em qualidade de anúncios, palavras-chave relevantes e automação supervisionada." :
                 selectedExpert.id === 'geddes' ?
                  "O Método 5-3-10 de Brad Geddes segmenta campanhas por 5 categorias de intenção (informacional, navegacional, comercial-investigação, comercial-transacional, transacional), 3 níveis de engajamento (usuários novos, retornantes, alta frequência) e 10 variações de mensagem para identificar o que ressoa melhor." :
                 selectedExpert.id === 'breeze' ?
                  "A estratégia Emotional Resolution de Tom Breeze usa a estrutura AIDA (Atenção, Interesse, Desejo, Ação) para vídeos. Inicia com um gancho forte nos primeiros 3 segundos, desenvolve interesse com uma história relacionável, cria desejo mostrando a solução em ação, e finaliza com um CTA claro." :
                 selectedExpert.id === 'martinez' ?
                  "A Asset Group Isolation Strategy de Joe Martinez para Performance Max cria grupos de assets completamente separados por categoria de produto, sem sobreposição entre grupos. Isso evita competição interna e permite otimização específica por segmento de produto." :
                  "Esta estratégia especializada foi desenvolvida para maximizar resultados com base em anos de experiência e testes em várias contas. Incorpora práticas comprovadas e otimizações específicas para o tipo de campanha selecionado."
                }
              </p>
            </div>
            
            {/* Configuration Changes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700">Aplicação na Campanha</h4>
              <div className="mt-2 space-y-2">
                <div className="flex">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {selectedExpert.id === 'vallaeys' ? 
                      "Estratégia de lances iniciando com CPC manual, evoluindo para Target CPA após acumular dados suficientes" :
                     selectedExpert.id === 'geddes' ?
                      "Grupos de anúncios organizados por intenção do usuário para maior relevância" :
                     selectedExpert.id === 'breeze' ? 
                      "Formatos de vídeo otimizados para capturar atenção nos primeiros 3 segundos" :
                     selectedExpert.id === 'martinez' ?
                      "Asset groups completamente isolados por categoria de produto" :
                      "Configurações otimizadas baseadas na metodologia do especialista"
                    }
                  </span>
                </div>
                <div className="flex">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {selectedExpert.id === 'vallaeys' ? 
                      "Foco em keywords com volume suficiente (min. 100 impressões/mês)" :
                     selectedExpert.id === 'geddes' ?
                      "Mensagens específicas para cada combinação intenção/engajamento" :
                     selectedExpert.id === 'breeze' ? 
                      "Foco em engajamento emocional através de storytelling visual" :
                     selectedExpert.id === 'martinez' ?
                      "Tematização completa e consistente para cada grupo de assets" :
                      "Estrutura de campanha alinhada às melhores práticas do especialista"
                    }
                  </span>
                </div>
                <div className="flex">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {selectedExpert.id === 'vallaeys' ? 
                      "Sistema de monitoramento diário de métricas-chave de performance" :
                     selectedExpert.id === 'geddes' ?
                      "Teste contínuo de atributos para identificar o que ressoa melhor" :
                     selectedExpert.id === 'breeze' ? 
                      "Estrutura narrativa completa com arco emocional em cada vídeo" :
                     selectedExpert.id === 'martinez' ?
                      "Orçamentos separados por asset group para máximo controle" :
                      "Ajustes específicos baseados na experiência do especialista"
                    }
                  </span>
                </div>
              </div>
            </div>
            
            {/* Strategy Impact */}
            <div>
              <h4 className="text-sm font-medium text-gray-700">Impacto Esperado</h4>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500">CTR</div>
                  <div className="text-lg font-medium text-green-600">+{
                    selectedExpert.id === 'vallaeys' ? "35" :
                    selectedExpert.id === 'geddes' ? "42" :
                    selectedExpert.id === 'breeze' ? "65" :
                    selectedExpert.id === 'martinez' ? "28" :
                    "30"
                  }%</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500">Conversões</div>
                  <div className="text-lg font-medium text-green-600">+{
                    selectedExpert.id === 'vallaeys' ? "28" :
                    selectedExpert.id === 'geddes' ? "35" :
                    selectedExpert.id === 'breeze' ? "45" :
                    selectedExpert.id === 'martinez' ? "50" :
                    "30"
                  }%</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500">CPA</div>
                  <div className="text-lg font-medium text-red-600">-{
                    selectedExpert.id === 'vallaeys' ? "20" :
                    selectedExpert.id === 'geddes' ? "25" :
                    selectedExpert.id === 'breeze' ? "18" :
                    selectedExpert.id === 'martinez' ? "30" :
                    "20"
                  }%</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 italic">
                *Resultados baseados em médias históricas. Os resultados reais podem variar.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Strategy Parameters */}
      {selectedExpert && (
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-2">Parâmetros da Estratégia</h3>
          <div className="space-y-4 border border-gray-200 rounded-lg p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agressividade da Estratégia
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={formData.meta.aggressivenessLevel || 5}
                  onChange={(e) => handleInputChange('meta', 'aggressivenessLevel', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium w-6">
                  {formData.meta.aggressivenessLevel || 5}/10
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Conservador</span>
                <span className="text-xs text-gray-500">Agressivo</span>
              </div>
            </div>
            
            {/* Strategy Specific Parameters */}
            {selectedExpert && selectedExpert.id === 'vallaeys' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ciclo de Otimização
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.meta.optimizationCycle || 'weekly'}
                  onChange={(e) => handleInputChange('meta', 'optimizationCycle', e.target.value)}
                >
                  <option value="daily">Diário (alta intervenção)</option>
                  <option value="weekly">Semanal (recomendado)</option>
                  <option value="biweekly">Quinzenal</option>
                  <option value="monthly">Mensal (baixa intervenção)</option>
                </select>
              </div>
            )}
            
            {selectedExpert && selectedExpert.id === 'geddes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade de Segmentação
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.meta.segmentationPriority || 'intent'}
                  onChange={(e) => handleInputChange('meta', 'segmentationPriority', e.target.value)}
                >
                  <option value="intent">Intenção (priorizar tipos de intenção)</option>
                  <option value="engagement">Engajamento (priorizar nível de engajamento)</option>
                  <option value="balanced">Balanceado (ambos igualmente)</option>
                </select>
              </div>
            )}
            
            {selectedExpert && selectedExpert.id === 'breeze' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foco Emocional
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.meta.emotionalFocus || 'balanced'}
                  onChange={(e) => handleInputChange('meta', 'emotionalFocus', e.target.value)}
                >
                  <option value="problem">Problema (foco nas dores e frustrações)</option>
                  <option value="solution">Solução (foco nos benefícios e resultados)</option>
                  <option value="balanced">Balanceado (arco emocional completo)</option>
                </select>
              </div>
            )}
            
            {selectedExpert && selectedExpert.id === 'martinez' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nível de Isolamento
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.meta.isolationLevel || 'complete'}
                  onChange={(e) => handleInputChange('meta', 'isolationLevel', e.target.value)}
                >
                  <option value="complete">Completo (sem sobreposição entre grupos)</option>
                  <option value="partial">Parcial (pequenas sobreposições permitidas)</option>
                  <option value="minimal">Mínimo (apenas categorias principais isoladas)</option>
                </select>
              </div>
            )}
            
            {/* Meta Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags de Categorização
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.meta.categoryTags.map((tag, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        const updatedTags = [...formData.meta.categoryTags];
                        updatedTags.splice(index, 1);
                        handleInputChange('meta', 'categoryTags', updatedTags);
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  className="border border-gray-300 rounded-full px-3 py-1 text-sm flex-grow min-w-[150px]"
                  placeholder="Adicionar tag..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        handleArrayItemAdd('meta', 'categoryTags', input.value.trim());
                        input.value = '';
                      }
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do Template
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                value={formData.meta.description}
                onChange={(e) => handleInputChange('meta', 'description', e.target.value)}
                placeholder="Descreva a finalidade e contexto deste template..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Step 8: Revisão
const renderReviewStep = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">Revisão do Template</h2>
    <p className="text-sm text-gray-600">Revise todas as configurações do template antes de salvar.</p>
    
    <div className="grid grid-cols-1 gap-6">
      {/* Basic Info Review */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-700">Informações Básicas</h3>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            onClick={() => setCurrentStep(1)}
          >
            <Edit size={14} className="mr-1" />
            Editar
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Nome da Campanha</div>
              <div className="text-sm font-medium">{formData.basicInfo.name || "Não definido"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Tipo de Campanha</div>
              <div className="text-sm font-medium">
                {campaignTypes.find(type => type.id === formData.basicInfo.type)?.name || formData.basicInfo.type}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Objetivo</div>
              <div className="text-sm font-medium">
                {objectives.find(obj => obj.id === formData.basicInfo.objective)?.name || formData.basicInfo.objective}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Status Inicial</div>
              <div className="text-sm font-medium">
                {formData.basicInfo.status === 'ENABLED' ? 'Ativa' : 'Pausada'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Data de Início</div>
              <div className="text-sm font-medium">{formData.dates.startDate || "Não definida"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Data de Término</div>
              <div className="text-sm font-medium">
                {formData.dates.useEndDate && formData.dates.endDate ? formData.dates.endDate : "Sem data de término"}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Budget Review */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-700">Orçamento e Lances</h3>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            onClick={() => setCurrentStep(2)}
          >
            <Edit size={14} className="mr-1" />
            Editar
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Tipo de Orçamento</div>
              <div className="text-sm font-medium">
                {formData.budget.budgetType === 'DAILY' ? 'Diário' : 'Total da Campanha'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Valor do Orçamento</div>
              <div className="text-sm font-medium">
                {formData.budget.amount ? `$${formData.budget.amount}` : "Não definido"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Método de Entrega</div>
              <div className="text-sm font-medium">
                {formData.budget.deliveryMethod === 'STANDARD' ? 'Padrão' : 'Acelerado'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Estratégia de Lances</div>
              <div className="text-sm font-medium">
                {biddingStrategies.find(strategy => strategy.id === formData.budget.biddingStrategy)?.name || formData.budget.biddingStrategy}
              </div>
            </div>
            
            {/* Conditional fields based on bidding strategy */}
            {formData.budget.biddingStrategy === 'MANUAL_CPC' && (
              <>
                <div>
                  <div className="text-xs text-gray-500">CPC Máximo</div>
                  <div className="text-sm font-medium">
                    {formData.budget.maxCpc ? `$${formData.budget.maxCpc}` : "Não definido"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">CPC Aprimorado</div>
                  <div className="text-sm font-medium">
                    {formData.budget.enhancedCpc ? "Ativado" : "Desativado"}
                  </div>
                </div>
              </>
            )}
            
            {formData.budget.biddingStrategy === 'TARGET_CPA' && (
              <div>
                <div className="text-xs text-gray-500">CPA Alvo</div>
                <div className="text-sm font-medium">
                  {formData.budget.targetCpa ? `$${formData.budget.targetCpa}` : "Não definido"}
                </div>
              </div>
            )}
            
            {formData.budget.biddingStrategy === 'TARGET_ROAS' && (
              <div>
                <div className="text-xs text-gray-500">ROAS Alvo</div>
                <div className="text-sm font-medium">
                  {formData.budget.targetRoas ? `${formData.budget.targetRoas}%` : "Não definido"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Targeting Review */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-700">Segmentação</h3>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            onClick={() => setCurrentStep(3)}
          >
            <Edit size={14} className="mr-1" />
            Editar
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">Localizações</div>
              {formData.targeting.locations.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhuma localização definida</div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.targeting.locations.map((location, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-0.5 text-xs text-gray-700">
                      {location.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Idiomas</div>
              {formData.targeting.languages.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhum idioma definido</div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.targeting.languages.map((language, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-0.5 text-xs text-gray-700">
                      {language === 'pt' ? 'Português' : 
                       language === 'en' ? 'Inglês' : 
                       language === 'es' ? 'Espanhol' : 
                       language === 'fr' ? 'Francês' : 
                       language === 'de' ? 'Alemão' : 
                       language === 'it' ? 'Italiano' : 
                       language === 'ja' ? 'Japonês' : 
                       language === 'zh' ? 'Chinês' : 
                       language === 'ru' ? 'Russo' : 
                       language === 'ar' ? 'Árabe' : 
                       language === 'hi' ? 'Hindi' : language}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Dispositivos</div>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {Object.entries(formData.targeting.deviceTargeting).map(([device, config]) => (
                  <div key={device} className={`text-xs ${config.enabled ? 'text-gray-700' : 'text-gray-400'}`}>
                    {device === 'desktop' ? 'Computadores' : 
                     device === 'mobile' ? 'Dispositivos móveis' : 
                     'Tablets'}
                    {config.enabled && config.bidAdjustment !== 0 && (
                      <span className={config.bidAdjustment > 0 ? 'text-green-600' : 'text-red-600'}>
                        {' '}({config.bidAdjustment > 0 ? '+' : ''}{config.bidAdjustment}%)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Extensions Review */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-700">Extensões de Anúncio</h3>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            onClick={() => setCurrentStep(4)}
          >
            <Edit size={14} className="mr-1" />
            Editar
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">Sitelinks</div>
              {formData.extensions.sitelinks.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhum sitelink configurado</div>
              ) : (
                <div className="mt-1 space-y-1">
                  {formData.extensions.sitelinks.slice(0, 3).map((sitelink, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-blue-600 underline">{sitelink.linkText}</span>
                      {sitelink.description1 && sitelink.description2 && (
                        <span className="text-xs text-gray-500 ml-2">
                          {sitelink.description1} • {sitelink.description2}
                        </span>
                      )}
                    </div>
                  ))}
                  {formData.extensions.sitelinks.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{formData.extensions.sitelinks.length - 3} sitelinks adicionais
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Callouts</div>
              {formData.extensions.callouts.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhum callout configurado</div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.extensions.callouts.map((callout, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-0.5 text-xs text-gray-700">
                      {callout.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {formData.extensions.calls.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Extensão de Chamada</div>
                <div className="text-sm mt-1">
                  {formData.extensions.calls[0].phoneNumber}
                </div>
              </div>
            )}
            
            {formData.extensions.structured_snippets.length
            <div>
            <div className="text-xs text-gray-500 font-medium">Snippets Estruturados</div>
            {formData.extensions.structured_snippets.length === 0 ? (
              <div className="text-sm text-gray-400 italic">Nenhum snippet estruturado configurado</div>
            ) : (
              <div className="mt-1 space-y-1">
                {formData.extensions.structured_snippets.map((snippet, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{snippet.header}:</span>{' '}
                    <span className="text-gray-700">{snippet.values.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
    {/* Ad Configuration Review */}
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
        <h3 className="text-md font-medium text-gray-700">Configuração de Anúncios</h3>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          onClick={() => setCurrentStep(5)}
        >
          <Edit size={14} className="mr-1" />
          Editar
        </button>
      </div>
      <div className="p-4">
        {formData.basicInfo.type === 'SEARCH' && (
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">URL Final</div>
              <div className="text-sm mt-1">{formData.adConfiguration.responsive_search_ads.finalUrl || "Não definida"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">URL de Exibição</div>
              <div className="text-sm mt-1">
                {formData.adConfiguration.responsive_search_ads.finalUrl ? (
                  <>
                    www.{new URL(formData.adConfiguration.responsive_search_ads.finalUrl).hostname.replace('www.', '')}
                    {formData.adConfiguration.responsive_search_ads.path1 ? `/${formData.adConfiguration.responsive_search_ads.path1}` : ''}
                    {formData.adConfiguration.responsive_search_ads.path2 ? `/${formData.adConfiguration.responsive_search_ads.path2}` : ''}
                  </>
                ) : (
                  "Não definida"
                )}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Títulos ({formData.adConfiguration.responsive_search_ads.headlines.length})</div>
              {formData.adConfiguration.responsive_search_ads.headlines.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhum título configurado</div>
              ) : (
                <div className="mt-1 space-y-1">
                  {formData.adConfiguration.responsive_search_ads.headlines.slice(0, 5).map((headline, index) => (
                    <div key={index} className="text-sm">
                      {headline.text} {headline.pinned && <span className="text-xs text-blue-600">(Fixo)</span>}
                    </div>
                  ))}
                  {formData.adConfiguration.responsive_search_ads.headlines.length > 5 && (
                    <div className="text-xs text-gray-500">
                      +{formData.adConfiguration.responsive_search_ads.headlines.length - 5} títulos adicionais
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Descrições ({formData.adConfiguration.responsive_search_ads.descriptions.length})</div>
              {formData.adConfiguration.responsive_search_ads.descriptions.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhuma descrição configurada</div>
              ) : (
                <div className="mt-1 space-y-1">
                  {formData.adConfiguration.responsive_search_ads.descriptions.slice(0, 2).map((description, index) => (
                    <div key={index} className="text-sm">
                      {description.text} {description.pinned && <span className="text-xs text-blue-600">(Fixa)</span>}
                    </div>
                  ))}
                  {formData.adConfiguration.responsive_search_ads.descriptions.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{formData.adConfiguration.responsive_search_ads.descriptions.length - 2} descrições adicionais
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Força do Anúncio</div>
              <div className="flex items-center mt-1">
                <div className={`h-2 w-16 rounded-full ${
                  adStrength.rating === 'EXCELLENT' ? 'bg-blue-600' : 
                  adStrength.rating === 'GOOD' ? 'bg-green-600' : 
                  adStrength.rating === 'AVERAGE' ? 'bg-yellow-500' : 
                  'bg-red-600'
                }`}></div>
                <span className={`ml-2 text-sm font-medium ${
                  adStrength.rating === 'EXCELLENT' ? 'text-blue-600' : 
                  adStrength.rating === 'GOOD' ? 'text-green-600' : 
                  adStrength.rating === 'AVERAGE' ? 'text-yellow-500' : 
                  'text-red-600'
                }`}>
                  {adStrength.rating === 'EXCELLENT' ? 'Excelente' : 
                   adStrength.rating === 'GOOD' ? 'Bom' : 
                   adStrength.rating === 'AVERAGE' ? 'Médio' : 
                   'Fraco'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {formData.basicInfo.type === 'DISPLAY' && (
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">URL Final</div>
              <div className="text-sm mt-1">{formData.adConfiguration.responsive_display_ads.finalUrl || "Não definida"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Nome da Empresa</div>
              <div className="text-sm mt-1">{formData.adConfiguration.responsive_display_ads.businessName || "Não definido"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Títulos e Descrições</div>
              <div className="mt-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Título Longo:</span> {formData.adConfiguration.responsive_display_ads.longHeadline || "Não definido"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Títulos Curtos:</span> {formData.adConfiguration.responsive_display_ads.headlines.length} configurados
                </div>
                <div className="text-sm">
                  <span className="font-medium">Descrições:</span> {formData.adConfiguration.responsive_display_ads.descriptions.length} configuradas
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Imagens</div>
              <div className="mt-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Imagens de Marketing:</span> {formData.adConfiguration.responsive_display_ads.marketingImages?.length || 0}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Logos:</span> {formData.adConfiguration.responsive_display_ads.logoImages?.length || 0}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {formData.basicInfo.type === 'VIDEO' && (
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">URL Final</div>
              <div className="text-sm mt-1">{formData.adConfiguration.video_ads.finalUrl || "Não definida"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">ID do Vídeo do YouTube</div>
              <div className="text-sm mt-1">{formData.adConfiguration.video_ads.videoId || "Não definido"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Formato do Anúncio</div>
              <div className="text-sm mt-1">
                {formData.adConfiguration.video_ads.format === 'inStream' ? 'In-stream' : 
                 formData.adConfiguration.video_ads.format === 'discovery' ? 'Discovery' : 
                 "Não definido"}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Títulos e Descrições</div>
              <div className="mt-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Títulos:</span> {formData.adConfiguration.video_ads.headlines.length} configurados
                </div>
                <div className="text-sm">
                  <span className="font-medium">Descrições:</span> {formData.adConfiguration.video_ads.descriptions.length} configuradas
                </div>
              </div>
            </div>
          </div>
        )}
        
        {formData.basicInfo.type === 'PERFORMANCE_MAX' && (
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">URL Final</div>
              <div className="text-sm mt-1">{formData.adConfiguration.performance_max_assets.finalUrl || "Não definida"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Nome do Grupo de Assets</div>
              <div className="text-sm mt-1">{formData.adConfiguration.performance_max_assets.name || "Não definido"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Assets de Texto</div>
              <div className="mt-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Títulos:</span> {formData.adConfiguration.performance_max_assets.headlines.length} configurados
                </div>
                <div className="text-sm">
                  <span className="font-medium">Título Longo:</span> {formData.adConfiguration.performance_max_assets.longHeadline || "Não definido"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Descrições:</span> {formData.adConfiguration.performance_max_assets.descriptions.length} configuradas
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Assets Visuais</div>
              <div className="mt-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Imagens:</span> {formData.adConfiguration.performance_max_assets.images?.length || 0}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Logos:</span> {formData.adConfiguration.performance_max_assets.logos?.length || 0}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Vídeos:</span> {formData.adConfiguration.performance_max_assets.videos?.length || 0}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {formData.basicInfo.type === 'SHOPPING' && (
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">ID do Merchant Center</div>
              <div className="text-sm mt-1">{formData.adConfiguration.shopping_ads.merchantId || "Não definido"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">ID do Feed</div>
              <div className="text-sm mt-1">{formData.adConfiguration.shopping_ads.feedId || "Não definido"}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Prioridade da Campanha</div>
              <div className="text-sm mt-1">
                {formData.adConfiguration.shopping_ads.campaignPriority === 'HIGH' ? 'Alta' : 
                 formData.adConfiguration.shopping_ads.campaignPriority === 'MEDIUM' ? 'Média' : 
                 formData.adConfiguration.shopping_ads.campaignPriority === 'LOW' ? 'Baixa' : 
                 "Não definida"}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Grupos de Produtos</div>
              {formData.adConfiguration.shopping_ads.productGroupings?.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhum grupo de produtos configurado</div>
              ) : (
                <div className="mt-1 space-y-1">
                  {formData.adConfiguration.shopping_ads.productGroupings.map((group, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{group.name}:</span>{' '}
                      <span className="text-gray-700">{group.type} = {group.value}</span>
                      {group.bid && <span className="text-green-600 ml-2">${group.bid}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    
    {/* Advanced Settings Review */}
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
        <h3 className="text-md font-medium text-gray-700">Configurações Avançadas</h3>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          onClick={() => setCurrentStep(6)}
        >
          <Edit size={14} className="mr-1" />
          Editar
        </button>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-gray-500 font-medium">Opções de URL</div>
            <div className="mt-1 space-y-1">
              <div className="text-sm">
                <span className="font-medium">Template de Rastreamento:</span>{' '}
                <span className="text-gray-700">{formData.advanced.urlOptions.trackingTemplate || "Não definido"}</span>
              </div>
              
              {formData.advanced.urlOptions.customParameters.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Parâmetros Personalizados:</span>{' '}
                  <span className="text-gray-700">
                    {formData.advanced.urlOptions.customParameters.map(param => `${param.key}=${param.value}`).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 font-medium">Rotação de Anúncios</div>
            <div className="text-sm mt-1">
              {formData.advanced.adRotation === 'OPTIMIZE' ? 'Otimizado' : 'Rotação Indefinida'}
            </div>
          </div>
          
          {/* Negative Keywords */}
          {(formData.basicInfo.type === 'SEARCH' || formData.basicInfo.type === 'SHOPPING') && 
            formData.advanced.exclusions.negativeKeywords.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 font-medium">
                Palavras-chave Negativas ({formData.advanced.exclusions.negativeKeywords.length})
              </div>
              <div className="mt-1">
                <div className="flex flex-wrap gap-1">
                  {formData.advanced.exclusions.negativeKeywords.slice(0, 10).map((keyword, index) => (
                    <div key={index} className={`text-xs px-2 py-0.5 rounded ${
                      keyword.matchType === 'EXACT' ? 'bg-blue-100 text-blue-800' : 
                      keyword.matchType === 'PHRASE' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {keyword.matchType === 'EXACT' ? `[${keyword.text}]` : 
                       keyword.matchType === 'PHRASE' ? `"${keyword.text}"` : 
                       keyword.text}
                    </div>
                  ))}
                  {formData.advanced.exclusions.negativeKeywords.length > 10 && (
                    <div className="text-xs text-gray-500 px-2 py-0.5">
                      +{formData.advanced.exclusions.negativeKeywords.length - 10} mais
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Dynamic Search Settings */}
          {formData.basicInfo.type === 'SEARCH' && formData.advanced.dynamicSearchSettings.enabled && (
            <div>
              <div className="text-xs text-gray-500 font-medium">Anúncios de Pesquisa Dinâmica</div>
              <div className="mt-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Domínio:</span>{' '}
                  <span className="text-gray-700">{formData.advanced.dynamicSearchSettings.domainName}</span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Idiomas:</span>{' '}
                  <span className="text-gray-700">
                    {formData.advanced.dynamicSearchSettings.languageTargeting.length > 0 
                      ? formData.advanced.dynamicSearchSettings.languageTargeting.join(', ')
                      : "Todos"
                    }
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Usar apenas URLs fornecidas:</span>{' '}
                  <span className="text-gray-700">
                    {formData.advanced.dynamicSearchSettings.useSuppliedUrlsOnly ? "Sim" : "Não"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* Expert Strategy Review */}
    {selectedExpert && (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-3 px-4 flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-700">Estratégia de Especialista</h3>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            onClick={() => setCurrentStep(7)}
          >
            <Edit size={14} className="mr-1" />
            Editar
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 font-medium">Especialista</div>
              <div className="text-sm mt-1 flex items-center">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs ${
                  selectedExpert.category === 'search' ? 'bg-blue-600' :
                  selectedExpert.category === 'video' ? 'bg-red-600' :
                  selectedExpert.category === 'display' ? 'bg-green-600' :
                  selectedExpert.category === 'performance_max' ? 'bg-purple-600' :
                  selectedExpert.category === 'shopping' ? 'bg-yellow-600' :
                  selectedExpert.category === 'discovery' ? 'bg-pink-600' :
                  selectedExpert.category === 'local' ? 'bg-indigo-600' :
                  selectedExpert.category === 'app' ? 'bg-orange-600' :
                  'bg-gray-600'
                }`}>
                  {selectedExpert.name.split(' ').map(name => name[0]).join('')}
                </div>
                <span className="ml-2">{selectedExpert.name}</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Estratégia</div>
              <div className="text-sm mt-1">{selectedExpert.expertise}</div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Agressividade</div>
              <div className="mt-1 flex items-center">
                <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600" 
                    style={{width: `${((formData.meta.aggressivenessLevel || 5) / 10) * 100}%`}}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{formData.meta.aggressivenessLevel || 5}/10</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 font-medium">Tags</div>
              {formData.meta.categoryTags.length === 0 ? (
                <div className="text-sm text-gray-400 italic">Nenhuma tag definida</div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.meta.categoryTags.map((tag, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 rounded-full px-3 py-0.5 text-xs">
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {formData.meta.description && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Descrição</div>
                <div className="text-sm mt-1">{formData.meta.description}</div>
              </div>
            )}
            
            {/* Strategy Specific Parameters */}
            {selectedExpert && selectedExpert.id === 'vallaeys' && formData.meta.optimizationCycle && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Ciclo de Otimização</div>
                <div className="text-sm mt-1">
                  {formData.meta.optimizationCycle === 'daily' ? 'Diário' : 
                   formData.meta.optimizationCycle === 'weekly' ? 'Semanal' : 
                   formData.meta.optimizationCycle === 'biweekly' ? 'Quinzenal' : 
                   'Mensal'}
                </div>
              </div>
            )}
            
            {selectedExpert && selectedExpert.id === 'geddes' && formData.meta.segmentationPriority && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Prioridade de Segmentação</div>
                <div className="text-sm mt-1">
                  {formData.meta.segmentationPriority === 'intent' ? 'Intenção' : 
                   formData.meta.segmentationPriority === 'engagement' ? 'Engajamento' : 
                   'Balanceado'}
                </div>
              </div>
            )}
            
            {selectedExpert && selectedExpert.id === 'breeze' && formData.meta.emotionalFocus && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Foco Emocional</div>
                <div className="text-sm mt-1">
                  {formData.meta.emotionalFocus === 'problem' ? 'Problema' : 
                   formData.meta.emotionalFocus === 'solution' ? 'Solução' : 
                   'Balanceado'}
                </div>
              </div>
            )}
            
            {selectedExpert && selectedExpert.id === 'martinez' && formData.meta.isolationLevel && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Nível de Isolamento</div>
                <div className="text-sm mt-1">
                  {formData.meta.isolationLevel === 'complete' ? 'Completo' : 
                   formData.meta.isolationLevel === 'partial' ? 'Parcial' : 
                   'Mínimo'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    
    {/* Save Template Button */}
    <div className="flex justify-center">
      <button
        type="button"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        onClick={handleSaveTemplate}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Salvando...
          </>
        ) : (
          <>
            <Save size={20} className="mr-2" />
            Salvar Template
          </>
        )}
      </button>
    </div>
  </div>
</div>
);

return (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Configuração de Template de Campanha</h1>
        <p className="text-gray-600 mt-1">Crie e configure templates de campanha baseados em estratégias de especialistas.</p>
      </div>
      
      {/* Step Progress */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-4 flex-1">
            {[
              "Informações Básicas",
              "Orçamento e Lances",
              "Segmentação",
              "Extensões",
              "Anúncios",
              "Config. Avançadas",
              "Estratégia",
              "Revisão"
            ].map((step, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className={`h-0.5 flex-1 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                )}
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                    index + 1 === currentStep 
                      ? 'bg-blue-600 text-white'
                      : index + 1 < currentStep
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                  } cursor-pointer`}
                  onClick={() => setCurrentStep(index + 1)}
                >
                  {index + 1}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="block sm:hidden text-sm font-medium text-gray-700">
            Etapa {currentStep} de 8: {
              currentStep === 1 ? "Informações Básicas" :
              currentStep === 2 ? "Orçamento e Lances" :
              currentStep === 3 ? "Segmentação" :
              currentStep === 4 ? "Extensões" :
              currentStep === 5 ? "Anúncios" :
              currentStep === 6 ? "Config. Avançadas" :
              currentStep === 7 ? "Estratégia" :
              "Revisão"
            }
          </div>
        </div>
      </div>
      
      {/* Step Content */}
      <div className="px-6 py-6">
        {renderStepContent()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
          onClick={() => handleStepChange('prev')}
          disabled={currentStep === 1}
        >
          <ArrowLeft size={16} className="mr-2" />
          Anterior
        </button>
        <button
          type="button"
          className={`px-4 py-2 ${
            currentStep < 8 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          } rounded-md flex items-center`}
          onClick={() => {
            if (currentStep < 8) {
              handleStepChange('next');
            } else {
              handleSaveTemplate();
            }
          }}
        >
          {currentStep < 8 ? (
            <>
              Próximo
              <ArrowRight size={16} className="ml-2" />
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Salvar Template
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);
}

export default TemplateConfigForm;