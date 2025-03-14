import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TaskModule } from '@task/task.module';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({

	imports: [

		SharedModule,
		TaskModule,
		HomePageRoutingModule

	], declarations: [HomePage]

}) export class HomePageModule {}
