import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MY_INFO_QUERY, UPLOAD_USER_AVATAR, DELETE_USER_AVATAR, MY_INFO_MUTATION} from 'src/app/apollo';
import {Observable} from 'rxjs';

import {MyInfoInterface} from 'src/app/shared/models';
import {FetchResult} from 'apollo-link';


@Injectable({
  providedIn: 'root'
})
export class MyInformationService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getInfo(): Observable<FetchResult> {
    return this.apollo.query<FetchResult>({
      query: MY_INFO_QUERY
    });
  }

  updateInfo(myInfo: MyInfoInterface, skip = false): Observable<FetchResult> {
    return this.apollo.mutate<FetchResult>({
      mutation: MY_INFO_MUTATION,
      variables: {
        dateOfBirth: myInfo.dateOfBirth,
        email: myInfo.email,
        firstName: myInfo.firstName,
        gender: myInfo.gender,
        height: myInfo.height,
        lastName: myInfo.lastName,
        phoneNumber: myInfo.phoneNumber,
        weight: myInfo.weight,
        silhouetteId: myInfo.silhouetteId,
        skip
      }
    });
  }

  uploadUserPhoto(file: File): Observable<FetchResult> {
    return this.apollo.mutate<FetchResult>({
      mutation: UPLOAD_USER_AVATAR,
      variables: {
        file
      },
      context: {
        useMultipart: true
      }
    });
  }

  deleteUserAvatar(): Observable<FetchResult> {
    return this.apollo.mutate<FetchResult>({
      mutation: DELETE_USER_AVATAR
    });
  }
}
