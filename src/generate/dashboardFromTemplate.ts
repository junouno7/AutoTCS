import { ProjectConfig, getNodeMapNames, getNodeDisplayNames, anyModeUsesCountdown, anyModeUsesWaitForButton } from '../model/ProjectConfig'

/**
 * Generates a comprehensive summary of dashboard configuration for display
 */
export function generateDashboardSummary(config: ProjectConfig): string {
  const displayNames = getNodeDisplayNames(config)
  const mapNames = getNodeMapNames(config)
  const hasNameDifference = displayNames.some((name, i) => name !== mapNames[i])
  
  // Build node mapping table
  let nodeMapping = ''
  for (let i = 0; i < displayNames.length; i++) {
    const varName = config.enableMultiStopQueue ? 'input_queueNodeIndex' : 'input_directDrivingNodeIndex'
    if (hasNameDifference && displayNames[i] !== mapNames[i]) {
      nodeMapping += `// 버튼 "${i + 1}" → ${varName} = ${i} → 표시: ${displayNames[i]} (맵: ${mapNames[i]})\n`
    } else {
      nodeMapping += `// 버튼 "${i + 1}" → ${varName} = ${i} → 노드: ${displayNames[i]}\n`
    }
  }

  // Build active modes description
  const activeModes: string[] = []
  if (config.enableMultiStopQueue) activeModes.push('다중 정차 큐 모드')
  if (config.enableSingleDestination) activeModes.push('단일 목적지 모드')
  if (config.enableScenarioMode) activeModes.push('시나리오 모드')

  // Build arrival behavior description (per mode)
  const getBehaviorText = (behavior: string, waitTime: number) => {
    if (behavior === 'waitForButton') return '버튼 대기'
    if (behavior === 'countdown') return `카운트다운 (${waitTime}초)`
    return '즉시 진행'
  }
  
  const arrivalDescParts: string[] = []
  if (config.enableMultiStopQueue) {
    const waitTime = config.waitTimeSettings.multiStopWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds
    arrivalDescParts.push(`다중정차: ${getBehaviorText(config.multiStopArrivalBehavior, waitTime)}`)
  }
  if (config.enableSingleDestination) {
    const waitTime = config.waitTimeSettings.singleDestWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds
    arrivalDescParts.push(`단일목적지: ${getBehaviorText(config.singleDestinationArrivalBehavior, waitTime)}`)
  }
  if (config.enableScenarioMode) {
    const waitTime = config.waitTimeSettings.scenarioWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds
    arrivalDescParts.push(`시나리오: ${getBehaviorText(config.scenarioArrivalBehavior, waitTime)}`)
  }
  const arrivalDesc = arrivalDescParts.join(', ') || '없음'

  // Build charging behavior description
  let chargingDesc = ''
  if (config.afterChargingBehavior === 'returnToStart') {
    chargingDesc = '충전 완료 후 시작 위치로 자동 복귀'
  } else if (config.afterChargingBehavior === 'stayAtCharger') {
    chargingDesc = '충전 완료 후 충전소에서 대기 (언도킹 안함)'
  } else {
    chargingDesc = '충전 완료 후 언도킹하여 제자리 대기'
  }

  // Build input variables section based on enabled modes
  let inputVars = ''
  if (config.enableMultiStopQueue) {
    inputVars += `
// [다중 정차 큐 모드 - 입력 변수]
// input_queueNodeIndex     = 0~${displayNames.length - 1}  → 큐에 노드 추가 (최대 ${config.queue.maxSize}개)
// input_startDrivingPressed = true   → 큐에 담긴 경로로 주행 시작
// input_clearQueue         = true    → 큐 비우기 (모든 노드 삭제)
${config.repeat.enabled ? `// input_repeatPlusPressed  = true    → 반복 횟수 증가
// input_repeatMinusPressed = true    → 반복 횟수 감소` : ''}`
  }
  if (config.enableSingleDestination) {
    inputVars += `

// [단일 목적지 모드 - 입력 변수]
// input_directDrivingNodeIndex = 0~${displayNames.length - 1}  → 클릭 즉시 해당 노드로 이동`
  }
  if (config.enableScenarioMode && config.scenarios.length > 0) {
    inputVars += `

// [시나리오 모드 - 입력 변수]
// input_scenarioIndex = 0~${config.scenarios.length - 1}  → 시나리오 시작
${config.scenarios.map((s, i) => `//   ${i}: "${s.name}" (${s.nodes.join(' → ')})`).join('\n')}`
  }

  // Build countdown-specific variables (if any mode uses countdown)
  let countdownVars = ''
  if (anyModeUsesCountdown(config)) {
    countdownVars = `
// [카운트다운 모드 전용]
${config.waitTimeSettings.allowSkip ? '// input_skipWait          = true    → 대기 스킵' : ''}
${config.waitTimeSettings.allowIncrease ? `// input_waitTimeIncrease  = true    → 대기 시간 +${config.waitTimeSettings.stepSize}초` : ''}
${config.waitTimeSettings.allowDecrease ? `// input_waitTimeDecrease  = true    → 대기 시간 -${config.waitTimeSettings.stepSize}초` : ''}
// output_waitCountdown      → 남은 대기 시간 (초)`
  }

  // Build output variables based on enabled modes
  let outputVars = ''
  if (config.enableMultiStopQueue) {
    outputVars += `
// [다중 정차 큐 모드 - 출력 변수]
${Array.from({ length: config.queue.maxSize }, (_, i) => `// output_selectedQueue[${i}]    → 다중정차 경유지 ${i + 1}번째`).join('\n')}
// output_queueSize          → 현재 큐에 담긴 목적지 수
// output_maxQueueSize       → 경유지 추가 최대 큐 크기 (${config.queue.maxSize})
${config.repeat.enabled ? `// output_repeatCount       → 설정된 반복 횟수
// output_repeatRemaining   → 남은 반복 횟수 (실시간)` : ''}`
  }

  return `/*
 * ===================================================================
 * 대시보드 설정 요약 및 가이드
 * Script Name: ${config.scriptName}
 * 생성 시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
 * ===================================================================
 */

// ============== 활성화된 모드 ==============
${activeModes.map(m => `// ✓ ${m}`).join('\n')}

// ============== 도착 동작 설정 ==============
// ${arrivalDesc}
${config.enableMultiStopQueue && config.multiStopCompletionReturn ? `// 다중정차 완료 후 복귀: ${config.multiStopCompletionReturn}` : ''}
${config.enableSingleDestination && config.singleDestCompletionReturn ? `// 단일이동 완료 후 복귀: ${config.singleDestCompletionReturn}` : ''}
${config.enableScenarioMode && config.scenarioCompletionReturn ? `// 시나리오 완료 후 복귀: ${config.scenarioCompletionReturn}` : ''}

// ============== 충전 동작 설정 ==============
// ${chargingDesc}
// 저배터리 임계값: ${config.batteryLowLevel}%
// 충전 완료 임계값: ${config.batteryHighLevel}%
// 자동 충전: ${config.autoChargeTrigger === 'never' ? '비활성화 (수동만)' : '대기 중 배터리 부족 시'}
${config.lowBatteryReturn.enabled && config.lowBatteryReturn.nodeName ? `// 저배터리 시 복귀 위치: ${config.lowBatteryReturn.nodeName} (충전 대신 이 위치로 이동)` : ''}

${config.nightCharging.enabled ? `// ============== 야간 충전 윈도우 ==============
// 시간: ${String(config.nightCharging.startHour).padStart(2, '0')}:${String(config.nightCharging.startMinute).padStart(2, '0')} ~ ${String(config.nightCharging.endHour).padStart(2, '0')}:${String(config.nightCharging.endMinute).padStart(2, '0')}
// 동작: 충전 완료 시 자동 언도킹 방지 (수동 주행 명령은 허용)` : ''}

${config.audio.enabled ? `// ============== 오디오 설정 ==============
// 볼륨: ${config.audio.volume}%
// 
// ⚠️ 필수 파일: silent.mp3 (오디오 중지/초기화용)
//
// 도착 시 사운드: ${config.audio.playOnArrival ? `활성화 (${config.audio.arrivalSoundFile}.mp3) - 1회 재생` : '비활성화'}
// 주행 중 사운드: ${config.audio.playOnDriveStart ? `활성화 (${config.audio.driveStartSoundFile}.mp3) - 주행 중 무한 반복, 도착/취소 시 자동 중지` : '비활성화'}
// 저배터리 사운드: ${config.audio.playOnLowBattery ? `활성화 (${config.audio.lowBatterySoundFile}.mp3) - 저배터리 시 1회 재생` : '비활성화'}
// 장애물 감지 사운드: ${config.audio.playOnBlocked ? `활성화 (${config.audio.blockedSoundFile}.mp3) - 장애물 감지(BLOCKED) 중 무한 반복` : '비활성화'}` : ''}

// ============== 화면 구성 ==============
//
// 1. default (기본 대시보드)
//    - 스크립트 시작 버튼 (scriptExecute: ${config.scriptName})
//    - 자동 모드 전환 버튼
//
// 2. 메인 화면
//    - 목적지 선택 화면
//    - 현재 위치 표시 (output_currentRobotLocation)
//
${config.enableMultiStopQueue ? `// 3. 경유지 설정
//    - ${displayNames.length}개 노드 버튼
//    - 다중정차 경유지 목록 표시 (output_selectedQueue[0~${config.queue.maxSize - 1}])
${config.repeat.enabled ? `//    - 반복 횟수 조절 버튼` : ''}
//    - 이동 시작 버튼
//` : ''}
// 4. 이동 중
//    - 목적지 표시 (output_targetNodeName)
//    - 남은 노드 수 (output_remainingNodes)
//    - 주행 취소 버튼
//
// 5. 도착 후 동작 (모드별로 다른 화면으로 이동)
//    - 도착 동작: ${arrivalDesc}
${anyModeUsesWaitForButton(config) ? `//
// 5-a. 버튼 대기 화면 (robot_state == "버튼 대기")
//    - 도착 확인 버튼 (isMoveComplete = true)` : ''}
${anyModeUsesCountdown(config) ? `//
// 5-b. 카운트다운 화면 (robot_state == "카운트다운")
//    - 카운트다운 표시 (output_waitCountdown)
${config.waitTimeSettings.allowSkip ? `//    - 스킵 버튼 (input_skipWait)` : ''}
${config.waitTimeSettings.allowIncrease ? `//    - 시간 증가 버튼 (input_waitTimeIncrease)` : ''}
${config.waitTimeSettings.allowDecrease ? `//    - 시간 감소 버튼 (input_waitTimeDecrease)` : ''}` : ''}
//
// 6. 충전 중
//    - 배터리 상태 표시 (BATTERY_POWER)
//
// 7. 장애물 감지 중
//    - 주행 취소 버튼
//
// 8. 비상정지 중
//    - 스크립트 재시작 버튼

// ============== 버튼 → 변수 매핑 ==============
${nodeMapping}
// [공통 버튼]
// "충전소 이동"   → input_goToCharger = true     → ${config.chargingStationName}
// "시작 위치"     → input_goToStart = true       → ${config.startNodeName}
// "취소"          → 대시보드 시스템 취소 버튼 사용 (drivingCancel 위젯)
${anyModeUsesWaitForButton(config) ? `//
// [버튼 대기 모드]
// "도착 확인"     → isMoveComplete = true        → 다음 목적지로 이동` : ''}
${inputVars}
${countdownVars}

// ============== 표시용 OUTPUT 변수 ==============
// start_script                → 스크립트 실행 상태 (true=실행 중, false=종료됨)
// robot_state                 → 현재 상태 머신 상태
// EMS                         → EMS 상태 (대시보드 화면 전환용, 0=정상, 1=EMS 활성화)
// output_currentRobotLocation → 현재 로봇 위치
// output_targetNodeName       → 현재 이동 중인 목적지
// output_remainingNodes       → 남은 목적지 수
${config.showScenarioPositionWarning ? `// scenarioWarning             → 시나리오 위치 경고 (true=경고 표시 중)` : ''}
${outputVars}

// ============== 화면 자동 전환 조건 ==============
// conditionAutoRedirection 위젯으로 설정:
//
// start_script == true         → 메인 화면
// start_script == false        → default
// robot_state == "이동 중"     → 이동 중 화면
// robot_state == "충전 중"     → 충전 중 화면
${anyModeUsesWaitForButton(config) ? `// robot_state == "버튼 대기"   → 도착 확인 버튼 화면` : ''}
${anyModeUsesCountdown(config) ? `// robot_state == "카운트다운"  → 카운트다운 화면` : ''}
// robot_state == "다음 목적지" → (짧은 상태, 화면 전환 불필요)
// robot_state == "대기 중"     → 대기 중 화면
// DRIVING_STATUS == "BLOCKED"  → 장애물 감지 중 화면
// EMS == 1                     → 비상정지 중 화면 (대시보드 동기화용 변수 사용)
// LOCALIZATION_STATUS == 0     → 위치 추정 요청 중 화면
${config.showScenarioPositionWarning ? `// scenarioWarning == true     → 시나리오 위치 경고 화면` : ''}

// ============== TCS 상태별 경고 이미지 (권장) ==============
// 모든 대시보드에 적용해야 하는 전역 설정입니다.
// '변수 조건별 리소스 표시' 위젯 사용:
//
// 조건 변수: TCT_STATE
//   MANUAL_READY  → 자동동작실행안내.gif
//   AUTO_READY    → 자동동작실행안내.gif
//   STOPPED       → 자동동작실행안내.gif
//   ALARM         → 알람발생안내.gif
//   AUTO_RUNNING  → 공백.png (빈 이미지)
//
// 필요 파일: 자동동작실행안내.gif, 알람발생안내.gif, 공백.png
// 파일 위치: TCS 리소스관리 → resource → image 폴더
${config.showScenarioPositionWarning ? `
// ============== 시나리오 위치 경고 위젯 ==============
// '변수 조건별 리소스 표시' 위젯 사용:
//
// 조건 변수: scenarioWarning
//   true   → 경고 이미지 파일
//   false  → 공백 이미지 (투명 or 빈 이미지)
` : ''}
// ============== 설정 체크리스트 ==============
// □ 스크립트 파일(${config.scriptName}.chill)을 TCS에 업로드
// □ 대시보드 가이드에 맞게 대시보드 수동 구성
// □ 노드 이름이 로봇 맵의 실제 노드와 일치하는지 확인
//   ${displayNames.slice(0, 3).join(', ')}${displayNames.length > 3 ? ', ...' : ''}
// □ 충전소 마커 ID(${config.chargingStationMarkerId})가 올바른지 확인
// □ 각 화면에서 버튼 동작 테스트
// □ 화면 자동 전환 테스트
${config.enableScenarioMode ? `// □ 시나리오 동작 테스트 (${config.scenarios.length}개 시나리오)` : ''}
${config.nightCharging.enabled ? `// □ 야간 충전 윈도우 테스트` : ''}
`
}

