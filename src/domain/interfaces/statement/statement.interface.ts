
export interface IStatement<T, K>{

	insert(entity: T): Promise<K>;

	update(key: K, entity: Partial<T>): Promise<boolean>;

	delete(key: K): Promise<boolean>;

}