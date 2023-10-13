<script lang="ts">
	import { Card, CardActions, CardBody, CardFooter, El } from 'yesvelte'
	import { Form } from '.'
	import ButtonList from '../ButtonList.svelte'

	export let onSubmit: Function | undefined = undefined
	export let onReset: Function | undefined = undefined
	export let value: Object = {}

	export let title: string | undefined = undefined
</script>

<Card mb="4" {title} {...$$restProps}>
	<Form bind:value {onSubmit} {onReset} let:loading>
		<slot name="top" />
		<CardBody>
			<El row>
				<slot {loading} />
			</El>
		</CardBody>
		<slot name="bottom" />
		<CardFooter>
			<CardActions>
				<slot name="actions">
					<ButtonList>
						<Form.Reset>Reset</Form.Reset>
						<Form.Submit color="primary" {loading}>Submit</Form.Submit>
					</ButtonList>
				</slot>
			</CardActions>
		</CardFooter>
	</Form>
</Card>
