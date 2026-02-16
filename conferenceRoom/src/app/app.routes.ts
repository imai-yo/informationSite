import { Route } from '@angular/router';
import { listResolver } from './list/list.resolver';

export const appRoutes: Route[] = [
  {
    path: 'list',
    loadComponent: () => import('./list/list').then(m => m.List),
    resolve: {
      data: listResolver,
    },
  },
];
