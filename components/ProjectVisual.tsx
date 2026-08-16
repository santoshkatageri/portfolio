import styles from './ProjectVisual.module.css';

type Variant = 'graph' | 'pipeline' | 'grid' | 'stack';

/**
 * Abstract, generated artwork for a project card.
 * Deliberately not a fake product screenshot — it is a diagram, not a claim.
 */
export default function ProjectVisual({
  variant = 'grid',
  label,
}: {
  variant?: Variant;
  label?: string;
}) {
  return (
    <div className={styles.frame} data-variant={variant} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 320 200" role="presentation">
        <defs>
          <linearGradient id={`pv-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {variant === 'pipeline' && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect
                  x={22 + i * 72}
                  y={82}
                  width={54}
                  height={36}
                  rx={8}
                  className={styles.block}
                />
                {i < 3 && (
                  <line
                    x1={76 + i * 72}
                    y1={100}
                    x2={94 + i * 72}
                    y2={100}
                    className={styles.wire}
                  />
                )}
              </g>
            ))}
            <rect
              x={22}
              y={82}
              width={54}
              height={36}
              rx={8}
              fill={`url(#pv-${variant})`}
            />
            <line x1="22" y1="146" x2="298" y2="146" className={styles.hair} />
            <line x1="22" y1="54" x2="298" y2="54" className={styles.hair} />
          </g>
        )}

        {variant === 'graph' && (
          <g>
            {[
              [70, 60],
              [160, 40],
              [250, 78],
              [110, 140],
              [225, 152],
            ].map(([x, y], i, arr) => (
              <g key={i}>
                {arr.slice(i + 1).map(([x2, y2], j) => (
                  <line
                    key={j}
                    x1={x}
                    y1={y}
                    x2={x2}
                    y2={y2}
                    className={styles.hair}
                  />
                ))}
                <circle cx={x} cy={y} r={i === 1 ? 12 : 7} className={styles.node} />
              </g>
            ))}
          </g>
        )}

        {variant === 'stack' && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={54 + i * 6}
                y={44 + i * 28}
                width={212 - i * 12}
                height={20}
                rx={6}
                className={styles.block}
                fill={i === 0 ? `url(#pv-${variant})` : undefined}
              />
            ))}
          </g>
        )}

        {variant === 'grid' && (
          <g>
            {Array.from({ length: 24 }).map((_, i) => {
              const col = i % 8;
              const row = Math.floor(i / 8);
              const bright = [3, 9, 10, 18].includes(i);
              return (
                <rect
                  key={i}
                  x={28 + col * 34}
                  y={52 + row * 34}
                  width={24}
                  height={24}
                  rx={5}
                  className={bright ? styles.cellOn : styles.cell}
                />
              );
            })}
          </g>
        )}
      </svg>
      {label ? <span className={styles.tag}>{label}</span> : null}
    </div>
  );
}
