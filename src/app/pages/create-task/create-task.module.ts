import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CreateTaskPageRoutingModule } from './create-task-routing.module';
import { CreateTaskPage } from './create-task.page';
import { RouterModule } from '@angular/router';

@NgModule({

	imports: [

		SharedModule,
		CreateTaskPageRoutingModule,
		RouterModule.forChild([{ path: '', component: CreateTaskPage }])

	], declarations: [CreateTaskPage]

}) export class CreateTaskPageModule {}
