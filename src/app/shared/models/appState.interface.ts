import {SiteStateInterface} from '../../site/store/siteState.interface';
import {AppSharedStateInterface} from '../store/app/app.reducer';

export interface AppStateInterface {
  site: SiteStateInterface
  app: AppSharedStateInterface
}
