export const something = true

import AppForm from './Form.svelte'
import FormInput from './FormInput.svelte'
import FormField from './FormField.svelte'
import FormObject from './FormObject.svelte'
import FormSubmit from './FormSubmit.svelte'
import FormReset from './FormReset.svelte'
import FormSelect from './FormSelect.svelte'
import FormCheckboxes from './FormCheckboxes.svelte'
import FormRadios from './FormRadios.svelte'
import FormPassword from './FormPassword.svelte'
import FormTextarea from './FormTextarea.svelte'
import FormDate from './FormDate.svelte'
import FormCheckbox from './FormCheckbox.svelte'

export type FormContext = {
	register: (name: string, { set, get }: { set: (value: any) => void; get: () => any }) => void
	unregister: (name: string) => void
	update: (name: string, value: any) => void
	errors: Record<string, (param?: any) => string>
	setError: (name: string, error: string | undefined) => void
}

export type FormType = typeof AppForm & {
	Field: typeof FormField
	Input: typeof FormInput
	Submit: typeof FormSubmit
	Reset: typeof FormReset
	Object: typeof FormObject
	Select: typeof FormSelect
	Radios: typeof FormRadios
	Checkboxes: typeof FormCheckboxes
	Password: typeof FormPassword
	Textarea: typeof FormTextarea
	Date: typeof FormDate
	Checkbox: typeof FormCheckbox
}

const Form = AppForm as unknown as FormType
Form.Field = FormField
Form.Input = FormInput
Form.Submit = FormSubmit
Form.Select = FormSelect
Form.Reset = FormReset
Form.Object = FormObject
Form.Select = FormSelect
Form.Radios = FormRadios
Form.Checkboxes = FormCheckboxes
Form.Password = FormPassword
Form.Textarea = FormTextarea
Form.Date = FormDate
Form.Checkbox = FormCheckbox

export { Form }
