import {resetUser, setMyInfo, resetHealthLabInfo, setAgeomes, setHLConnection} from './user.action';
import {Action, createReducer, on} from '@ngrx/store';
import {MyInfoInterface, AgeomesInterface} from 'src/app/shared/models';

export interface UserDataState {
  myInfo: MyInfoInterface | null;
  connHL: boolean;
  ageomes: AgeomesInterface;
}

const initialState: UserDataState = {
  myInfo: null,
  connHL: false,
  ageomes: {
    endocrine_age: null,
    liver_age: null,
    muscle_age: null,
    overall_age: null,
    renal_age: null
  }
};

const _userReducer = createReducer(
  initialState,

  on(setMyInfo, (state, {myInfo}) => ({
    ...state,
    myInfo
  })),

  on(setAgeomes, (state, {ageomes}) => ({
    ...state,
    ageomes
  })),

  on(setHLConnection, (state, {connHL}) => ({
    ...state,
    connHL
  })),

  on(resetUser, () => ({
    ...initialState
  })),

  on(resetHealthLabInfo, (state) => ({
    ...state,
    connHL: initialState.connHL,
    ageomes: initialState.ageomes
  }))
);

export function userReducer(state: UserDataState, action: Action) {
  return _userReducer(state, action);
}
