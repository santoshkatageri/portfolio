'use client';

import styles from './PrintButton.module.css';

/** Opens the browser print dialog for saving the résumé as PDF. */
export default function PrintButton({ label = 'Print / Save PDF' }: { label?: string }) {
  return (
    <button type="button" className={`btn ${styles.btn}`} onClick={() => window.print()}>
      {label}
      <span className="btn__arrow" aria-hidden="true">↗</span>
    </button>
  );
}
