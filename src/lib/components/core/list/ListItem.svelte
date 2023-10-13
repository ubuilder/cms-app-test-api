<script lang="ts">
	import type { ListBoxContext } from './List.types'

	import { TableCell } from 'yesvelte'
	import { getContext, onMount } from 'svelte'

	type T = $$Generic

	export let name: string | undefined = undefined
	export let getFooter: any | undefined = undefined
	export let footer: string | undefined = undefined
	export let wrap: boolean = false

	const ctx = getContext<ListBoxContext<T>>('LIST_BOX')

	onMount(() => {
		if (footer) getFooter = () => footer
		ctx.register(name ?? '', getFooter)
	})
</script>

<TableCell {...$$restProps} class={wrap ? 'y-table-cell-wrap' : 'y-table-cell-nowrap'}>
	<slot />
</TableCell>
