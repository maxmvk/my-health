import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../models';
import {AppSharedStateInterface} from './app/app.reducer';

export const appFeatureSelector = createFeatureSelector<AppStateInterface, AppSharedStateInterface>('app');

export const selectorWindowInnerWidth = createSelector(
  appFeatureSelector,
  state => state.windowInnerWidth
);
