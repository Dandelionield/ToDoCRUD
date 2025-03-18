import { Observable } from 'rxjs';

export interface IQuery<T, K>{

	find(key: K): Observable<T | undefined>;

	findByName(title: string): Observable<Array<T>>;

	findAll(): Observable<Array<T>>;

}