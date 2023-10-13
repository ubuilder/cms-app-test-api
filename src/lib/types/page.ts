import type { components } from "$lib/ui";
import type { DbOperators } from ".";

export type LoadFilter ={
    field: string;
    operator: DbOperators
    value: string;
}

export type PageLoad = {
    multiple: boolean;
    table: string;
    name: string;
    filters: LoadFilter[]
}

export type PageSlot = {
    props: Record<string, any>,
    type: keyof typeof components;
    slot: PageSlot[]
}

export type Page = {
    id: string;
    title: string;
    description?: string;
    slug: string;
    dir: 'ltr' | 'rtl';
    load: PageLoad[];
    slot: PageSlot[]
}