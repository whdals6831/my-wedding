import { toast } from 'sonner';
import { copyText } from '../lib/clipboard';
import { CopyIcon } from './Icons';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  text: string;
  label?: string;
  /** 복사 성공 시 토스트 문구 */
  message?: string;
  ariaLabel?: string;
  /** 지정하면 기본 칩 스타일 대신 사용 */
  className?: string;
}

export function CopyButton({ text, label = '복사', message = '복사되었습니다', ariaLabel, className }: CopyButtonProps) {
  const handleClick = async () => {
    if (await copyText(text)) {
      toast(message);
    } else {
      toast('복사하지 못했습니다. 길게 눌러 직접 복사해 주세요.');
    }
  };

  return (
    <button type="button" className={className ?? styles.chip} onClick={handleClick} aria-label={ariaLabel}>
      <CopyIcon className={styles.icon} />
      {label}
    </button>
  );
}
