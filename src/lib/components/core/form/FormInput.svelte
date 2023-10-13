<script lang="ts">
	import { FormInput } from 'yesvelte'
	import Field from './FormField.svelte'

	export let name: string
	export let value: any | undefined = undefined

	async function get() {
		return value
	}

	function set(newValue: string) {
		value = newValue
	}
</script>

<Field bind:value {name} {get} {set} let:props>
	<FormInput bind:value {...props} {...$$restProps} />
</Field>
