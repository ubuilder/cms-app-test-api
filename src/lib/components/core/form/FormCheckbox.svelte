<script lang="ts">
	import { FormCheckbox } from 'yesvelte'
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
	<FormCheckbox {...props} bind:checked={value} {...$$restProps}>
		<slot />
	</FormCheckbox>
</FormField>
