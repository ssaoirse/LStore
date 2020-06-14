import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// All Routes (Without Tabs)
// Note (Found others routes at tabs/tabs-routing.module.ts)
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'onbroading', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule) },
  { path: 'landing', loadChildren: () => import('./pages/auth/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'signin', loadChildren: () => import('./pages/auth/signin/signin.module').then(m => m.SigninModule) },
  { path: 'forget-password', loadChildren: () => import('./pages/auth/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'verification', loadChildren: () => import('./pages/auth/verification/verification.module').then(m => m.VerificationModule) },
  { path: 'changepassword', loadChildren: () => import('./pages/account/changepassword/changepassword.module').then(m => m.ChangepasswordModule) },
  { path: 'mywallet',loadChildren: () => import('./pages/account/mywallet/mywallet.module').then( m => m.MywalletModule)},
  { path: 'myprofile',loadChildren: () => import('./pages/account/myprofile/myprofile.module').then( m => m.MyprofileModule)},
  { path: 'myaddresses',loadChildren: () => import('./pages/account/myaddresses/list/myaddresses.module').then( m => m.MyaddressesModule)},
  { path: 'addaddress',loadChildren: () => import('./pages/account/myaddresses/add/addaddress.module').then( m => m.AddaddressModule)},
  { path: 'editaddress',loadChildren: () => import('./pages/account/myaddresses/edit/editaddress.module').then( m => m.EditaddressModule)},
  { path: 'orderdetails',loadChildren: () => import('./pages/orders/details/orderdetails.module').then( m => m.OrderdetailsModule)},
  { path: 'trackingdetails',loadChildren: () => import('./pages/orders/track/trackingdetails.module').then( m => m.TrackingdetailsModule)},
  { path: 'orders',loadChildren: () => import('./pages/orders/list/orders.module').then( m => m.OrdersModule)},
  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'home', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
{
    path: 'terms-and-condition',
    loadChildren: () => import('./pages/terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
  {
    path: 'add-rating',
    loadChildren: () => import('./pages/add-rating/add-rating.module').then( m => m.AddRatingPageModule)
  }

  
  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
