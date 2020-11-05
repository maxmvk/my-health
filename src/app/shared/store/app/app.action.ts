import {createAction, props} from '@ngrx/store';
import {ActionTypesEnum} from '../actionTypes.enum';

export const setWindowInnerWidthAction = createAction(
  ActionTypesEnum.SET_WINDOW_INNER_WIDTH,
  props<{windowInnerWidth: number}>()
);
