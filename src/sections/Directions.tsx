import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { wedding } from '../config/wedding';
import { getPhoto } from '../lib/images';
import styles from './Directions.module.css';

export function Directions() {
  const { mapImage, items } = wedding.directions;

  return (
    <Section enTitle="Directions" title="오시는 길">
      {mapImage && (
        <Reveal className={styles.map}>
          <Photo
            src={getPhoto(mapImage)}
            alt={`${wedding.venue.name} 약도`}
            ratio="4 / 3"
            label="MAP IMAGE"
            className={styles.mapPhoto}
          />
        </Reveal>
      )}

      <div className={styles.items}>
        {items.map((item) => (
          <Reveal key={item.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <ul className={styles.lines}>
              {item.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
