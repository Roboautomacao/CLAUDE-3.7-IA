import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, BarChart2, Download, ExternalLink, Filter, Star, Info, Clock, ArrowRight, Plus } from 'lucide-react';

export default function EstrategiasExpert() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todas Estratégias' },
    { id: 'search', name: 'Pesquisa', count: 32 },
    { id: 'display', name: 'Display', count: 18 },
    { id: 'performance', name: 'Performance Max', count: 27 },
    { id: 'video', name: 'YouTube', count: 12 },
  ];
  
  const expertStrategies = [
    {
      id: 1,
      name: "Tom Breeze - Emotional Resolution",
      category: "video",
      region: "Reino Unido 🇬🇧",
      roi: "11.000%",
      complexity: "Média",
      implementation: "2-3 dias",
      rating: 4.9,
      reviews: 87,
      description: "Estratégia focada em produtos British Heritage com gatilhos emocionais de nostalgia e tradição.",
      campaignType: "Performance Max + YouTube",
      key: "Emotional Resolution Framework"
    },
    {
      id: 2,
      name: "Frederick Vallaeys + Guru Lara",
      category: "search",
      region: "Brasil 🇧🇷",
      roi: "287%",
      complexity: "Baixa",
      implementation: "1 dia",
      rating: 4.7,
      reviews: 124,
      description: "Combinação de estratégias para e-commerce retail com foco em gadgets tecnológicos e alto ROI.",
      campaignType: "Search",
      key: "Smart Bidding Optimization"
    },
    {
      id: 3,
      name: "Joe Martinez - Asset Group Isolation",
      category: "performance",
      region: "Índia 🇮🇳",
      roi: "213%",
      complexity: "Alta",
      implementation: "3-5 dias",
      rating: 4.6,
      reviews: 52,
      description: "Estratégia avançada de isolamento de grupos de ativos para acessórios móveis com alta margem.",
      campaignType: "Performance Max",
      key: "Asset Group Isolation"
    },
    {
      id: 4,
      name: "Savannah Sanchez - Sistema 3U",
      category: "video",
      region: "Espanha 🇪🇸",
      roi: "1.500%",
      complexity: "Média",
      implementation: "2 dias",
      rating: 4.8,
      reviews: 63,
      description: "Sistema 3U (Urgência, Único, Útil) para anúncios turísticos com alto engajamento e conversão.",
      campaignType: "YouTube Shorts",
      key: "Sistema 3U Framework"
    },
    {
      id: 5,
      name: "Isaac Rudansky - Ultra Segmentação",
      category: "search",
      region: "Estados Unidos 🇺🇸",
      roi: "430%",
      complexity: "Alta",
      implementation: "4-7 dias",
      rating: 4.9,
      reviews: 118,
      description: "Método de ultra segmentação para campanhas de alto valor com esquema de keywords avançado.",
      campaignType: "Search + Display",
      key: "Ultra Segmentation Method"
    }
  ];
  
  const filteredStrategies = selectedCategory === 'all' 
    ? expertStrategies 
    : expertStrategies.filter(strategy => strategy.category === selectedCategory);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-2">
        <div className="flex items-center">
          <button className="mr-4 text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <rect x="3" y="5" width="18" height="2" rx="1"></rect>
              <rect x="3" y="11" width="18" height="2" rx="1"></rect>
              <rect x="3" y="17" width="18" height="2" rx="1"></rect>
            </svg>
          </button>
          <div className="flex items-center">
            <span className="font-bold text-blue-600 text-lg">RobotHGAds</span>
            <div className="ml-4 px-3 py-1 rounded border border-gray-300 flex items-center">
              <span className="text-sm font-medium text-gray-700">Google Ads Principal</span>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="relative mx-4">
            <input
              type="text"
              placeholder="Buscar contas e campanhas"
              className="w-64 rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
            <Settings size={20} />
          </button>
          <div className="ml-4 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <span className="font-medium">A</span>
          </div>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <nav className="flex px-6">
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Visão Geral</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Campanhas</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Grupos de Anúncios</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Anúncios e Recursos</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Palavras-chave</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Públicos</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Automações</a>
          <a href="#" className="px-3 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-300">Ferramentas</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Principal</h2>
            <nav className="mt-2 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <BarChart2 size={18} className="mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"></path>
                </svg>
                Campanhas
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">15</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Grupos de Anúncios
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">102</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Anúncios
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">1689</span>
              </a>
            </nav>
            
            <h2 className="mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gerenciamento</h2>
            <nav className="mt-2 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Contas
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-indigo-500 group-hover:text-indigo-600">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                DropHunter
                <span className="ml-auto bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded text-xs">Novo</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                Estratégias Expert
                <span className="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded text-xs">New</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Template Avançado
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">New</span>
              </a>
            </nav>
            
            <h2 className="mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Outros</h2>
            <nav className="mt-2 space-y-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                </svg>
                Configurações
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Mecanismos de Bypass
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">Novo</span>
              </a>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Estratégias Expert</h1>
              <div className="flex items-center space-x-3">
                <button className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                  <Download size={16} className="mr-2" />
                  Baixar Como PDF
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                  <Plus size={16} className="mr-2" />
                  Nova Estratégia Personalizada
                </button>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                        ${selectedCategory === category.id 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {category.name}
                      {category.count && <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">{category.count}</span>}
                    </button>
                  ))}
                </div>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 mr-2">Filtros avançados:</span>
                  <div className="space-x-2">
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <Filter size={14} className="mr-1.5" />
                      ROI
                      <ChevronDown size={14} className="ml-1.5" />
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <Filter size={14} className="mr-1.5" />
                      Região
                      <ChevronDown size={14} className="ml-1.5" />
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <Filter size={14} className="mr-1.5" />
                      Complexidade
                      <ChevronDown size={14} className="ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Strategy Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {filteredStrategies.map(strategy => (
                <div key={strategy.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{strategy.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                            ${strategy.category === 'search' ? 'bg-blue-100 text-blue-800' : 
                              strategy.category === 'display' ? 'bg-green-100 text-green-800' :
                              strategy.category === 'performance' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800'}`}
                          >
                            {strategy.category === 'search' ? 'Pesquisa' : 
                             strategy.category === 'display' ? 'Display' : 
                             strategy.category === 'performance' ? 'Performance Max' : 
                             'YouTube'}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{strategy.region}</span>
                        </div>
                      </div>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Star size={20} className="text-yellow-500" fill="currentColor" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-700 font-semibold">ROI</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">ROI Estimado</div>
                          <div className="font-semibold text-green-600">{strategy.roi}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 font-semibold">CT</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">Tipo de Campanha</div>
                          <div className="font-semibold">{strategy.campaignType}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div>
                        <div className="text-xs text-gray-500">Complexidade</div>
                        <div className="font-medium">
                          <span 
                            className={`inline-block mt-1 w-2 h-2 rounded-full mr-1 ${
                              strategy.complexity === 'Baixa' ? 'bg-green-500' : 
                              strategy.complexity === 'Média' ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                          />
                          {strategy.complexity}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Implementação</div>
                        <div className="font-medium">{strategy.implementation}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Avaliação</div>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{strategy.rating}</span>
                          <Star size={12} className="text-yellow-500" fill="currentColor" />
                          <span className="text-xs text-gray-500 ml-1">({strategy.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-600">{strategy.key}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                        Aplicar Estratégia
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Featured Partners */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Especialistas Parceiros</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center">
                  Ver todos os especialistas
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-blue-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-700 font-bold text-lg">TB</span>
                  </div>
                  <h3 className="font-medium text-gray-800">Tom Breeze</h3>
                  <p className="text-xs text-gray-500 mt-1">YouTube Expert</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="font-medium text-sm mr-1">4.9</span>
                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-green-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-green-700 font-bold text-lg">FV</span>
                  </div>
                  <h3 className="font-medium text-gray-800">Frederick Vallaeys</h3>
                  <p className="text-xs text-gray-500 mt-1">Search Expert</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="font-medium text-sm mr-1">4.8</span>
                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-purple-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-purple-700 font-bold text-lg">JM</span>
                  </div>
                  <h3 className="font-medium text-gray-800">Joe Martinez</h3>
                  <p className="text-xs text-gray-500 mt-1">PMax Expert</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="font-medium text-sm mr-1">4.7</span>
                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-red-100 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-red-700 font-bold text-lg">SS</span>
                  </div>
                  <h3 className="font-medium text-gray-800">Savannah Sanchez</h3>
                  <p className="text-xs text-gray-500 mt-1">Video Expert</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="font-medium text-sm mr-1">4.8</span>
                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50">
                  Solicitar Estratégia Personalizada
                </button>
              </div>
            </div>
            
            {/* Recent Updates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Atualizações Recentes</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  Última atualização: 03/05/2025
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="p-2 rounded-full bg-blue-100 mr-3 flex-shrink-0">
                    <Info size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Novas estratégias PMAX adicionadas</h3>
                    <p className="text-sm text-gray-600 mt-1">Adicionamos 4 novas estratégias de Performance Max otimizadas para o algoritmo de maio de 2025.</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="p-2 rounded-full bg-green-100 mr-3 flex-shrink-0">
                    <Star size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Estratégia Tom Breeze atualizada</h3>
                    <p className="text-sm text-gray-600 mt-1">A estratégia "Emotional Resolution" foi atualizada com novas configurações para atender às mudanças do YouTube Ads.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
