import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ProjectConfig, createDefaultConfig } from './model/ProjectConfig'
import ConfigForm, { SectionId, DEFAULT_EXPANDED, ALL_SECTIONS } from './ui/ConfigForm'
import PreviewPanel from './ui/PreviewPanel'
import DashboardGuide from './ui/DashboardGuide'

type TabId = 'config' | 'preview' | 'guide'

const STORAGE_KEY = 'autotcs-config'

// Load saved config from localStorage
function loadSavedConfig(): ProjectConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with default config to handle new fields added in updates
      const defaultConfig = createDefaultConfig()
      const merged = { ...defaultConfig, ...parsed }
      // Ensure queue settings exist
      if (!merged.queue) {
        merged.queue = { maxSize: 20 }
      }
      return merged
    }
  } catch (e) {
    console.warn('Failed to load saved config:', e)
  }
  return createDefaultConfig()
}

function App() {
  const [config, setConfig] = useState<ProjectConfig>(loadSavedConfig)
  const [configKey, setConfigKey] = useState(0) // changed on reset so ConfigForm remounts and uncontrolled inputs get fresh defaultValue
  const [activeTab, setActiveTab] = useState<TabId>('config')
  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(new Set(DEFAULT_EXPANDED))

  // Save config to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch (e) {
      console.warn('Failed to save config:', e)
    }
  }, [config])

  const expandAll = () => setExpandedSections(new Set(ALL_SECTIONS))
  const collapseAll = () => setExpandedSections(new Set())
  const allExpanded = expandedSections.size === ALL_SECTIONS.length

  return (
    <div className="app-container">
      <header className="header">
        <h1 style={{ fontFamily: "'Furore', sans-serif", fontWeight: 400, letterSpacing: '0.15em' }}>AutoTCS</h1>
        <p>TCS 스크립트와 대시보드 설정을 자동 생성하는 tool 입니다</p>
      </header>

      <div className="tabs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
          <button
            className={`tab ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            설정
          </button>
          <button
            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            OUTPUT
          </button>
          <button
            className={`tab ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            대시보드 가이드
          </button>
        </div>
        {activeTab === 'config' && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-outline-danger" 
              onClick={() => {
                if (window.confirm('모든 설정을 초기화하시겠습니까? 저장된 데이터가 삭제됩니다.')) {
                  localStorage.removeItem(STORAGE_KEY)
                  setConfig(createDefaultConfig())
                  setConfigKey((k) => k + 1)
                }
              }}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              <span style={{ marginRight: '0.05rem' }}>⚠</span>
              초기화
            </button>
            <button 
              className="btn btn-outline" 
              onClick={allExpanded ? collapseAll : expandAll}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              <span style={{ color: 'var(--text-secondary)', marginRight: '0.05rem' }}>
                {allExpanded ? '▲' : '▼'}
              </span>
              {allExpanded ? '모두 접기' : '모두 펴기'}
            </button>
          </div>
        )}
      </div>

      {activeTab === 'config' && (
        <ConfigForm 
          key={configKey}
          config={config} 
          onChange={setConfig} 
          expandedSections={expandedSections}
          onToggleSection={(id) => {
            const newSet = new Set(expandedSections)
            if (newSet.has(id)) {
              newSet.delete(id)
            } else {
              newSet.add(id)
            }
            setExpandedSections(newSet)
          }}
        />
      )}

      {activeTab === 'preview' && (
        <PreviewPanel config={config} />
      )}

      {activeTab === 'guide' && (
        <DashboardGuide config={config} />
      )}

      <footer className="footer">
        <span style={{ fontFamily: "'Furore', sans-serif", fontWeight: 400 }}>AutoTCS</span> v1.0
      </footer>
      <Analytics />
    </div>
  )
}

export default App
