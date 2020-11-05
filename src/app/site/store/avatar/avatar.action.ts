import {createAction, props} from '@ngrx/store';
import {ModelState} from './avatar.reducer';
import {ActionTypesEnum} from '../actionTypes.enum';

export const setAvatarState = createAction(
  ActionTypesEnum.setAvatarState,
  props<{avatarState: ModelState}>()
);

export const setAvatarModel = createAction(
  ActionTypesEnum.setAvatarModel,
  props<{avatarModel: Blob}>()
);

export const deleteAvatar = createAction(
  ActionTypesEnum.deleteAvatar
);

export const resetAvatar = createAction(
  ActionTypesEnum.resetAvatar
);


