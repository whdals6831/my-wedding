import type { ComponentType } from 'react';
import type { SectionKey } from '../config/types';
import { Accounts } from './Accounts';
import { Calendar } from './Calendar';
import { Cover } from './Cover';
import { Directions } from './Directions';
import { Gallery } from './Gallery';
import { Greeting } from './Greeting';
import { Intro } from './Intro';
import { Notice } from './Notice';
import { Share } from './Share';
import { WeddingInfo } from './WeddingInfo';

export const sectionRegistry: Record<SectionKey, ComponentType> = {
  cover: Cover,
  intro: Intro,
  calendar: Calendar,
  weddingInfo: WeddingInfo,
  greeting: Greeting,
  directions: Directions,
  notice: Notice,
  accounts: Accounts,
  gallery: Gallery,
  share: Share,
};
