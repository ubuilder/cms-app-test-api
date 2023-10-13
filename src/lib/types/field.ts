export type FieldBase = {
    name: string;
    required: boolean;
    hint: string;
    placeholder: string;
    show_in_create: boolean;
    show_in_list: boolean;
    show_in_update: boolean;
    show_in_preview: boolean;
    default_value: Field['value'];
}
export type FieldPlainText = FieldBase & {
    type: 'plain_text',
    input_type: 'input' | 'textarea';
    minlength: number;
    maxlength: number;
    value: string
}

export type FieldNumber = FieldBase & {
    type: 'number',
    min: number;
    max: number;
    negative: boolean;
    value: number
}

export type FieldRichText = FieldBase & {
    type: 'rich_text',
    value: string
}

export type FieldDateTime = FieldBase & {
    type: 'date_time',
    range: boolean,
    value: string | string[]
}


export type FieldSelect = FieldBase & {
    type: 'select',
    options: string;
    multiple: boolean;
    value: string | string[]
}


export type FieldFile = FieldBase & {
    type: 'file',
    multiple: boolean
    value: string
}

export type FieldImage = FieldBase & {
    type: 'image',
    multiple: boolean,
    value: string
}

export type FieldSwitch = FieldBase & {
    type: 'switch',
    value: boolean
}

export type FieldRelationSingle = FieldBase & {
    type: 'relation';
    multiple: false;
    table: string;
    title?: string;
    value: any // TODO
}
export type FieldRelationMultiple = FieldBase & {
    type: 'relation';
    multiple: true;
    table: string;
    field: string;
    title?: string;
    value: any // TODO
}

export type FieldRelation = FieldRelationMultiple | FieldRelationSingle

export type Field = |
    FieldPlainText |
    FieldNumber |
    FieldRichText |
    FieldDateTime |
    FieldSelect |
    FieldFile |
    FieldImage |
    FieldSwitch |
    FieldRelation 
