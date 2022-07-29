import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HowToComponent } from './pages/how-to/how-to.component';

const routes: Routes = [
  {
		path: 'about-us',
		component: AboutUsComponent,
		title: 'About Us'
	},
	{
		path: 'contact-us',
		component: ContactUsComponent,
		title: 'Contact Us'
	},
	{
		path: 'how-to',
		component: HowToComponent,
		title: 'How To'
	},
];

@NgModule({
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    HowToComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StaticModule { }
