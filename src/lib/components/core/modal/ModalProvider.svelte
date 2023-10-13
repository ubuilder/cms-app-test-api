<script lang="ts">
	import { modal } from './modal'
	import { Modal } from 'yesvelte'
</script>

{#if $modal}
	<!-- {#key $modal.open} -->
		<Modal bind:show={$modal.open} size="md" scrollable backdrop {...$modal.config}>
			<svelte:component this={$modal.component} {...$modal.props} />
		</Modal>
	<!-- {/key} -->
{/if}
