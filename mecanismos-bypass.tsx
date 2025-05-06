import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, BarChart2, Shield, ExternalLink, AlertTriangle, CheckCircle, Clock, Power, Lock, Info, ToggleLeft, Zap, Activity, Eye, EyeOff } from 'lucide-react';

export default function MecanismosDeBypass() {
  const [bypassMode, setBypassMode] = useState('aggressive');
  
  const bypassModes = [
    { id: 'safe', name: 'Modo Seguro', risk: 'Baixo', success: '78%', description: 'Configurações conservadoras com foco em estabilidade e menor risco de detecção.' },
    { id: 'balanced', name: 'Modo Balanceado', risk: 'Médio', success: '87%', description: 'Balanceamento entre segurança e agressividade para contas em estágio intermediário.' },
    { id: 'aggressive', name: 'Modo Avançado', risk: 'Alto', success: '95%', description: 'Maior taxa de bypass com rotação acelerada para contas em Estágio 3.' }
  ];
  
  const bypassSystems = [
    {
      id: 1,
      name: "Sistema Anti-Suspensão v3.8",
      type: "core",
      status: "Ativo",
      lastUpdate: "03/05/2025",
      metrics: {
        successRate: "97%",
        contas: 12,
        riskLevel: "Baixo"
      },
      description: "Sistema principal de anti-suspensão com monitoramento de padrões de comportamento e ajustes automáticos.",
      features: [
        "Monitoramento em tempo real",
        "Detecção de padrões de suspensão",
        "Rotação automática de identidades",
        "Ajuste dinâmico de parâmetros"
      ]
    },
    {
      id: 2,
      name: "Identity Rotator Pro",
      type: "identity",
      status: "Ativo",
      lastUpdate: "02/05/2025",
      metrics: {
        successRate: "94%",
        contas: 8,
        riskLevel: "Médio"
      },
      description: "Sistema de rotação de identidades digitais com variações naturais para evitar detecção de padrões.",
      features: [
        "Geração de fingerprints únicos",
        "Rotação de IPs residenciais",
        "Variação de comportamento do usuário",
        "Histórico de navegação simulado"
      ]
    },
    {
      id: 3,
      name: "Payment Profile Manager",
      type: "payment",
      status: "Ativo",
      lastUpdate: "01/05/2025",
      metrics: {
        successRate: "92%",
        contas: 12,
        riskLevel: "Alto"
      },
      description: "Gerenciamento avançado de perfis de pagamento com estratégias específicas para cada estágio de conta.",
      features: [
        "Rotação estratégica de cartões",
        "Geração de histórico de pagamento",
        "Padrões naturais de gasto",
        "Prevenção de banimento de instrumentos"
      ]
    },
    {
      id: 4,
      name: "Content Policy Navigator",
      type: "content",
      status: "Ativo",
      lastUpdate: "29/04/2025",
      metrics: {
        successRate: "96%",
        contas: 12,
        riskLevel: "Baixo"
      },
      description: "Sistema avançado de navegação de políticas de conteúdo com verificação prévia contra restrições conhecidas.",
      features: [
        "Análise automática de textos",
        "Verificação de landing pages",
        "Otimização de anúncios para aprovação",
        "Monitoramento de políticas atualizadas"
      ]
    },
    {
      id: 5,
      name: "AI Detection Shield",
      type: "ai",
      status: "Em Teste",
      lastUpdate: "28/04/2025",
      metrics: {
        successRate: "88%",
        contas: 3,
        riskLevel: "Médio"
      },
      description: "Proteção contra sistemas de detecção baseados em IA com comportamentos humanos simulados.",
      features: [
        "Emulação de padrões humanos",
        "Variação de timing entre interações",
        "Simulação de erros naturais",
        "Contra-medidas adaptativas"
      ]
    }
  ];
  
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
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Mecanismos de Bypass
                <span className="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded text-xs">Novo</span>
              </a>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Mecanismos de Bypass</h1>
              <div className="flex items-center space-x-3">
                <button className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                  <Eye size={16} className="mr-2" />
                  Modo Monitor
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                  <Shield size={16} className="mr-2" />
                  Proteção Avançada
                </button>
              </div>
            </div>
            
            {/* Alert Banner */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Atenção: Contas em Estágio 3 precisam de rotação!
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      A conta "UK Heritage" alcançou um gasto não pago de $232 e precisa ser rotacionada nas próximas 24h. 
                      <a href="#" className="font-medium underline text-yellow-700 hover:text-yellow-600 ml-1">
                        Rotacionar agora
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bypass Mode Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Modo de Bypass</h2>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                  ${bypassMode === 'safe' ? 'bg-green-100 text-green-800' : 
                    bypassMode === 'balanced' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}
                >
                  {bypassMode === 'safe' ? 'Risco Baixo' : 
                   bypassMode === 'balanced' ? 'Risco Médio' : 
                   'Risco Alto'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {bypassModes.map(mode => (
                  <div
                    key={mode.id}
                    onClick={() => setBypassMode(mode.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition
                      ${bypassMode === mode.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">{mode.name}</h3>
                      <div className={`h-4 w-4 rounded-full
                        ${bypassMode === mode.id ? 'bg-blue-500' : 'bg-gray-200'}`}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {mode.description}
                    </p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Risco:</span>
                        <span className={`ml-1 font-medium
                          ${mode.risk === 'Baixo' ? 'text-green-600' : 
                            mode.risk === 'Médio' ? 'text-yellow-600' : 
                            'text-red-600'}`}
                        >
                          {mode.risk}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Taxa de Sucesso:</span>
                        <span className="ml-1 font-medium text-green-600">{mode.success}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                  Aplicar Configurações
                </button>
              </div>
            </div>
            
            {/* Systems Status */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {bypassSystems.map(system => (
                <div key={system.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md mr-3
                        ${system.type === 'core' ? 'bg-blue-100 text-blue-600' : 
                          system.type === 'identity' ? 'bg-purple-100 text-purple-600' :
                          system.type === 'payment' ? 'bg-green-100 text-green-600' :
                          system.type === 'content' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-indigo-100 text-indigo-600'
                        }`}
                      >
                        {system.type === 'core' ? <Shield size={20} /> : 
                         system.type === 'identity' ? <EyeOff size={20} /> :
                         system.type === 'payment' ? <Zap size={20} /> :
                         system.type === 'content' ? <ToggleLeft size={20} /> :
                         <Activity size={20} />
                        }
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{system.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                            ${system.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                             'bg-yellow-100 text-yellow-800'}`}
                          >
                            {system.status}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            <Clock size={12} className="inline-block mr-1" />
                            Atualizado: {system.lastUpdate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={system.status === 'Ativo'} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Taxa de Sucesso</div>
                        <div className="font-semibold text-green-600">{system.metrics.successRate}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Contas Protegidas</div>
                        <div className="font-semibold text-gray-700">{system.metrics.contas}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Nível de Risco</div>
                        <div className={`font-semibold
                          ${system.metrics.riskLevel === 'Baixo' ? 'text-green-600' : 
                            system.metrics.riskLevel === 'Médio' ? 'text-yellow-600' : 
                            'text-red-600'}`}
                        >
                          {system.metrics.riskLevel}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Funcionalidades</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {system.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Ver Configurações
                      </button>
                      <button className="px-3 py-1.5 border border-blue-300 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50">
                        Ver Logs
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Status and Security */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Status da Segurança</h2>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 relative">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="94, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-gray-800">94%</span>
                      <span className="text-xs text-gray-500">Proteção</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sistema Anti-Suspensão</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Ativo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Verificação de Políticas</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Ativo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rotação de Identidades</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" />
                      Ativo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Histórico de Navegação</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      <AlertTriangle size={12} className="mr-1" />
                      Atenção
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Log de Atividades</h2>
                
                <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Evento
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sistema
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conta
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Rotação de Identidade</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Identity Rotator</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">UK Heritage</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          03/05/2025, 14:32
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Sucesso
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Verificação de Anúncio</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Content Navigator</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">BR Gadgets</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          03/05/2025, 11:47
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Sucesso
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Detecção de Padrão</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">AI Shield</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">UK Heritage</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          03/05/2025, 09:15
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Atenção
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Perfil de Pagamento</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Payment Manager</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">India Mobile</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          02/05/2025, 22:04
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Sucesso
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Mostrando os 4 eventos mais recentes
                  </div>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Ver Todos os Logs
                  </button>
                </div>
              </div>
            </div>
            
            {/* Documentation and Resources */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Documentação e Recursos</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center">
                  Ver Todos os Recursos
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                      <Info size={20} />
                    </div>
                    <h3 className="font-medium text-gray-800">Guia de Início Rápido</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Aprenda como configurar os mecanismos de bypass para suas contas em diferentes estágios.
                  </p>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Ler Documentação
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-md bg-purple-100 text-purple-600 mr-3">
                      <Shield size={20} />
                    </div>
                    <h3 className="font-medium text-gray-800">Melhores Práticas</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Estratégias e recomendações para maximizar a segurança e evitar suspensões.
                  </p>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Ver Práticas
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                      <Activity size={20} />
                    </div>
                    <h3 className="font-medium text-gray-800">Análise de Risco</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Entenda o sistema de avaliação de risco e como interpretar os indicadores.
                  </p>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Ver Guia
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
