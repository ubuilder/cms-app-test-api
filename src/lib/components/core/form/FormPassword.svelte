<script lang="ts">
	import FormField from './FormField.svelte'
	import FormPasswordInput from './FormPasswordInput.svelte'

	export let name: string

	export let value: any | any[] = undefined

	function get() {
		return value
	}

	function set(newValue: any) {
		value = newValue
	}
</script>

{#if name}
	<FormField {name} {get} {set} bind:value  let:props>
		<FormPasswordInput {...props} {...$$restProps} bind:value />
	</FormField>
{:else}
	<FormPasswordInput {...$$restProps} bind:value />
{/if}
