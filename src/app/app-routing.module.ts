import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopListViewComponent } from './components/shop-list-view/shop-list-view.component';
import { ShopListDetailComponent } from './components/shop-list-detail/shop-list-detail.component';

const routes: Routes = [
  {
    path: ':shoplistid',
    component: ShopListDetailComponent,
  },
  // { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
