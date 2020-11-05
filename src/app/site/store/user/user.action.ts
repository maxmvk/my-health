import {createAction, props} from '@ngrx/store';
import {AgeomesInterface, MyInfoInterface} from 'src/app/shared/models';
import {ActionTypesEnum} from '../actionTypes.enum';

export const setMyInfo = createAction(
  ActionTypesEnum.setMyInfo,
  props<{myInfo: MyInfoInterface}>()
);

export const resetUser = createAction(
  ActionTypesEnum.resetUser
);

export const setAgeomes = createAction(
  ActionTypesEnum.setAgeomes,
  props<{ageomes: AgeomesInterface}>()
);

export const setHLConnection = createAction(
  ActionTypesEnum.setHLConnection,
  props<{connHL: boolean}>()
);

export const resetHealthLabInfo = createAction(
  ActionTypesEnum.resetHealthLabInfo
);
