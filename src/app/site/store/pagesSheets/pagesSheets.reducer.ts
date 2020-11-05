import {Action, createReducer, on} from '@ngrx/store';
import {resetPagesSheets, setSheetForHomePageAction, setSheetForMyInfoPageAction} from './pagesSheets.action';

export type HomePageSheetType = 'avatar' | 'connections' | 'chat';
export type MyInformationPageSheetType = 'avatar' | 'form';

export interface PagesSheetsStateInterface {
  homePageSheet: HomePageSheetType,
  myInformationSheet: MyInformationPageSheetType
}

const initialState: PagesSheetsStateInterface = {
  homePageSheet: 'avatar',
  myInformationSheet: 'avatar'
};

const _pagesSheetReducer = createReducer(
  initialState,

  on(setSheetForHomePageAction, (state, {homePageSheet}): PagesSheetsStateInterface => ({
    ...state,
    homePageSheet
  })),

  on(setSheetForMyInfoPageAction, (state, {myInformationSheet}): PagesSheetsStateInterface => ({
    ...state,
    myInformationSheet
  })),

  on(resetPagesSheets, (state): PagesSheetsStateInterface => ({
    ...state,
    ...initialState
  }))
);

export function pagesSheetReducer(state: PagesSheetsStateInterface, action: Action) {
  return _pagesSheetReducer(state, action);
}
