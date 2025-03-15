import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TaskDetailPageRoutingModule } from './task-detail-routing.module';
import { TaskDetailPage } from './task-detail.page';
import { RouterModule } from '@angular/router';

@NgModule({

	imports: [

		SharedModule,
		TaskDetailPageRoutingModule,
		RouterModule.forChild([{ path: '', component: TaskDetailPage }])

	], declarations: [TaskDetailPage]
})
export class TaskDetailPageModule {}
