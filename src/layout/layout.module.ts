import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TopBarComponent } from './sidebar/topbar.component';
import { TopBarLanguageSwitchComponent } from './sidebar/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from './sidebar/sidebar-user-area.component';
import { SideBarNavComponent } from './sidebar/sidebar-nav.component';
import { SideBarFooterComponent } from './sidebar/sidebar-footer.component';
import { RightSideBarComponent } from './sidebar/right-sidebar.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class AppLayoutModule { }
