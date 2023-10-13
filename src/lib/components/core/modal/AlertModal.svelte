<script lang="ts">
	import { Button, El, ButtonGroup } from 'yesvelte'
	import Modal from './Modal.svelte'
	import { modal } from './modal'

	export let title: string = 'Alert title'
	export let description: string = 'Alert message'

	function onOk() {
		$modal.resolve(undefined)
	}
</script>

<Modal {title}>
	<El slot="body">
		{description}
	</El>
	<ButtonGroup slot="footer">
		<Button class="me-auto" on:click={onOk}>Ok</Button>
	</ButtonGroup>
</Modal>
