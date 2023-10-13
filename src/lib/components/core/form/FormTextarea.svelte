<script lang="ts">
	import { FormTextarea } from 'yesvelte'
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
	<FormTextarea {...props} {...$$restProps} bind:value />
</FormField>
