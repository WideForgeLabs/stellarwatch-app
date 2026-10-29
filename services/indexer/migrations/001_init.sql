CREATE TABLE contracts (
    contract_id BYTEA PRIMARY KEY,
    name TEXT NOT NULL,
    registered_at BIGINT NOT NULL
);

CREATE TABLE health_records (
    id BIGSERIAL PRIMARY KEY,
    contract_id BYTEA NOT NULL,
    timestamp BIGINT NOT NULL,
    status SMALLINT NOT NULL,
    response_time_ms INTEGER,
    message TEXT NOT NULL,
    block_height INTEGER NOT NULL
);

CREATE INDEX idx_health_records_contract ON health_records(contract_id, timestamp DESC);

CREATE TABLE alert_rules (
    id BIGINT PRIMARY KEY,
    contract_id BYTEA NOT NULL,
    condition SMALLINT NOT NULL,
    severity SMALLINT NOT NULL,
    threshold_value BIGINT NOT NULL,
    created_at BIGINT NOT NULL
);

CREATE INDEX idx_alert_rules_contract ON alert_rules(contract_id);
