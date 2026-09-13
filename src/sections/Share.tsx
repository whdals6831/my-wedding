import { useEffect } from 'react';
import { toast } from 'sonner';
import { CopyButton } from '../components/CopyButton';
import { ShareIcon } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { KAKAO_JS_KEY, loadKakaoSdk, shareInvitation } from '../lib/kakao';
import styles from './Share.module.css';

export function Share() {
  const { siteUrl, share, groom, bride } = wedding;

  // 첫 공유 탭이 바로 반응하도록 미리 SDK를 불러둔다
  useEffect(() => {
    if (!KAKAO_JS_KEY) return;
    const timer = window.setTimeout(() => void loadKakaoSdk(), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const result = await shareInvitation({
      url: siteUrl,
      title: share.title,
      description: share.description,
      imageUrl: __OG_IMAGE_URL__ || undefined,
      buttonTitle: share.buttonTitle,
    });
    if (result === 'copied') toast('링크가 복사되었습니다. 카카오톡에 붙여넣어 공유해 주세요.');
    if (result === 'failed') toast('공유하지 못했습니다. 주소창의 링크를 복사해 주세요.');
  };

  return (
    <>
      <Section enTitle="Thank you" tone="soft">
        <Reveal>
          <p className={styles.thanks}>
            저희의 새로운 시작을 함께해 주셔서
            <br />
            진심으로 감사드립니다.
          </p>
        </Reveal>
        <Reveal delay={100} className={styles.buttons}>
          <button type="button" className="btn btn-primary btn-block" onClick={handleShare}>
            <ShareIcon className="icon" />
            카카오톡으로 공유하기
          </button>
          <CopyButton
            text={siteUrl}
            label="청첩장 링크 복사"
            message="링크가 복사되었습니다"
            className="btn btn-block"
          />
        </Reveal>
      </Section>
      <footer className={styles.footer}>
        {groom.firstName} &amp; {bride.firstName}
      </footer>
    </>
  );
}
