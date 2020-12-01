import { NgModule } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [ListItemComponent],
  exports: [ListItemComponent]
})
export class SharedModule { }
