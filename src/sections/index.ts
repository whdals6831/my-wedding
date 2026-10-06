import type { ComponentType } from 'react';
import type { SectionKey } from '../config/types';
import { Accounts } from './Accounts';
import { Calendar } from './Calendar';
import { Cover } from './Cover';
import { Directions } from './Directions';
import { Gallery } from './Gallery';
import { Greeting } from './Greeting';
import { Intro } from './Intro';
import { Location } from './Location';
import { Notice } from './Notice';
import { Share } from './Share';

export const sectionRegistry: Record<SectionKey, ComponentType> = {
  cover: Cover,
  greeting: Greeting,
  calendar: Calendar,
  location: Location,
  directions: Directions,
  notice: Notice,
  intro: Intro,
  gallery: Gallery,
  accounts: Accounts,
  share: Share,
};
