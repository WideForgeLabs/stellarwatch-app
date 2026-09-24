export enum HealthStatus {
  Healthy = 0,
  Degraded = 1,
  Unhealthy = 2,
  Unknown = 3,
}

export enum AlertCondition {
  ResponseTime = 0,
  TTLExpiry = 1,
  StatusChange = 2,
  InvocationFailure = 3,
  Custom = 4,
}

export enum Severity {
  Info = 0,
  Warn = 1,
  Critical = 2,
}

export interface HealthRecord {
  timestamp: string;
  checker: string;
  status: HealthStatus;
  response_time_ms: number | null;
  message: string;
  block_height: number;
}

export interface ContractMetadata {
  name: string;
  version: string;
  deployer: string;
  registered_at: string;
  last_check: string | null;
  active: boolean;
}

export interface AlertRule {
  id: string;
  contract_id: string;
  condition: AlertCondition;
  severity: Severity;
  threshold_value: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  notification_target: string;
}
