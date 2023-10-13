<script lang="ts">
	import { FormSelect } from 'yesvelte'
	import FormField from './FormField.svelte'

	export let name: string

	export let value: any | any[] = undefined

	function get() {
		return value
	}

	function set(newValue: any) {
		value = newValue
	}
</script>

<FormField {name} {get} {set} bind:value let:props>
	<FormSelect {...props} {...$$restProps} bind:value />
</FormField>
