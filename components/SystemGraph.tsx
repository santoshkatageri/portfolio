import styles from './SystemGraph.module.css';

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  /** Shorter label used on small screens */
  short?: string;
  lx: number;
  ly: number;
  delay: number;
};

/* Ellipse: centre (260, 190), rx 132, ry 118 on a 520 × 380 canvas. */
const CX = 260;
const CY = 190;

const NODES: Node[] = [
  { id: 'ai', label: 'AI', x: 260, y: 72, anchor: 'middle', lx: 260, ly: 51, delay: 0 },
  {
    id: 'software',
    label: 'Software',
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
 */
export default function SystemGraph() {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox="0 0 520 380"
        role="img"
        aria-label="Diagram of connected domains: AI, software, systems, automation and infrastructure, linked to a shared centre."
      >
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
          <g key={node.id}>
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
    </div>
  );
}
