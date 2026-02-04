import { ProjectConfig } from '../model/ProjectConfig'
import { generateScript } from '../generate/scriptAirforceBase'
import { generateDashboardSummary } from '../generate/dashboardFromTemplate'
import { useState } from 'react'

interface Props {
  config: ProjectConfig
}

type PreviewMode = 'script' | 'dashboard-guide'

export default function PreviewPanel({ config }: Props) {
  const [mode, setMode] = useState<PreviewMode>('script')
  
  const scriptText = generateScript(config)
  const dashboardGuide = generateDashboardSummary(config)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${label} 복사 완료!`)
    })
  }

  const getContent = () => {
    switch (mode) {
      case 'script':
        return { text: scriptText, filename: `${config.scriptName}.chill`, label: '스크립트' }
      case 'dashboard-guide':
        return { text: dashboardGuide, filename: 'dashboard-guide.txt', label: '대시보드 가이드 (.txt)' }
    }
  }

  const content = getContent()

  return (
    <div>
      {/* Preview Mode Selector */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'script' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setMode('script')}
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          📄 스크립트 (.chill)
        </button>
        <button
          className={`btn ${mode === 'dashboard-guide' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setMode('dashboard-guide')}
          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
        >
          📖 대시보드 가이드 (.txt)
        </button>
      </div>

      {/* Code Preview */}
      <div className="code-preview">
        <div className="code-preview-header">
          <span>{content.filename}</span>
          <button
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => copyToClipboard(content.text, content.label)}
          >
            복사
          </button>
        </div>
        <pre>{content.text}</pre>
      </div>
      
      {/* Quick tip */}
      {mode === 'dashboard-guide' && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: 'rgba(88, 166, 255, 0.1)',
          border: '1px solid rgba(88, 166, 255, 0.3)',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          💡 <strong>팁:</strong> 이 가이드를 복사하여 프로젝트 문서로 저장하면 나중에 참고하기 좋습니다. 
          각 노드 버튼과 변수 매핑이 현재 설정에 맞게 자동 생성됩니다.
        </div>
      )}
    </div>
  )
}

