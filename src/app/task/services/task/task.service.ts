import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IStatement } from '@interfaces/statement/statement.interface';
import { IQuery } from '@interfaces/query/query.interface';
import { Task } from '@entities/task.entity';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({

	providedIn: 'root'

}) export class TaskService implements IStatement<Task, string>, IQuery<Task, string>{

	private readonly collectionName = environment.firebase.collections.task.name;

	public constructor(private firestore: AngularFirestore) {}

	public find(key: string): Observable<Task | undefined> {

		return this.firestore.collection<Task>(this.collectionName).doc(key).valueChanges({

			idField: 'id' 

		});

	}

	public findAll(): Observable<Array<Task>> {

		return this.firestore.collection<Task>(this.collectionName).valueChanges({

			idField: 'id' 

		});

	}

	public async insert(entity: Task): Promise<string> {

		return await this.firestore.collection<Task>(this.collectionName).add(entity).then(docRef => docRef.id);

	}

	public async update(key: string, entity: Partial<Task>): Promise<boolean> {

		try {

			await this.firestore.doc<Task>(`${this.collectionName}/${key}`).update(entity);

			return true;

		} catch (error){

			console.error('Error updating task:', error);
			return false;

		}

	}

	public async delete(key: string): Promise<boolean> {

		try {

			await this.firestore.doc<Task>(`${this.collectionName}/${key}`).delete();
			return true;

		} catch (error) {

			console.error('Error deleting task:', error);
			return false;

		}

	}

}
