import {createAction} from '@ngrx/store';
import {ActionTypesEnum} from '../actionTypes.enum';

export const hideTabs = createAction(ActionTypesEnum.HIDE_TABS);

export const showTabs = createAction(ActionTypesEnum.SHOW_TABS);
