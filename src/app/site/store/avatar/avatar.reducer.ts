import {Action, createReducer, on} from '@ngrx/store';
import {deleteAvatar, resetAvatar, setAvatarModel, setAvatarState} from './avatar.action';

export type ModelState = 'empty' | 'loading' | 'avatar';

export interface AvatarDataState {
  avatarState: ModelState,
  avatarModel: Blob
}

const initialState: AvatarDataState = {
  avatarState: 'loading',
  avatarModel: null
};

const _avatarReducer = createReducer(
  initialState,

  on(setAvatarState, (state, {avatarState}) => ({
    ...state,
    avatarState
  })),

  on(setAvatarModel, (state, {avatarModel}) => ({
    ...state,
    avatarModel
  })),

  on(deleteAvatar, () => ({
    avatarState: 'empty',
    avatarModel: null
  })),

  on(resetAvatar, () => ({
    ...initialState
  }))
);

export function avatarReducer(state: AvatarDataState, action: Action) {
  return _avatarReducer(state, action);
}
