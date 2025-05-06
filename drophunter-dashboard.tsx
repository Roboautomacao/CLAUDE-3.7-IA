import React, { useState } from 'react';
import { Search, Filter, ChevronDown, RefreshCw, SlidersHorizontal, Globe, ShoppingBag, BarChart2, Star, StarOff, Clock, ExternalLink, Plus, Flag } from 'lucide-react';

export default function DropHunterDashboard() {
  const [selectedTab, setSelectedTab] = useState("oportunidades");
  const [selectedCountry, setSelectedCountry] = useState("all");
  
  const countries = [
    { id: "uk", name: "Reino Unido", flag: "🇬🇧", products: 46 },
    { id: "br", name: "Brasil", flag: "🇧🇷", products: 38 },
    { id: "in", name: "Índia", flag: "🇮🇳", products: 27 },
    { id: "es", name: "Espanha", flag: "🇪🇸", products: 19 }
  ];
  
  const opportunities = [
    {
      id: 1,
      name: "Kit Relógio Smart Premium",
      country: "uk",
      flag: "🇬🇧",
      score: 92,
      price: "£75",
      cost: "£30",
      roi: "150%",
      dateFound: "01/05/2025",
      category: "Gadgets",
      imageUrl: "/api/placeholder/400/300",
      isFavorite: true
    },
    {
      id: 2,
      name: "Bolsa Térmica Portátil",
      country: "br",
      flag: "🇧🇷",
      score: 88,
      price: "R$159,90",
      cost: "R$65,00",
      roi: "146%",
      dateFound: "02/05/2025",
      category: "Casa",
      imageUrl: "/api/placeholder/400/300",
      isFavorite: false
    },
    {
      id: 3,
      name: "Fone Bluetooth P47",
      country: "in",
      flag: "🇮🇳",
      score: 85,
      price: "₹1,899",
      cost: "₹780",
      roi: "143%",
      dateFound: "01/05/2025",
      category: "Áudio",
      imageUrl: "/api/placeholder/400/300",
      isFavorite: true
    },
    {
      id: 4,
      name: "Luminária LED Paisagem",
      country: "es",
      flag: "🇪🇸",
      score: 83,
      price: "€39,99",
      cost: "€17,45",
      roi: "129%",
      dateFound: "30/04/2025",
      category: "Decoração",
      imageUrl: "/api/placeholder/400/300",
      isFavorite: false
    },
    {
      id: 5,
      name: "Pulseira Magnética Terapêutica",
      country: "uk",
      flag: "🇬🇧",
      score: 80,
      price: "£29.99",
      cost: "£12.50",
      roi: "139%",
      dateFound: "29/04/2025",
      category: "Saúde",
      imageUrl: "/api/placeholder/400/300",
      isFavorite: true
    }
  ];
  
  const filteredOpportunities = selectedCountry === "all" 
    ? opportunities 
    : opportunities.filter(opp => opp.country === selectedCountry);
    
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <ShoppingBag className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">DropHunter</span>
                <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-900 rounded-md">PRO</span>
              </div>
              <nav className="ml-8 flex space-x-4">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-800">Dashboard</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">Monitoramento</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">Lojas Shopify</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">Estúdio de Criativos</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">Relatórios</a>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-indigo-300 hover:bg-indigo-800 focus:outline-none">
                <span className="sr-only">Visualizar notificações</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Abrir menu de usuário</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                      <span className="text-white font-medium">A</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">DropHunter Dashboard</h1>
          <div className="flex space-x-3">
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <RefreshCw size={16} className="mr-2" />
              Atualizar Dados
            </button>
            <button className="px-3 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 flex items-center">
              <Plus size={16} className="mr-2" />
              Nova Configuração
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-blue-100 text-blue-600">
                <Globe size={20} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Países Monitorados</h2>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">4</p>
                  <p className="ml-2 text-sm font-medium text-green-600">Ativos</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-purple-100 text-purple-600">
                <ShoppingBag size={20} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Oportunidades</h2>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">130</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+12 hoje</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-green-100 text-green-600">
                <BarChart2 size={20} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">ROI Médio</h2>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">139%</p>
                  <p className="ml-2 text-sm font-medium text-green-600">+2.3%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-md bg-yellow-100 text-yellow-600">
                <Star size={20} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Favoritos</h2>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">24</p>
                  <p className="ml-2 text-sm font-medium text-gray-500">Produtos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Countries Panel */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Países Monitorados</h3>
            <p className="mt-1 text-sm text-gray-500">Configurações e status de monitoramento por país</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-4 gap-5">
              {countries.map(country => (
                <div 
                  key={country.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition ${selectedCountry === country.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                  onClick={() => setSelectedCountry(country.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{country.flag}</span>
                      <span className="font-medium text-gray-900">{country.name}</span>
                    </div>
                    <div className={`h-2.5 w-2.5 rounded-full ${selectedCountry === country.id ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">Produtos encontrados</div>
                    <div className="text-lg font-semibold text-gray-900">{country.products}</div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-500">Última verificação</div>
                    <div className="text-xs font-medium text-gray-700">Hoje, 09:45</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center ml-auto">
                <SlidersHorizontal size={16} className="mr-2" />
                Gerenciar Configurações
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === "oportunidades"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTab("oportunidades")}
              >
                Oportunidades
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === "favoritos"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTab("favoritos")}
              >
                Favoritos
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === "replicados"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTab("replicados")}
              >
                Replicados
              </button>
            </nav>
          </div>
          
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Buscar produtos..."
                />
              </div>
              <div className="ml-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Filter size={16} className="mr-2" />
                  Filtros
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
              {selectedCountry !== "all" && (
                <div className="ml-2 px-3 py-2 bg-indigo-100 text-indigo-800 rounded-md text-sm font-medium flex items-center">
                  {countries.find(c => c.id === selectedCountry)?.flag} {countries.find(c => c.id === selectedCountry)?.name}
                  <button 
                    className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                    onClick={() => setSelectedCountry("all")}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Ordenar por:</span>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Score (maior para menor)</option>
                <option>ROI (maior para menor)</option>
                <option>Data (mais recente)</option>
                <option>Preço (menor para maior)</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-6 p-6">
            {filteredOpportunities.map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 flex space-x-1">
                    <span className="px-2 py-1 bg-white bg-opacity-90 rounded text-xs font-medium">{product.flag}</span>
                    <span className="px-2 py-1 bg-white bg-opacity-90 rounded text-xs font-medium text-gray-600">{product.category}</span>
                  </div>
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                    {product.isFavorite ? (
                      <Star size={18} className="text-yellow-500" fill="currentColor" />
                    ) : (
                      <StarOff size={18} className="text-gray-400" />
                    )}
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent py-2 px-3">
                    <div className="text-white font-medium truncate">{product.name}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        product.score >= 90 ? 'bg-green-100 text-green-800' :
                        product.score >= 80 ? 'bg-blue-100 text-blue-800' :
                        product.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        Score: {product.score}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {product.dateFound}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Preço</div>
                      <div className="text-sm font-semibold">{product.price}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Custo</div>
                      <div className="text-sm font-semibold">{product.cost}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">ROI</div>
                      <div className="text-sm font-semibold text-green-600">{product.roi}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                      Ver Detalhes
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
                      Replicar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">130</span> resultados
            </div>
            <nav className="flex space-x-1">
              <a href="#" className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Anterior</a>
              <a href="#" className="px-3 py-2 border border-indigo-500 rounded-md text-sm font-medium text-white bg-indigo-600">1</a>
              <a href="#" className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">2</a>
              <a href="#" className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">3</a>
              <span className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white">...</span>
              <a href="#" className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">13</a>
              <a href="#" className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Próxima</a>
            </nav>
          </div>
        </div>
        
        {/* Add New Monitoring */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Adicionar Novo Monitoramento</h3>
              <p className="mt-1 text-sm text-gray-500">Configure monitoramento para um novo país ou produto específico</p>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-900 font-medium flex items-center">
              Ver documentação
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selecione um País
                  </label>
                  <div className="flex space-x-2">
                    {['🇧🇷', '🇬🇧', '🇮🇳', '🇪🇸', '🇺🇸', '🇩🇪', '🇦🇺', '🇨🇦'].map((flag, index) => (
                      <button key={index} className="p-3 border border-gray-300 rounded-md text-xl hover:bg-gray-50">
                        {flag}
                      </button>
                    ))}
                    <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-500">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Monitoramento
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border border-indigo-500 bg-indigo-50 rounded-md text-sm font-medium text-indigo-700 flex items-center justify-center">
                      <Globe size={18} className="mr-2" />
                      Produtos Populares
                    </button>
                    <button className="p-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 flex items-center justify-center hover:bg-gray-50">
                      <Flag size={18} className="mr-2" />
                      Produtos Específicos
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Configurações de Monitoramento
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Frequência de verificação</label>
                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>A cada 12 horas</option>
                      <option>Diariamente</option>
                      <option>A cada 3 dias</option>
                      <option>Semanalmente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Score mínimo</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="70"
                      className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ROI mínimo</label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        defaultValue="100"
                        className="block w-full pl-3 pr-12 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancelar
              </button>
              <button className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700">
                Iniciar Monitoramento
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Feature: Integration Section */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Integrações e Automação</h3>
            <p className="mt-1 text-sm text-gray-500">Conecte suas lojas e configure fluxos de trabalho automáticos</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Shopify</h4>
                    <p className="text-xs text-green-600">Conectado (2 lojas)</p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                    Configurar
                  </button>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Suas lojas:
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">mystyle-gadgets.com</span>
                    <span className="text-xs text-gray-500">Principal</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">tech-trends-store.com</span>
                    <span className="text-xs text-gray-500">Secundária</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="w-full px-3 py-2 border border-indigo-300 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-50">
                    Adicionar Nova Loja
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Facebook Ads</h4>
                    <p className="text-xs text-yellow-600">Parcialmente conectado</p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                    Configurar
                  </button>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Contas de anúncios:
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">TechGadgetAds</span>
                    <span className="text-xs text-green-500">Ativo</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="w-full px-3 py-2 border border-indigo-300 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-50">
                    Conectar Nova Conta
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex flex-col border-dashed">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus size={20} className="text-gray-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Nova Integração</h4>
                    <p className="text-xs text-gray-500">Conecte mais serviços</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Serviços disponíveis:
                </div>
                <div className="space-y-2 mb-3">
                  <div className="text-sm text-gray-500">
                    Google Ads, TikTok, WooCommerce, Alibaba, PayPal, e mais
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
                    Explorar Integrações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}