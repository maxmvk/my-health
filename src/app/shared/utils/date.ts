import {userYearRange} from '../form.config';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();
export const minDateDatepicker = new Date(currentYear - userYearRange.MAX_YEAR, currentMonth , currentDay);
export const maxDateDatepicker = new Date(currentYear - userYearRange.MIN_YEAR, currentMonth , currentDay);
