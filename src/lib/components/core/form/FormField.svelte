<script lang="ts">
	import { onMount, type ComponentProps } from 'svelte'
	import { getFormContext } from './utils'
	import type { FormField } from 'yesvelte'

	export let value: any | undefined = undefined
	export let name: string
	const { register, unregister, update, setError } = getFormContext()

	const props: ComponentProps<FormField> = {
		col: '12',
		colMd: '6',
		colLg: '4',
		colXl: '3'
	}

	export let set = function (newValue: any) {
		if(JSON.stringify(newValue) !== JSON.stringify(value)) {
			value = newValue

		}
	}

	export let get = function () {
		return value
	}

	onMount(() => {
		register(name, { set, get })
		return () => unregister(name)
	})

	async function sync(value: any) {
		try {
			update(name, await get())
			setError(name, undefined)
		} catch (err: any) {
			setError(name, err.message)
		}
	}

	$: sync(value)
</script>

<slot {props} />
