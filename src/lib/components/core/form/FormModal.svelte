<script lang="ts">
	import { Button, CardActions, CardBody, CardFooter, El } from 'yesvelte'
	import Modal from '../modal/Modal.svelte'
	import ButtonList from '../ButtonList.svelte'
	import { Form } from '.'
	import { modal } from '../modal'

	export let onSubmit: Function | undefined = (value: any) => $modal.resolve(value)
	export let value: Object = {}

	export let title: string | undefined = undefined
</script>

<Form bind:value {onSubmit} let:loading>
	<Modal {title} {...$$restProps}>
		<El slot="body">
			<slot name="top" />
			<CardBody>
				<El row>
					<slot {loading} />
				</El>
			</CardBody>
			<slot name="bottom" />
		</El>

		<ButtonList slot="footer">
			<slot name="actions">
				<Button on:click={() => $modal.resolve(undefined)}>Cancel</Button>
				<Form.Submit color="primary">Save</Form.Submit>
			</slot>
		</ButtonList>
	</Modal>
</Form>
