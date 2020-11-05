import {Action, createReducer, on} from '@ngrx/store';
import {setWindowInnerWidthAction} from './app.action';

export interface AppSharedStateInterface {
  windowInnerWidth: number | null
}

const initialState: AppSharedStateInterface = {
  windowInnerWidth: null
};

const _appReducer = createReducer(
  initialState,
  on(setWindowInnerWidthAction, (state, action): AppSharedStateInterface => ({
    ...state,
    windowInnerWidth: action.windowInnerWidth
  }))
);

export function appReducer(state: AppSharedStateInterface, action: Action) {
  return _appReducer(state, action);
}
