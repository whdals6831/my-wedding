import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { PhotoPlaceholder } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { galleryImages } from '../lib/images';
import { isMobile } from '../lib/platform';
import styles from './Gallery.module.css';

const SECTION_ID = 'gallery';
const slides = galleryImages.map((src) => ({ src }));

export function Gallery() {
  const { initialCount, placeholderCount } = wedding.gallery;
  const hasImages = galleryImages.length > 0;
  const total = hasImages ? galleryImages.length : placeholderCount;

  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const visibleCount = expanded ? total : Math.min(initialCount, total);

  const collapse = () => {
    setExpanded(false);
    document.getElementById(SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Section id={SECTION_ID} enTitle="Gallery" title="우리의 순간">
      <Reveal>
        <ul className={styles.grid}>
          {Array.from({ length: visibleCount }, (_, index) => (
            <li key={index}>
              {hasImages ? (
                <button
                  type="button"
                  className={styles.tile}
                  onClick={() => setOpenIndex(index)}
                  aria-label={`사진 ${index + 1} 크게 보기`}
                >
                  <img src={galleryImages[index]} alt="" loading="lazy" decoding="async" draggable={false} />
                </button>
              ) : (
                <div className={styles.tile}>
                  <PhotoPlaceholder />
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      {total > initialCount && (
        <button type="button" className={`btn ${styles.more}`} onClick={expanded ? collapse : () => setExpanded(true)}>
          {expanded ? '접기' : `더보기 (${total - initialCount})`}
        </button>
      )}

      {hasImages && (
        <Lightbox
          open={openIndex >= 0}
          index={Math.max(openIndex, 0)}
          close={() => setOpenIndex(-1)}
          slides={slides}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
          render={isMobile ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
          styles={{ container: { backgroundColor: 'rgb(28 20 20 / 94%)' } }}
        />
      )}
    </Section>
  );
}
