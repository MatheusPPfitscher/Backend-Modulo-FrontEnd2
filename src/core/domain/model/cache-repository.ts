export interface ICacheRepository {
    save(key: string, data: object): Promise<void>;
    retrieve(key: string): Promise<object>;
    delete(key: string): Promise<void>;
    needRefreshing(): Boolean;
    setRefreshing(status: boolean): void;
}