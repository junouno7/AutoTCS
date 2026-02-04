/**
 * Comprehensive Project Configuration for TCS Script Generation
 * Allows customization of every behavioral aspect of the robot script
 */

// ============================================================
// Arrival Behavior Types
// ============================================================

/** What happens when the robot arrives at a destination */
export type ArrivalBehavior = 
  | 'waitForButton'       // Wait for user to press "도착 확인" (isMoveComplete) button
  | 'countdown'           // Start countdown timer, then auto-proceed
  | 'autoProceed'         // Immediately proceed to next destination (no wait)

// ============================================================
// Charging Behavior Types  
// ============================================================

/** What happens after charging completes */
export type AfterChargingBehavior =
  | 'returnToStart'       // Undock and return to start point
  | 'stayAtCharger'       // Stay docked at charger until commanded
  | 'goToIdle'            // Undock and go to idle state (stay in place)

/** What triggers automatic charging */
export type AutoChargeTrigger =
  | 'batteryLow'          // Go to charger when battery is low (while idle)
  | 'never'               // Never auto-charge, only manual trigger

// ============================================================
// Scenario Configuration
// ============================================================

export interface ScenarioRoute {
  /** Unique name for this scenario (displayed on button) */
  name: string
  /** Array of node names in order */
  nodes: string[]
  /** Optional: require starting from a specific location */
  requireStartFrom?: string
}

// ============================================================
// Night Charging Window
// ============================================================

export interface NightChargingWindow {
  enabled: boolean
  /** Start hour (0-23) */
  startHour: number
  /** Start minute (0-59) */
  startMinute: number
  /** End hour (0-23) */
  endHour: number
  /** End minute (0-59) */
  endMinute: number
  /** Auto go to charge when IDLE during night window */
  autoChargeWhenIdle: boolean
}

// ============================================================
// Audio Settings
// ============================================================

export interface AudioSettings {
  enabled: boolean
  /** Volume level (0-100) */
  volume: number
  /** Play sound on arrival at destination */
  playOnArrival: boolean
  /** Sound file for arrival (without .mp3 extension) */
  arrivalSoundFile: string
  /** Play sound when starting driving */
  playOnDriveStart: boolean
  /** Sound file for driving start (without .mp3 extension) */
  driveStartSoundFile: string
  /** Play sound when low battery */
  playOnLowBattery: boolean
  /** Sound file for low battery warning (without .mp3 extension) */
  lowBatterySoundFile: string
  /** Play sound when blocked by obstacle */
  playOnBlocked: boolean
  /** Sound file for blocked state (without .mp3 extension) */
  blockedSoundFile: string
}

// ============================================================
// Wait Time Settings
// ============================================================

export interface WaitTimeSettings {
  /** Wait time in seconds (for countdown mode) - used as default/fallback */
  waitTimeSeconds: number
  /** Per-mode wait times (optional, falls back to waitTimeSeconds if not set) */
  multiStopWaitTimeSeconds?: number
  singleDestWaitTimeSeconds?: number
  scenarioWaitTimeSeconds?: number
  /** Allow user to skip the wait */
  allowSkip: boolean
  /** Allow user to increase wait time */
  allowIncrease: boolean
  /** Allow user to decrease wait time */
  allowDecrease: boolean
  /** Step size for increase/decrease (seconds) */
  stepSize: number
}

// ============================================================
// Repeat Settings
// ============================================================

export interface RepeatSettings {
  enabled: boolean
  /** Default repeat count */
  defaultCount: number
  /** Maximum repeat count allowed */
  maxCount: number
}

// ============================================================
// Queue Settings
// ============================================================

export interface QueueSettings {
  /** Maximum number of destinations in queue */
  maxSize: number
}

// ============================================================
// Node Configuration
// ============================================================

export interface NodeConfig {
  /** Display name shown on dashboard */
  displayName: string
  /** Actual node name in robot map (if different from display name) */
  mapNodeName: string
  /** Optional: custom audio file to play on arrival at this node */
  arrivalAudioFile?: string
}

// ============================================================
// Main Project Configuration Interface
// ============================================================

export interface ProjectConfig {
  // ---------- Basic Info ----------
  /** Script name (will be used for the .chill file and dashboard scriptExecute references) */
  scriptName: string

  // ---------- Node Configuration ----------
  /** Array of node configurations */
  nodes: NodeConfig[]
  
  /** Whether to sync display names with map node names (UI helper) */
  syncNodeDisplayNames: boolean
  
  /** Start/home node name */
  startNodeName: string
  
  /** Charging station node name */
  chargingStationName: string
  
  /** Charging station marker ID (numeric) */
  chargingStationMarkerId: number

  // ---------- Driving Mode ----------
  /** Enable multi-stop queue mode (can be combined with other modes) */
  enableMultiStopQueue: boolean
  
  /** Enable single destination quick-drive mode */
  enableSingleDestination: boolean
  
  /** Enable scenario mode */
  enableScenarioMode: boolean

  // ---------- Arrival Behavior (per driving mode) ----------
  /** Arrival behavior for multi-stop queue mode */
  multiStopArrivalBehavior: ArrivalBehavior
  
  /** Arrival behavior for single destination mode */
  singleDestinationArrivalBehavior: ArrivalBehavior
  
  /** Arrival behavior for scenario mode */
  scenarioArrivalBehavior: ArrivalBehavior
  
  /** Wait time settings (for countdown mode - shared across all modes) */
  waitTimeSettings: WaitTimeSettings

  // ---------- Charging Behavior ----------
  /** What triggers automatic charging */
  autoChargeTrigger: AutoChargeTrigger
  
  /** Battery level below which robot auto-navigates to charger (%) */
  batteryLowLevel: number
  
  /** Battery level above which robot considers charging complete (%) */
  batteryHighLevel: number
  
  /** What happens after charging completes */
  afterChargingBehavior: AfterChargingBehavior
  
  /** Low battery return location (instead of going to charger) */
  lowBatteryReturn: {
    enabled: boolean
    nodeName: string  // Which node to return to when battery is low
  }

  // ---------- Night Charging ----------
  nightCharging: NightChargingWindow

  // ---------- Audio ----------
  audio: AudioSettings

  // ---------- Repeat ----------
  repeat: RepeatSettings

  // ---------- Queue ----------
  queue: QueueSettings

  // ---------- Scenario Mode ----------
  /** Predefined scenario routes */
  scenarios: ScenarioRoute[]

  // ---------- Completion Return (per-mode) ----------
  /** Where to go after multi-stop queue completes (empty = stay in place) */
  multiStopCompletionReturn: string
  /** Where to go after scenario completes (empty = stay in place) */
  scenarioCompletionReturn: string
  /** Where to go after single destination completes (empty = stay in place) */
  singleDestCompletionReturn: string

  // ---------- Scenario Warning ----------
  /** Show warning if scenario started from wrong position */
  showScenarioPositionWarning: boolean
  
  /** Duration to show warning message (seconds) */
  warningDisplayDuration: number

  // ---------- Display Settings ----------
  /** Update location on arrival (after confirm) vs on drive start */
  updateLocationOn: 'arrival' | 'driveStart'
}

// ============================================================
// Default Configuration
// ============================================================

/**
 * Creates a default configuration with sensible values
 */
export function createDefaultConfig(): ProjectConfig {
  return {
    // Basic Info
    scriptName: 'NewSiteScript',

    // Node Configuration - 6 default nodes
    nodes: Array.from({ length: 6 }, (_, i) => ({
      displayName: `구역 ${i + 1}`,
      mapNodeName: `구역 ${i + 1}`,
    })),
    syncNodeDisplayNames: true,
    startNodeName: '대기장소',
    chargingStationName: '충전소',
    chargingStationMarkerId: 10000,

    // Driving Mode
    enableMultiStopQueue: true,
    enableSingleDestination: false,
    enableScenarioMode: false,

    // Arrival Behavior (per mode)
    multiStopArrivalBehavior: 'waitForButton',
    singleDestinationArrivalBehavior: 'waitForButton',
    scenarioArrivalBehavior: 'waitForButton',
    waitTimeSettings: {
      waitTimeSeconds: 30,
      allowSkip: true,
      allowIncrease: true,
      allowDecrease: true,
      stepSize: 10,
    },

    // Charging Behavior
    autoChargeTrigger: 'batteryLow',
    batteryLowLevel: 15,
    batteryHighLevel: 95,
    afterChargingBehavior: 'stayAtCharger',
    lowBatteryReturn: {
      enabled: false,
      nodeName: ''
    },

    // Night Charging
    nightCharging: {
      enabled: false,
      startHour: 17,
      startMinute: 30,
      endHour: 9,
      endMinute: 0,
      autoChargeWhenIdle: false,
    },

    // Audio
    audio: {
      enabled: false,
      volume: 70,
      playOnArrival: true,
      arrivalSoundFile: 'arrival',
      playOnDriveStart: false,
      driveStartSoundFile: 'moving',
      playOnLowBattery: false,
      lowBatterySoundFile: 'low_battery',
      playOnBlocked: false,
      blockedSoundFile: 'blocked',
    },

    // Repeat
    repeat: {
      enabled: true,
      defaultCount: 1,
      maxCount: 99,
    },

    // Queue settings
    queue: {
      maxSize: 6,
    },

    // Scenarios
    scenarios: [],

    // Completion Return (per-mode) - empty string = 제자리 (stay in place)
    multiStopCompletionReturn: '',
    scenarioCompletionReturn: '',
    singleDestCompletionReturn: '',

    // Scenario Warning
    showScenarioPositionWarning: false,
    warningDisplayDuration: 3,

    // Display Settings
    updateLocationOn: 'arrival',
  }
}

// ============================================================
// Validation
// ============================================================

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Helper function to check if any enabled driving mode uses countdown
 */
export function anyModeUsesCountdown(config: ProjectConfig): boolean {
  return (
    (config.enableMultiStopQueue && config.multiStopArrivalBehavior === 'countdown') ||
    (config.enableSingleDestination && config.singleDestinationArrivalBehavior === 'countdown') ||
    (config.enableScenarioMode && config.scenarioArrivalBehavior === 'countdown')
  )
}

/**
 * Helper function to check if any enabled driving mode uses waitForButton
 */
export function anyModeUsesWaitForButton(config: ProjectConfig): boolean {
  return (
    (config.enableMultiStopQueue && config.multiStopArrivalBehavior === 'waitForButton') ||
    (config.enableSingleDestination && config.singleDestinationArrivalBehavior === 'waitForButton') ||
    (config.enableScenarioMode && config.scenarioArrivalBehavior === 'waitForButton')
  )
}

export function validateConfig(config: ProjectConfig): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Script name validation
  if (!config.scriptName.trim()) {
    errors.push('스크립트 이름을 입력해주세요.')
  } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(config.scriptName)) {
    errors.push('스크립트 이름은 영문자, 숫자, 밑줄(_)만 사용할 수 있으며, 숫자로 시작할 수 없습니다.')
  }

  // Node validation
  if (config.nodes.length === 0) {
    errors.push('최소 1개 이상의 노드가 필요합니다.')
  }

  const emptyNodes = config.nodes
    .map((n, i) => ({ node: n, index: i }))
    .filter(item => !item.node.displayName.trim() || !item.node.mapNodeName.trim())
    .map(item => item.index + 1)
  if (emptyNodes.length > 0) {
    errors.push(`노드 ${emptyNodes.join(', ')}의 이름이 비어있습니다.`)
  }

  // Check for duplicate node names
  const nodeNames = config.nodes.map(n => n.mapNodeName.trim().toLowerCase())
  const duplicates = nodeNames.filter((name, index) => nodeNames.indexOf(name) !== index)
  if (duplicates.length > 0) {
    errors.push(`중복된 노드 이름이 있습니다: ${[...new Set(duplicates)].join(', ')}`)
  }

  // Start node validation
  if (!config.startNodeName.trim()) {
    errors.push('시작 위치 이름을 입력해주세요.')
  }

  // Charging station validation
  if (!config.chargingStationName.trim()) {
    errors.push('충전소 이름을 입력해주세요.')
  }

  if (!Number.isInteger(config.chargingStationMarkerId) || config.chargingStationMarkerId <= 0) {
    errors.push('충전소 마커 ID는 양의 정수여야 합니다.')
  }

  // Battery threshold validation
  if (config.batteryLowLevel < 1 || config.batteryLowLevel > 100) {
    errors.push('저배터리 임계값은 1~100 사이여야 합니다.')
  }

  if (config.batteryHighLevel < 1 || config.batteryHighLevel > 100) {
    errors.push('충전 완료 임계값은 1~100 사이여야 합니다.')
  }

  if (config.batteryLowLevel >= config.batteryHighLevel) {
    warnings.push('저배터리 임계값이 충전 완료 임계값보다 낮아야 합니다.')
  }

  // Driving mode validation
  if (!config.enableMultiStopQueue && !config.enableSingleDestination && !config.enableScenarioMode) {
    errors.push('최소 하나의 주행 모드를 활성화해야 합니다.')
  }

  // Wait time validation - check if any mode uses countdown
  const anyModeUsesCountdown = 
    (config.enableMultiStopQueue && config.multiStopArrivalBehavior === 'countdown') ||
    (config.enableSingleDestination && config.singleDestinationArrivalBehavior === 'countdown') ||
    (config.enableScenarioMode && config.scenarioArrivalBehavior === 'countdown')
  
  if (anyModeUsesCountdown) {
    if (config.waitTimeSettings.waitTimeSeconds < 1) {
      errors.push('대기 시간은 1초 이상이어야 합니다.')
    }
    if ((config.waitTimeSettings.allowIncrease || config.waitTimeSettings.allowDecrease) && config.waitTimeSettings.stepSize < 1) {
      errors.push('카운트다운 증감 단위는 1초 이상이어야 합니다.')
    }
  }

  // Repeat count validation
  if (config.repeat.enabled && config.repeat.maxCount < 1) {
    errors.push('최대 반복 횟수는 1 이상이어야 합니다.')
  }

  // Scenario validation
  if (config.enableScenarioMode && config.scenarios.length === 0) {
    warnings.push('시나리오 모드가 활성화되었지만 정의된 시나리오가 없습니다.')
  }

  for (let i = 0; i < config.scenarios.length; i++) {
    const scenario = config.scenarios[i]
    if (!scenario.name.trim()) {
      errors.push(`시나리오 ${i + 1}의 이름이 비어있습니다.`)
    }
    if (scenario.nodes.length === 0) {
      errors.push(`시나리오 "${scenario.name}"에 노드가 없습니다.`)
    }
  }

  // Night charging validation
  if (config.nightCharging.enabled) {
    if (config.nightCharging.startHour < 0 || config.nightCharging.startHour > 23) {
      errors.push('야간 충전 시작 시간은 0~23 사이여야 합니다.')
    }
    if (config.nightCharging.endHour < 0 || config.nightCharging.endHour > 23) {
      errors.push('야간 충전 종료 시간은 0~23 사이여야 합니다.')
    }
  }

  // Audio validation
  if (config.audio.enabled) {
    if (config.audio.volume < 0 || config.audio.volume > 100) {
      errors.push('오디오 볼륨은 0~100 사이여야 합니다.')
    }
  }

  // ============================================================
  // Configuration Harmony Warnings
  // ============================================================

  // Repeat without multi-stop queue
  if (config.repeat.enabled && !config.enableMultiStopQueue) {
    warnings.push('반복 기능은 다중 정차 큐 모드에서만 작동합니다. 다중 정차 큐 모드를 활성화하거나 반복 기능을 비활성화하세요.')
  }

  // Completion return set but mode is disabled
  if (config.multiStopCompletionReturn && !config.enableMultiStopQueue) {
    warnings.push('다중 정차 완료 후 복귀 위치가 설정되어 있지만 다중 정차 모드가 비활성화되어 있습니다.')
  }
  if (config.scenarioCompletionReturn && !config.enableScenarioMode) {
    warnings.push('시나리오 완료 후 복귀 위치가 설정되어 있지만 시나리오 모드가 비활성화되어 있습니다.')
  }
  if (config.singleDestCompletionReturn && !config.enableSingleDestination) {
    warnings.push('단일 이동 완료 후 복귀 위치가 설정되어 있지만 단일 이동 모드가 비활성화되어 있습니다.')
  }

  // Scenario position warning without scenario mode
  if (config.showScenarioPositionWarning && !config.enableScenarioMode) {
    warnings.push('시나리오 위치 경고는 시나리오 모드가 활성화되어야 적용됩니다.')
  }
  
  // Scenario position warning enabled but no scenarios have start position restrictions
  if (config.showScenarioPositionWarning && config.enableScenarioMode && 
      config.scenarios.length > 0 && 
      !config.scenarios.some(s => s.requireStartFrom && s.requireStartFrom.trim() !== '')) {
    warnings.push('시나리오 위치 경고가 활성화되었지만, 시작 위치 제한이 설정된 시나리오가 없습니다.')
  }
  
  // Scenario has start position restriction but warning display is disabled
  if (!config.showScenarioPositionWarning && config.enableScenarioMode && 
      config.scenarios.length > 0 && 
      config.scenarios.some(s => s.requireStartFrom && s.requireStartFrom.trim() !== '')) {
    warnings.push('시나리오에 시작 위치 제한이 설정되었지만 경고 표시가 비활성화되어 있습니다. 잘못된 위치에서 시나리오 시작 시 사용자에게 피드백이 표시되지 않습니다.')
  }

  // Night charging with no auto charge option enabled - informational note
  // Warning only shows if BOTH general auto-charge AND night window auto-charge are disabled
  if (config.nightCharging.enabled && config.autoChargeTrigger === 'never' && !config.nightCharging.autoChargeWhenIdle) {
    warnings.push('야간 충전 윈도우가 활성화되었지만 자동 충전이 비활성화되어 있습니다. 야간 충전 윈도우는 충전 완료 시 자동 언도킹만 방지합니다.')
  }

  // Night charging window same start and end time
  if (config.nightCharging.enabled) {
    if (config.nightCharging.startHour === config.nightCharging.endHour && 
        config.nightCharging.startMinute === config.nightCharging.endMinute) {
      warnings.push('야간 충전 시작 시간과 종료 시간이 동일합니다. 야간 충전 윈도우가 작동하지 않습니다.')
    }
  }

  // Low battery return enabled but no node selected
  if (config.lowBatteryReturn.enabled && !config.lowBatteryReturn.nodeName) {
    warnings.push('저배터리 시 복귀 위치가 활성화되었지만 복귀 노드가 선택되지 않았습니다.')
  }

  // Audio enabled but no events trigger it
  if (config.audio.enabled && !config.audio.playOnArrival && !config.audio.playOnDriveStart) {
    warnings.push('오디오가 활성화되었지만 재생 이벤트가 선택되지 않았습니다. 오디오가 재생되지 않습니다.')
  }

  // Only single destination mode with waitForButton arrival behavior
  if (config.enableSingleDestination && !config.enableMultiStopQueue && !config.enableScenarioMode && config.singleDestinationArrivalBehavior === 'waitForButton') {
    warnings.push('단일 목적지 모드에서 버튼 대기 설정 시, 도착 후 "도착 확인" 버튼을 눌러야 대기 상태로 전환됩니다.')
  }

  // Scenario nodes might not match configured nodes
  if (config.enableScenarioMode && config.scenarios.length > 0) {
    // Include destination nodes, start node, and charging station as valid nodes
    const nodeMapNames = config.nodes.map(n => n.mapNodeName.trim().toLowerCase())
    const startNodeLower = config.startNodeName.trim().toLowerCase()
    const chargingStationLower = config.chargingStationName.trim().toLowerCase()
    
    for (const scenario of config.scenarios) {
      const invalidNodes = scenario.nodes.filter(n => {
        const nodeLower = n.trim().toLowerCase()
        return !nodeMapNames.includes(nodeLower) && 
               nodeLower !== startNodeLower && 
               nodeLower !== chargingStationLower
      })
      if (invalidNodes.length > 0) {
        warnings.push(`시나리오 "${scenario.name}"에 노드 목록에 없는 노드가 있습니다: ${invalidNodes.join(', ')}`)
      }
    }
  }

  // Countdown settings without any countdown mode - silent, no warning needed
  // These settings are only used when at least one mode uses countdown

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ============================================================
// Helper Functions
// ============================================================

/** Get node display names as simple string array (for backward compatibility) */
export function getNodeDisplayNames(config: ProjectConfig): string[] {
  return config.nodes.map(n => n.displayName)
}

/** Get node map names as simple string array */
export function getNodeMapNames(config: ProjectConfig): string[] {
  return config.nodes.map(n => n.mapNodeName)
}

/** Add a new node */
export function addNode(config: ProjectConfig, displayName: string, mapNodeName?: string): ProjectConfig {
  return {
    ...config,
    nodes: [...config.nodes, { displayName, mapNodeName: mapNodeName || displayName }]
  }
}

/** Remove a node by index */
export function removeNode(config: ProjectConfig, index: number): ProjectConfig {
  return {
    ...config,
    nodes: config.nodes.filter((_, i) => i !== index)
  }
}

/** Add a scenario */
export function addScenario(config: ProjectConfig, name: string, nodes: string[]): ProjectConfig {
  return {
    ...config,
    scenarios: [...config.scenarios, { name, nodes }]
  }
}

/** Remove a scenario by index */
export function removeScenario(config: ProjectConfig, index: number): ProjectConfig {
  return {
    ...config,
    scenarios: config.scenarios.filter((_, i) => i !== index)
  }
}
