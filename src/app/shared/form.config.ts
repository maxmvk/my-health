import {UserYearRangeInterface, AppFormParamsInterface} from './models';

const EMAIL_VALIDATION = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

export const userYearRange: UserYearRangeInterface = {
  MIN_YEAR: 18,
  MAX_YEAR: 175
};

export const appFormParams: AppFormParamsInterface = {
  DEFAULT_PHONE_PREFIX: '+1',
  EMAIL_VALIDATION,
  MAX_LENGTH: 255,
  MIN_PASSWORD_LENGTH: 6,
  GENDERS: ['Male', 'Female', 'Non-Binary', 'Custom']
};