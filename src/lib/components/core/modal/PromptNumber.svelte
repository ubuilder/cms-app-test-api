<script lang="ts">
	import { Button, El, FormInput } from 'yesvelte'
	import Modal from './Modal.svelte'
	import { modal } from './modal'
	import ButtonList from '../ButtonList.svelte'
	export let title: string | undefined = undefined

	let value: any = undefined
</script>

<Modal {title}>
	<El slot="body">
		<FormInput {...$$restProps} bind:value />
	</El>
	<ButtonList slot="footer">
		<Button on:click={() => $modal.resolve(undefined)}>Cancel</Button>
		<Button color="primary" on:click={() => $modal.resolve(value)}>Ok</Button>
	</ButtonList>
</Modal>
