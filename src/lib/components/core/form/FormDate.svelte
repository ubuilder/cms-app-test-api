<script lang="ts">
	import { FormDatePicker } from 'yesvelte'
	import FormField from './FormField.svelte'

	export let name: string

	export let value: any | any[] = undefined

	function get() {
		return value
	}

	function set(newValue: any) {
		if (newValue?.toString() !== value?.toString()) {
			value = newValue
		}
	}
</script>

<FormField {name} {get} {set} bind:value let:props>
	<FormDatePicker {...props} {...$$restProps} bind:value />
</FormField>
