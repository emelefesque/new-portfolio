'use client';

interface TierContent {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  criteria: string[];
  description: string;
  example: {
    guideline: string;
    practice: string;
  };
  colorClass: string;
  accentColor: string;
  bgColor: string;
}

const tiers: TierContent[] = [
  {
    id: 'tier-critical',
    badge: 'Critical',
    title: 'Must never violate',
    subtitle: 'Regulatory, legal, and safety requirements — zero tolerance',
    criteria: [
      'Violation creates legal liability or regulatory penalty',
      'Noncompliance could cause direct harm to users or third parties',
      'Required by law, regulation, or binding contract (GDPR, HIPAA, FTC, etc.)',
      'Breach could trigger a product recall, ban, or enforcement action',
      'No acceptable workaround or contextual exception exists',
    ],
    description:
      'These guidelines represent absolute floors — requirements that the model must follow in every output, in every context, with no exceptions. They are typically codified in law, enforced by regulators, or tied to binding agreements. Failure here is not a quality issue; it is a compliance and safety failure. These should be embedded as hard guardrails in system prompts, model instructions, and output validation.',
    example: {
      guideline:
        'A healthcare content standard requires that all AI-generated output include a disclaimer that content is not a substitute for professional medical advice.',
      practice:
        'When the model responds to any health-related query, it must append a medical disclaimer — regardless of how the user frames the request, and regardless of output length or format. Omitting this in a patient-facing app creates HIPAA and FTC exposure.',
    },
    colorClass: 'critical',
    accentColor: '#E74C3C',
    bgColor: 'rgba(231, 76, 60, 0.08)',
  },
  {
    id: 'tier-high',
    badge: 'High',
    title: 'Should consistently follow',
    subtitle: 'Brand trust, credibility, and audience expectations',
    criteria: [
      'Violation would meaningfully damage brand reputation or user trust',
      'Inconsistency here undermines the product\'s core value proposition',
      'Required by an internal style guide with organizational authority',
      'Closely tied to audience expectations for tone, voice, or format',
      'Exceptions exist but must be deliberately approved, not accidental',
    ],
    description:
      'These guidelines don\'t carry legal weight, but violating them consistently erodes trust, creates a disjointed user experience, or signals that the product is low-quality or unreliable. They reflect how an organization has chosen to present itself and what its audience has come to expect. The model should follow these in the vast majority of outputs, with rare, intentional exceptions.',
    example: {
      guideline:
        'A financial services brand guide specifies that the model must never use speculative or emotionally charged language (e.g., "guaranteed returns," "sure thing") in any investment-related content.',
      practice:
        'When describing fund performance or market outlooks, the model uses measured, factual language — "historically performed well" rather than "consistently beats the market." Violations here wouldn\'t necessarily trigger a regulator, but they would erode trust with a sophisticated audience and create brand risk.',
    },
    colorClass: 'high',
    accentColor: '#A65158',
    bgColor: 'rgba(166, 81, 88, 0.08)',
  },
  {
    id: 'tier-medium',
    badge: 'Medium',
    title: 'Follow by default',
    subtitle: 'Quality, clarity, and content consistency',
    criteria: [
      'Violation reduces output quality but does not cause user harm',
      'Inconsistency creates friction but not a fundamental trust breakdown',
      'Guideline reflects best practice or house style preference',
      'Reasonable exceptions exist based on context or user request',
      'Deviation is noticeable to an informed reviewer, not a casual user',
    ],
    description:
      'Medium-tier guidelines shape the quality and consistency of outputs without being non-negotiable. These are often editorial preferences, formatting standards, or structural conventions. They matter for professional-grade output and for maintaining a coherent voice across a product — but occasional, context-appropriate deviations are acceptable. These should appear as model instructions and default behaviors, not hard constraints.',
    example: {
      guideline:
        'A content style guide specifies that responses should use active voice and avoid nominalization (e.g., "we analyzed" not "an analysis was conducted").',
      practice:
        'For standard user-facing responses, the model writes in active voice. In formal report generation or when a user requests a specific passive structure, the model may deviate. The quality difference is real but not brand-threatening.',
    },
    colorClass: 'medium',
    accentColor: '#D9AFA0',
    bgColor: 'rgba(217, 175, 160, 0.08)',
  },
  {
    id: 'tier-low',
    badge: 'Low',
    title: 'Apply when practical',
    subtitle: 'Stylistic preferences and contextual suggestions',
    criteria: [
      'Violation has no measurable impact on trust or user outcome',
      'Guideline reflects personal, team, or regional preference',
      'Inconsistency is unlikely to be noticed by most users',
      'Context-dependent — correct behavior varies by use case',
      'Would only be flagged in a detailed editorial review, not production QA',
    ],
    description:
      'Low-tier guidelines are preferences that improve polish but do not meaningfully affect user trust, product quality, or brand integrity. They\'re worth knowing and applying when there is no competing consideration — but they should not drive heavy enforcement, prompt real estate, or QA cycles. These are useful for training data curation or fine-tuning feedback but should not block deployment.',
    example: {
      guideline:
        'A writing guide notes that the Oxford comma is preferred but not required, and that em dashes should use a space on each side in web copy.',
      practice:
        'The model uses Oxford commas by default and formats em dashes with spaces when generating blog-style content. In structured outputs, forms, or tables, punctuation conventions are deprioritized. A reviewer may flag these in an audit, but no user-facing impact occurs either way.',
    },
    colorClass: 'low',
    accentColor: '#6B7280',
    bgColor: 'rgba(107, 114, 128, 0.08)',
  },
];

export default function LLMRiskFramework() {
  return (
    <div className="py-12">
      <style>{`
        .critical .tier-badge { background: rgba(231, 76, 60, 0.2); color: #E74C3C; }
        .critical .tier-header { background: rgba(231, 76, 60, 0.08); }
        .critical .criteria-list li::before { background: #E74C3C; }
        .critical .example-box { background: rgba(231, 76, 60, 0.08); }
        .critical .example-label { color: #E74C3C; }
        .critical .example-text { color: #F2E3D5; }

        .high .tier-badge { background: rgba(166, 81, 88, 0.2); color: #A65158; }
        .high .tier-header { background: rgba(166, 81, 88, 0.08); }
        .high .criteria-list li::before { background: #A65158; }
        .high .example-box { background: rgba(166, 81, 88, 0.08); }
        .high .example-label { color: #A65158; }
        .high .example-text { color: #F2E3D5; }

        .medium .tier-badge { background: rgba(217, 175, 160, 0.2); color: #D9AFA0; }
        .medium .tier-header { background: rgba(217, 175, 160, 0.08); }
        .medium .criteria-list li::before { background: #D9AFA0; }
        .medium .example-box { background: rgba(217, 175, 160, 0.08); }
        .medium .example-label { color: #D9AFA0; }
        .medium .example-text { color: #F2E3D5; }

        .low .tier-badge { background: rgba(107, 114, 128, 0.2); color: #9CA3AF; }
        .low .tier-header { background: rgba(107, 114, 128, 0.08); }
        .low .criteria-list li::before { background: #6B7280; }
        .low .example-box { background: rgba(107, 114, 128, 0.08); }
        .low .example-label { color: #9CA3AF; }
        .low .example-text { color: #F2E3D5; }

        .tier-card {
          border-radius: 12px;
          border: 1px solid rgba(242, 227, 213, 0.12);
          background: #1A1A1A;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
        }

        .tier-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(242, 227, 213, 0.12);
        }

        .tier-badge {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .tier-title {
          font-size: 15px;
          font-weight: 500;
          color: #F2E3D5;
          flex: 1;
        }

        .tier-subtitle {
          font-size: 13px;
          color: rgba(242, 227, 213, 0.6);
          flex: 2;
        }

        .tier-body {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
        }

        @media (max-width: 680px) {
          .tier-body {
            grid-template-columns: 1fr;
          }
          .section {
            border-right: none !important;
            border-bottom: 1px solid rgba(242, 227, 213, 0.12);
          }
          .section:last-child {
            border-bottom: none;
          }
          .tier-subtitle { display: none; }
        }

        .section {
          padding: 1rem 1.25rem;
          border-right: 1px solid rgba(242, 227, 213, 0.12);
        }

        .section:last-child {
          border-right: none;
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #C0707A;
          margin-bottom: 10px;
        }

        .criteria-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 0;
          padding: 0;
        }

        .criteria-list li {
          font-size: 13px;
          color: #F2E3D5;
          line-height: 1.5;
          padding-left: 14px;
          position: relative;
        }

        .criteria-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .description-text {
          font-size: 13px;
          color: #F2E3D5;
          line-height: 1.65;
        }

        .example-box {
          border-radius: 8px;
          padding: 10px 12px;
          margin-top: 10px;
        }

        .example-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .example-text {
          font-size: 12.5px;
          line-height: 1.55;
        }

        .how-to-apply {
          background: #1A1A1A;
          border-radius: 12px;
          border: 1px solid rgba(242, 227, 213, 0.12);
          padding: 1rem 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
        }

        .how-to-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #C0707A;
          margin-bottom: 12px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        @media (max-width: 680px) {
          .steps { grid-template-columns: 1fr 1fr; }
        }

        .step {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .step-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 500;
          background: rgba(166, 81, 88, 0.2);
          color: #A65158;
        }

        .step-title {
          font-size: 13px;
          font-weight: 500;
          color: #F2E3D5;
        }

        .step-desc {
          font-size: 12px;
          color: rgba(242, 227, 213, 0.6);
          line-height: 1.5;
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-[#F2E3D5] mb-2">
            LLM Content Risk Assessment Framework
          </h2>
          <p className="text-sm text-[rgba(242,227,213,0.6)] leading-relaxed">
            Use this framework to evaluate guidelines from content standards and style guides, and
            assign each a risk tier based on its potential impact if violated by an LLM model.
          </p>
        </div>

        {/* How to apply */}
        <div className="how-to-apply">
          <div className="how-to-label">How to apply this framework</div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-title">Identify the guideline</div>
              <div className="step-desc">Extract each rule or requirement from the style guide or content standard being assessed.</div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-title">Test against criteria</div>
              <div className="step-desc">Match the guideline to the criteria in each tier, starting at critical and moving down.</div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-title">Assign the tier</div>
              <div className="step-desc">Assign the highest tier where the guideline meets at least two criteria. Document your reasoning.</div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-title">Set enforcement</div>
              <div className="step-desc">Use tier assignments to prioritize model instructions, guardrails, and QA test coverage.</div>
            </div>
          </div>
        </div>

        {/* Tier cards */}
        {tiers.map((tier) => (
          <div key={tier.id} className={`tier-card ${tier.colorClass}`}>
            <div className="tier-header">
              <span className="tier-badge">{tier.badge}</span>
              <span className="tier-title">{tier.title}</span>
              <span className="tier-subtitle">{tier.subtitle}</span>
            </div>
            <div className="tier-body">
              <div className="section">
                <div className="section-label">Criteria</div>
                <ul className="criteria-list">
                  {tier.criteria.map((criterion, idx) => (
                    <li key={idx}>{criterion}</li>
                  ))}
                </ul>
              </div>
              <div className="section">
                <div className="section-label">Description</div>
                <div className="description-text">{tier.description}</div>
              </div>
              <div className="section">
                <div className="section-label">Example</div>
                <div className="description-text">{tier.example.guideline}</div>
                <div className="example-box">
                  <div className="example-label">Guideline in practice</div>
                  <div className="example-text">{tier.example.practice}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
