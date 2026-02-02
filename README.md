# SafetyGap 🛡️

**Mapping Multilingual Blind Spots in AI Safety Evaluation Infrastructure**

[![Track 4](https://img.shields.io/badge/Track%204-International%20Verification%20%26%20Coordination-purple)](https://apartresearch.com)
[![Hackathon](https://img.shields.io/badge/Technical%20AI%20Governance-Hackathon%202026-blue)](https://apartresearch.com)

## The Problem

International AI Safety Institutes cannot coordinate on safety evaluation if they lack shared visibility into what evaluation infrastructure actually exists.

**Our analysis reveals:**
- **75% of EU languages** have no jailbreak resistance benchmarks
- **96% of EU languages** have no bias detection benchmarks  
- **96% of EU languages** have no adversarial robustness benchmarks

A model could pass every available safety evaluation in Greek, Hungarian, or Polish while having completely untested vulnerabilities in those languages.

## The Solution

SafetyGap is an open-source tool that:

1. **Maps coverage** — Which benchmarks exist for which languages
2. **Identifies gaps** — Which language × category combinations have zero coverage
3. **Prioritizes action** — Which gaps affect the most people
4. **Enables coordination** — Shareable format for international collaboration

## Quick Start

```bash
# View the interactive dashboard
# Open SafetyGapDashboard.jsx in any React environment

# Or run the Python analysis
python analyze_coverage.py
```

## Key Findings

| Risk Category | EU Language Coverage | Status |
|--------------|---------------------|--------|
| Truthfulness | 22/24 (92%) | ✅ Adequate |
| Over-refusal | 24/24 (100%) | ✅ Adequate |
| Toxicity | 14/24 (58%) | ⚠️ Moderate gap |
| Jailbreak | **2/24 (8%)** | 🚨 **Critical** |
| Bias | **1/24 (4%)** | 🚨 **Critical** |
| Adversarial | **1/24 (4%)** | 🚨 **Critical** |

## Who Should Use This

| Stakeholder | Use Case |
|-------------|----------|
| 🏛️ AI Safety Institutes | Coordinate benchmark development, avoid duplication |
| ⚖️ Regulators | Understand which compliance claims are verifiable |
| 🔬 Benchmark Developers | Identify high-impact targets for new work |

## Files

- `SafetyGapDashboard.jsx` — Interactive React visualization
- `benchmarks.json` — Structured benchmark database
- `submission_report.md` — Full hackathon report

## Contributing

This tool is designed to be community-maintained. To add a benchmark:

1. Fork this repo
2. Add entry to `benchmarks.json`
3. Submit PR

## References

- Deng et al. (2024). Multilingual jailbreak challenges in LLMs. ICLR 2024.
- Wang et al. (2024). All languages matter: Multilingual safety of LLMs. ACL 2024.
- Mazeika et al. (2024). HarmBench. arXiv:2402.04249.

## License

MIT

---

*Track 4: International Verification & Coordination — Technical AI Governance Hackathon 2026*
