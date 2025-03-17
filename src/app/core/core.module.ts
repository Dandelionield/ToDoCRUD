import { NgModule, Optional, SkipSelf } from '@angular/core';

import { firebaseConfig } from './firebase/firebase.config';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { TaskModule } from '@task/task.module';

@NgModule({

	declarations: [

		

	], imports: [

		TaskModule

	], exports: [

		

	], providers: [

		provideFirebaseApp(

			() => initializeApp(firebaseConfig)

		), provideFirestore(

			() => getFirestore()

		),

	]

}) export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule?: CoreModule){

		if (parentModule){

			throw new Error('CoreModule already rendered. Import it only at AppModule');

		}

	}

}
