import { cx } from '../lib/cx';
import { ImageIcon } from './Icons';
import styles from './Photo.module.css';

interface PhotoProps {
  src?: string;
  alt: string;
  /** CSS aspect-ratio 값 (예: '3 / 4') */
  ratio?: string;
  /** 사진이 없을 때 빈 자리에 표시할 라벨 */
  label?: string;
  priority?: boolean;
  className?: string;
}

export function Photo({ src, alt, ratio = '3 / 4', label, priority = false, className }: PhotoProps) {
  return (
    <div className={cx(styles.frame, className)} style={{ aspectRatio: ratio }}>
      {src ? (
        <img
          className={styles.img}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
        />
      ) : (
        <PhotoPlaceholder label={label} />
      )}
    </div>
  );
}

export function PhotoPlaceholder({ label }: { label?: string }) {
  return (
    <div className={styles.placeholder} role="img" aria-label={label ? `${label} (사진 준비 중)` : '사진 준비 중'}>
      <ImageIcon className={styles.icon} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
