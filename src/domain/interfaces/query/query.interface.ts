import { Observable } from 'rxjs';

export interface IQuery<T, K>{

	find(key: K): Observable<T | undefined>;

	findAll(): Observable<Array<T>>;

}