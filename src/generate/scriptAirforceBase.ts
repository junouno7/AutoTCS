import { ProjectConfig, getNodeMapNames, getNodeDisplayNames, anyModeUsesCountdown } from '../model/ProjectConfig'

/**
 * Generates a complete Chillang TCS script based on user configuration
 * Supports all customizable behaviors including:
 * - Multiple driving modes (queue, single, scenario)
 * - Configurable arrival behavior (wait for button, countdown, auto-proceed)
 * - Configurable charging behavior (stay at charger, return to start, etc.)
 * - Night charging window
 * - Audio feedback
 * - Scenarios
 */
export function generateScript(config: ProjectConfig): string {
  const displayNames = getNodeDisplayNames(config)
  const mapNames = getNodeMapNames(config)
  const displayArrayStr = displayNames.map(n => `"${n}"`).join(', ')
  const mapArrayStr = mapNames.map(n => `"${n}"`).join(', ')
  const nodesSize = config.nodes.length
  
  // Build scenario arrays if enabled
  let scenarioDeclarations = ''
  let scenarioInit = ''
  if (config.enableScenarioMode && config.scenarios.length > 0) {
    const maxScenarioNodes = Math.max(...config.scenarios.map(s => s.nodes.length))
    const hasAnyStartRestriction = config.scenarios.some(s => s.requireStartFrom && s.requireStartFrom.trim() !== '')
    scenarioDeclarations = `
// 시나리오 정의
int MAX_SCENARIO_NODES = ${maxScenarioNodes};
int SCENARIO_COUNT = ${config.scenarios.length};
string scenarioNames[${config.scenarios.length}] = {${config.scenarios.map(s => `"${s.name}"`).join(', ')}};
string scenarioRoutes[${config.scenarios.length}][${maxScenarioNodes}] = {${config.scenarios.map(s => 
  `{${s.nodes.map(n => `"${n}"`).join(', ')}${s.nodes.length < maxScenarioNodes ? ', ' + Array(maxScenarioNodes - s.nodes.length).fill('""').join(', ') : ''}}`
).join(', ')}};
${hasAnyStartRestriction ? `string scenarioStartPositions[${config.scenarios.length}] = {${config.scenarios.map(s => `"${s.requireStartFrom || ''}"`).join(', ')}};  // 시나리오별 시작 위치 제한` : ''}
`
    scenarioInit = `
    // 시나리오 변수 초기화
    currentScenarioIndex = -1;
    isScenarioActive = false;`
  }

  // Build audio initialization if enabled
  let audioInit = ''
  if (config.audio.enabled) {
    audioInit = `
        setSpeakerVolume(AUDIO_VOLUME);
        스피커재생("silent", 1, true); // 음소거를 위한 초기화 (true = non-blocking)`
  }

  // Build night charging window calculation (야간 충전 윈도우 - 충전 완료 시 자동 언도킹 방지)
  let nightChargingLogic = ''
  if (config.nightCharging.enabled) {
    // Check if the time range crosses midnight (e.g., 22:00 ~ 06:00)
    const crossesMidnight = config.nightCharging.startHour > config.nightCharging.endHour || 
      (config.nightCharging.startHour === config.nightCharging.endHour && config.nightCharging.startMinute > config.nightCharging.endMinute)
    
    if (crossesMidnight) {
      // Crosses midnight: use OR (either in evening portion OR morning portion)
      nightChargingLogic = `
    // 야간 충전 윈도우 계산 (${String(config.nightCharging.startHour).padStart(2, '0')}:${String(config.nightCharging.startMinute).padStart(2, '0')} ~ ${String(config.nightCharging.endHour).padStart(2, '0')}:${String(config.nightCharging.endMinute).padStart(2, '0')}) - 자정 경과
    // 이 시간대에는 충전 완료 시 자동 언도킹하지 않고 계속 충전 상태 유지
    isNightChargeWindow = false;
    // 저녁 시간대 (시작시간 이후) OR 아침 시간대 (종료시간 이전)
    if ((TIME_HOUR > ${config.nightCharging.startHour} || (TIME_HOUR == ${config.nightCharging.startHour} && TIME_MINUTE >= ${config.nightCharging.startMinute})) || (TIME_HOUR < ${config.nightCharging.endHour} || (TIME_HOUR == ${config.nightCharging.endHour} && TIME_MINUTE < ${config.nightCharging.endMinute})))
    {
        isNightChargeWindow = true;
    }`
    } else {
      // Same day: use AND (after start AND before end)
      nightChargingLogic = `
    // 야간 충전 윈도우 계산 (${String(config.nightCharging.startHour).padStart(2, '0')}:${String(config.nightCharging.startMinute).padStart(2, '0')} ~ ${String(config.nightCharging.endHour).padStart(2, '0')}:${String(config.nightCharging.endMinute).padStart(2, '0')})
    // 이 시간대에는 충전 완료 시 자동 언도킹하지 않고 계속 충전 상태 유지
    isNightChargeWindow = false;
    // 시작시간 이후 AND 종료시간 이전
    if ((TIME_HOUR > ${config.nightCharging.startHour} || (TIME_HOUR == ${config.nightCharging.startHour} && TIME_MINUTE >= ${config.nightCharging.startMinute})) && (TIME_HOUR < ${config.nightCharging.endHour} || (TIME_HOUR == ${config.nightCharging.endHour} && TIME_MINUTE < ${config.nightCharging.endMinute})))
    {
        isNightChargeWindow = true;
    }`
    }
  }

  // Build mode-aware arrival behavior logic
  // Each driving mode can have its own arrival behavior and goes to its own dashboard screen
  const usesCountdown = anyModeUsesCountdown(config)
  
  // Helper function to get the state name for a given arrival behavior
  const getArrivalStateName = (behavior: string): string => {
    if (behavior === 'waitForButton') return '버튼 대기'
    if (behavior === 'countdown') return '카운트다운'
    return '다음 목적지' // autoProceed goes directly to next destination
  }
  
  // Get state names for each mode
  const singleDestArrivalState = getArrivalStateName(config.singleDestinationArrivalBehavior)
  const scenarioArrivalState = getArrivalStateName(config.scenarioArrivalBehavior)
  const multiStopArrivalState = getArrivalStateName(config.multiStopArrivalBehavior)
  
  // Determine which arrival states are needed
  const needsButtonWaitState = 
    (config.enableSingleDestination && config.singleDestinationArrivalBehavior === 'waitForButton') ||
    (config.enableScenarioMode && config.scenarioArrivalBehavior === 'waitForButton') ||
    (config.enableMultiStopQueue && config.multiStopArrivalBehavior === 'waitForButton')
  
  const needsCountdownState = usesCountdown
  
  // Generate button wait state handler
  const buttonWaitStateCode = needsButtonWaitState ? `
    // ============================================================
    // 버튼 대기 상태 (도착 확인 버튼 대기)
    // ============================================================
    else if (robot_state == "버튼 대기")
    {
        출력("도착 확인 대기 중 (isMoveComplete 버튼 대기)");
        로그출력("도착 확인 대기 중 (isMoveComplete 버튼 대기)");

        // isMoveComplete 버튼이 눌릴 때까지 대기
        while (EMS_ON == 0 && isMoveComplete == false)
        {
            // 주행 취소 체크
            if (IS_DRIVING_CANCELED == 1)
            {
                출력("    [Driving Canceled during wait]");
                로그출력("    [Driving Canceled during wait]");
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                robot_state = "INIT";
                break;
            }
            대기시간(0.2);
        }
        isMoveComplete = false;
        
        if (robot_state != "INIT")
        {
            robot_state = "다음 목적지";
        }
    }` : ''
  
  // Generate countdown state handler
  const countdownStateCode = needsCountdownState ? `
    // ============================================================
    // 카운트다운 상태 (타이머 대기)
    // ============================================================
    else if (robot_state == "카운트다운")
    {
        // 모드별 대기 시간 결정
        int currentWaitTime = 30;
${config.multiStopArrivalBehavior === 'countdown' ? `        if (isMultiStopActive == true)
        {
            currentWaitTime = multiStopWaitTime;
        }` : ''}
${config.singleDestinationArrivalBehavior === 'countdown' ? `        ${config.multiStopArrivalBehavior === 'countdown' ? 'else ' : ''}if (isSingleDrivingActive == true)
        {
            currentWaitTime = singleDestWaitTime;
        }` : ''}
${config.scenarioArrivalBehavior === 'countdown' ? `        ${config.multiStopArrivalBehavior === 'countdown' || config.singleDestinationArrivalBehavior === 'countdown' ? 'else ' : ''}if (isScenarioActive == true)
        {
            currentWaitTime = scenarioWaitTime;
        }` : ''}

        출력("카운트다운 시작 (" + currentWaitTime + "초)");
        로그출력("카운트다운 시작 (" + currentWaitTime + "초)");

        int waitCountdown = currentWaitTime;
        output_waitCountdown = waitCountdown;

        while (EMS_ON == 0 && waitCountdown > 0 && isMoveComplete == false)
        {
            // 주행 취소 체크
            if (IS_DRIVING_CANCELED == 1)
            {
                출력("    [Driving Canceled during countdown]");
                로그출력("    [Driving Canceled during countdown]");
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                robot_state = "INIT";
                break;
            }

            // 대기 시간 조절 버튼 처리
${config.waitTimeSettings.allowIncrease ? `            if (input_waitTimeIncrease == true)
            {
                waitCountdown = waitCountdown + ${config.waitTimeSettings.stepSize};
                output_waitCountdown = waitCountdown;
                출력("대기 시간 증가: " + waitCountdown + "초");
                input_waitTimeIncrease = false;
            }` : `            // 대기 시간 증가 비활성화`}
${config.waitTimeSettings.allowDecrease ? `            if (input_waitTimeDecrease == true)
            {
                if (waitCountdown > ${config.waitTimeSettings.stepSize})
                {
                    waitCountdown = waitCountdown - ${config.waitTimeSettings.stepSize};
                }
                else
                {
                    waitCountdown = 1;
                }
                output_waitCountdown = waitCountdown;
                출력("대기 시간 감소: " + waitCountdown + "초");
                input_waitTimeDecrease = false;
            }` : `            // 대기 시간 감소 비활성화`}
${config.waitTimeSettings.allowSkip ? `            if (input_skipWait == true)
            {
                출력("대기 스킵");
                로그출력("대기 스킵");
                input_skipWait = false;
                break;
            }` : `            // 대기 스킵 비활성화`}

            대기시간(1.0);
            waitCountdown--;
            output_waitCountdown = waitCountdown;
        }
        isMoveComplete = false;
        output_waitCountdown = 0;
        
        if (robot_state != "INIT")
        {
            robot_state = "다음 목적지";
        }
    }` : ''

  // Build after charging behavior
  let afterChargingLogic = ''
  if (config.afterChargingBehavior === 'returnToStart') {
    afterChargingLogic = `
            if (DOCKING_STATE == 1)
            {
                언도킹(CHARGING_STATION_MARKER_ID, false);
                // 언도킹 시작 대기 (DRIVING_METHOD가 UNDOCKING으로 변경될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && DRIVING_METHOD != "UNDOCKING")
                {
                    대기시간(0.1);
                }
                // 언도킹 완료 대기 (IS_ARRIVED가 1이 될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && IS_ARRIVED == 0)
                {
                    대기시간(0.1);
                }
            }

            출력("충전 완료 (" + BATTERY_POWER + "%), 출발지로 복귀");
            로그출력("충전 완료 (" + BATTERY_POWER + "%), 출발지로 복귀");

            currentNodeName = START_NODE_NAME;
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;

            robot_state = "이동 중";`
  } else if (config.afterChargingBehavior === 'goToIdle') {
    afterChargingLogic = `
            if (DOCKING_STATE == 1)
            {
                언도킹(CHARGING_STATION_MARKER_ID, false);
                // 언도킹 시작 대기 (DRIVING_METHOD가 UNDOCKING으로 변경될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && DRIVING_METHOD != "UNDOCKING")
                {
                    대기시간(0.1);
                }
                // 언도킹 완료 대기 (IS_ARRIVED가 1이 될 때까지)
                while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && IS_ARRIVED == 0)
                {
                    대기시간(0.1);
                }
            }

            출력("충전 완료 (" + BATTERY_POWER + "%), 대기 상태로 전환");
            로그출력("충전 완료 (" + BATTERY_POWER + "%), 대기 상태로 전환");

            isGoingToChargerActive = false;
            isMultiStopActive = false;

            robot_state = "대기 중";`
  } else {
    // stayAtCharger - do nothing, stay docked
    afterChargingLogic = `
            // 충전소에 대기 (언도킹 안함)
            if (hasLoggedChargingComplete == false)
            {
                출력("충전 완료 (" + BATTERY_POWER + "%), 충전소에서 대기 중");
                로그출력("충전 완료 (" + BATTERY_POWER + "%), 충전소에서 대기 중");
                hasLoggedChargingComplete = true;
            }
            // 사용자가 명시적으로 주행 시작 버튼을 눌러야 함`
  }

  // Build single destination mode logic
  let singleDestinationLogic = ''
  if (config.enableSingleDestination) {
    singleDestinationLogic = `
        // --- 단일 목적지 즉시 주행 ---
        else if (input_directDrivingNodeIndex >= 0 && input_directDrivingNodeIndex < ALL_NODES_SIZE)
        {
            string selected = ALL_NODES[input_directDrivingNodeIndex];
            currentNodeName = selected;
            // 모든 주행 플래그 초기화 후 단일 목적지 플래그만 설정
            isSingleDrivingActive = true;
            isMultiStopActive = false;
            isGoingToChargerActive = false;
            isReturningToStartActive = false;
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            
            출력("단일 노드 즉시 주행 시작: " + selected);
            로그출력("단일 노드 즉시 주행 시작: " + selected);
            
            robot_state = "이동 중";
            input_directDrivingNodeIndex = -1;
        }`
  }

  // Build scenario mode logic
  let scenarioModeLogic = ''
  if (config.enableScenarioMode && config.scenarios.length > 0) {
    // Check if any scenario has a requireStartFrom restriction
    const hasAnyStartRestriction = config.scenarios.some(s => s.requireStartFrom && s.requireStartFrom.trim() !== '')
    
    scenarioModeLogic = `
        // --- 시나리오 시작 ---
        else if (input_scenarioIndex >= 0 && input_scenarioIndex < SCENARIO_COUNT)
        {
            ${hasAnyStartRestriction ? `// 시나리오별 시작 위치 확인
            string requiredPosition = scenarioStartPositions[input_scenarioIndex];
            bool canStart = true;
            
            if (requiredPosition != "" && output_currentRobotLocation != requiredPosition)
            {
                canStart = false;
                ${config.showScenarioPositionWarning ? `scenarioWarning = true;
                대기시간(${config.warningDisplayDuration}.0);
                scenarioWarning = false;` : ''}
                출력("시나리오 시작 불가: " + requiredPosition + "에서만 시작 가능 (현재: " + output_currentRobotLocation + ")");
                로그출력("시나리오 시작 불가: " + requiredPosition + "에서만 시작 가능 (현재: " + output_currentRobotLocation + ")");
                input_scenarioIndex = -1;
            }
            
            if (canStart)
            {` : ''}
                // 시나리오 로드
                currentScenarioIndex = input_scenarioIndex;
                scenarioNodeCount = 0;
                
                for (int i = 0; i < MAX_SCENARIO_NODES; i++)
                {
                    activeScenarioRoute[i] = scenarioRoutes[currentScenarioIndex][i];
                    if (activeScenarioRoute[i] != "")
                    {
                        scenarioNodeCount++;
                    }
                }
                
                출력("시나리오 " + scenarioNames[currentScenarioIndex] + " 로드 완료 (노드 수: " + scenarioNodeCount + ")");
                로그출력("시나리오 " + scenarioNames[currentScenarioIndex] + " 로드 완료 (노드 수: " + scenarioNodeCount + ")");
                
                // 모든 주행 플래그 초기화 후 시나리오 플래그만 설정
                isScenarioActive = true;
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                scenarioNodeIndex = 0;
                currentNodeName = activeScenarioRoute[0];
                
                robot_state = "이동 중";
                input_scenarioIndex = -1;
            ${hasAnyStartRestriction ? `}` : ''}
        }`
  }

  // Build audio on arrival logic
  let audioOnArrival = ''
  if (config.audio.enabled && config.audio.playOnArrival) {
    audioOnArrival = `
                    스피커재생(ARRIVAL_AUDIO, 1, true);`
  }

  // Build multi-stop completion return logic
  let multiStopCompletionLogic = ''
  if (config.multiStopCompletionReturn) {
    // Go to specified node after multi-stop completes
    const isChargingStation = config.multiStopCompletionReturn === config.chargingStationName
    multiStopCompletionLogic = `
                    // 다중 정차 주행 완료 후 복귀 위치로 이동
                    출력("다중 정차 주행 완료, 복귀 위치로 이동: ${config.multiStopCompletionReturn}");
                    로그출력("다중 정차 주행 완료, 복귀 위치로 이동: ${config.multiStopCompletionReturn}");
                    currentNodeName = "${config.multiStopCompletionReturn}";
                    isMultiStopActive = false;
                    ${isChargingStation ? `isGoingToChargerActive = true;
                    isReturningToStartActive = false;` : `isReturningToStartActive = true;
                    isGoingToChargerActive = false;`}
                    robot_state = "이동 중";`
  } else {
    multiStopCompletionLogic = `
                    // 다중 정차 주행 완료, 대기 상태로 전환 (제자리)
                    출력("다중 정차 주행 완료");
                    로그출력("다중 정차 주행 완료");
                    isMultiStopActive = false;
                    robot_state = "INIT";`
  }

  // Build scenario completion return logic
  let scenarioCompletionLogic = ''
  if (config.scenarioCompletionReturn) {
    const isChargingStation = config.scenarioCompletionReturn === config.chargingStationName
    scenarioCompletionLogic = `출력("시나리오 완료, 복귀 위치로 이동: ${config.scenarioCompletionReturn}");
                로그출력("시나리오 완료, 복귀 위치로 이동: ${config.scenarioCompletionReturn}");
                currentNodeName = "${config.scenarioCompletionReturn}";
                ${isChargingStation ? `isGoingToChargerActive = true;
                isReturningToStartActive = false;` : `isReturningToStartActive = true;
                isGoingToChargerActive = false;`}
                robot_state = "이동 중";`
  } else {
    scenarioCompletionLogic = `출력("시나리오 완료");
                로그출력("시나리오 완료");
                robot_state = "INIT";`
  }

  // Build single destination completion return logic
  let singleDestCompletionLogic = ''
  if (config.singleDestCompletionReturn) {
    const isChargingStation = config.singleDestCompletionReturn === config.chargingStationName
    singleDestCompletionLogic = `
            // 단일 목적지 완료 후 복귀 위치로 이동
            출력("단일 목적지 완료, 복귀 위치로 이동: ${config.singleDestCompletionReturn}");
            로그출력("단일 목적지 완료, 복귀 위치로 이동: ${config.singleDestCompletionReturn}");
            currentNodeName = "${config.singleDestCompletionReturn}";
            isSingleDrivingActive = false;
            ${isChargingStation ? `isGoingToChargerActive = true;
            isReturningToStartActive = false;` : `isReturningToStartActive = true;
            isGoingToChargerActive = false;`}
            robot_state = "이동 중";`
  } else {
    singleDestCompletionLogic = `
            // 단일 목적지 완료, 대기 상태로 전환 (제자리)
            출력("단일 목적지 완료");
            로그출력("단일 목적지 완료");
            isSingleDrivingActive = false;
            robot_state = "INIT";`
  }

  // Location variable update logic - only on arrival if setting is 'arrival'
  const locationUpdateLogic = config.updateLocationOn === 'arrival' ? `output_currentRobotLocation = currentNodeName;  // 도착 시 위치 업데이트` : `// 위치 업데이트는 주행 시작 시 수행됨`

  return `//----------------------------------------------------------------------------------------------------------------------------//
// 자동 생성된 TCS 스크립트: ${config.scriptName}
// 생성 시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
// 설정: 
//   - 주행 모드: ${config.enableMultiStopQueue ? '다중정차큐 ' : ''}${config.enableSingleDestination ? '단일목적지 ' : ''}${config.enableScenarioMode ? '시나리오 ' : ''}
//   - 도착 동작: ${config.enableMultiStopQueue ? `다중정차(${config.multiStopArrivalBehavior === 'waitForButton' ? '버튼' : config.multiStopArrivalBehavior === 'countdown' ? `카운트다운${config.waitTimeSettings.multiStopWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}초` : '즉시'}) ` : ''}${config.enableSingleDestination ? `단일(${config.singleDestinationArrivalBehavior === 'waitForButton' ? '버튼' : config.singleDestinationArrivalBehavior === 'countdown' ? `카운트다운${config.waitTimeSettings.singleDestWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}초` : '즉시'}) ` : ''}${config.enableScenarioMode ? `시나리오(${config.scenarioArrivalBehavior === 'waitForButton' ? '버튼' : config.scenarioArrivalBehavior === 'countdown' ? `카운트다운${config.waitTimeSettings.scenarioWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds}초` : '즉시'})` : ''}
//   - 충전: ${config.afterChargingBehavior === 'returnToStart' ? '완료 후 시작위치 복귀' : config.afterChargingBehavior === 'stayAtCharger' ? '완료 후 충전소 대기' : '완료 후 제자리 대기'}${config.lowBatteryReturn.enabled && config.lowBatteryReturn.nodeName ? `, 저배터리 시 ${config.lowBatteryReturn.nodeName}로 복귀` : ''}
${config.nightCharging.enabled ? `//   - 야간 충전: ${String(config.nightCharging.startHour).padStart(2, '0')}:${String(config.nightCharging.startMinute).padStart(2, '0')}~${String(config.nightCharging.endHour).padStart(2, '0')}:${String(config.nightCharging.endMinute).padStart(2, '0')}` : ''}${config.repeat.enabled ? `
//   - 반복: 기본 ${config.repeat.defaultCount}회, 최대 ${config.repeat.maxCount}회` : ''}${config.audio.enabled ? `
//   - 오디오: 볼륨 ${config.audio.volume}%` : ''}${(config.multiStopCompletionReturn || config.singleDestCompletionReturn || config.scenarioCompletionReturn) ? `
//   - 완료 후 복귀: ${config.enableMultiStopQueue && config.multiStopCompletionReturn ? `다중정차→${config.multiStopCompletionReturn} ` : ''}${config.enableSingleDestination && config.singleDestCompletionReturn ? `단일→${config.singleDestCompletionReturn} ` : ''}${config.enableScenarioMode && config.scenarioCompletionReturn ? `시나리오→${config.scenarioCompletionReturn}` : ''}` : ''}
//----------------------------------------------------------------------------------------------------------------------------//

// ************** 운용 파라미터 **************

string START_NODE_NAME = "${config.startNodeName}";                         // 대기장소
string CHARGING_STATION_NAME = "${config.chargingStationName}";             // 충전 스테이션 이름
int CHARGING_STATION_MARKER_ID = ${config.chargingStationMarkerId};         // 충전 스테이션 마커 ID

int BATTERY_LOW_LEVEL = ${config.batteryLowLevel};                          // 자동 충전 시작 배터리
int BATTERY_HIGH_LEVEL = ${config.batteryHighLevel};                        // 충전 완료 배터리

int MAX_QUEUE = ${config.queue.maxSize};                                    // 최대 다중 정차 큐 크기 (설정에서 변경 가능)
int ALL_NODES_SIZE = ${nodesSize};                                          // 총 노드 수

${config.audio.enabled ? `// 오디오 설정
int AUDIO_VOLUME = ${config.audio.volume};                                 // 오디오 볼륨
${config.audio.playOnArrival ? `string ARRIVAL_AUDIO = "${config.audio.arrivalSoundFile}";              // 도착 사운드 파일명` : ''}
${config.audio.playOnDriveStart ? `string DRIVE_START_AUDIO = "${config.audio.driveStartSoundFile}";      // 주행 시작 사운드 파일명` : ''}
${config.audio.playOnLowBattery ? `string LOW_BATTERY_AUDIO = "${config.audio.lowBatterySoundFile}";      // 저배터리 사운드 파일명` : ''}
${config.audio.playOnBlocked ? `string BLOCKED_AUDIO = "${config.audio.blockedSoundFile}";              // 장애물 감지 사운드 파일명` : ''}` : ''}

${config.multiStopArrivalBehavior === 'countdown' ? `int multiStopWaitTime = ${config.waitTimeSettings.multiStopWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds};          // 다중정차 대기 시간 (초)` : ''}
${config.singleDestinationArrivalBehavior === 'countdown' ? `int singleDestWaitTime = ${config.waitTimeSettings.singleDestWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds};          // 단일 목적지 대기 시간 (초)` : ''}
${config.scenarioArrivalBehavior === 'countdown' ? `int scenarioWaitTime = ${config.waitTimeSettings.scenarioWaitTimeSeconds ?? config.waitTimeSettings.waitTimeSeconds};          // 시나리오 대기 시간 (초)` : ''}

// 전체 노드 목록
string ALL_NODES[${nodesSize}] = {${displayArrayStr}};
${!config.syncNodeDisplayNames ? `// 맵 노드 이름 (경로주행용 - 표시 이름과 다를 때만 사용)
string ALL_MAP_NODES[${nodesSize}] = {${mapArrayStr}};` : ''}
${scenarioDeclarations}


// ************** 대시보드 INPUT 변수 (대시보드 → 스크립트) **************

${config.enableMultiStopQueue ? `int input_queueNodeIndex = -1;                              // 큐에 추가할 노드 인덱스
bool input_startDrivingPressed = false;                     // 주행 시작 버튼
bool input_clearQueue = false;                              // 큐 비우기 버튼` : ''}
${config.enableSingleDestination ? `int input_directDrivingNodeIndex = -1;                     // 단일 목적지 노드 인덱스` : ''}
${config.enableScenarioMode ? `int input_scenarioIndex = -1;                              // 시나리오 인덱스` : ''}
bool isMoveComplete = false;                                // 도착 확인 버튼
${config.repeat.enabled ? `bool input_repeatPlusPressed = false;                       // 반복 횟수 증가
bool input_repeatMinusPressed = false;                      // 반복 횟수 감소` : ''}
${usesCountdown && config.waitTimeSettings.allowSkip ? `bool input_skipWait = false;                               // 대기 스킵 버튼` : ''}
${usesCountdown && config.waitTimeSettings.allowIncrease ? `bool input_waitTimeIncrease = false;                       // 대기 시간 증가` : ''}
${usesCountdown && config.waitTimeSettings.allowDecrease ? `bool input_waitTimeDecrease = false;                       // 대기 시간 감소` : ''}
bool input_goToCharger = false;                             // 충전소 이동 버튼
bool input_goToStart = false;                               // 시작 위치 이동 버튼


// ************** 대시보드 OUTPUT 변수 (스크립트 → 대시보드) **************

${config.enableMultiStopQueue ? `string output_selectedQueue[${config.queue.maxSize}];                       // 선택된 큐 목록
int output_queueSize = 0;                                   // 현재 큐 크기
int output_maxQueueSize = ${config.queue.maxSize};                           // 최대 큐 크기` : ''}
${config.repeat.enabled ? `int output_repeatCount = ${config.repeat.defaultCount};                        // 설정된 반복 횟수
int output_repeatRemaining = 0;                             // 남은 반복 횟수` : ''}
string output_currentRobotLocation = "";                    // 현재 로봇 위치
string output_targetNodeName = "";                          // 현재 목적지
int output_remainingNodes = 0;                              // 남은 노드 수
${usesCountdown ? `int output_waitCountdown = 0;                              // 대기 카운트다운 (초)` : ''}
${config.showScenarioPositionWarning ? `bool scenarioWarning = false;                              // 시나리오 위치 경고` : ''}


// ************** 시스템 변수 **************

string robot_state = "INIT";
string previousState = "INIT";
int EMS = 0;                                                    // EMS 상태 (대시보드 동기화용, 0.5초 지연)

${config.enableMultiStopQueue ? `string queue[${config.queue.maxSize}];
int queueSize = 0;
int queueIndex = 0;` : ''}

${config.repeat.enabled ? `int repeatRequested = ${config.repeat.defaultCount};
int repeatRemaining = 0;` : ''}

bool isMultiStopActive = false;
bool isGoingToChargerActive = false;
bool isReturningToStartActive = false;
bool hasLoggedChargingComplete = false;  // 충전 완료 메시지 중복 출력 방지
${config.audio.enabled && config.audio.playOnLowBattery ? `bool hasPlayedLowBatteryWarning = false;  // 저배터리 경고 중복 재생 방지` : ''}
${config.nightCharging.enabled ? `bool isNightChargeWindow = false;  // 야간 충전 윈도우 상태` : ''}
${config.enableSingleDestination ? `bool isSingleDrivingActive = false;` : ''}
${config.enableScenarioMode ? `bool isScenarioActive = false;
int currentScenarioIndex = -1;
int scenarioNodeIndex = 0;
int scenarioNodeCount = 0;
string activeScenarioRoute[${config.scenarios.length > 0 ? Math.max(...config.scenarios.map(s => s.nodes.length)) : 1}];` : ''}

string currentNodeName = "";
bool start_script = true;

//----------------------------------------------------------------------------------------------------------------------------//


// ************** 메인 루프 시작 **************

while(EMS_ON == 0)
{
    // 상태 변화 출력 (디버깅)
    if (previousState != robot_state)
    {
        출력("  robot_state changed, from [" + previousState + "] to [" + robot_state + "]");
        로그출력("  robot_state changed, from [" + previousState + "] to [" + robot_state + "]");
        previousState = robot_state;
    }
${nightChargingLogic}

    // ============================================================
    // INIT 상태
    // ============================================================
    if (robot_state == "INIT")
    {${audioInit}
        ${config.enableMultiStopQueue ? `// 큐 초기화
        for (int i = 0; i < MAX_QUEUE; i++)
        {
            queue[i] = "";
            output_selectedQueue[i] = "";
        }
        queueSize = 0;
        queueIndex = 0;
        output_queueSize = 0;
        input_queueNodeIndex = -1;
        input_startDrivingPressed = false;` : ''}
        ${config.repeat.enabled ? `repeatRequested = ${config.repeat.defaultCount};
        repeatRemaining = 0;
        output_repeatCount = ${config.repeat.defaultCount};
        output_repeatRemaining = 0;` : ''}
        isMultiStopActive = false;
        isGoingToChargerActive = false;
        isReturningToStartActive = false;
        ${config.enableSingleDestination ? `isSingleDrivingActive = false;
        input_directDrivingNodeIndex = -1;` : ''}
        ${config.enableScenarioMode ? scenarioInit : ''}
        isMoveComplete = false;
        ${config.audio.enabled && config.audio.playOnLowBattery ? `hasPlayedLowBatteryWarning = false;  // 대기 중 진입 시 저배터리 경고 재생 가능하도록 리셋` : ''}

        출력("INIT 완료, 대기 중으로 전환");
        로그출력("INIT 완료, 대기 중으로 전환");
        robot_state = "대기 중";
    }

    // ============================================================
    // 대기 중 상태
    // ============================================================
    else if (robot_state == "대기 중")
    {
${config.audio.enabled && config.audio.playOnLowBattery ? `        // --- 저배터리 경고 오디오 (대기 중 상태 진입 시 1회 재생, 다른 오디오와 충돌 방지) ---
        if (BATTERY_POWER < BATTERY_LOW_LEVEL && hasPlayedLowBatteryWarning == false)
        {
            스피커재생(LOW_BATTERY_AUDIO, 1, true);
            hasPlayedLowBatteryWarning = true;
            출력("저배터리 경고 오디오 재생");
        }
` : ''}
        ${config.lowBatteryReturn.enabled && config.lowBatteryReturn.nodeName ? `// --- 저배터리 시 복귀 위치로 이동 (자동 충전 대신) ---
        // 이미 복귀 위치에 있으면 다시 주행하지 않음
        if (BATTERY_POWER < BATTERY_LOW_LEVEL && output_currentRobotLocation != "${config.lowBatteryReturn.nodeName}")
        {
            출력("배터리 부족 (" + BATTERY_POWER + "%), 복귀 위치로 이동: ${config.lowBatteryReturn.nodeName}");
            로그출력("배터리 부족 (" + BATTERY_POWER + "%), 복귀 위치로 이동: ${config.lowBatteryReturn.nodeName}");
            currentNodeName = "${config.lowBatteryReturn.nodeName}";
            // 모든 주행 플래그 초기화 후 시작 위치 복귀 플래그 설정
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
        }` : config.autoChargeTrigger !== 'never' ? `// --- 자동 충전 체크 ---
        if (BATTERY_POWER < BATTERY_LOW_LEVEL)
        {
            출력("배터리 부족 (" + BATTERY_POWER + "%), 충전 스테이션으로 자동 이동");
            로그출력("배터리 부족 (" + BATTERY_POWER + "%), 충전 스테이션으로 자동 이동");
            currentNodeName = CHARGING_STATION_NAME;
            // 모든 주행 플래그 초기화
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
        }` : '// 자동 충전 비활성화'}
        ${config.nightCharging.enabled && config.nightCharging.autoChargeWhenIdle ? `
        // --- 야간 충전 윈도우: 대기 중 자동 충전 ---
        ${(config.lowBatteryReturn.enabled && config.lowBatteryReturn.nodeName) || config.autoChargeTrigger !== 'never' ? `else` : ''} if (isNightChargeWindow == true)
        {
            출력("야간 충전 윈도우 - 자동 충전소 이동");
            로그출력("야간 충전 윈도우 - 자동 충전소 이동");
            currentNodeName = CHARGING_STATION_NAME;
            // 모든 주행 플래그 초기화
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
        }` : ''}

        // --- 충전소/시작 위치 이동 버튼 ---
        ${(config.lowBatteryReturn.enabled && config.lowBatteryReturn.nodeName) || config.autoChargeTrigger !== 'never' || (config.nightCharging.enabled && config.nightCharging.autoChargeWhenIdle) ? `else` : ''} if (input_goToCharger == true)
        {
            currentNodeName = CHARGING_STATION_NAME;
            // 모든 주행 플래그 초기화 후 충전소 이동 플래그만 설정
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
            input_goToCharger = false;
        }
        else if (input_goToStart == true)
        {
            currentNodeName = START_NODE_NAME;
            // 모든 주행 플래그 초기화 후 시작위치 복귀 플래그만 설정
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
            input_goToStart = false;
        }
${config.enableMultiStopQueue ? `
        // --- 큐에 노드 추가 ---
        else if (input_queueNodeIndex >= 0 && input_queueNodeIndex < ALL_NODES_SIZE)
        {
            if (queueSize < MAX_QUEUE)
            {
                string nodeName = ALL_NODES[input_queueNodeIndex];
                queue[queueSize] = nodeName;
                output_selectedQueue[queueSize] = nodeName;
                queueSize++;
                output_queueSize = queueSize;
                출력("큐에 노드 추가: " + nodeName + " (큐 크기: " + queueSize + ")");
            }
            else
            {
                출력("큐가 가득 찼습니다 (최대 " + MAX_QUEUE + "개)");
            }
            input_queueNodeIndex = -1;
        }
        // --- 큐 비우기 ---
        else if (input_clearQueue == true)
        {
            for (int i = 0; i < MAX_QUEUE; i++)
            {
                queue[i] = "";
                output_selectedQueue[i] = "";
            }
            queueSize = 0;
            output_queueSize = 0;
            출력("큐가 비워졌습니다");
            로그출력("큐가 비워졌습니다");
            input_clearQueue = false;
        }
        ${config.repeat.enabled ? `// --- 반복 횟수 조절 ---
        else if (input_repeatPlusPressed == true)
        {
            ${config.repeat.maxCount ? `if (repeatRequested < ${config.repeat.maxCount})
            {` : ''}
                repeatRequested++;
                output_repeatCount = repeatRequested;
            ${config.repeat.maxCount ? `}` : ''}
            input_repeatPlusPressed = false;
        }
        else if (input_repeatMinusPressed == true)
        {
            if (repeatRequested > 1)
            {
                repeatRequested--;
                output_repeatCount = repeatRequested;
            }
            input_repeatMinusPressed = false;
        }` : ''}
        // --- 주행 시작 버튼 ---
        else if (input_startDrivingPressed == true)
        {
            if (queueSize > 0)
            {
                출력("다중 정차 주행 시작 (큐 크기: " + queueSize + "${config.repeat.enabled ? ', 반복: " + repeatRequested + "회)' : ')'}");
                // 모든 주행 플래그 초기화 후 다중 정차 플래그만 설정
                isMultiStopActive = true;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.repeat.enabled ? `repeatRemaining = repeatRequested - 1;
                output_repeatRemaining = repeatRemaining;` : ''}
                queueIndex = 0;
                currentNodeName = queue[0];
                robot_state = "이동 중";
            }
            else
            {
                출력("큐가 비어있습니다");
            }
            input_startDrivingPressed = false;
        }` : ''}
${singleDestinationLogic}
${scenarioModeLogic}
    }

    // ============================================================
    // 이동 중 상태
    // ============================================================
    else if (robot_state == "이동 중")
    {
        output_targetNodeName = currentNodeName;
${config.updateLocationOn === 'driveStart' ? `        output_currentRobotLocation = currentNodeName;  // 주행 시작 시 위치 업데이트` : ''}
        ${config.enableMultiStopQueue && config.enableScenarioMode ? `if (isMultiStopActive == true)
        {
            output_remainingNodes = queueSize - queueIndex;
        }
        else if (isScenarioActive == true)
        {
            output_remainingNodes = scenarioNodeCount - scenarioNodeIndex;
        }
        else
        {
            output_remainingNodes = 1;
        }` : config.enableMultiStopQueue ? `if (isMultiStopActive == true)
        {
            output_remainingNodes = queueSize - queueIndex;
        }
        else
        {
            output_remainingNodes = 1;
        }` : config.enableScenarioMode ? `if (isScenarioActive == true)
        {
            output_remainingNodes = scenarioNodeCount - scenarioNodeIndex;
        }
        else
        {
            output_remainingNodes = 1;
        }` : 'output_remainingNodes = 1;'}

        출력("    [Current Goal]: " + currentNodeName);

        // 언도킹 (충전 중 상태에서 주행 시작 시)
        if ((CHARGING_BATTERY == 1 || DOCKING_STATE == 1) && currentNodeName != CHARGING_STATION_NAME)
        {
            출력("    [Undock before driving]");
            언도킹(CHARGING_STATION_MARKER_ID, false);
            // 언도킹 시작 대기 (DRIVING_METHOD가 UNDOCKING으로 변경될 때까지)
            while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && DRIVING_METHOD != "UNDOCKING")
            {
                대기시간(0.1);
            }
            // 언도킹 완료 대기 (IS_ARRIVED가 1이 될 때까지)
            while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && IS_ARRIVED == 0)
            {
                대기시간(0.1);
            }
            
            // 언도킹 중 취소되었으면 주행 진행하지 않고 INIT으로 복귀
            if (IS_DRIVING_CANCELED == 1 || EMS_ON == 1)
            {
                출력("    [Canceled during undocking]");
                로그출력("    [Canceled during undocking]");
                
                // 주행 시스템 리셋 대기
                while (EMS_ON == 0 && (PATHFIND_STATE == "DRIVING" || DRIVING_STATUS != "IDLE"))
                {
                    대기시간(0.1);
                }
                
                ${config.enableMultiStopQueue ? `// 큐 초기화
                for (int i = 0; i < MAX_QUEUE; i++)
                {
                    queue[i] = "";
                    output_selectedQueue[i] = "";
                }
                queueSize = 0;
                queueIndex = 0;
                output_queueSize = 0;` : ''}
                ${config.repeat.enabled ? `repeatRequested = ${config.repeat.defaultCount};
                repeatRemaining = 0;
                output_repeatCount = ${config.repeat.defaultCount};
                output_repeatRemaining = 0;` : ''}
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                robot_state = "INIT";
            }
        }
        
        // EMS 또는 취소 상태면 주행 진행하지 않음
        if (EMS_ON == 1 || robot_state == "INIT")
        {
            // 이미 INIT으로 전환됨, 루프 다음 반복으로
        }
        else
        {
${!config.syncNodeDisplayNames ? `        // 표시 이름을 맵 노드 이름으로 변환
        string driveTarget = currentNodeName;
        for (int i = 0; i < ALL_NODES_SIZE; i++)
        {
            if (ALL_NODES[i] == currentNodeName)
            {
                driveTarget = ALL_MAP_NODES[i];
                break;
            }
        }
        // 충전소, 시작 위치는 별도 처리 (표시 이름 = 맵 노드 이름)
        if (currentNodeName == CHARGING_STATION_NAME || currentNodeName == START_NODE_NAME)
        {
            driveTarget = currentNodeName;
        }
        경로주행("OAP", "", "@" + driveTarget, true, false, false);` : `        string driveTarget = currentNodeName;
        경로주행("OAP", "", "@" + driveTarget, true, false, false);`}

        string prevPathfindState = PATHFIND_STATE;
        string prevDrivingStatus = DRIVING_STATUS;
        bool hasDrivingStarted = false;

        while (EMS_ON == 0)
        {
            // 주행 시작 감지 (DRIVING_STATUS가 IDLE에서 변경되거나, PATHFIND_STATE가 DRIVING이 되면)
            if (hasDrivingStarted == false && (DRIVING_STATUS != "IDLE" || PATHFIND_STATE == "DRIVING"))
            {
                hasDrivingStarted = true;
                출력("    [Driving Started]: " + DRIVING_STATUS + ", PATHFIND: " + PATHFIND_STATE);
            }
${config.audio.enabled && (config.audio.playOnDriveStart || config.audio.playOnBlocked) ? `
            // 오디오 상태 전환 처리 (DRIVING ↔ BLOCKED)
            if (prevPathfindState != PATHFIND_STATE)
            {
                ${config.audio.playOnDriveStart ? `// DRIVING 상태로 전환 시 주행 오디오 시작
                if (hasDrivingStarted == true && PATHFIND_STATE == "DRIVING")
                {
                    스피커재생(DRIVE_START_AUDIO, 0, true);  // repeat=0 for infinite loop, true = non-blocking
                }` : ''}
                ${config.audio.playOnBlocked ? `// BLOCKED 상태로 전환 시 장애물 오디오 시작
                ${config.audio.playOnDriveStart ? `else ` : ''}if (PATHFIND_STATE == "BLOCKED")
                {
                    스피커재생(BLOCKED_AUDIO, 0, true);  // repeat=0 for continuous blocked sound, true = non-blocking
                }` : ''}
            }` : ''}

            // 주행 시작 후에만 취소 체크 (이전 주행의 IS_DRIVING_CANCELED 값이 리셋되기 전 오감지 방지)
            // 단, 이미 완료된 경우(PATHFIND_STATE == "COMPLETED")는 취소 무시 (취소가 늦게 들어온 경우)
            if (hasDrivingStarted == true && IS_DRIVING_CANCELED == 1 && PATHFIND_STATE != "COMPLETED")
            {
                출력("    [Driving Canceled]");
                로그출력("    [Driving Canceled]");
                ${config.audio.enabled ? `스피커재생("silent", 1, true);  // 오디오 중지` : ''}
                
                // 주행 시스템이 완전히 리셋될 때까지 대기 (다음 주행 명령 전 안정화)
                출력("    [Waiting for drive system reset...]");
                while (EMS_ON == 0 && (PATHFIND_STATE == "DRIVING" || DRIVING_STATUS != "IDLE"))
                {
                    대기시간(0.1);
                }
                출력("    [Drive system reset complete]");
                
                ${config.enableMultiStopQueue ? `// 큐 초기화
                for (int i = 0; i < MAX_QUEUE; i++)
                {
                    queue[i] = "";
                    output_selectedQueue[i] = "";
                }
                queueSize = 0;
                queueIndex = 0;
                output_queueSize = 0;` : ''}
                ${config.repeat.enabled ? `repeatRequested = ${config.repeat.defaultCount};
                repeatRemaining = 0;
                output_repeatCount = ${config.repeat.defaultCount};
                output_repeatRemaining = 0;` : ''}
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                robot_state = "INIT";
                break;
            }

            // 상태 변화 로깅
            if (prevPathfindState != PATHFIND_STATE)
            {
                출력("    [PATHFIND_STATE]: " + PATHFIND_STATE);
                prevPathfindState = PATHFIND_STATE;
            }
            if (prevDrivingStatus != DRIVING_STATUS)
            {
                출력("    [DRIVING_STATUS]: " + DRIVING_STATUS);
                prevDrivingStatus = DRIVING_STATUS;
            }

            // 도착 감지: PATHFIND_STATE == "COMPLETED" 만 사용 (DRIVING_STATUS는 불안정할 수 있음)
            // 비동기 경로주행이므로 반드시 주행 시작 후에만 완료 체크 (이전 주행의 COMPLETED 상태 오감지 방지)
            if (hasDrivingStarted == true && PATHFIND_STATE == "COMPLETED")
            {
                ${config.audio.enabled ? `스피커재생("silent", 1, true);  // 주행 오디오 중지` : ''}
                출력("    [Move Complete] (PATHFIND: " + PATHFIND_STATE + ", DRIVING: " + DRIVING_STATUS + ")");
                ${locationUpdateLogic}
${audioOnArrival}

                // 충전 스테이션 도착 처리 (모든 모드에서 동일하게 충전 상태로 전환)
                if (currentNodeName == CHARGING_STATION_NAME)
                {
                    출력("충전 스테이션 도착, 도킹");
                    도킹(CHARGING_STATION_MARKER_ID, false);
                    // CHARGING_BATTERY == 1 (충전 중) 또는 DOCKING_STATE == 1 (도킹 완료) 대기
                    // 배터리 100%일 때 충전소로 보내면 CHARGING_BATTERY는 0으로 유지되지만 DOCKING_STATE는 1이 됨
                    while (EMS_ON == 0 && IS_DRIVING_CANCELED == 0 && CHARGING_BATTERY == 0 && DOCKING_STATE == 0)
                    {
                        대기시간(0.1);
                    }
                    // 모든 주행 플래그 초기화
                    isMultiStopActive = false;
                    isGoingToChargerActive = false;
                    isReturningToStartActive = false;
                    ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                    ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                    hasLoggedChargingComplete = false;  // 충전 완료 메시지 플래그 리셋
                    robot_state = "충전 중";
                    break;
                }
                // 시작 위치 복귀 완료 (input_goToStart로 이동 시 - 적재 상태 확인 없이 바로 INIT)
                else if (isReturningToStartActive == true)
                {
                    // 모든 주행 플래그 초기화
                    isReturningToStartActive = false;
                    isGoingToChargerActive = false;
                    isMultiStopActive = false;
                    ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                    ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                    출력("시작 위치 복귀 완료");
                    robot_state = "INIT";
                    break;
                }
                ${config.enableSingleDestination ? `// 단일 목적지 도착
                else if (isSingleDrivingActive == true)
                {
                    // 도착 후 동작이 버튼대기나 카운트다운이면 플래그 유지 (다음 목적지 상태에서 해제)
                    출력("단일 목적지 도착");
                    robot_state = "${singleDestArrivalState}";
                    break;
                }` : ''}
                ${config.enableScenarioMode ? `// 시나리오 노드 도착
                else if (isScenarioActive == true)
                {
                    출력("시나리오 노드 도착");
                    robot_state = "${scenarioArrivalState}";
                    break;
                }` : ''}
                ${config.enableMultiStopQueue ? `// 다중 정차 노드 도착
                else if (isMultiStopActive == true)
                {
                    bool isLastInQueue = (queueIndex >= (queueSize - 1));
                    ${config.repeat.enabled ? `bool isLastNode = isLastInQueue && (repeatRemaining == 0);` : `bool isLastNode = isLastInQueue;`}
                    
                    // 시작위치가 유일한 노드이거나 마지막 노드인 경우 바로 종료
                    if (currentNodeName == START_NODE_NAME && isLastNode)
                    {
                        isMultiStopActive = false;
                        if (queueSize == 1)
                        {
                            출력("시작위치 단일 노드 주행 완료, 주행 종료");
                        }
                        else
                        {
                            출력("마지막 목적지(시작위치) 도착, 주행 종료");
                        }
                        robot_state = "INIT";
                        break;
                    }
                    
                    // 그 외 경우 도착 처리
                    출력("경유지 도착");
                    robot_state = "${multiStopArrivalState}";
                    break;
                }` : ''}
                else
                {
                    robot_state = "INIT";
                    break;
                }
            }

            // 경로 취소 처리 (시스템 레벨 경로 취소)
            if (PATHFIND_STATE == "CANCELED")
            {
                출력("    [Path Canceled]");
                로그출력("    [Path Canceled]");
                ${config.audio.enabled ? `스피커재생("silent", 1, true);  // 오디오 중지` : ''}
                
                // 주행 시스템이 완전히 리셋될 때까지 대기
                출력("    [Waiting for drive system reset...]");
                while (EMS_ON == 0 && DRIVING_STATUS != "IDLE")
                {
                    대기시간(0.1);
                }
                출력("    [Drive system reset complete]");
                
                isMultiStopActive = false;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                robot_state = "INIT";
                break;
            }
            대기시간(0.1);
        }
        ${config.audio.enabled ? `// EMS로 while 루프 종료 시 오디오 중지
        if (EMS_ON == 1)
        {
            스피커재생("silent", 1, true);
        }` : ''}
        }  // end of else block (주행 진행)
    }

${buttonWaitStateCode}
${countdownStateCode}

    // ============================================================
    // 다음 목적지 상태 (도착 후 다음 목적지로 이동 또는 종료)
    // ============================================================
    else if (robot_state == "다음 목적지")
    {
        대기시간(0.2);

        ${config.enableScenarioMode ? `// 시나리오 다음 노드
        if (isScenarioActive == true)
        {
            scenarioNodeIndex++;
            if (scenarioNodeIndex < scenarioNodeCount)
            {
                currentNodeName = activeScenarioRoute[scenarioNodeIndex];
                출력("시나리오 다음 노드: " + currentNodeName);
                robot_state = "이동 중";
            }
            else
            {
                // 시나리오 완료
                isScenarioActive = false;
                ${scenarioCompletionLogic}
            }
        }
        ${config.enableMultiStopQueue ? `else if (isMultiStopActive == true)` : `else`}` : config.enableMultiStopQueue ? `if (isMultiStopActive == true)` : ''} ${config.enableMultiStopQueue ? `// 다중 정차 다음 노드
        {
            if (queueIndex < queueSize - 1)
            {
                queueIndex++;
                currentNodeName = queue[queueIndex];
                출력("다음 노드: " + currentNodeName);
                robot_state = "이동 중";
            }
            else
            {
                ${config.repeat.enabled ? `if (repeatRemaining > 0)
                {
                    repeatRemaining--;
                    output_repeatRemaining = repeatRemaining;
                    queueIndex = 0;
                    currentNodeName = queue[0];
                    출력("반복 주행 (남은: " + repeatRemaining + ")");
                    robot_state = "이동 중";
                }
                else
                {` : ''}
${multiStopCompletionLogic}
                ${config.repeat.enabled ? `}` : ''}
            }
        }
        else` : ''}
        {
            ${config.enableSingleDestination ? `// 단일 목적지 완료 처리
            if (isSingleDrivingActive == true)
            {
${singleDestCompletionLogic}
            }
            else
            {
                // 시작 위치/충전소 이동 완료 또는 기타 - 대기 상태로 전환
                robot_state = "INIT";
            }` : `// 시작 위치/충전소 이동 완료 또는 기타 - 대기 상태로 전환
            robot_state = "INIT";`}
        }
    }

    // ============================================================
    // 충전 중 상태
    // ============================================================
    else if (robot_state == "충전 중")
    {
        // --- 시작 위치 이동 버튼 (언도킹 후 이동) ---
        if (input_goToStart == true)
        {
            출력("충전 중 시작 위치 이동 요청");
            currentNodeName = START_NODE_NAME;
            // 모든 주행 플래그 초기화 후 시작위치 복귀 플래그만 설정
            isReturningToStartActive = true;
            isGoingToChargerActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
            input_goToStart = false;
        }
${config.enableSingleDestination ? `
        // --- 단일 목적지 즉시 주행 (언도킹 후 이동) ---
        else if (input_directDrivingNodeIndex >= 0 && input_directDrivingNodeIndex < ALL_NODES_SIZE)
        {
            string selected = ALL_NODES[input_directDrivingNodeIndex];
            출력("충전 중 단일 목적지 이동 요청: " + selected);
            currentNodeName = selected;
            // 모든 주행 플래그 초기화 후 단일 목적지 플래그만 설정
            isSingleDrivingActive = true;
            isMultiStopActive = false;
            isGoingToChargerActive = false;
            isReturningToStartActive = false;
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
            input_directDrivingNodeIndex = -1;
        }` : ''}
${config.enableScenarioMode && config.scenarios.length > 0 ? `
        // --- 시나리오 시작 (언도킹 후 이동) ---
        else if (input_scenarioIndex >= 0 && input_scenarioIndex < SCENARIO_COUNT)
        {
            출력("충전 중 시나리오 시작 요청");
            // 시나리오 로드
            currentScenarioIndex = input_scenarioIndex;
            scenarioNodeCount = 0;
            
            for (int i = 0; i < MAX_SCENARIO_NODES; i++)
            {
                activeScenarioRoute[i] = scenarioRoutes[currentScenarioIndex][i];
                if (activeScenarioRoute[i] != "")
                {
                    scenarioNodeCount++;
                }
            }
            
            출력("시나리오 " + scenarioNames[currentScenarioIndex] + " 로드 완료 (노드 수: " + scenarioNodeCount + ")");
            
            // 모든 주행 플래그 초기화 후 시나리오 플래그만 설정
            isScenarioActive = true;
            isMultiStopActive = false;
            isGoingToChargerActive = false;
            isReturningToStartActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            scenarioNodeIndex = 0;
            currentNodeName = activeScenarioRoute[0];
            
            robot_state = "이동 중";
            input_scenarioIndex = -1;
        }` : ''}
${config.enableMultiStopQueue ? `
        // --- 충전 중 큐 편집 허용 ---
        else if (input_queueNodeIndex >= 0 && input_queueNodeIndex < ALL_NODES_SIZE)
        {
            if (queueSize < MAX_QUEUE)
            {
                string nodeName = ALL_NODES[input_queueNodeIndex];
                queue[queueSize] = nodeName;
                output_selectedQueue[queueSize] = nodeName;
                queueSize++;
                output_queueSize = queueSize;
            }
            input_queueNodeIndex = -1;
        }
        // --- 충전 중 큐 비우기 ---
        else if (input_clearQueue == true)
        {
            for (int i = 0; i < MAX_QUEUE; i++)
            {
                queue[i] = "";
                output_selectedQueue[i] = "";
            }
            queueSize = 0;
            output_queueSize = 0;
            출력("큐가 비워졌습니다");
            input_clearQueue = false;
        }` : ''}
${config.repeat.enabled ? `
        // --- 충전 중 반복 횟수 조절 ---
        ${config.enableMultiStopQueue ? 'else ' : ''}if (input_repeatPlusPressed == true)
        {
            ${config.repeat.maxCount ? `if (repeatRequested < ${config.repeat.maxCount})
            {` : ''}
                repeatRequested++;
                output_repeatCount = repeatRequested;
            ${config.repeat.maxCount ? `}` : ''}
            input_repeatPlusPressed = false;
        }
        else if (input_repeatMinusPressed == true)
        {
            if (repeatRequested > 1)
            {
                repeatRequested--;
                output_repeatCount = repeatRequested;
            }
            input_repeatMinusPressed = false;
        }` : ''}
${config.enableMultiStopQueue ? `
        // --- 다중 정차 주행 시작 (언도킹 후 이동) ---
        ${config.repeat.enabled ? 'else ' : 'else '}if (input_startDrivingPressed == true)
        {
            if (queueSize > 0)
            {
                출력("충전 중 다중 정차 주행 시작 요청");
                // 모든 주행 플래그 초기화 후 다중 정차 플래그만 설정
                isMultiStopActive = true;
                isGoingToChargerActive = false;
                isReturningToStartActive = false;
                ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
                ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
                ${config.repeat.enabled ? `repeatRemaining = repeatRequested - 1;
                output_repeatRemaining = repeatRemaining;` : ''}
                queueIndex = 0;
                currentNodeName = queue[0];
                robot_state = "이동 중";
            }
            input_startDrivingPressed = false;
        }` : ''}

        // 도킹 상태 확인 (위 버튼 처리로 상태가 바뀌지 않은 경우만)
        // CHARGING_BATTERY == 0 이고 DOCKING_STATE == 0 이면 충전소로 재이동 (둘 다 0일 때만)
        // 직접 도킹() 호출 대신 충전소로 경로주행 후 도킹하는 전체 프로세스 실행
        if (robot_state == "충전 중" && EMS_ON == 0 && CHARGING_BATTERY == 0 && DOCKING_STATE == 0)
        {
            출력("도킹 상태 이상 감지 - 충전소로 재이동");
            로그출력("도킹 상태 이상 감지 - 충전소로 재이동");
            currentNodeName = CHARGING_STATION_NAME;
            isGoingToChargerActive = true;
            isReturningToStartActive = false;
            isMultiStopActive = false;
            ${config.enableSingleDestination ? `isSingleDrivingActive = false;` : ''}
            ${config.enableScenarioMode ? `isScenarioActive = false;` : ''}
            robot_state = "이동 중";
        }

        // 충전 완료 처리 (위 버튼 처리로 상태가 바뀌지 않은 경우만)
        // ${config.nightCharging.enabled ? '야간 충전 윈도우 활성화 시 자동 언도킹 방지' : ''}
        if (robot_state == "충전 중" && BATTERY_POWER >= BATTERY_HIGH_LEVEL && IS_DRIVING_CANCELED == 0${config.nightCharging.enabled ? ' && isNightChargeWindow == false' : ''})
        {
${afterChargingLogic}
        }
    }

    대기시간(0.1);
}

// EMS_ON이 1이 되어 메인 루프 종료됨
${config.audio.enabled ? `스피커재생("silent", 1, true);  // EMS 시 오디오 중지` : ''}
start_script = false;
EMS = 1;  // 대시보드 동기화용 EMS 변수 업데이트

while (1)
{
    대기시간(0.1);
}
`
}
