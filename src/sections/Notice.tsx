import { MultilineText } from '../components/MultilineText';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { getPhoto } from '../lib/images';
import styles from './Notice.module.css';

export function Notice() {
  const { title, image, text } = wedding.notice;

  return (
    <Section enTitle="Notice" title={title}>
      {image && (
        <Reveal className={styles.image}>
          <Photo src={getPhoto(image)} alt={title} ratio="4 / 3" label="NOTICE" className={styles.photo} />
        </Reveal>
      )}
      <Reveal>
        <MultilineText as="div" className={styles.box} text={text} />
      </Reveal>
    </Section>
  );
}
