import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from './firebase/firebase.config';

@NgModule({

	declarations: [

		

	], imports: [

		AngularFireModule.initializeApp(firebaseConfig),
		AngularFirestoreModule.enablePersistence()

	], exports: [

		AngularFireModule,
		AngularFirestoreModule

	], providers: [

		

	]

}) export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule?: CoreModule){

		if (parentModule){

			throw new Error('CoreModule ya está cargado. Importar solo en AppModule');

		}

	}

}
