import {createAction, props} from '@ngrx/store';
import {ActionTypesEnum} from '../actionTypes.enum';
import {HomePageSheetType, MyInformationPageSheetType} from './pagesSheets.reducer';

export const setSheetForHomePageAction = createAction(
  ActionTypesEnum.SET_SHEET_FOR_HOME_PAGE,
  props<{homePageSheet: HomePageSheetType}>()
);

export const setSheetForMyInfoPageAction = createAction(
  ActionTypesEnum.SET_SHEET_FOR_MY_INFORMATION_PAGE,
  props<{myInformationSheet: MyInformationPageSheetType}>()
);

export const resetPagesSheets = createAction(ActionTypesEnum.RESET_PAGES_SHEETS);
