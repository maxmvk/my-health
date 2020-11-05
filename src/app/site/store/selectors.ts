import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SiteStateInterface} from './siteState.interface';
import {AppStateInterface} from 'src/app/shared/models';


export const appFeatureSelector = createFeatureSelector<AppStateInterface, SiteStateInterface>('site');

export const selectorAvatarData = createSelector(
  appFeatureSelector,
  state => state.avatarData
);

export const selectorUserData = createSelector(
  appFeatureSelector,
  state => state.userData
);

export const selectorMyInfo = createSelector(
  appFeatureSelector,
  state => state.userData.myInfo
);

export const selectorAvatarState = createSelector(
  appFeatureSelector,
  state => state.avatarData.avatarState
);

export const selectorAvatarModel = createSelector(
  appFeatureSelector,
  state => state.avatarData.avatarModel
);

export const selectorHLConnection = createSelector(
  appFeatureSelector,
  state => state.userData.connHL
);

export const selectorAgeomes = createSelector(
  appFeatureSelector,
  state => state.userData.ageomes
);

export const selectorTabsIsVisible = createSelector(
  appFeatureSelector,
  state => state.tabsController.isVisible
);

export const selectorMyInformationSheet = createSelector(
  appFeatureSelector,
  state => state.pagesSheet.myInformationSheet
);

export const selectorHomeSheet = createSelector(
  appFeatureSelector,
  state => state.pagesSheet.homePageSheet
);
