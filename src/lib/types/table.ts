import type { Field } from "./field";

export type Table = {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    fields: Field[]
}

export type TableCreateRequest = {
    name: string;
    icon?: string;
    fields: Field[]
}