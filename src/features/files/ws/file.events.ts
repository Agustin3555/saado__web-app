export const CLIENT_EVENTS = {
  SUBSCRIBE_GLOBAL: 'files:subscribe-global',
  UNSUBSCRIBE_GLOBAL: 'files:unsubscribe-global',
  SUBSCRIBE_FILE: 'files:subscribe-file',
  UNSUBSCRIBE_FILE: 'files:unsubscribe-file',
} as const

export const SERVER_EVENTS = {
  ANALYSIS_STATUS_CHANGED: 'files:analysis-status-changed',
  CHANGELOG_CREATED: 'files:changelog-created',
} as const
