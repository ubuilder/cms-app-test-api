<script lang="ts">
	import { Alert, El } from 'yesvelte'
	import type { AlertType } from './alert'

	export let fixed: boolean = false
	export let alerts: AlertType[] = []
</script>

{#if alerts.length}
<El
	class="y-alert-container"
	position={fixed ? 'fixed' : undefined}
	top="0"
	end="0"
	p="3">
	{#each alerts as alertItem}
		<Alert dismissible title={alertItem.title} color={alertItem.color}>
			{#if Array.isArray(alertItem.description)}
				{#each alertItem.description as description}
					<El>
						{description}
					</El>
				{/each}
			{:else}
				{alertItem.description}
			{/if}
		</Alert>
	{/each}
</El>

{/if}