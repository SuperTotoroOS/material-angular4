import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '../shared';
import { ServicesModule } from '../services';
import { AppEffectsModule } from '../effects';
import { AppStoreModule } from '../reducers';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loadSvgResources } from '../utils/svg.util';
import '../utils/debug.util';
import '../utils/rxjs.util';
import 'hammerjs';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    AppEffectsModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3002'
        // uri: 'http://manage.t.imooc.io/apis',
      }
    }
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    if (parentModule) {
      throw new Error('CoreModule已经装载');
    }
    loadSvgResources(iconRegistry, sanitizer);
  }

}
