<script lang="ts">
	import { FormCheckboxGroup } from 'yesvelte'
	import FormField from './FormField.svelte'

	export let name: string

	export let value: any | any[] = undefined

	function get() {
		return value
	}

	function set(newValue: any) {
		if (JSON.stringify(newValue) !== JSON.stringify(value)) {
			value = newValue
		}
	}
</script>

<FormField {name} {get} {set} bind:value let:props>
	<FormCheckboxGroup {...props} {...$$restProps} bind:value />
</FormField>
