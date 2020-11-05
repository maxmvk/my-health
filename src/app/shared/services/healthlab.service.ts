import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HEALTH_LAB_INFO_QUERY, CHANGE_HL_STATUS, AGEOME_HISTORY_QUERY} from 'src/app/apollo';
import {Observable} from 'rxjs';

import {FetchResult} from 'apollo-link';


@Injectable({
  providedIn: 'root'
})
export class HealthLabService {

  constructor(
    private apollo: Apollo
  ) {
  }

  getHLStatus(): Observable<FetchResult> {
    return this.apollo.query<FetchResult>({
      query: HEALTH_LAB_INFO_QUERY
    });
  }

  getAgeomeHistory(ageomeEntity: string): Observable<FetchResult> {
    return this.apollo.query<FetchResult>({
      query: AGEOME_HISTORY_QUERY,
      variables: {
        ageomeEntity
      }
    });
  }

  changeHLStatus(status: boolean): Observable<FetchResult> {
    return this.apollo.mutate<FetchResult>({
      mutation: CHANGE_HL_STATUS,
      variables : {
        status
      }
    });
  }
}
