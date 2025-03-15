import { Timestamp } from '@angular/fire/firestore';

export interface Task{

	id?: string,
	title: string,
	description: string,
	date: Timestamp,
	done: boolean

}