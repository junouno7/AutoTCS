import { useState } from 'react'
import { ProjectConfig, getNodeDisplayNames, getNodeMapNames, anyModeUsesCountdown, anyModeUsesWaitForButton } from '../model/ProjectConfig'

interface Props {
  config: ProjectConfig
}

// Tooltip component for help information
function HelpTooltip({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span className="help-tooltip-wrapper" style={style}>
      <span className="help-tooltip-icon">?</span>
      <span className="help-tooltip-content">{text}</span>
    </span>
  )
}

// Collapsible section component matching ConfigForm style
interface CollapsibleSectionProps {
  title: string
  icon?: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function CollapsibleSection({ title, icon, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="card">
      <div 
        className="section-header" 
        onClick={onToggle}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h3 className="card-title" style={{ marginBottom: 0 }}>
          {icon && <span style={{ marginRight: '0.5rem' }}>{icon}</span>}
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

type Section = 'variables' | 'nodes' | 'screens' | 'nightCharging' | 'audio' | 'scenarioWarning' | 'tctState' | 'widgets' | 'system' | 'troubleshooting'

export default function DashboardGuide({ config }: Props) {
  const [expandedSections, setExpandedSections] = useState<Set<Section>>(new Set(['variables', 'nodes', 'screens']))
  const nodeNames = getNodeDisplayNames(config)
  const mapNames = getNodeMapNames(config)
  const hasNameDifference = nodeNames.some((name, i) => name !== mapNames[i])

  const toggleSection = (section: Section) => {
    const newSet = new Set(expandedSections)
    if (newSet.has(section)) {
      newSet.delete(section)
    } else {
      newSet.add(section)
    }
    setExpandedSections(newSet)
  }

  // Build input mappings dynamically based on config
  const inputMappings: Array<{ button: string; variable: string; value: string; description: string; mode?: string }> = []

  // 공통 버튼
  inputMappings.push(
    { button: '충전소 이동', variable: 'input_goToCharger', value: 'true', description: '충전소로 즉시 이동' },
    { button: '시작 위치 이동', variable: 'input_goToStart', value: 'true', description: '시작 위치로 즉시 이동' },
  )

  // 버튼 대기 모드 전용
  if (anyModeUsesWaitForButton(config)) {
    inputMappings.push(
      { button: '도착 확인 (적재 확인)', variable: 'isMoveComplete', value: 'true', description: '다음 목적지로 이동 진행', mode: '버튼 대기' },
    )
  }

  if (config.enableMultiStopQueue) {
    inputMappings.push(
      { button: '다중정차 큐 추가', variable: 'input_queueNodeIndex', value: '0~' + (nodeNames.length - 1), description: '해당 노드를 큐에 추가', mode: '다중정차(Multi-stop)' },
      { button: '다중정차 이동 시작', variable: 'input_startDrivingPressed', value: 'true', description: '큐에 담긴 경로로 주행 시작', mode: '다중정차(Multi-stop)' },
      { button: '큐 비우기', variable: 'input_clearQueue', value: 'true', description: '큐에 담긴 모든 노드 삭제', mode: '다중정차(Multi-stop)' },
    )
  }

  if (config.repeat.enabled) {
    inputMappings.push(
      { button: '반복 +', variable: 'input_repeatPlusPressed', value: 'true', description: '반복 횟수 증가', mode: '반복' },
      { button: '반복 -', variable: 'input_repeatMinusPressed', value: 'true', description: '반복 횟수 감소', mode: '반복' },
    )
  }

  if (config.enableSingleDestination) {
    inputMappings.push(
      { button: '단일이동 시작', variable: 'input_directDrivingNodeIndex', value: '0~' + (nodeNames.length - 1), description: '해당 노드로 즉시 이동', mode: '단일이동 (Single-stop)' },
    )
  }

  if (config.enableScenarioMode && config.scenarios.length > 0) {
    inputMappings.push(
      { button: '시나리오 시작', variable: 'input_scenarioIndex', value: '0~' + (config.scenarios.length - 1), description: '해당 시나리오 시작', mode: '시나리오' },
    )
  }

  if (anyModeUsesCountdown(config)) {
    if (config.waitTimeSettings.allowSkip) {
      inputMappings.push(
        { button: '대기 스킵', variable: 'input_skipWait', value: 'true', description: '카운트다운 스킵하고 다음으로', mode: '카운트다운' },
      )
    }
    if (config.waitTimeSettings.allowIncrease) {
      inputMappings.push(
        { button: '시간 +', variable: 'input_waitTimeIncrease', value: 'true', description: `대기 시간 +${config.waitTimeSettings.stepSize}초`, mode: '카운트다운' },
      )
    }
    if (config.waitTimeSettings.allowDecrease) {
      inputMappings.push(
        { button: '시간 -', variable: 'input_waitTimeDecrease', value: 'true', description: `대기 시간 -${config.waitTimeSettings.stepSize}초`, mode: '카운트다운' },
      )
    }
  }

  // Build output mappings
  const outputMappings: Array<{ variable: string; description: string }> = [
    { variable: 'start_script', description: '스크립트 실행 상태 (true=실행 중, false=종료됨)' },
    { variable: 'robot_state', description: '현재 상태 (INIT, 대기 중, 이동 중, 충전 중, 버튼 대기, 카운트다운, 다음 목적지)' },
    { variable: 'EMS', description: 'EMS 상태 (대시보드 화면 전환용, 0=정상, 1=EMS 활성화)' },
    { variable: 'output_currentRobotLocation', description: '로봇 현재 위치' },
    { variable: 'output_targetNodeName', description: '현재 목적지' },
    { variable: 'output_remainingNodes', description: '남은 목적지 수' },
  ]

  if (config.enableMultiStopQueue) {
    outputMappings.push(
      { variable: 'output_selectedQueue[0~' + (config.queue.maxSize - 1) + ']', description: '다중정차 경유지 목록 표시' },
      { variable: 'output_queueSize', description: '다중정차 큐에 담긴 목적지 수' },
      { variable: 'output_maxQueueSize', description: '경유지 추가 최대 큐 크기 (' + config.queue.maxSize + ')' },
    )
  }

  if (config.repeat.enabled) {
    outputMappings.push(
      { variable: 'output_repeatCount', description: '설정된 반복 횟수' },
      { variable: 'output_repeatRemaining', description: '남은 반복 횟수 (실시간)' },
    )
  }

  if (anyModeUsesCountdown(config)) {
    outputMappings.push({ variable: 'output_waitCountdown', description: '남은 대기 시간 (초)' })
  }

  if (config.showScenarioPositionWarning && config.enableScenarioMode) {
    outputMappings.push({ variable: 'scenarioWarning', description: '시나리오 위치 경고 (true=경고 표시 중)' })
  }

  return (
    <div>
      {/* Active Modes Summary */}
      <div className="card">
        <h3 className="card-title">현재 설정 요약</h3>
        
        {/* 주행 모드 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>주행 모드</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {config.enableMultiStopQueue && (
              <span style={{ background: 'rgba(88, 166, 255, 0.2)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem' }}>
                ✓ 다중정차 (Multi-stop)
              </span>
            )}
            {config.enableSingleDestination && (
              <span style={{ background: 'rgba(63, 185, 80, 0.2)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem' }}>
                ✓ 단일이동 (Single-stop)
              </span>
            )}
            {config.enableScenarioMode && (
              <span style={{ background: 'rgba(192, 132, 252, 0.2)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem' }}>
                ✓ 시나리오
              </span>
            )}
            {!config.enableMultiStopQueue && !config.enableSingleDestination && !config.enableScenarioMode && (
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>없음</span>
            )}
          </div>
        </div>

        {/* 도착 후 동작 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>도착 후 동작</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {config.enableMultiStopQueue && (
              <span style={{ background: 'rgba(88, 166, 255, 0.15)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                다중정차→{config.multiStopArrivalBehavior === 'waitForButton' ? '버튼 대기⏸️' : config.multiStopArrivalBehavior === 'countdown' ? `카운트다운⏱️(${config.waitTimeSettings.multiStopWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}초)` : '즉시이동⏩'}
              </span>
            )}
            {config.enableSingleDestination && (
              <span style={{ background: 'rgba(63, 185, 80, 0.15)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                단일 이동→{config.singleDestinationArrivalBehavior === 'waitForButton' ? '버튼 대기⏸️' : config.singleDestinationArrivalBehavior === 'countdown' ? `카운트다운⏱️(${config.waitTimeSettings.singleDestWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}초)` : '즉시이동⏩'}
              </span>
            )}
            {config.enableScenarioMode && (
              <span style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                시나리오→{config.scenarioArrivalBehavior === 'waitForButton' ? '버튼 대기⏸️' : config.scenarioArrivalBehavior === 'countdown' ? `카운트다운⏱️(${config.waitTimeSettings.scenarioWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}초)` : '즉시이동⏩'}
              </span>
            )}
          </div>
        </div>

        {/* 노드 설정 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>노드 설정</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              목적지 노드: {config.nodes.length}개
            </span>
            <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              시작 노드: {config.startNodeName || '미설정'}
            </span>
            <span style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              충전소: {config.chargingStationName || '미설정'}
            </span>
            {!config.syncNodeDisplayNames && (
              <span style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                표시 이름 ≠ 맵 노드
              </span>
            )}
          </div>
        </div>

        {/* 배터리 설정 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>배터리 설정</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              저전력: {config.batteryLowLevel}%
            </span>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              고전력: {config.batteryHighLevel}%
            </span>
          </div>
        </div>

        {/* 충전 설정 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>충전 설정</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              자동 충전: {config.autoChargeTrigger === 'never' ? '비활성화 (수동만)' : '대기 중 저배터리'}
            </span>
            <span style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
              충전 완료 후: {config.afterChargingBehavior === 'stayAtCharger' ? '충전소 대기' :
               config.afterChargingBehavior === 'goToIdle' ? '언도킹 후 대기' :
               '시작 위치 이동'}
            </span>
            {config.lowBatteryReturn.enabled && config.lowBatteryReturn.nodeName && (
              <span style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                저배터리 복귀: {config.lowBatteryReturn.nodeName}
              </span>
            )}
          </div>
        </div>

        {/* 작업 완료 후 복귀 위치 */}
        {(config.multiStopCompletionReturn || config.singleDestCompletionReturn || config.scenarioCompletionReturn) && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>작업 완료 후 복귀</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {config.enableMultiStopQueue && config.multiStopCompletionReturn && (
                <span style={{ background: 'rgba(88, 166, 255, 0.15)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                  다중정차 → {config.multiStopCompletionReturn}
                </span>
              )}
              {config.enableSingleDestination && config.singleDestCompletionReturn && (
                <span style={{ background: 'rgba(63, 185, 80, 0.15)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                  단일이동 → {config.singleDestCompletionReturn}
                </span>
              )}
              {config.enableScenarioMode && config.scenarioCompletionReturn && (
                <span style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                  시나리오 → {config.scenarioCompletionReturn}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 추가 설정 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>추가 설정</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {config.nightCharging.enabled && (
              <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                🌙 야간 충전 ({String(config.nightCharging.startHour).padStart(2, '0')}:{String(config.nightCharging.startMinute).padStart(2, '0')}~{String(config.nightCharging.endHour).padStart(2, '0')}:{String(config.nightCharging.endMinute).padStart(2, '0')})
              </span>
            )}
            {config.nightCharging.enabled && config.nightCharging.autoChargeWhenIdle && (
              <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                대기 시 자동 충전
              </span>
            )}
            {config.repeat.enabled && (
              <span style={{ background: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                🔁 반복 (기본 {config.repeat.defaultCount}회, 최대 {config.repeat.maxCount}회)
              </span>
            )}
            {config.audio.enabled && (
              <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                🔊 오디오 (볼륨 {config.audio.volume}%)
              </span>
            )}
            {config.enableScenarioMode && config.scenarios.length > 0 && (
              <span style={{ background: 'rgba(192, 132, 252, 0.1)', color: '#c084fc', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                시나리오 {config.scenarios.length}개
              </span>
            )}
            {config.showScenarioPositionWarning && config.enableScenarioMode && (
              <span style={{ background: 'rgba(255, 193, 7, 0.15)', color: '#ffc107', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                ⚠️ 시나리오 위치 경고
              </span>
            )}
            {anyModeUsesCountdown(config) && (
              <span style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                ⏱️ 조절: {config.waitTimeSettings.allowSkip ? '스킵' : ''}{config.waitTimeSettings.allowIncrease ? (config.waitTimeSettings.allowSkip ? '/' : '') + `+${config.waitTimeSettings.stepSize}초` : ''}{config.waitTimeSettings.allowDecrease ? '/' + `-${config.waitTimeSettings.stepSize}초` : ''}
              </span>
            )}
            {!config.nightCharging.enabled && !config.repeat.enabled && !config.audio.enabled && !anyModeUsesCountdown(config) && (
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>없음</span>
            )}
          </div>
        </div>

        {((config.enableMultiStopQueue && config.enableSingleDestination) || 
          (config.enableMultiStopQueue && config.enableScenarioMode) ||
          (config.enableSingleDestination && config.enableScenarioMode)) && (
          <div style={{ background: 'rgba(210, 153, 34, 0.1)', border: '1px solid rgba(210, 153, 34, 0.3)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.85rem' }}>
            <strong style={{ color: 'var(--warning)' }}>⚠️ 복수 모드 활성화</strong>
            <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
              각 모드는 서로 다른 변수를 사용하므로 별도의 버튼/화면으로 구분하세요.
            </span>
          </div>
        )}
      </div>

      {/* Section: Variables */}
      <CollapsibleSection title="변수 매핑" icon="📋" isOpen={expandedSections.has('variables')} onToggle={() => toggleSection('variables')}>
        <>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div>
                <strong style={{ color: '#87CEEB' }}>INPUT</strong>: <strong style={{ color: 'var(--text-primary)' }}>변수변경</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(<code>modifyVariable</code>) 위젯 사용</span>
                <HelpTooltip text="대시보드 버튼을 누르면 스크립트의 변수 값이 변경됩니다. 버튼 클릭 → 변수 변경 → 스크립트가 감지하여 동작 수행" style={{ top: '-1px' }} />
              </div>
              <div>
                <strong style={{ color: 'var(--success)' }}>OUTPUT</strong>: <strong style={{ color: 'var(--text-primary)' }}>변수상태</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(<code>userVariable</code>) 위젯 사용</span>
                <HelpTooltip text="스크립트가 설정한 변수 값을 대시보드에 표시합니다. 로봇 상태, 현재 위치 등을 화면에 보여줄 때 사용" style={{ top: '-1px' }} />
              </div>
            </div>
            
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#87CEEB' }}>📥 INPUT (대시보드 → 스크립트)</h4>
            <table className="mapping-table" style={{ marginBottom: '1rem' }}>
              <thead>
                <tr><th>버튼</th><th>변수</th><th>값</th><th>모드</th></tr>
              </thead>
              <tbody>
                {inputMappings.map((m, i) => (
                  <tr key={i}>
                    <td>{m.button}</td>
                    <td><code>{m.variable}</code></td>
                    <td><code>{m.value}</code></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.mode || '공통'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--success)' }}>📤 OUTPUT (스크립트 → 대시보드)</h4>
            <table className="mapping-table">
              <thead><tr><th>변수</th><th>설명</th></tr></thead>
              <tbody>
                {outputMappings.map((m, i) => (
                  <tr key={i}><td><code>{m.variable}</code></td><td>{m.description}</td></tr>
                ))}
              </tbody>
            </table>
          </>
      </CollapsibleSection>

      {/* Section: Node Mappings */}
      <CollapsibleSection title="노드 인덱스 매핑" icon="📍" isOpen={expandedSections.has('nodes')} onToggle={() => toggleSection('nodes')}>
        <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              ⚠️ 인덱스는 0부터 시작합니다.
              <HelpTooltip text="프로그래밍에서 배열 인덱스는 0부터 시작합니다. 대시보드에서 첫 번째 노드 버튼은 인덱스 0을 전송해야 합니다." style={{ top: '-2px' }} />
            </p>
            {hasNameDifference && (
              <div style={{ background: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <strong style={{ color: '#ffc107' }}>💡 표시 이름 ≠ 맵 노드 이름:</strong> 대시보드에는 <strong>표시 이름</strong>이 표시되고, 실제 경로주행에는 <strong>맵 노드 이름</strong>이 사용됩니다.
              </div>
            )}
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>인덱스</th>
                  <th>표시 이름{hasNameDifference && <HelpTooltip text="대시보드에 표시되는 이름 (output_currentRobotLocation 등)" />}</th>
                  {hasNameDifference && <th>맵 노드 이름<HelpTooltip text="실제 경로주행에 사용되는 이름" /></th>}
                  {config.enableMultiStopQueue && <th style={{ background: 'rgba(88, 166, 255, 0.2)' }}>다중정차 (큐 추가)</th>}
                  {config.enableSingleDestination && <th style={{ background: 'rgba(63, 185, 80, 0.2)' }}>단일이동 (즉시 이동)</th>}
                </tr>
              </thead>
              <tbody>
                {nodeNames.map((name, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><code>{i}</code></td>
                    <td>{name} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(<code>ALL_NODES[{i}]</code>)</span></td>
                    {hasNameDifference && <td><code>{mapNames[i]}</code>{name !== mapNames[i] && <span style={{ color: 'var(--warning)', marginLeft: '0.5rem' }}>≠</span>}</td>}
                    {config.enableMultiStopQueue && <td><code>input_queueNodeIndex = {i}</code></td>}
                    {config.enableSingleDestination && <td><code>input_directDrivingNodeIndex = {i}</code></td>}
                  </tr>
                ))}
              </tbody>
            </table>

            {config.enableScenarioMode && config.scenarios.length > 0 && (
              <>
                <h4 style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: '0.5rem' }}>시나리오 매핑</h4>
                <table className="mapping-table">
                  <thead><tr><th>#</th><th>인덱스</th><th>표시 이름</th><th style={{ background: 'rgba(192, 132, 252, 0.2)' }}>시나리오 (이동 시작)</th><th>경로</th></tr></thead>
                  <tbody>
                    {config.scenarios.map((s, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td><code>{i}</code></td>
                        <td>{s.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(<code>scenarioNames[{i}]</code>)</span></td>
                        <td><code>input_scenarioIndex = {i}</code></td>
                        <td style={{ fontSize: '0.8rem' }}>{s.nodes.join(' → ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
      </CollapsibleSection>

      {/* Section: Screen Transitions */}
      <CollapsibleSection title="화면 전환 조건" icon="🔄" isOpen={expandedSections.has('screens')} onToggle={() => toggleSection('screens')}>
        <>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#ffb366' }}>변수 조건별 대시보드 자동 이동</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>(<code>conditionAutoRedirection</code>) 위젯을 각 화면에 배치하여 자동 전환</span>
              <HelpTooltip text="이 위젯을 대시보드 각 화면에 배치하면, 조건이 충족될 때 자동으로 해당 화면으로 전환됩니다. 예: robot_state가 '이동 중'이면 이동 중 화면으로 자동 전환" style={{ top: '-1px' }} />
            </p>
            <table className="mapping-table">
              <thead><tr><th>조건</th><th>값</th><th>이동 화면</th></tr></thead>
              <tbody>
                <tr><td><code>start_script</code></td><td><code>true</code></td><td>메인 화면</td></tr>
                <tr><td><code>robot_state</code></td><td><code>"이동 중"</code></td><td>이동 중</td></tr>
                <tr><td><code>robot_state</code></td><td><code>"충전 중"</code></td><td>충전 중</td></tr>
                {anyModeUsesWaitForButton(config) && (
                  <tr><td><code>robot_state</code></td><td><code>"버튼 대기"</code></td><td>도착 확인 버튼 화면</td></tr>
                )}
                {anyModeUsesCountdown(config) && (
                  <tr><td><code>robot_state</code></td><td><code>"카운트다운"</code></td><td>카운트다운 화면</td></tr>
                )}
                <tr><td><code>robot_state</code></td><td><code>"다음 목적지"</code></td><td>바로 다음 목적지 이동 (대시보드 필요 X)</td></tr>
                <tr><td><code>robot_state</code></td><td><code>"대기 중"</code></td><td>대기 중</td></tr>
                <tr><td><code>DRIVING_STATUS</code></td><td><code>"BLOCKED"</code></td><td>장애물 감지 중</td></tr>
                <tr><td><code>EMS</code></td><td><code>1</code></td><td>비상정지 중</td></tr>
                <tr><td><code>LOCALIZATION_STATUS</code></td><td><code>0</code></td><td>위치 추정 요청</td></tr>
              </tbody>
            </table>
          </>
      </CollapsibleSection>

      {/* Section: Night Charging */}
      {config.nightCharging.enabled && (
        <CollapsibleSection title="야간 충전 설정" icon="🌙" isOpen={expandedSections.has('nightCharging')} onToggle={() => toggleSection('nightCharging')}>
          <>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                야간 충전 윈도우가 활성화되어 있습니다. 이 시간대에는 특별한 충전 동작이 적용됩니다.
              </p>
              
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>⏰ 야간 충전 시간</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <p>
                  <strong>시작:</strong> {String(config.nightCharging.startHour).padStart(2, '0')}:{String(config.nightCharging.startMinute).padStart(2, '0')} → 
                  <strong> 종료:</strong> {String(config.nightCharging.endHour).padStart(2, '0')}:{String(config.nightCharging.endMinute).padStart(2, '0')}
                </p>
              </div>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>🔋 야간 충전 동작</h4>
              <table className="mapping-table" style={{ marginBottom: '1rem' }}>
                <thead><tr><th>기능</th><th>설명</th></tr></thead>
                <tbody>
                  <tr>
                    <td>충전 완료 시 자동 언도킹 방지</td>
                    <td>배터리가 가득 차도 야간 시간대에는 충전소에 머뭅니다</td>
                  </tr>
                  {config.nightCharging.autoChargeWhenIdle && (
                    <tr>
                      <td style={{ color: 'var(--success)' }}>✓ 대기 중 자동 충전</td>
                      <td>야간 시간대에 로봇이 대기 중이면 자동으로 충전소로 이동합니다</td>
                    </tr>
                  )}
                  <tr>
                    <td>수동 주행 명령</td>
                    <td>야간 시간대에도 버튼을 통한 수동 주행은 정상 작동합니다</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ background: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                <strong style={{ color: '#ffc107' }}>💡 참고:</strong> 야간 충전은 스크립트 내부에서 자동으로 처리됩니다. 대시보드에 별도 설정이 필요하지 않습니다.
              </div>
            </>
        </CollapsibleSection>
      )}

      {/* Section: Audio Settings */}
      {config.audio.enabled && (
        <CollapsibleSection title="오디오 설정 가이드" icon="🔊" isOpen={expandedSections.has('audio')} onToggle={() => toggleSection('audio')}>
          <>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                오디오 파일은 스크립트에서 직접 재생됩니다. 대시보드에 별도 설정이 필요하지 않습니다.
              </p>
              
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>📁 필수 오디오 파일</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>TCS 리소스관리</strong> → <strong>resource</strong> → <strong>audio</strong> 폴더에 .mp3 파일 배치</p>
                <table className="mapping-table" style={{ marginTop: '0.5rem' }}>
                  <thead><tr><th>이벤트</th><th>파일명</th><th>재생 방식</th><th>상태</th></tr></thead>
                  <tbody>
                    <tr style={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                      <td><strong>시스템 필수</strong></td>
                      <td><code>silent.mp3</code></td>
                      <td>오디오 중지/초기화용</td>
                      <td style={{ color: '#ffc107' }}>⚠️ 필수</td>
                    </tr>
                    {config.audio.playOnArrival && (
                      <tr><td>도착 시</td><td><code>{config.audio.arrivalSoundFile}.mp3</code></td><td>1회 재생</td><td style={{ color: 'var(--success)' }}>✓ 활성</td></tr>
                    )}
                    {config.audio.playOnDriveStart && (
                      <tr><td>주행 중</td><td><code>{config.audio.driveStartSoundFile}.mp3</code></td><td>무한 반복 (주행 종료까지)</td><td style={{ color: 'var(--success)' }}>✓ 활성</td></tr>
                    )}
                    {config.audio.playOnLowBattery && (
                      <tr><td>저배터리 경고</td><td><code>{config.audio.lowBatterySoundFile}.mp3</code></td><td>1회 재생</td><td style={{ color: 'var(--success)' }}>✓ 활성</td></tr>
                    )}
                    {config.audio.playOnBlocked && (
                      <tr><td>장애물 감지</td><td><code>{config.audio.blockedSoundFile}.mp3</code></td><td>무한 반복 (장애물 해제까지)</td><td style={{ color: 'var(--success)' }}>✓ 활성</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>🔊 오디오 재생 동작</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  <li><strong>주행 중 오디오</strong>: 주행이 시작되면 무한 반복 재생, 도착/취소 시 자동 중지</li>
                  <li><strong>장애물 감지 오디오</strong>: 장애물 감지(BLOCKED) 상태에서 무한 반복 재생</li>
                  <li><strong>도착 오디오</strong>: 목적지 도착 시 1회 재생</li>
                  <li><strong>저배터리 오디오</strong>: 저배터리 시 대기 상태에서 1회 재생</li>
                </ul>
              </div>
              
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>⚙️ 스크립트 함수</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                <p style={{ marginBottom: '0.25rem' }}><code>setSpeakerVolume({config.audio.volume});</code> <span style={{ color: 'var(--text-secondary)' }}>// 볼륨 설정</span></p>
                <p style={{ marginBottom: '0.25rem' }}><code>스피커재생("파일명", 반복횟수, 논블로킹);</code></p>
                <p style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}><span style={{ color: 'var(--text-secondary)' }}>• 반복횟수: 0=무한반복, 1=1회, 2=2회...</span></p>
                <p style={{ marginBottom: '0.25rem', paddingLeft: '1rem' }}><span style={{ color: 'var(--text-secondary)' }}>• 논블로킹: true=다음 코드 즉시 실행, false=재생 완료 대기</span></p>
                <p><code>스피커재생("silent", 1, true);</code> <span style={{ color: 'var(--text-secondary)' }}>// 오디오 중지</span></p>
              </div>
            </>
        </CollapsibleSection>
      )}

      {/* Section: Scenario Warning */}
      {config.enableScenarioMode && config.showScenarioPositionWarning && (
        <CollapsibleSection title="시나리오 위치 경고 설정" icon="⚠️" isOpen={expandedSections.has('scenarioWarning')} onToggle={() => toggleSection('scenarioWarning')}>
          <>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                시나리오에 "시작 위치 제한"이 설정되어 있고, 로봇이 해당 위치에 없을 때 경고 이미지를 표시합니다.
              </p>
              
              {/* Show which scenarios have start position restrictions */}
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>📋 시작 위치 제한이 설정된 시나리오</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {config.scenarios.filter(s => s.requireStartFrom && s.requireStartFrom.trim() !== '').length > 0 ? (
                  <table className="mapping-table">
                    <thead><tr><th>시나리오</th><th>필수 시작 위치</th></tr></thead>
                    <tbody>
                      {config.scenarios.filter(s => s.requireStartFrom && s.requireStartFrom.trim() !== '').map((s, i) => (
                        <tr key={i}>
                          <td>{s.name}</td>
                          <td><code>{s.requireStartFrom}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: 'var(--warning)' }}>⚠️ 시작 위치 제한이 설정된 시나리오가 없습니다. 경고가 표시되지 않습니다.</p>
                )}
              </div>
              
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>📁 경고 이미지 배치</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                <p><strong>TCS 리소스관리</strong> → <strong>resource</strong> → <strong>image</strong> 폴더에 경고 이미지 파일 배치</p>
              </div>
              
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>🖥️ 대시보드 설정</h4>
              <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong>변수 조건별 리소스 표시</strong> 위젯 사용:</p>
                <table className="mapping-table" style={{ marginTop: '0.5rem' }}>
                  <thead><tr><th>조건 변수</th><th>조건 값</th><th>표시 리소스</th></tr></thead>
                  <tbody>
                    <tr><td><code>scenarioWarning</code></td><td><code>true</code></td><td>경고 이미지 파일</td></tr>
                    <tr><td><code>scenarioWarning</code></td><td><code>false</code></td><td>공백 이미지 (투명 or 빈 이미지)</td></tr>
                  </tbody>
                </table>
                <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
                  <code>scenarioWarning</code>가 <code>true</code>일 때 경고 이미지가 표시되고, <code>false</code>일 때 공백 이미지로 전환됩니다.
                </p>
              </div>
            </>
        </CollapsibleSection>
      )}

      {/* Section: TCT State Warning - Global setting for all dashboards */}
      <CollapsibleSection title="TCS 상태별 경고 이미지 설정 (권장)" icon="🚨" isOpen={expandedSections.has('tctState')} onToggle={() => toggleSection('tctState')}>
        <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              TCT_STATE 변수를 사용하여 로봇 상태에 따른 경고 이미지를 표시합니다. <strong>모든 대시보드에 적용해야 하는 전역 설정</strong>입니다.
            </p>
            
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>📁 경고 이미지 배치</h4>
            <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>TCS 리소스관리</strong> → <strong>resource</strong> → <strong>image</strong> 폴더에 아래 파일 배치:</p>
              <table className="mapping-table" style={{ marginTop: '0.5rem' }}>
                <thead><tr><th>파일명</th><th>용도</th></tr></thead>
                <tbody>
                  <tr><td><code>자동동작실행안내.gif</code></td><td>자동 모드가 아닐때 사용자한테 안내</td></tr>
                  <tr><td><code>알람발생안내.gif</code></td><td>알람 발생 안내</td></tr>
                  <tr><td><code>공백.png</code></td><td>빈 이미지 (자동 모드 실행 중일 때)</td></tr>
                </tbody>
              </table>
            </div>
            
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>🖥️ 대시보드 설정</h4>
            <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>변수 조건별 리소스 표시</strong> 위젯 사용:</p>
              <table className="mapping-table" style={{ marginTop: '0.5rem' }}>
                <thead><tr><th>조건 변수</th><th>조건 값</th><th>표시 리소스</th></tr></thead>
                <tbody>
                  <tr><td><code>TCT_STATE</code></td><td><code>MANUAL_READY</code></td><td><code>자동동작실행안내.gif</code></td></tr>
                  <tr><td><code>TCT_STATE</code></td><td><code>AUTO_READY</code></td><td><code>자동동작실행안내.gif</code></td></tr>
                  <tr><td><code>TCT_STATE</code></td><td><code>STOPPED</code></td><td><code>자동동작실행안내.gif</code></td></tr>
                  <tr><td><code>TCT_STATE</code></td><td><code>ALARM</code></td><td><code>알람발생안내.gif</code></td></tr>
                  <tr><td><code>TCT_STATE</code></td><td><code>AUTO_RUNNING</code></td><td><code>공백.png</code></td></tr>
                </tbody>
              </table>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
                <strong>TCT_STATE 값 설명:</strong>
              </p>
              <ul style={{ marginTop: '0.25rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                <li><code>MANUAL_READY</code>: 수동 대기 상태</li>
                <li><code>AUTO_READY</code>: 자동 대기 상태</li>
                <li><code>STOPPED</code>: 정지 상태</li>
                <li><code>ALARM</code>: 알람 발생 상태</li>
                <li><code>AUTO_RUNNING</code>: 자동 실행 중 (경고 없음)</li>
              </ul>
            </div>
          </>
      </CollapsibleSection>

      {/* Section: Widgets */}
      <CollapsibleSection title="위젯 타입 참조" icon="🧩" isOpen={expandedSections.has('widgets')} onToggle={() => toggleSection('widgets')}>
        <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              대시보드에서 사용할 수 있는 위젯 타입입니다. 각 위젯은 특정 기능을 수행합니다.
              <HelpTooltip text="대시보드 편집기에서 위젯을 추가하고, 위젯 속성에서 아래 설정값을 입력합니다." style={{ top: '-1px' }} />
            </p>
            <table className="mapping-table">
              <thead><tr><th>위젯</th><th>용도</th><th>설정</th></tr></thead>
              <tbody>
                <tr><td><code>modifyVariable</code></td><td>변수변경</td><td><code>modifyDataList</code>에 변수/값</td></tr>
                <tr><td><code>userVariable</code></td><td>변수상태</td><td><code>name</code>에 변수명</td></tr>
                <tr><td><code>conditionAutoRedirection</code></td><td>자동 화면 전환</td><td><code>conditions</code>에 조건/대상</td></tr>
                <tr><td><code>scriptExecute</code></td><td>스크립트 실행</td><td><code>scriptName</code>: <code>{config.scriptName}</code></td></tr>
                <tr><td><code>scriptStop</code></td><td>스크립트 중지</td><td>설정 없음</td></tr>
                <tr><td><code>drivingCancel</code></td><td>주행 취소</td><td>설정 없음</td></tr>
                <tr><td><code>dashboardMove</code></td><td>화면 이동</td><td><code>dashboardName</code>에 대상 화면</td></tr>
              </tbody>
            </table>
          </>
      </CollapsibleSection>

      {/* Section: System Variables */}
      <CollapsibleSection title="시스템 내장 변수" icon="⚙️" isOpen={expandedSections.has('system')} onToggle={() => toggleSection('system')}>
        <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              TCS 엔진에서 제공하는 시스템 변수 목록입니다. 스크립트 및 대시보드에서 읽기 전용으로 사용 가능합니다.
            </p>

            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#87CEEB' }}>✓ BOOL 타입</h4>
            <table className="mapping-table" style={{ marginBottom: '1rem', tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '500px' }} />
                <col />
              </colgroup>
              <thead><tr><th style={{ background: 'rgba(135, 206, 235, 0.2)', color: '#d0d0d0' }}>변수</th><th>설명</th></tr></thead>
              <tbody>
                <tr><td><code>EMS_ON</code></td><td>비상정지 (0=해제, 1=활성)</td></tr>
                <tr><td><code>LOCALIZATION_STATUS</code></td><td>위치 추정 (0=미완료, 1=완료, 2=진행중)</td></tr>
                <tr><td><code>CHARGING_BATTERY</code></td><td>충전 중 (0=아니오, 1=예)</td></tr>
                <tr><td><code>DOCKING_STATE</code></td><td>도킹 상태 (0=언도킹, 1=도킹)</td></tr>
                <tr><td><code>MASTER_CONNECTED</code></td><td>마스터 연결 (0=끊김, 1=연결)</td></tr>
                <tr><td><code>PATHFIND_IS_DEADLOCK</code></td><td>경로 교착 상태</td></tr>
                <tr><td><code>PATHFIND_IS_POSSIBLE_CONCESSION</code></td><td>양보 가능 여부</td></tr>
                <tr><td><code>INTERNAL_PAUSE_ON</code></td><td>내부 일시정지</td></tr>
              </tbody>
            </table>

            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#f0e68c' }}>✓ INT 타입</h4>
            <table className="mapping-table" style={{ marginBottom: '1rem', tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '500px' }} />
                <col />
              </colgroup>
              <thead><tr><th style={{ background: 'rgba(240, 230, 140, 0.2)', color: '#d0d0d0' }}>변수</th><th>설명</th></tr></thead>
              <tbody>
                <tr><td><code>BATTERY_POWER</code></td><td>배터리 잔량 (%)</td></tr>
                <tr><td><code>ROBOT_ID</code></td><td>로봇 ID</td></tr>
                <tr><td><code>LINE_NO</code></td><td>현재 실행 중인 스크립트 라인 번호</td></tr>
                <tr><td><code>IS_ARRIVED</code></td><td>도착 여부</td></tr>
                <tr><td><code>IS_LOCALIZED</code></td><td>위치 추정 완료 여부</td></tr>
                <tr><td><code>IS_MODE_CHANGED</code></td><td>모드 변경됨</td></tr>
                <tr><td><code>IS_DRIVING_CANCELED</code></td><td>주행 취소됨</td></tr>
                <tr><td><code>NODE_STATUS</code></td><td>노드 상태</td></tr>
                <tr><td><code>TIME_YEAR</code></td><td>현재 년도</td></tr>
                <tr><td><code>TIME_MONTH</code></td><td>현재 월 (1-12)</td></tr>
                <tr><td><code>TIME_DAY</code></td><td>현재 일 (1-31)</td></tr>
                <tr><td><code>TIME_HOUR</code></td><td>현재 시 (0-23)</td></tr>
                <tr><td><code>TIME_MINUTE</code></td><td>현재 분 (0-59)</td></tr>
                <tr><td><code>TIME_SEC</code></td><td>현재 초 (0-59)</td></tr>
                <tr><td><code>TODAY_SECS</code></td><td>오늘 0시부터 경과된 초</td></tr>
                <tr><td><code>NAVI_MAIN_COMMAND_QUEUE_COUNT</code></td><td>네비 명령 큐 수</td></tr>
                <tr><td><code>TCT_MAIN_COMMAND_QUEUE_COUNT</code></td><td>TCT 명령 큐 수</td></tr>
              </tbody>
            </table>

            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#c084fc' }}>✓ DOUBLE 타입</h4>
            <table className="mapping-table" style={{ marginBottom: '1rem', tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '500px' }} />
                <col />
              </colgroup>
              <thead><tr><th style={{ background: 'rgba(192, 132, 252, 0.2)', color: '#d0d0d0' }}>변수</th><th>설명</th></tr></thead>
              <tbody>
                <tr><td><code>CURR_POS_X</code>, <code>CURR_POS_Y</code></td><td>현재 위치 좌표</td></tr>
                <tr><td><code>CURR_HEADING_RAD</code>, <code>CURR_HEADING_DEG</code></td><td>현재 방향 (라디안/도)</td></tr>
                <tr><td><code>CURR_VEL_X</code>, <code>CURR_VEL_Y</code></td><td>현재 속도</td></tr>
                <tr><td><code>GOAL_POS_X</code>, <code>GOAL_POS_Y</code></td><td>목표 위치 좌표</td></tr>
                <tr><td><code>REMAINING_DIST</code></td><td>남은 거리 (m)</td></tr>
                <tr><td><code>POSE_ACCURACY</code></td><td>위치 정확도 (0-1)</td></tr>
                <tr><td><code>PATHFIND_ELAPSED_TIME</code></td><td>경로 탐색 경과 시간</td></tr>
                <tr><td><code>PATHFIND_ESTIMATE_REMAINING_TIME</code></td><td>예상 남은 시간</td></tr>
                <tr><td><code>PATHFIND_ESTIMATE_REMAINING_DISTANCE</code></td><td>예상 남은 거리</td></tr>
                <tr><td><code>CURRENT_CLOCK</code></td><td>현재 클럭</td></tr>
                <tr><td><code>PI</code></td><td>원주율 상수</td></tr>
              </tbody>
            </table>

            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--success)' }}>✓ STRING 타입</h4>
            <table className="mapping-table" style={{ tableLayout: 'fixed', width: '100%' }}>
              <colgroup>
                <col style={{ width: '500px' }} />
                <col style={{ width: '350px' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <thead><tr><th style={{ background: 'rgba(63, 185, 80, 0.2)', color: '#d0d0d0' }}>변수</th><th>설명</th><th>예시 값</th></tr></thead>
              <tbody>
                <tr><td><code>DRIVING_STATUS</code></td><td>주행 상태</td><td>IDLE, MOVING, BLOCKED</td></tr>
                <tr><td><code>PATHFIND_STATE</code></td><td>경로 탐색 상태</td><td>IDLE, DRIVING, COMPLETED, CANCELED</td></tr>
                <tr><td><code>DRIVING_METHOD</code></td><td>주행 방식</td><td>UNKNOWN, AUTO_DYNAMIC, ...</td></tr>
                <tr><td><code>ENGINE_MODE</code></td><td>엔진 모드</td><td>AUTONOMOUS_DRIVE</td></tr>
                <tr><td><code>SENSOR_STATE</code></td><td>센서 상태</td><td>STABLE</td></tr>
                <tr><td><code>ENGINE_VERSION</code></td><td>엔진 버전</td><td>2.10.3</td></tr>
                <tr><td><code>ROBOT_NAME</code></td><td>로봇 이름</td><td>-</td></tr>
                <tr><td><code>LOCAL_TIME</code></td><td>현지 시각</td><td>2026-01-22_14:48:02</td></tr>
                <tr><td><code>ENGINE_TIME</code></td><td>엔진 시각 (ISO)</td><td>2026-01-22T14:48:00+09:00</td></tr>
                <tr><td><code>CURRENT_FLOOR</code></td><td>현재 층</td><td>1F</td></tr>
                <tr><td><code>PATHFIND_FINAL_GOAL_NAME</code></td><td>최종 목적지 이름</td><td>-</td></tr>
                <tr><td><code>CODELINE_TXT</code></td><td>현재 실행 중인 코드</td><td>대기시간(0.1);</td></tr>
              </tbody>
            </table>
          </>
      </CollapsibleSection>

      {/* Section: Troubleshooting */}
      <CollapsibleSection title="문제 해결" icon="🔧" isOpen={expandedSections.has('troubleshooting')} onToggle={() => toggleSection('troubleshooting')}>
        <table className="mapping-table">
          <thead><tr><th>증상</th><th>해결</th></tr></thead>
          <tbody>
            <tr><td>스크립트 실행 안됨</td><td><code>scriptName</code>이 파일명과 일치하는지 확인 (확장자 제외)</td></tr>
            <tr><td>버튼 반응 없음</td><td><code>modifyVariable</code>의 변수명/값 확인</td></tr>
            <tr><td>화면 전환 안됨</td><td><code>conditionAutoRedirection</code> 위젯 조건 확인</td></tr>
            <tr><td>노드 이동 실패</td><td>스크립트의 노드 이름이 맵과 정확히 일치하는지 확인</td></tr>
            <tr><td>충전소 도킹 실패</td><td>마커 ID ({config.chargingStationMarkerId}) 확인</td></tr>
          </tbody>
        </table>
      </CollapsibleSection>

      {/* Checklist */}
      <div className="card">
        <h3 className="card-title">✅ 설정 체크리스트</h3>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', fontSize: '0.9rem' }}>
          <li><code>{config.scriptName}.chill</code> 파일을 TCS 스크립트에 복붙</li>
          <li>대시보드를 설정에 맞게 수정</li>
          <li>노드 이름이 로봇 맵의 실제 노드 이름과 일치 확인</li>
          <li>충전소 마커 ID ({config.chargingStationMarkerId}) 확인</li>
          <li>각 버튼의 변수 값 설정 확인</li>
        </ol>
      </div>
    </div>
  )
}

