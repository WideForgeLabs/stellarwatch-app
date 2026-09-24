'use client';

import { useEffect, useState } from 'react';
import {
  ContractRegistryClient,
  HealthRegistryClient,
  AlertRulesClient,
  TESTNET_CONTRACT_IDS,
} from '@stellarwatch/sdk';

interface ContractInfo {
  name: string;
  contractId: string;
  owner: string | null;
  paused: boolean | null;
  error: string | null;
}

export default function Home() {
  const [contracts, setContracts] = useState<ContractInfo[]>([
    {
      name: 'Contract Registry',
      contractId: TESTNET_CONTRACT_IDS.contractRegistry,
      owner: null,
      paused: null,
      error: null,
    },
    {
      name: 'Health Registry',
      contractId: TESTNET_CONTRACT_IDS.healthRegistry,
      owner: null,
      paused: null,
      error: null,
    },
    {
      name: 'Alert Rules',
      contractId: TESTNET_CONTRACT_IDS.alertRules,
      owner: null,
      paused: null,
      error: null,
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContracts() {
      const clients = [
        new ContractRegistryClient(TESTNET_CONTRACT_IDS.contractRegistry),
        new HealthRegistryClient(TESTNET_CONTRACT_IDS.healthRegistry),
        new AlertRulesClient(TESTNET_CONTRACT_IDS.alertRules),
      ];

      const updated = await Promise.all(
        contracts.map(async (info, i) => {
          try {
            const owner = await clients[i].getOwner();
            const paused = await clients[i].isPaused();
            return { ...info, owner, paused, error: null };
          } catch (err) {
            return {
              ...info,
              error: err instanceof Error ? err.message : 'Unknown error',
            };
          }
        })
      );

      setContracts(updated);
      setLoading(false);
    }

    loadContracts();
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
      <header style={{ marginBottom: 48 }}>
        <h1 style={{
          fontSize: 42,
          color: '#7dd3fc',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          StellarWatch
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18, marginTop: 8 }}>
          On-chain health monitoring for Soroban contracts
        </p>
      </header>

      <section>
        <h2 style={{
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#94a3b8',
          marginBottom: 16,
        }}>
          Live Testnet Contracts
        </h2>

        {loading ? (
          <p style={{ color: '#64748b' }}>Loading contract data from Stellar testnet...</p>
        ) : (
          <div style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}>
            {contracts.map((c) => (
              <div
                key={c.contractId}
                style={{
                  background: '#1a1f3a',
                  border: '1px solid #2d3654',
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h3 style={{ margin: '0 0 16px', color: '#7dd3fc', fontSize: 18 }}>
                  {c.name}
                </h3>

                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>
                  <strong>Contract ID:</strong>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    wordBreak: 'break-all',
                    color: '#cbd5e1',
                    marginTop: 4,
                  }}>
                    {c.contractId}
                  </div>
                </div>

                {c.error ? (
                  <div style={{ color: '#f87171', fontSize: 13 }}>
                    Error: {c.error}
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 13, marginBottom: 8 }}>
                      <span style={{ color: '#94a3b8' }}>Owner: </span>
                      <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
                        {c.owner ? `${c.owner.slice(0, 8)}...${c.owner.slice(-6)}` : 'unknown'}
                      </span>
                    </div>
                    <div style={{ fontSize: 13 }}>
                      <span style={{ color: '#94a3b8' }}>Status: </span>
                      <span style={{ color: c.paused ? '#fbbf24' : '#22c55e' }}>
                        {c.paused ? 'Paused' : 'Active'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <footer style={{
        marginTop: 64,
        paddingTop: 24,
        borderTop: '1px solid #2d3654',
        fontSize: 13,
        color: '#64748b',
      }}>
        <p>
          Contracts repo:{' '}
          <a
            href="https://github.com/WideForgeLabs/stellarwatch-contract"
            style={{ color: '#7dd3fc' }}
          >
            github.com/WideForgeLabs/stellarwatch-contract
          </a>
        </p>
      </footer>
    </main>
  );
}
