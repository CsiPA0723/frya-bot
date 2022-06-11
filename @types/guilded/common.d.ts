/** UUID */
export type uuidString = string;
/** date-time string ISO 8601 timestamp */
export type dateTimeString = string;
/** String containig markdown */
export type markdownString = string;
/** webhook-markdown string */
export type webhookMarkdownString = string;
/** uri string */
export type uriString = string;
/** media-uri string */
export type mediaUriString = string;

export type WebSocketEvent = {
  /** An operation code corresponding to the nature of the sent message (for example, success, failure, etc.) */
  op: 0 | 1 | 2 | 8 | 9;
  /** Data of any form depending on the underlying event */
  d?: object;
  /** Message ID used for replaying events after a disconnect */
  s?: string;
  /** Event name for the given message */
  t?: string;
};
