<script lang="ts">
	import { Button, ModalBody, ModalFooter, El, Icon } from 'yesvelte'
	import Modal from './Modal.svelte'
	import { modal } from './modal'

	export let status: 'danger' | undefined = undefined
	export let title: string = 'Are you sure?'
	export let description: string =
		'Are you sure you want to delete this item? This item will be deleted permanently.'
	export let yesText: string = 'Yes'
	export let cancelText: string = 'Cancel'

	function onYes() {
		// loading = true
		$modal.resolve(true)
	}
	function onCancel() {
		// loading = true
		$modal.resolve(false)
	}

	let loading = false
</script>

<Modal title={status === 'danger' ? undefined : title}>
	<ModalBody>
		{#if status === 'danger'}
			<El textAlign="center">
				<Icon size="3x" color="danger" name="alert-triangle" />
				<El mt="2" tag="h3">{title}</El>
				<El textMuted>{description}</El>
			</El>
		{:else}
			{description}
		{/if}
	</ModalBody>
	<ModalFooter>
		{#if status === 'danger'}
			<El row m="0" w="100" g="2">
				<El col>
					<Button w="100" on:click={onCancel}>{cancelText}</Button>
				</El>
				<El col>
					<Button w="100" color="danger" on:click={onYes}>{yesText}</Button>
				</El>
			</El>
		{:else}
			<El class="btn-list">
				<Button {loading} class="me-auto" on:click={onCancel}>{cancelText}</Button>
				<Button {loading} color="primary" on:click={onYes}>{yesText}</Button>
			</El>
		{/if}
	</ModalFooter>
</Modal>
