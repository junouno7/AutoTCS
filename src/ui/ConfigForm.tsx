import { 
  ProjectConfig, 
  validateConfig,
  ArrivalBehavior,
  AfterChargingBehavior,
  AutoChargeTrigger,
  ScenarioRoute,
  anyModeUsesCountdown
} from '../model/ProjectConfig'

interface Props {
  config: ProjectConfig
  onChange: (config: ProjectConfig) => void
  expandedSections: Set<SectionId>
  onToggleSection: (id: SectionId) => void
}

export type SectionId = 'basic' | 'drivingMode' | 'arrival' | 'charging' | 'repeat' | 'nightCharging' | 'audio' | 'scenario' | 'nodes'

export const DEFAULT_EXPANDED: SectionId[] = ['basic', 'drivingMode']
export const ALL_SECTIONS: SectionId[] = ['basic', 'drivingMode', 'arrival', 'charging', 'repeat', 'nightCharging', 'audio', 'scenario', 'nodes']

// Tooltip component for help information
function HelpTooltip({ text, position = 'top', style }: { text: string; position?: 'top' | 'bottom'; style?: React.CSSProperties }) {
  return (
    <span className={`help-tooltip-wrapper ${position === 'bottom' ? 'tooltip-bottom' : ''}`} style={style}>
      <span className="help-tooltip-icon">?</span>
      <span className="help-tooltip-content">{text}</span>
    </span>
  )
}

interface SectionProps {
  title: string
  icon: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function CollapsibleSection({ title, icon, children, isOpen, onToggle }: SectionProps) {
  return (
    <div className="card">
      <div 
        className="section-header" 
        onClick={onToggle}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h3 className="card-title" style={{ marginBottom: 0 }}>
          <span style={{ marginRight: '0.5rem' }}>{icon}</span>
          {title}
        </h3>
        <span style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-secondary)',
          display: 'inline-block',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▶
        </span>
      </div>
      {isOpen && <div style={{ marginTop: '1rem' }}>{children}</div>}
    </div>
  )
}


export default function ConfigForm({ config, onChange, expandedSections, onToggleSection }: Props) {
  const validation = validateConfig(config)
  
  // Handle toggling sync - when enabled, immediately sync all display names to map node names
  const handleSyncToggle = (newValue: boolean) => {
    if (newValue) {
      // Sync all display names to map node names
      const syncedNodes = config.nodes.map(node => ({
        ...node,
        displayName: node.mapNodeName
      }))
      onChange({ ...config, syncNodeDisplayNames: newValue, nodes: syncedNodes })
    } else {
      onChange({ ...config, syncNodeDisplayNames: newValue })
    }
  }

  // Update a top-level field
  const updateField = <K extends keyof ProjectConfig>(key: K, value: ProjectConfig[K]) => {
    onChange({ ...config, [key]: value })
  }

  // Update a nested object field
  const updateNested = <K extends keyof ProjectConfig>(
    key: K, 
    nestedKey: keyof ProjectConfig[K], 
    value: ProjectConfig[K][keyof ProjectConfig[K]]
  ) => {
    onChange({
      ...config,
      [key]: { ...(config[key] as object), [nestedKey]: value }
    })
  }

  // Update a node
  const updateNode = (index: number, field: 'displayName' | 'mapNodeName', value: string) => {
    const newNodes = [...config.nodes]
    if (config.syncNodeDisplayNames && field === 'mapNodeName') {
      // When syncing, update both displayName and mapNodeName
      newNodes[index] = { ...newNodes[index], displayName: value, mapNodeName: value }
    } else {
      newNodes[index] = { ...newNodes[index], [field]: value }
    }
    onChange({ ...config, nodes: newNodes })
  }

  // Add a node
  const addNode = () => {
    const newIndex = config.nodes.length + 1
    onChange({
      ...config,
      nodes: [...config.nodes, { displayName: `구역 ${newIndex}`, mapNodeName: `구역 ${newIndex}` }]
    })
  }

  // Remove a node
  const removeNode = (index: number) => {
    onChange({
      ...config,
      nodes: config.nodes.filter((_, i) => i !== index)
    })
  }

  // Add a scenario
  const addScenario = () => {
    const newScenario: ScenarioRoute = {
      name: `시나리오 ${config.scenarios.length + 1}`,
      nodes: []
    }
    onChange({
      ...config,
      scenarios: [...config.scenarios, newScenario]
    })
  }

  // Remove a scenario
  const removeScenario = (index: number) => {
    onChange({
      ...config,
      scenarios: config.scenarios.filter((_, i) => i !== index)
    })
  }

  // Update a scenario
  const updateScenario = (index: number, field: keyof ScenarioRoute, value: string | string[]) => {
    const newScenarios = [...config.scenarios]
    newScenarios[index] = { ...newScenarios[index], [field]: value }
    onChange({ ...config, scenarios: newScenarios })
  }

  return (
    <div>
      {/* Validation messages */}
      {validation.errors.length > 0 && (
        <div className="validation-message error">
          {validation.errors.map((err, i) => (
            <div key={i}>⚠️ {err}</div>
          ))}
        </div>
      )}
      {validation.warnings.length > 0 && (
        <div className="validation-message warning">
          {validation.warnings.map((warn, i) => (
            <div key={i}>💡 {warn}</div>
          ))}
        </div>
      )}
      {validation.valid && validation.warnings.length === 0 && (
        <div className="validation-message success">
          ✅ 모든 설정이 올바릅니다.
        </div>
      )}

      {/* ============================================================ */}
      {/* BASIC SETTINGS */}
      {/* ============================================================ */}
      <CollapsibleSection title="기본 설정" icon="📋" isOpen={expandedSections.has('basic')} onToggle={() => onToggleSection('basic')}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="scriptName">스크립트 이름</label>
            <input
              id="scriptName"
              type="text"
              value={config.scriptName}
              onChange={(e) => updateField('scriptName', e.target.value)}
              placeholder="예: NewSiteScript"
            />
            <small style={{ color: 'var(--text-secondary)' }}>
              영문, 숫자, 밑줄(_)만 사용 가능
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="startNode">시작 위치 (대기장소)</label>
            <input
              id="startNode"
              type="text"
              value={config.startNodeName}
              onChange={(e) => updateField('startNodeName', e.target.value)}
              placeholder="예: 대기장소"
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateLocationOn">위치 업데이트 시점<HelpTooltip text="output_currentRobotLocation 변수가 언제 업데이트되는지 설정합니다.&#10;&#10;• 출발 시: 이동 시작할 때 목적지로 설정&#10;• 도착 시: 도착 확인 후 업데이트" style={{ top: '-2px' }} /></label>
            <select
              id="updateLocationOn"
              value={config.updateLocationOn}
              onChange={(e) => updateField('updateLocationOn', e.target.value as 'arrival' | 'driveStart')}
            >
              <option value="arrival">도착 확인 후</option>
              <option value="driveStart">주행 시작 시</option>
            </select>
          </div>
        </div>
      </CollapsibleSection>

      {/* ============================================================ */}
      {/* DRIVING MODE */}
      {/* ============================================================ */}
      <CollapsibleSection title="주행 모드" icon="🚗" isOpen={expandedSections.has('drivingMode')} onToggle={() => onToggleSection('drivingMode')}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          사용할 주행 모드를 선택하세요. 여러 모드를 동시에 활성화할 수 있으며, 각 모드는 별도의 대시보드 버튼으로 구분됩니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ 
            padding: '0.75rem',
            background: config.enableMultiStopQueue ? 'rgba(88, 166, 255, 0.1)' : 'transparent',
            borderRadius: '8px',
            border: config.enableMultiStopQueue ? '1px solid rgba(88, 166, 255, 0.3)' : '1px solid var(--border)'
          }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.enableMultiStopQueue}
                onChange={(e) => updateField('enableMultiStopQueue', e.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <div>
                <span style={{ fontWeight: 500 }}>다중 정차 큐 모드</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  목적지를 큐에 추가한 후 "이동 시작" 버튼으로 순차 이동. 반복 기능 지원.
                </p>
              </div>
            </label>
            {config.enableMultiStopQueue && (
              <div style={{ marginTop: '0.75rem', marginLeft: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>도착 후 동작:</label>
                  <select
                    value={config.multiStopArrivalBehavior}
                    onChange={(e) => updateField('multiStopArrivalBehavior', e.target.value as ArrivalBehavior)}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <option value="waitForButton">버튼 대기</option>
                    <option value="countdown">카운트다운</option>
                    <option value="autoProceed">즉시 진행</option>
                  </select>
                </div>
                {config.multiStopArrivalBehavior === 'countdown' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>대기 시간(초):</label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={config.waitTimeSettings.multiStopWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}
                      onBlur={(e) => {
                        const val = Math.max(1, parseInt(e.target.value) || 30)
                        e.target.value = String(val)
                        updateField('waitTimeSettings', { ...config.waitTimeSettings, multiStopWaitTimeSeconds: val })
                      }}
                      style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem', width: '60px' }}
                    />
                  </div>
                )}
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>작업 완료 후 복귀:</label>
                  <select
                    value={config.multiStopCompletionReturn}
                    onChange={(e) => updateField('multiStopCompletionReturn', e.target.value)}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <option value="">제자리 (이동 안함)</option>
                    <option value={config.startNodeName}>{config.startNodeName} (시작)</option>
                    <option value={config.chargingStationName}>{config.chargingStationName} (충전)</option>
                    {config.nodes.map((node, i) => (
                      <option key={i} value={node.mapNodeName}>
                        {node.displayName || node.mapNodeName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>경유지 추가 최대 큐 크기:</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    defaultValue={config.queue.maxSize}
                    onBlur={(e) => {
                      const val = Math.min(99, Math.max(1, parseInt(e.target.value) || 6))
                      e.target.value = String(val)
                      updateField('queue', { maxSize: val })
                    }}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem', width: '60px' }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div style={{ 
            padding: '0.75rem',
            background: config.enableSingleDestination ? 'rgba(63, 185, 80, 0.1)' : 'transparent',
            borderRadius: '8px',
            border: config.enableSingleDestination ? '1px solid rgba(63, 185, 80, 0.3)' : '1px solid var(--border)'
          }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.enableSingleDestination}
                onChange={(e) => updateField('enableSingleDestination', e.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <div>
                <span style={{ fontWeight: 500 }}>단일 목적지 모드</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  버튼 클릭 즉시 해당 노드로 이동 시작. 빠른 단일 이동에 적합.
                </p>
              </div>
            </label>
            {config.enableSingleDestination && (
              <div style={{ marginTop: '0.75rem', marginLeft: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>도착 후 동작:</label>
                  <select
                    value={config.singleDestinationArrivalBehavior}
                    onChange={(e) => updateField('singleDestinationArrivalBehavior', e.target.value as ArrivalBehavior)}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <option value="waitForButton">버튼 대기</option>
                    <option value="countdown">카운트다운</option>
                    <option value="autoProceed">즉시 진행</option>
                  </select>
                </div>
                {config.singleDestinationArrivalBehavior === 'countdown' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>대기 시간(초):</label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={config.waitTimeSettings.singleDestWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}
                      onBlur={(e) => {
                        const val = Math.max(1, parseInt(e.target.value) || 30)
                        e.target.value = String(val)
                        updateField('waitTimeSettings', { ...config.waitTimeSettings, singleDestWaitTimeSeconds: val })
                      }}
                      style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem', width: '60px' }}
                    />
                  </div>
                )}
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>작업 완료 후 복귀:</label>
                  <select
                    value={config.singleDestCompletionReturn}
                    onChange={(e) => updateField('singleDestCompletionReturn', e.target.value)}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <option value="">제자리 (이동 안함)</option>
                    <option value={config.startNodeName}>{config.startNodeName} (시작)</option>
                    <option value={config.chargingStationName}>{config.chargingStationName} (충전)</option>
                    {config.nodes.map((node, i) => (
                      <option key={i} value={node.mapNodeName}>
                        {node.displayName || node.mapNodeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ 
            padding: '0.75rem',
            background: config.enableScenarioMode ? 'rgba(192, 132, 252, 0.15)' : 'transparent',
            borderRadius: '8px',
            border: config.enableScenarioMode ? '1px solid rgba(192, 132, 252, 0.4)' : '1px solid var(--border)'
          }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.enableScenarioMode}
                onChange={(e) => updateField('enableScenarioMode', e.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <div>
                <span style={{ fontWeight: 500 }}>시나리오 모드</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  미리 정의된 경로를 버튼 하나로 실행. 정해진 순회 경로에 적합.
                </p>
              </div>
            </label>
            {config.enableScenarioMode && (
              <div style={{ marginTop: '0.75rem', marginLeft: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>도착 후 동작:</label>
                  <select
                    value={config.scenarioArrivalBehavior}
                    onChange={(e) => updateField('scenarioArrivalBehavior', e.target.value as ArrivalBehavior)}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <option value="waitForButton">버튼 대기</option>
                    <option value="countdown">카운트다운</option>
                    <option value="autoProceed">즉시 진행</option>
                  </select>
                </div>
                {config.scenarioArrivalBehavior === 'countdown' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>대기 시간(초):</label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={config.waitTimeSettings.scenarioWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}
                      onBlur={(e) => {
                        const val = Math.max(1, parseInt(e.target.value) || 30)
                        e.target.value = String(val)
                        updateField('waitTimeSettings', { ...config.waitTimeSettings, scenarioWaitTimeSeconds: val })
                      }}
                      style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem', width: '60px' }}
                    />
                  </div>
                )}
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>작업 완료 후 복귀:</label>
                  <select
                    value={config.scenarioCompletionReturn}
                    onChange={(e) => updateField('scenarioCompletionReturn', e.target.value)}
                    style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  >
                    <option value="">제자리 (이동 안함)</option>
                    <option value={config.startNodeName}>{config.startNodeName} (시작)</option>
                    <option value={config.chargingStationName}>{config.chargingStationName} (충전)</option>
                    {config.nodes.map((node, i) => (
                      <option key={i} value={node.mapNodeName}>
                        {node.displayName || node.mapNodeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* ============================================================ */}
      {/* COUNTDOWN SETTINGS (shown when any mode uses countdown) */}
      {/* ============================================================ */}
      {anyModeUsesCountdown(config) && (
        <CollapsibleSection title="카운트다운 설정" icon="⏱️" isOpen={expandedSections.has('arrival')} onToggle={() => onToggleSection('arrival')}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            각 주행 모드별 대기 시간은 해당 모드 설정에서 개별 지정됩니다. 아래는 공통 설정입니다.
          </p>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="stepSize">조절 단위 (초)<HelpTooltip text="대시보드에서 '시간+' 또는 '시간-' 버튼을 눌렀을 때 카운트다운 시간이 증가/감소하는 단위입니다.&#10;&#10;예: 조절 단위가 10초이면, 시간+ 버튼 클릭 시 남은 시간이 10초씩 증가합니다." style={{ top: '-2px' }} /></label>
              <input
                id="stepSize"
                type="number"
                min="1"
                defaultValue={config.waitTimeSettings.stepSize}
                onBlur={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 10)
                  e.target.value = String(val)
                  updateNested('waitTimeSettings', 'stepSize', val)
                }}
              />
            </div>
            <div className="form-group full-width">
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={config.waitTimeSettings.allowSkip}
                    onChange={(e) => updateNested('waitTimeSettings', 'allowSkip', e.target.checked)}
                  />
                  대기 스킵 허용
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={config.waitTimeSettings.allowIncrease}
                    onChange={(e) => updateNested('waitTimeSettings', 'allowIncrease', e.target.checked)}
                  />
                  시간 증가 버튼
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={config.waitTimeSettings.allowDecrease}
                    onChange={(e) => updateNested('waitTimeSettings', 'allowDecrease', e.target.checked)}
                  />
                  시간 감소 버튼
                </label>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* ============================================================ */}
      {/* CHARGING BEHAVIOR */}
      {/* ============================================================ */}
      <CollapsibleSection title="충전 설정" icon="🔋" isOpen={expandedSections.has('charging')} onToggle={() => onToggleSection('charging')}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="chargingName">충전소 노드 이름</label>
            <input
              id="chargingName"
              type="text"
              value={config.chargingStationName}
              onChange={(e) => updateField('chargingStationName', e.target.value)}
              placeholder="예: 충전소"
            />
          </div>
          <div className="form-group">
            <label htmlFor="chargingMarker">충전소 마커 ID<HelpTooltip text="충전 스테이션에 부착된 AruCo 마커의 고유 ID입니다. 로봇이 도킹할 때 이 마커를 인식합니다." style={{ top: '-2px' }} /></label>
            <input
              id="chargingMarker"
              type="number"
              defaultValue={config.chargingStationMarkerId}
              onBlur={(e) => {
                const val = parseInt(e.target.value) || 0
                e.target.value = String(val)
                updateField('chargingStationMarkerId', val)
              }}
              placeholder="예: 10056"
            />
          </div>
          <div className="form-group">
            <label htmlFor="batteryLow">저배터리 임계값 (%)<HelpTooltip text="배터리가 이 수치 이하로 떨어지면 저배터리 상태로 간주됩니다. 자동 충전이 활성화된 경우 충전소로 이동합니다." style={{ top: '-2px' }} /></label>
            <input
              id="batteryLow"
              type="number"
              min="1"
              max="100"
              defaultValue={config.batteryLowLevel}
              onBlur={(e) => {
                const val = Math.min(100, Math.max(1, parseInt(e.target.value) || 15))
                e.target.value = String(val)
                updateField('batteryLowLevel', val)
              }}
            />
            <small style={{ color: 'var(--text-secondary)' }}>
              이 값 이하일 때 자동 충전
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="batteryHigh">충전 완료 임계값 (%)<HelpTooltip text="배터리가 이 수치 이상이 되면 충전이 완료된 것으로 간주됩니다. 충전 완료 후 동작 설정에 따라 다음 행동을 수행합니다." style={{ top: '-2px' }} /></label>
            <input
              id="batteryHigh"
              type="number"
              min="1"
              max="100"
              defaultValue={config.batteryHighLevel}
              onBlur={(e) => {
                const val = Math.min(100, Math.max(1, parseInt(e.target.value) || 95))
                e.target.value = String(val)
                updateField('batteryHighLevel', val)
              }}
            />
            <small style={{ color: 'var(--text-secondary)' }}>
              이 값 이상이면 충전 완료
            </small>
          </div>
        </div>

        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label htmlFor="autoChargeTrigger">자동 충전 조건<HelpTooltip text="언제 자동으로 충전소로 이동할지 설정합니다.&#10;&#10;• 대기 중 저배터리: 대기 상태에서 배터리 부족 시 자동 충전&#10;• 수동만: 사용자가 직접 충전 버튼 눌러야 함" style={{ top: '-1px' }} /></label>
            <select
              id="autoChargeTrigger"
              value={config.autoChargeTrigger}
              onChange={(e) => updateField('autoChargeTrigger', e.target.value as AutoChargeTrigger)}
            >
              <option value="batteryLow">대기 중 배터리 부족 시</option>
              <option value="never">자동 충전 안함 (수동만)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="afterCharging">충전 완료 후 동작<HelpTooltip text="충전이 완료된 후 로봇의 행동입니다.&#10;&#10;• 충전소 대기: 도킹된 상태 유지&#10;• 시작 위치 복귀: 자동으로 대기 장소로 이동&#10;• 언도킹 후 대기: 충전소에서 나온 뒤 그 자리 대기" style={{ top: '-1px' }} /></label>
            <select
              id="afterCharging"
              value={config.afterChargingBehavior}
              onChange={(e) => updateField('afterChargingBehavior', e.target.value as AfterChargingBehavior)}
            >
              <option value="stayAtCharger">충전소에 대기 (언도킹 안함)</option>
              <option value="returnToStart">시작 위치로 자동 복귀</option>
              <option value="goToIdle">언도킹 후 제자리 대기</option>
            </select>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={config.lowBatteryReturn.enabled}
                onChange={(e) => updateField('lowBatteryReturn', { ...config.lowBatteryReturn, enabled: e.target.checked })}
              />
              <span>저배터리 시 복귀<HelpTooltip text="활성화 시, 배터리가 낮을 때 자동 충전 대신 지정된 위치로 이동합니다.&#10;이 설정은 자동 충전 설정을 덮어씁니다." style={{ top: '-1px', left: '0px' }} /></span>
            </label>
            {config.lowBatteryReturn.enabled && (
              <select
                value={config.lowBatteryReturn.nodeName}
                onChange={(e) => updateField('lowBatteryReturn', { ...config.lowBatteryReturn, nodeName: e.target.value })}
              >
                <option value="">-- 복귀 노드 선택 --</option>
                <option value={config.startNodeName}>{config.startNodeName} (시작 위치)</option>
                {config.nodes.map((node, i) => (
                  <option key={i} value={node.mapNodeName}>
                    {node.displayName || node.mapNodeName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* ============================================================ */}
      {/* REPEAT SETTINGS */}
      {/* ============================================================ */}
      <CollapsibleSection title="반복 설정" icon="🔄" isOpen={expandedSections.has('repeat')} onToggle={() => onToggleSection('repeat')}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={config.repeat.enabled}
              onChange={(e) => updateNested('repeat', 'enabled', e.target.checked)}
            />
            <span style={{ fontWeight: 500 }}>반복 기능 활성화</span>
          </label>
        </div>

        {config.repeat.enabled && (
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="defaultRepeat">기본 반복 횟수</label>
              <input
                id="defaultRepeat"
                type="number"
                min="1"
                defaultValue={config.repeat.defaultCount}
                onBlur={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 1)
                  e.target.value = String(val)
                  updateNested('repeat', 'defaultCount', val)
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxRepeat">최대 반복 횟수</label>
              <input
                id="maxRepeat"
                type="number"
                min="1"
                defaultValue={config.repeat.maxCount}
                onBlur={(e) => {
                  const val = Math.max(1, parseInt(e.target.value) || 99)
                  e.target.value = String(val)
                  updateNested('repeat', 'maxCount', val)
                }}
              />
            </div>
          </div>
        )}
      </CollapsibleSection>

      {/* ============================================================ */}
      {/* NIGHT CHARGING */}
      {/* ============================================================ */}
      <CollapsibleSection title="야간 충전 설정" icon="🌙" isOpen={expandedSections.has('nightCharging')} onToggle={() => onToggleSection('nightCharging')}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={config.nightCharging.enabled}
              onChange={(e) => updateNested('nightCharging', 'enabled', e.target.checked)}
            />
            <span style={{ fontWeight: 500 }}>야간 충전 윈도우 활성화</span>
            <HelpTooltip text="특정 시간대에 충전 완료 시 자동 언도킹을 방지합니다. 이 시간대에 로봇이 충전 중이면 배터리가 가득 차도 자동으로 출발하지 않고 충전소에 머뭅니다. 수동 주행 명령(버튼)은 여전히 작동합니다." style={{ top: '0px', marginLeft: '-2px' }} />
          </label>
        </div>

        {config.nightCharging.enabled && (
          <>
            <div className="form-grid">
              <div className="form-group">
                <label>시작 시간</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    defaultValue={config.nightCharging.startHour}
                    onBlur={(e) => {
                      const val = Math.min(23, Math.max(0, parseInt(e.target.value) || 0))
                      e.target.value = String(val)
                      updateNested('nightCharging', 'startHour', val)
                    }}
                    style={{ width: '70px' }}
                  />
                  <span style={{ alignSelf: 'center' }}>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    defaultValue={config.nightCharging.startMinute}
                    onBlur={(e) => {
                      const val = Math.min(59, Math.max(0, parseInt(e.target.value) || 0))
                      e.target.value = String(val)
                      updateNested('nightCharging', 'startMinute', val)
                    }}
                    style={{ width: '70px' }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>종료 시간</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    defaultValue={config.nightCharging.endHour}
                    onBlur={(e) => {
                      const val = Math.min(23, Math.max(0, parseInt(e.target.value) || 0))
                      e.target.value = String(val)
                      updateNested('nightCharging', 'endHour', val)
                    }}
                    style={{ width: '70px' }}
                  />
                  <span style={{ alignSelf: 'center' }}>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    defaultValue={config.nightCharging.endMinute}
                    onBlur={(e) => {
                      const val = Math.min(59, Math.max(0, parseInt(e.target.value) || 0))
                      e.target.value = String(val)
                      updateNested('nightCharging', 'endMinute', val)
                    }}
                    style={{ width: '70px' }}
                  />
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={config.nightCharging.autoChargeWhenIdle}
                  onChange={(e) => updateNested('nightCharging', 'autoChargeWhenIdle', e.target.checked)}
                />
                <span style={{ fontWeight: 500 }}>대기 중 자동 충전</span>
                <HelpTooltip text="야간 충전 윈도우 시간대에 로봇이 대기 중(IDLE) 상태이면 자동으로 충전소로 이동합니다." style={{ top: '0px', marginLeft: '-3px' }} />
              </label>
            </div>
          </>
        )}
      </CollapsibleSection>

      {/* ============================================================ */}
      {/* AUDIO SETTINGS */}
      {/* ============================================================ */}
      <CollapsibleSection title="오디오 설정" icon="🔊" isOpen={expandedSections.has('audio')} onToggle={() => onToggleSection('audio')}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={config.audio.enabled}
              onChange={(e) => updateNested('audio', 'enabled', e.target.checked)}
            />
            <span style={{ fontWeight: 500 }}>오디오 피드백 활성화</span>
            <HelpTooltip text="오디오 파일(.mp3)은 TCS 리소스관리 > resource > audio 폴더에 배치해야 합니다.&#10;&#10;⚠️ 필수 파일: silent.mp3 (오디오 중지/초기화용)&#10;&#10;파일명 입력 시 .mp3 확장자는 제외합니다." style={{ top: '0px', marginLeft: '-2px' }} />
          </label>
        </div>

        {config.audio.enabled && (
          <>
            <div className="form-group" style={{ marginBottom: '1rem', maxWidth: '200px' }}>
              <label htmlFor="audioVolume">볼륨 (0-100)</label>
              <input
                id="audioVolume"
                type="number"
                min="0"
                max="100"
                defaultValue={config.audio.volume}
                onBlur={(e) => {
                  const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 70))
                  e.target.value = String(val)
                  updateNested('audio', 'volume', val)
                }}
              />
            </div>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              각 이벤트별로 재생할 오디오 파일을 설정합니다. 파일명만 입력하세요 (.mp3 제외).
            </p>
            
            {/* Arrival Sound */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '180px' }}>
                <input
                  type="checkbox"
                  checked={config.audio.playOnArrival}
                  onChange={(e) => updateNested('audio', 'playOnArrival', e.target.checked)}
                />
                도착 시 사운드 재생
              </label>
              {config.audio.playOnArrival && (
                <input
                  type="text"
                  value={config.audio.arrivalSoundFile}
                  onChange={(e) => updateNested('audio', 'arrivalSoundFile', e.target.value)}
                  placeholder="예: arrival"
                  style={{ flex: 1, minWidth: '150px', maxWidth: '200px', background: 'var(--bg-dark)' }}
                />
              )}
            </div>
            
            {/* Drive Start Sound */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '180px' }}>
                <input
                  type="checkbox"
                  checked={config.audio.playOnDriveStart}
                  onChange={(e) => updateNested('audio', 'playOnDriveStart', e.target.checked)}
                />
                주행 중 오디오 (무한 반복)
              </label>
              {config.audio.playOnDriveStart && (
                <input
                  type="text"
                  value={config.audio.driveStartSoundFile}
                  onChange={(e) => updateNested('audio', 'driveStartSoundFile', e.target.value)}
                  placeholder="예: moving"
                  style={{ flex: 1, minWidth: '150px', maxWidth: '200px', background: 'var(--bg-dark)' }}
                />
              )}
            </div>
            
            {/* Low Battery Sound */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '180px' }}>
                <input
                  type="checkbox"
                  checked={config.audio.playOnLowBattery}
                  onChange={(e) => updateNested('audio', 'playOnLowBattery', e.target.checked)}
                />
                저배터리 경고 사운드
              </label>
              {config.audio.playOnLowBattery && (
                <input
                  type="text"
                  value={config.audio.lowBatterySoundFile}
                  onChange={(e) => updateNested('audio', 'lowBatterySoundFile', e.target.value)}
                  placeholder="예: low_battery"
                  style={{ flex: 1, minWidth: '150px', maxWidth: '200px', background: 'var(--bg-dark)' }}
                />
              )}
            </div>
            
            {/* Blocked Sound */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '180px' }}>
                <input
                  type="checkbox"
                  checked={config.audio.playOnBlocked}
                  onChange={(e) => updateNested('audio', 'playOnBlocked', e.target.checked)}
                />
                장애물 감지 (무한 반복)
              </label>
              {config.audio.playOnBlocked && (
                <input
                  type="text"
                  value={config.audio.blockedSoundFile}
                  onChange={(e) => updateNested('audio', 'blockedSoundFile', e.target.value)}
                  placeholder="예: blocked"
                  style={{ flex: 1, minWidth: '150px', maxWidth: '200px', background: 'var(--bg-dark)' }}
                />
              )}
            </div>
          </>
        )}
      </CollapsibleSection>

      {/* ============================================================ */}
      {/* SCENARIO MODE */}
      {/* ============================================================ */}
      {config.enableScenarioMode && (
        <CollapsibleSection title="시나리오 설정" icon="📍" isOpen={expandedSections.has('scenario')} onToggle={() => onToggleSection('scenario')}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.showScenarioPositionWarning}
                onChange={(e) => updateField('showScenarioPositionWarning', e.target.checked)}
              />
              <div>
                <span style={{ fontWeight: 500 }}>시나리오 위치 경고 표시</span>
                <HelpTooltip text="시나리오에 시작 위치 제한이 설정되어 있고, 로봇이 해당 위치에 없을 때 경고 이미지를 표시합니다. 대시보드에 '변수 조건별 리소스 표시' 위젯을 배치해야 합니다." style={{ top: '-1px' }} />
                <small style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  잘못된 위치에서 시나리오 시작 시 경고 이미지 표시
                </small>
              </div>
            </label>
            {config.showScenarioPositionWarning && (
              <div className="form-group" style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <label>경고 표시 시간 (초)</label>
                <input
                  type="number"
                  min="1"
                  defaultValue={config.warningDisplayDuration}
                  onBlur={(e) => {
                    const val = Math.max(1, parseInt(e.target.value) || 3)
                    e.target.value = String(val)
                    updateField('warningDisplayDuration', val)
                  }}
                  style={{ width: '100px' }}
                />
              </div>
            )}
          </div>

          {config.scenarios.map((scenario, scenarioIndex) => (
            <div 
              key={scenarioIndex} 
              style={{ 
                background: 'var(--bg-input)', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <strong>시나리오 {scenarioIndex + 1}</strong>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeScenario(scenarioIndex)}
                  style={{ 
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.8rem'
                  }}
                >
                  삭제
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>시나리오 이름</label>
                  <input
                    type="text"
                    value={scenario.name}
                    onChange={(e) => updateScenario(scenarioIndex, 'name', e.target.value)}
                    placeholder="예: 오전 순회"
                  />
                </div>
                <div className="form-group">
                  <label>시작 위치 제한 (선택)<HelpTooltip text="이 시나리오를 시작하기 위해 로봇이 있어야 하는 특정 위치입니다. 비워두면 어느 위치에서든 시작 가능합니다. 예: 특정 시나리오는 '충전소'에서만 시작하도록 제한" style={{ top: '-1px' }} /></label>
                  <select
                    value={scenario.requireStartFrom || ''}
                    onChange={(e) => updateScenario(scenarioIndex, 'requireStartFrom', e.target.value)}
                    style={{ background: 'var(--bg-dark)' }}
                  >
                    <option value="">제한 없음</option>
                    <optgroup label="목적지 노드">
                      {config.nodes.map((n, i) => (
                        <option key={`start-node-${i}`} value={n.displayName}>{n.displayName}</option>
                      ))}
                    </optgroup>
                    <optgroup label="특수 위치">
                      <option value={config.startNodeName}>🏠 {config.startNodeName} (시작 위치)</option>
                      <option value={config.chargingStationName}>🔋 {config.chargingStationName} (충전소)</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              
              {/* Node list as individual inputs */}
              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  경유 노드 목록
                  <HelpTooltip text="시나리오 실행 시 로봇이 순서대로 방문할 노드 목록입니다. 위에서 아래로 순서대로 이동합니다." style={{ top: '-1px' }} />
                </label>
                
                {scenario.nodes.map((node, nodeIndex) => (
                  <div key={nodeIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', minWidth: '24px' }}>{nodeIndex + 1}.</span>
                    <select
                      value={node}
                      onChange={(e) => {
                        const newNodes = [...scenario.nodes]
                        newNodes[nodeIndex] = e.target.value
                        updateScenario(scenarioIndex, 'nodes', newNodes)
                      }}
                      style={{ flex: 1, background: 'var(--bg-dark)' }}
                    >
                      <option value="">-- 노드 선택 --</option>
                      <optgroup label="목적지 노드">
                        {config.nodes.map((n, i) => (
                          <option key={`node-${i}`} value={n.displayName}>{n.displayName}</option>
                        ))}
                      </optgroup>
                      <optgroup label="특수 위치">
                        <option value={config.startNodeName}>🏠 {config.startNodeName} (시작 위치)</option>
                        <option value={config.chargingStationName}>🔋 {config.chargingStationName} (충전소)</option>
                      </optgroup>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const newNodes = scenario.nodes.filter((_, i) => i !== nodeIndex)
                        updateScenario(scenarioIndex, 'nodes', newNodes)
                      }}
                      style={{ 
                        background: 'transparent', 
                        color: 'var(--error)', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '0 0.25rem'
                      }}
                      title="노드 삭제"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => {
                    const newNodes = [...scenario.nodes, '']
                    updateScenario(scenarioIndex, 'nodes', newNodes)
                  }}
                  style={{
                    background: 'transparent',
                    color: 'var(--accent)',
                    border: '1px dashed var(--border)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    marginTop: '0.25rem'
                  }}
                >
                  + 노드 추가
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline"
            onClick={addScenario}
            style={{ marginTop: '0.5rem' }}
          >
            + 시나리오 추가
          </button>
        </CollapsibleSection>
      )}

      {/* ============================================================ */}
      {/* NODE CONFIGURATION */}
      {/* ============================================================ */}
      <CollapsibleSection title="목적지 노드 설정" icon="📍" isOpen={expandedSections.has('nodes')} onToggle={() => onToggleSection('nodes')}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          대시보드 버튼에 표시될 목적지입니다. 표시 이름과 맵 노드 이름이 다를 수 있습니다.
        </p>
        
        {/* Toggle for syncing display names */}
        <label className="checkbox-label" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div 
            className={`toggle-switch ${config.syncNodeDisplayNames ? 'active' : ''}`}
            onClick={() => handleSyncToggle(!config.syncNodeDisplayNames)}
            style={{
              width: '40px',
              height: '22px',
              borderRadius: '11px',
              background: config.syncNodeDisplayNames ? 'var(--accent)' : 'var(--border)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: config.syncNodeDisplayNames ? '20px' : '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'white',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }} />
          </div>
          <span style={{ fontWeight: 500 }}>표시 이름 = 맵 노드 이름</span>
          <HelpTooltip text="활성화: 표시 이름 = 맵 노드 이름 (동일)
비활성화: 표시 이름을 별도로 지정

맵에서 특수문자(~, /, 등)를 사용할 수 없지만 대시보드에는 표시하고 싶을 때 비활성화하세요.
예: 맵 노드 이름 '2' → 표시 이름 '2~3'

표시 이름: 대시보드에 표시 (output_currentRobotLocation 등)
맵 노드 이름: 실제 경로주행에 사용" style={{ top: '0px', marginLeft: 'calc(0.15rem - 3px)' }} />
        </label>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="mapping-table" style={{ marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                {!config.syncNodeDisplayNames && (
                  <th>표시 이름<HelpTooltip text="대시보드 버튼에 표시되는 이름입니다. 사용자가 쉽게 이해할 수 있는 이름을 사용하세요. 예: '1층 로비', '휴게실'" position="bottom" style={{ top: '-2px' }} /></th>
                )}
                <th>맵 노드 이름<HelpTooltip text="TCS 맵에 설정된 실제 노드 이름입니다. TCS 티칭 노드관리에서 확인할 수 있으며, 정확히 일치해야 로봇이 해당 위치로 이동합니다." position="bottom" style={{ top: '-2px' }} /></th>
                <th style={{ width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {config.nodes.map((node, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {!config.syncNodeDisplayNames && (
                    <td>
                      <input
                        type="text"
                        value={node.displayName}
                        onChange={(e) => updateNode(index, 'displayName', e.target.value)}
                        placeholder="대시보드 표시 이름"
                        style={{ width: '100%', background: 'var(--bg-dark)' }}
                      />
                    </td>
                  )}
                  <td>
                    <input
                      type="text"
                      value={node.mapNodeName}
                      onChange={(e) => updateNode(index, 'mapNodeName', e.target.value)}
                      placeholder="실제 맵 노드 이름"
                      style={{ width: '100%', background: 'var(--bg-dark)' }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeNode(index)}
                      style={{ 
                        background: 'transparent', 
                        color: 'var(--error)', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                      title="노드 삭제"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={addNode}
        >
          + 노드 추가
        </button>
      </CollapsibleSection>
    </div>
  )
}
