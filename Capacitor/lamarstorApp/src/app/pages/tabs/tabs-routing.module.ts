import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthguardService } from '../../services/authguard.service';

// Tab Routes
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
        
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomeModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
           
            loadChildren: () =>
              import('../deal/deal.module').then(m => m.DealModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            canActivate: [AuthguardService],
            loadChildren: () =>
              import('../wishlist/wishlist.module').then(m => m.WishlistModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            canActivate: [AuthguardService],
            loadChildren: () =>
              import('../orders/list/orders.module').then(m => m.OrdersModule)
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            canActivate: [AuthguardService],
            loadChildren: () =>
              import('../account/index/account.module').then(m => m.AccountModule)
          }
        ]
      },
	  {
        path: 'changepassword',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../changepassword/changepassword.module').then(m => m.ChangepasswordModule)
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../category/category.module').then(m => m.CategoryModule)
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../products/products.module').then(m => m.ProductsModule)
          }
        ]
      },      
      {
        path: 'orders',
        children: [
          {
            path: '',
            canActivate: [AuthguardService],
            loadChildren: () =>
              import('../orders/list/orders.module').then(m => m.OrdersModule)
          }
        ]
      },
      {
        path: 'product-category/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../product-category/product-category.module').then(m => m.ProductCategoryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
