import {UserDataState} from './user/user.reducer';
import {AvatarDataState} from './avatar/avatar.reducer';
import {TabsControllerStateInterface} from './tabsController/tabsController.reducer';
import {PagesSheetsStateInterface} from './pagesSheets/pagesSheets.reducer';

export interface SiteStateInterface {
  userData: UserDataState;
  avatarData: AvatarDataState;
  tabsController: TabsControllerStateInterface;
  pagesSheet: PagesSheetsStateInterface;
}
