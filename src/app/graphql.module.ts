import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloLink, Observable, split} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {DefaultOptions} from 'apollo-client';
import {take} from 'rxjs/operators';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

import {AuthenticationService, LocalStorageService} from './shared/services';
import {environment} from 'src/environments/environment';
import {GraphQLErrorInterface} from './shared/models';


const {uri, showConsoleLogs, uriWs} = environment;

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  };

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    authService: AuthenticationService,
    localStorageController: LocalStorageService
  ) {
    const http = httpLink.create({uri});

    const ws = new WebSocketLink({
      uri: uriWs,
      options: {
        reconnect: true
      }
    });

    const responseLogger = new ApolloLink((operation, forward) => {
      return forward(operation).map(result => {
        if (showConsoleLogs.serverResponse) {
          console.group('[Server response]:', operation.operationName);
          console.warn(operation.getContext().response.body);
          console.groupEnd();
        }
        return result;
      });
    });

    const errorLink = onError(({graphQLErrors, networkError, operation, forward}) => {
      if (graphQLErrors) {
        for (let graphQLError of graphQLErrors) {
          const serverError = graphQLError as GraphQLErrorInterface;

          const {
            statusCode = 'Unknown',
            error = 'Unknown',
            message = 'Unknown'
          } = serverError;

          if (showConsoleLogs.serverError) {
            console.group(`[Server error]: ${operation?.operationName}`);
            console.warn(`statusCode: ${statusCode}`);
            console.warn(`error: ${error}`);
            console.warn(`message: ${message}`);
            console.groupEnd();
          }

          switch (statusCode) {
            case 401:
              return new Observable(subscriber => {
                authService.refreshTokensPair()
                  .pipe(
                    take(1)
                  )
                  .subscribe(value => {
                    subscriber.next(value);
                    subscriber.complete();
                  });
              })
                .flatMap(() => forward(operation));

            case 403:
              localStorageController.logOut();
              break;

            default:
              // not implemented default error handler
              break;
          }
        }
      }

      if (networkError) {
        const {message = 'Unknown network error'} = networkError;
        console.warn(`[Network error]: ${message}`);
      }
    });

    const apolloLink = ApolloLink.from([
      errorLink,
      responseLogger,
      http
    ]);

    const link = split(({query}) => {
      const {kind, operation}: any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    }, ws, apolloLink);

    apollo.create({
      link,
      cache: new InMemoryCache(),
      defaultOptions: this.defaultOptions
    });
  }
}
