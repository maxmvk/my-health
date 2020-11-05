import {Action, createReducer, on} from '@ngrx/store';
import {hideTabs, showTabs} from './tabsController.action';

export interface TabsControllerStateInterface {
  isVisible: boolean
}

const initialState: TabsControllerStateInterface = {
  isVisible: true
};

const _tabsControllerReducer = createReducer(
  initialState,

  on(showTabs, (state): TabsControllerStateInterface => ({
    ...state,
    isVisible: true
  })),

  on(hideTabs, (state): TabsControllerStateInterface => ({
    ...state,
    isVisible: false
  }))
);

export function tabsControllerReducer(state: TabsControllerStateInterface, action: Action) {
  return _tabsControllerReducer(state, action);
}
