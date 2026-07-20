import type { SchemaTypeDefinition } from 'sanity';

import { certificationType } from './certificationType';
import { educationType } from './educationType';
import { experienceType } from './experienceType';
import { homepageType } from './homepageType';
import { postType } from './postType';
import { profileType } from './profileType';
import { projectType } from './projectType';
import { siteSettingsType } from './siteSettingsType';
import { skillCategoryType } from './skillCategoryType';
import { statType } from './statType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType,
    statType,
    skillCategoryType,
    projectType,
    experienceType,
    educationType,
    certificationType,
    homepageType,
    profileType,
    siteSettingsType,
  ],
};

export const SINGLETON_TYPES = new Set(['homepage', 'profile', 'siteSettings']);
