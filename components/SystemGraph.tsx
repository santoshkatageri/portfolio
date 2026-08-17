'use client';

import { useState } from 'react';
import styles from './SystemGraph.module.css';

type Node = {
  id: string;
  label: string;
  /** Shorter label used on small screens */
  short?: string;
  /** One-line description surfaced on hover / focus */
  description: string;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  lx: number;
  ly: number;
  delay: number;
};

/* Ellipse: centre (260, 190), rx 132, ry 118 on a 520 × 380 canvas. */
const CX = 260;
const CY = 190;

const NODES: Node[] = [
  {
    id: 'ai',
    label: 'AI',
    description: 'AI tools, agents & AI-assisted development',
    x: 260,
    y: 72,
    anchor: 'middle',
    lx: 260,
    ly: 51,
    delay: 0,
  },
  {
    id: 'software',
    label: 'Software',
    description: 'Applications, APIs & software engineering',
    x: 385.5,
    y: 153.5,
    anchor: 'start',
    lx: 398,
    ly: 157,
    delay: 1.4,
  },
  {
    id: 'systems',
    label: 'Systems',
    description: 'Architecture, distributed systems & how technology works',
    x: 337.6,
    y: 285.5,
    anchor: 'start',
    lx: 350,
    ly: 289,
    delay: 2.8,
  },
  {
    id: 'automation',
    label: 'Automation',
    short: 'Auto',
    description: 'CI/CD, workflows & infrastructure automation',
    x: 182.4,
    y: 285.5,
    anchor: 'end',
    lx: 170,
    ly: 289,
    delay: 4.2,
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    short: 'Infra',
    description: 'Cloud, DevOps & platform engineering',
    x: 134.5,
    y: 153.5,
    anchor: 'end',
    lx: 122,
    ly: 157,
    delay: 5.6,
  },
];

/**
 * A quiet architecture diagram: five domains connected to one centre.
 * Pure SVG + CSS animation — no canvas loop, no animation library.
 * Each node is hoverable and keyboard-focusable; the caption below the
 * diagram describes the active domain instead of opening a popup.
 */
export default function SystemGraph() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = NODES.find((node) => node.id === activeId) ?? null;

  return (
    <div className={styles.wrap} data-dimmed={active ? 'true' : undefined}>
      <svg
        className={styles.svg}
        viewBox="0 0 520 380"
        aria-labelledby="system-graph-title"
        role="group"
      >
        <title id="system-graph-title">
          Five connected areas of work: AI, software, systems, automation and
          infrastructure.
        </title>

        {/* ring between neighbouring domains */}
        {NODES.map((node, index) => {
          const next = NODES[(index + 1) % NODES.length];
          return (
            <line
              key={`ring-${node.id}`}
              className={styles.edge}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
            />
          );
        })}

        {/* spokes to the centre */}
        {NODES.map((node) => (
          <line
            key={`spoke-${node.id}`}
            className={styles.edge}
            data-active={activeId === node.id ? 'true' : undefined}
            x1={CX}
            y1={CY}
            x2={node.x}
            y2={node.y}
          />
        ))}

        {/* signal travelling along each spoke */}
        {NODES.map((node) => (
          <line
            key={`flow-${node.id}`}
            className={styles.edgeGlow}
            data-active={activeId === node.id ? 'true' : undefined}
            x1={node.x}
            y1={node.y}
            x2={CX}
            y2={CY}
            style={{ animationDelay: `${node.delay}s` }}
          />
        ))}

        <circle className={styles.centerRing} cx={CX} cy={CY} r={52} />
        <text
          className={styles.centerLabel}
          x={CX}
          y={CY + 3.5}
          textAnchor="middle"
        >
          SPKATAGERI
        </text>

        {NODES.map((node) => (
          <g
            key={node.id}
            className={styles.node}
            data-active={activeId === node.id ? 'true' : undefined}
            tabIndex={0}
            role="button"
            aria-label={`${node.label} — ${node.description}`}
            onMouseEnter={() => setActiveId(node.id)}
            onMouseLeave={() => setActiveId((id) => (id === node.id ? null : id))}
            onFocus={() => setActiveId(node.id)}
            onBlur={() => setActiveId((id) => (id === node.id ? null : id))}
            onClick={() =>
              setActiveId((id) => (id === node.id ? null : node.id))
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveId((id) => (id === node.id ? null : node.id));
              }
            }}
            aria-pressed={activeId === node.id}
          >
            {/* generous, invisible hit area for pointer and touch */}
            <circle className={styles.hit} cx={node.x} cy={node.y} r={30} />
            <circle
              className={styles.halo}
              cx={node.x}
              cy={node.y}
              r={17}
              style={{ animationDelay: `${node.delay / 2}s` }}
            />
            <circle className={styles.nodeDot} cx={node.x} cy={node.y} r={7} />
            <circle className={styles.nodeCore} cx={node.x} cy={node.y} r={2.4} />
            <text
              className={styles.nodeLabel}
              x={node.lx}
              y={node.ly}
              textAnchor={node.anchor}
              data-variant="full"
              data-has-short={node.short ? 'true' : undefined}
            >
              {node.label}
            </text>
            {node.short ? (
              <text
                className={`${styles.nodeLabel} ${styles.labelShort}`}
                x={node.lx}
                y={node.ly}
                textAnchor={node.anchor}
              >
                {node.short}
              </text>
            ) : null}
          </g>
        ))}
      </svg>

      <p className={styles.caption} aria-live="polite">
        {active ? (
          <>
            <span className={styles.captionLabel}>{active.label}</span>
            <span className={styles.captionText}>{active.description}</span>
          </>
        ) : (
          <span className={styles.captionHint}>
            Hover or focus a node to see what each area covers
          </span>
        )}
      </p>
    </div>
  );
}
