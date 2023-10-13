<script lang="ts">
	import { Icon, FormInput } from 'yesvelte'

	export let value: string | undefined = undefined

	let icon = 'eye'
	let textType = 'password'

	const onClick = () => {
		icon = icon === 'eye' ? 'eye-off' : 'eye'
		textType = textType === 'password' ? 'text' : 'password'
	}
</script>

<FormInput label="Password" bind:value type={textType} {...$$restProps}>
	<Icon slot="end-icon" name={icon} on:click={onClick} />
</FormInput>
