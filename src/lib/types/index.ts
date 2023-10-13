export * from './field'
export * from './page'
export * from './table'

export type Items = any

export type DbOperators = '=' | '!=' | 'like' | '<' | '<=' | '>' | '>=' | 'in' | 'between'
export type DbFilterValue = string | number | boolean | string[] | number[] | boolean[]
export type DbFilter = {
    [x: string]: DbFilterValue | {
        operator: DbOperators
        value: DbFilterValue
    }
}

export type DbWith = {
    [x: string]: {
        table: string;
        field: string;
        multiple: boolean;
    }
}

export type DbList<T> = {data: T[], page: number, perPage: number, total: number }

export type DbGet<T> = (params: {where?: DbFilter, with?: DbWith}) => Promise<T>
export type DbQuery<T> = (params: {where?: DbFilter, with?: DbWith, page?: number, perPage?: number;}) => Promise<DbList<T>>
export type DbInsert<T> = (data: Partial<T>) => Promise<string[]>
export type DbUpdate<T> = (id: string, data: Partial<T>) => Promise<T>
export type DbRemove<T> = (id: string) => Promise<boolean>

export type Db = <T extends DbTable>(tableName: string) => {
    get: DbGet<T>;
    query: DbQuery<T>;
    update: DbUpdate<T>;
    remove: DbRemove<T>;
    insert: DbInsert<T>;
}

export type DbTable = {
    id: string;
    [x: string]: any
}