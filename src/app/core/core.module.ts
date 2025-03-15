import { NgModule, Optional, SkipSelf } from '@angular/core';

import { firebaseConfig } from './firebase/firebase.config';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({

	declarations: [

		

	], imports: [

		

	], exports: [

		

	], providers: [

		provideFirebaseApp(

			() => initializeApp(firebaseConfig)

		), provideFirestore(() => getFirestore())

	]

}) export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule?: CoreModule){

		if (parentModule){

			throw new Error('CoreModule ya está cargado. Importar solo en AppModule');

		}

	}

}
