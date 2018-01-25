import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; //zayd

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';

import { SiteService } from './site.service';


@NgModule({
  declarations: [
    AppComponent,
    SitesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule //zayd
  ],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
