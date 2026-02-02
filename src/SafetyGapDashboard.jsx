import React, { useState } from 'react';

// SafetyGap: Multilingual Safety Benchmark Coverage Tracker
// For AI Safety Institutes, Regulators, and Benchmark Developers

const BENCHMARKS = [
  { name: "TruthfulQA", category: "Truthfulness", euLangs: 22, totalLangs: 22, source: "Lin et al. 2022", hasEU: true },
  { name: "OR-Bench", category: "Over-refusal", euLangs: 24, totalLangs: 24, source: "Cui et al. 2024", hasEU: true },
  { name: "RealToxicityPrompts", category: "Toxicity", euLangs: 10, totalLangs: 14, source: "Gehman et al. 2020", hasEU: true },
  { name: "PolygloToxicityPrompts", category: "Toxicity", euLangs: 8, totalLangs: 17, source: "Jain et al. 2024", hasEU: true },
  { name: "XSafety", category: "General Safety", euLangs: 5, totalLangs: 10, source: "Wang et al. 2024", hasEU: true },
  { name: "M-ALERT", category: "Red-teaming", euLangs: 5, totalLangs: 5, source: "Friedrich et al. 2024", hasEU: true },
  { name: "MultiJail", category: "Jailbreak", euLangs: 1, totalLangs: 10, source: "Deng et al. 2024", hasEU: false },
  { name: "HarmBench", category: "Jailbreak", euLangs: 1, totalLangs: 1, source: "Mazeika et al. 2024", hasEU: false },
  { name: "AdvBench", category: "Adversarial", euLangs: 1, totalLangs: 1, source: "Zou et al. 2023", hasEU: false },
  { name: "BBQ", category: "Bias", euLangs: 1, totalLangs: 1, source: "Parrish et al. 2022", hasEU: false },
  { name: "StereoSet", category: "Bias", euLangs: 1, totalLangs: 1, source: "Nadeem et al. 2021", hasEU: false },
  { name: "DecodingTrust", category: "Trustworthiness", euLangs: 1, totalLangs: 1, source: "Wang et al. 2024", hasEU: false },
  { name: "SimpleSafetyTests", category: "General Safety", euLangs: 1, totalLangs: 1, source: "Vidgen et al. 2024", hasEU: false },
  { name: "DoNotAnswer", category: "Refusal", euLangs: 1, totalLangs: 1, source: "Wang et al. 2024", hasEU: false },
  { name: "LinguaSafe", category: "General Safety", euLangs: 4, totalLangs: 17, source: "LinguaSafe 2025", hasEU: true },
];

const EU_LANGUAGES = [
  "English", "French", "German", "Spanish", "Italian", "Portuguese", "Dutch", "Polish",
  "Swedish", "Czech", "Greek", "Hungarian", "Romanian", "Danish", "Finnish", "Slovak",
  "Bulgarian", "Croatian", "Lithuanian", "Latvian", "Slovenian", "Estonian", "Irish", "Maltese"
];

const CATEGORIES = [
  { name: "Jailbreak", euCoverage: 2, critical: true, article: "55(1)(a)" },
  { name: "Bias", euCoverage: 1, critical: true, article: "55(1)(b)" },
  { name: "Adversarial", euCoverage: 1, critical: true, article: "55(1)(a)" },
  { name: "Toxicity", euCoverage: 14, critical: false, article: "55(1)(c)" },
  { name: "General Safety", euCoverage: 10, critical: false, article: "55(1)(b)" },
  { name: "Truthfulness", euCoverage: 22, critical: false, article: "55(1)(b)" },
  { name: "Over-refusal", euCoverage: 24, critical: false, article: "Code of Practice" },
];

const LANGUAGE_COVERAGE = {
  "English": { score: 100, status: "full", gaps: [] },
  "French": { score: 42, status: "high-gap", gaps: ["Jailbreak", "Bias", "Adversarial"] },
  "German": { score: 42, status: "high-gap", gaps: ["Jailbreak", "Bias", "Adversarial"] },
  "Spanish": { score: 42, status: "high-gap", gaps: ["Jailbreak", "Bias", "Adversarial"] },
  "Italian": { score: 50, status: "high-gap", gaps: ["Jailbreak", "Bias", "Adversarial"] },
  "Portuguese": { score: 33, status: "high-gap", gaps: ["Jailbreak", "Bias", "Adversarial", "General Safety"] },
  "Dutch": { score: 25, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "General Safety"] },
  "Polish": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Swedish": { score: 25, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "General Safety"] },
  "Czech": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Greek": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Hungarian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Romanian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Danish": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Finnish": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Slovak": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Bulgarian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Croatian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Lithuanian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Latvian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Slovenian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Estonian": { score: 17, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety"] },
  "Irish": { score: 8, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety", "Refusal"] },
  "Maltese": { score: 8, status: "critical", gaps: ["Jailbreak", "Bias", "Adversarial", "Toxicity", "General Safety", "Refusal"] },
};

export default function SafetyGapDashboard() {
  const [view, setView] = useState('overview');
  const [selectedLang, setSelectedLang] = useState(null);

  const criticalLangs = Object.entries(LANGUAGE_COVERAGE).filter(([_, d]) => d.status === 'critical').length;
  const criticalCats = CATEGORIES.filter(c => c.critical).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#e2e8f0',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a0f 100%)',
        borderBottom: '1px solid #2d2d44',
        padding: '32px 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>🛡️</div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#fff' }}>SafetyGap</h1>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 15, maxWidth: 600 }}>
            Multilingual coverage tracker for AI safety benchmarks.
            Built for AI Safety Institutes, regulators, and benchmark developers.
          </p>
        </div>
      </div>

      {/* Key Stats */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { label: 'EU Languages Analyzed', value: '24', color: '#3b82f6' },
            { label: 'Critical Language Gaps', value: criticalLangs.toString(), color: '#ef4444' },
            { label: 'Critical Category Gaps', value: criticalCats.toString(), color: '#f97316' },
            { label: 'Benchmarks Tracked', value: BENCHMARKS.length.toString(), color: '#10b981' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#12121a',
              border: '1px solid #2d2d44',
              borderRadius: 12,
              padding: '20px 24px',
            }}>
              <div style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Alert Box */}
        <div style={{
          background: 'linear-gradient(90deg, #7f1d1d22 0%, #0a0a0f 100%)',
          border: '1px solid #991b1b',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 32,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: 24 }}>⚠️</div>
          <div>
            <div style={{ fontWeight: 600, color: '#fca5a5', marginBottom: 4 }}>Critical Infrastructure Gap</div>
            <div style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6 }}>
              <strong>75% of EU official languages</strong> have no benchmarks for jailbreak resistance, bias detection,
              or adversarial robustness—the exact capabilities EU AI Act Article 55 requires providers to evaluate.
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
          {[
            { id: 'overview', label: '📊 Category Coverage' },
            { id: 'languages', label: '🌍 Language Gaps' },
            { id: 'benchmarks', label: '📚 Benchmark Database' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              style={{
                padding: '10px 20px',
                background: view === tab.id ? '#2d2d44' : 'transparent',
                border: '1px solid',
                borderColor: view === tab.id ? '#4f46e5' : '#2d2d44',
                borderRadius: 8,
                color: view === tab.id ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Coverage View */}
        {view === 'overview' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
              Risk Category Coverage Across EU Languages
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CATEGORIES.sort((a, b) => a.euCoverage - b.euCoverage).map(cat => {
                const pct = Math.round((cat.euCoverage / 24) * 100);
                const isCritical = pct < 25;
                const isModerate = pct >= 25 && pct < 60;
                return (
                  <div key={cat.name} style={{
                    background: '#12121a',
                    border: `1px solid ${isCritical ? '#991b1b' : isModerate ? '#92400e' : '#2d2d44'}`,
                    borderRadius: 10,
                    padding: '16px 20px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontWeight: 600, color: '#fff' }}>{cat.name}</span>
                        <span style={{
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: '#1e1b4b',
                          color: '#a5b4fc',
                        }}>
                          Art. {cat.article}
                        </span>
                        {isCritical && (
                          <span style={{
                            fontSize: 11,
                            padding: '2px 8px',
                            borderRadius: 4,
                            background: '#7f1d1d',
                            color: '#fca5a5',
                          }}>
                            CRITICAL GAP
                          </span>
                        )}
                      </div>
                      <span style={{ color: isCritical ? '#ef4444' : isModerate ? '#f97316' : '#10b981', fontWeight: 600 }}>
                        {cat.euCoverage}/24 languages ({pct}%)
                      </span>
                    </div>
                    <div style={{
                      height: 8,
                      background: '#1e1e2e',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: isCritical ? '#ef4444' : isModerate ? '#f97316' : '#10b981',
                        borderRadius: 4,
                        transition: 'width 0.3s',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Language Gaps View */}
        {view === 'languages' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
              Coverage Score by EU Language
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {Object.entries(LANGUAGE_COVERAGE)
                .sort((a, b) => a[1].score - b[1].score)
                .map(([lang, data]) => {
                  const isCritical = data.status === 'critical';
                  const isHighGap = data.status === 'high-gap';
                  return (
                    <div
                      key={lang}
                      onClick={() => setSelectedLang(selectedLang === lang ? null : lang)}
                      style={{
                        background: '#12121a',
                        border: `1px solid ${isCritical ? '#991b1b' : isHighGap ? '#92400e' : '#166534'}`,
                        borderRadius: 10,
                        padding: '14px 18px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 500, color: '#fff' }}>{lang}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            color: isCritical ? '#ef4444' : isHighGap ? '#f97316' : '#10b981',
                            fontWeight: 600,
                          }}>
                            {data.score}%
                          </span>
                          {isCritical && <span style={{ fontSize: 12 }}>🚨</span>}
                        </div>
                      </div>
                      {selectedLang === lang && data.gaps.length > 0 && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #2d2d44' }}>
                          <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>Missing benchmarks for:</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {data.gaps.map(gap => (
                              <span key={gap} style={{
                                fontSize: 11,
                                padding: '2px 8px',
                                borderRadius: 4,
                                background: '#7f1d1d',
                                color: '#fca5a5',
                              }}>
                                {gap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Benchmark Database View */}
        {view === 'benchmarks' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
              Tracked Safety Benchmarks
            </h2>
            <div style={{
              background: '#12121a',
              border: '1px solid #2d2d44',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1e1e2e' }}>
                    {['Benchmark', 'Category', 'EU Languages', 'Total Languages', 'Source'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b, i) => (
                    <tr key={b.name} style={{ borderTop: '1px solid #2d2d44' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#fff' }}>{b.name}</td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{b.category}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          color: b.euLangs === 1 ? '#ef4444' : b.euLangs < 10 ? '#f97316' : '#10b981',
                          fontWeight: 600,
                        }}>
                          {b.euLangs}/24
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{b.totalLangs}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: 13 }}>{b.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div style={{
          marginTop: 40,
          padding: '24px 32px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #12121a 100%)',
          border: '1px solid #4f46e5',
          borderRadius: 12,
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#fff', fontSize: 18 }}>Who Should Use This Tool?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { role: '🏛️ AI Safety Institutes', action: 'Coordinate benchmark development, avoid duplicated effort' },
              { role: '⚖️ Regulators', action: 'Understand which compliance claims are verifiable' },
              { role: '🔬 Benchmark Developers', action: 'Identify high-impact languages and categories to target' },
            ].map(item => (
              <div key={item.role}>
                <div style={{ fontWeight: 600, color: '#a5b4fc', marginBottom: 4 }}>{item.role}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{item.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #2d2d44', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>
            SafetyGap • Technical AI Governance Hackathon 2025 • Track 4: International Verification & Coordination
          </p>
          <p style={{ color: '#4b5563', fontSize: 12, marginTop: 8 }}>
            Open source • Community-maintained • Contributions welcome
          </p>
        </div>
      </div>
    </div>
  );
}
