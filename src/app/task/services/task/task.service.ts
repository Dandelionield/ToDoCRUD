import { Injectable, inject } from '@angular/core';
import { IStatement } from '@interfaces/statement/statement.interface';
import { IQuery } from '@interfaces/query/query.interface';
import { Task } from '@entities/task.entity';
import { environment } from '@environment/environment';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Firestore, collection, collectionData, addDoc, deleteDoc, updateDoc, docData, doc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({

	providedIn: 'root'

}) export class TaskService implements IStatement<Task, string>, IQuery<Task, string>{

	private readonly collectionName: string = environment.firebase.collections.task.name;
	private readonly collectionIDField: string = environment.firebase.collections.task.idField;

	public constructor(private firestore: Firestore) {}

	public find(key: string): Observable<Task | undefined> {

		return docData(

			doc(this.firestore, `${this.collectionName}/${key}`),{

				idField: this.collectionIDField as keyof Task

			}

		) as Observable<Task>;

	}

	public findByName(title: string): Observable<Array<Task>> {

		return from(getDocs(query(collection(this.firestore, this.collectionName)))).pipe(

			map(snapshot => snapshot.docs.map(

				doc => ({

					id: doc.id,
					...doc.data()
				}) as Task
				
			).filter(

				task => task.title.toLowerCase().includes(title.toLowerCase().trim())

			))

		);/**/

	}

	public findAll(): Observable<Array<Task>> {

		return collectionData(collection(this.firestore, this.collectionName), {

			idField: this.collectionIDField as keyof Task

		}) as Observable<Array<Task>>;

	}
 
	public async insert(entity: Task): Promise<string> {

		const doc = await addDoc(

			collection(this.firestore, this.collectionName),
			entity

		);

		return doc.id;

	}

	public async update(key: string, entity: Partial<Task>): Promise<boolean> {

		try{

			await updateDoc(doc(this.firestore, `${this.collectionName}/${key}`), entity);

			return true;

		}catch (error){

			console.error('Error updating task:', error);
			return false;

		}

	}

	public async delete(key: string): Promise<boolean> {

		try{

			await deleteDoc(doc(

				this.firestore,
				`${this.collectionName}/${key}`

			));

			return true;

		}catch (error){

			console.error('Error deleting task:', error);
			return false;

		}

	}

}
