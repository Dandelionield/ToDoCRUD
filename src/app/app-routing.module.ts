import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)

	},{

		path: '',
		redirectTo: 'home',
		pathMatch: 'full'

	},{

		path: 'task/:id',
		loadChildren: () => import('./pages/task-detail/task-detail.module').then( m => m.TaskDetailPageModule)

	},


];

@NgModule({

	imports: [

		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

	], exports: [RouterModule]

})
export class AppRoutingModule {}
