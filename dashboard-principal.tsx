import React, { useState } from 'react';
import { Bell, Settings, Search, Maximize, ChevronDown, BarChart2, Clock, ExternalLink, RefreshCw, AlertCircle, Check, AlertTriangle } from 'lucide-react';

export default function DashboardPrincipal() {
  const [timeRange, setTimeRange] = useState('30d');
  
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
          <a href="#" className="px-3 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-500">Anúncios e Recursos</a>
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
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-600">
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
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"></path>
                  <path d="M12 3a4 4 0 100 8 4 4 0 000-8z"></path>
                </svg>
                Automações
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">3</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <path d="M12 13V7"></path>
                  <path d="M15.5 10.5L12 7l-3.5 3.5"></path>
                  <path d="M17 17H7"></path>
                  <path d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path>
                </svg>
                Desempenho
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
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                Estratégias Expert
                <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs">New</span>
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
              <h1 className="text-2xl font-bold text-gray-800">Dashboard ROBOTHGADS</h1>
              <div className="flex items-center text-sm text-gray-600">
                <span>admin:</span>
                <a href="mailto:admin@robothgads.com" className="ml-1 text-blue-600 hover:underline">admin@robothgads.com</a>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-gray-500 text-sm font-medium mb-1">Campanhas</div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-gray-800">12</div>
                  <div className="text-xs text-gray-500 ml-2 mb-1">+ 2 novas (últimos 5 dias)</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-gray-500 text-sm font-medium mb-1">Impressões</div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-gray-800">45.422</div>
                  <div className="text-xs text-gray-500 ml-2 mb-1">+23% (comparado à semana passada)</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-gray-500 text-sm font-medium mb-1">Cliques</div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-gray-800">1.245</div>
                  <div className="text-xs text-gray-500 ml-2 mb-1">CTR 2,74% (↑0,3% vs. período anterior)</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-gray-500 text-sm font-medium mb-1">Conversões</div>
                <div className="flex items-end">
                  <div className="text-3xl font-bold text-gray-800">87</div>
                  <div className="text-xs text-gray-500 ml-2 mb-1">Custo por conversão: R$ 34,22</div>
                </div>
              </div>
            </div>
            
            {/* API Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Status da API Google Ads</h2>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">ONLINE</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">Monitoramento e gerenciamento de tokens de autenticação</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Status do token</div>
                  <div className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">Válido</span>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <div>Última atualização:</div>
                    <div className="font-medium text-gray-800">03/05/2025, 22:05:31</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Tempo restante</div>
                  <div className="flex items-center">
                    <Clock size={18} className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium">2h 0m</span>
                  </div>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Renovação automática:</span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="toggle" className="opacity-0 absolute h-0 w-0" checked />
                      <label htmlFor="toggle" className="block overflow-hidden h-5 rounded-full bg-green-500 cursor-pointer"></label>
                    </div>
                    <span className="text-sm text-gray-700 ml-2">Ativada</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex">
                <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <RefreshCw size={16} className="mr-2" />
                  Reautorizar tokens
                </button>
                <a href="#" className="ml-auto text-sm text-blue-600 hover:underline flex items-center">
                  Detalhes API
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
            
            {/* Top Campaigns */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Campanhas com melhor desempenho</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">Campanha de Pesquisa - Marca</h3>
                          <div className="text-sm text-gray-500">CTR 8.4% | Conversões: 45</div>
                        </div>
                        <button className="text-sm text-blue-600 hover:underline">Ver detalhes</button>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">Remarketing - Visitantes do Site</h3>
                          <div className="text-sm text-gray-500">CTR 4.2% | Conversões: 22</div>
                        </div>
                        <button className="text-sm text-blue-600 hover:underline">Ver detalhes</button>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">Pesquisa - Termos Competitivos</h3>
                          <div className="text-sm text-gray-500">CTR 3.1% | Conversões: 18</div>
                        </div>
                        <button className="text-sm text-blue-600 hover:underline">Ver detalhes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Automações ativas</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        <div className="font-medium text-gray-800">Otimizador de Orçamento</div>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        <div className="font-medium text-gray-800">Guardião de Lances</div>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="font-medium text-gray-800">Rotação de Anúncios</div>
                        <span className="ml-auto text-xs text-gray-500">Pausada</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Status do Ciclo de Vida das Contas</h2>
                <button className="text-sm text-blue-600 hover:underline flex items-center">
                  Ver todas as contas
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <h3 className="font-medium text-gray-800">Estágio 1: Novas</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">4</div>
                  <div className="text-sm text-gray-500">Gasto médio: $7.50</div>
                  <div className="mt-2 text-xs text-green-600 font-medium">Taxa de aprovação: 100%</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <h3 className="font-medium text-gray-800">Estágio 2: Intermediárias</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">6</div>
                  <div className="text-sm text-gray-500">Gasto médio: $54.30</div>
                  <div className="mt-2 text-xs text-blue-600 font-medium">Performance: Boa</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <h3 className="font-medium text-gray-800">Estágio 3: Avançadas</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">2</div>
                  <div className="text-sm text-gray-500">Gasto não pago: $178.50</div>
                  <div className="mt-2 text-xs text-purple-600 font-medium">ROI estimado: 940%</div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">Total de contas ativas: <span className="font-medium text-gray-800">12</span></div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Criar Nova Conta
                </button>
              </div>
            </div>
            
            {/* Risk Assessment */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Avaliação de Risco</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">Diário</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700">Semanal</button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">Mensal</button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 mb-1">Risco de Detecção</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold text-green-600">Baixo</div>
                    <span className="ml-auto text-green-600 text-xs font-medium">12%</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 mb-1">Risco Financeiro</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold text-yellow-600">Médio</div>
                    <span className="ml-auto text-yellow-600 text-xs font-medium">48%</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 mb-1">Risco Operacional</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold text-green-600">Baixo</div>
                    <span className="ml-auto text-green-600 text-xs font-medium">15%</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 mb-1">Risco Composto</div>
                  <div className="flex items-center">
                    <div className="text-lg font-bold text-green-600">Baixo</div>
                    <span className="ml-auto text-green-600 text-xs font-medium">25%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm">
                <div className="flex items-start mb-2">
                  <AlertCircle size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-600">
                    Sistema anti-suspensão operando normalmente em todas as contas de Estágio 3.
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle size={18} className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-600">
                    Recomendação: Rotacionar conta "UK Heritage" nas próximas 24h (gasto não pago: $232).
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
