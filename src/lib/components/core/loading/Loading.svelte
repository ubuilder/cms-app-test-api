<script>
	import { Spinner } from 'yesvelte'

	export let show = false
</script>

<div class="loading" class:show>
	<Spinner color="primary" />
	<h1>Loading ...</h1>
</div>

<style>
	.loading {
		z-index: 1040;
		transition-property: all;
		transition-duration: 400ms;
		background-color: rgba(255, 255, 255, 0.347);
		opacity: 0;
		pointer-events: none;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	:global([data-bs-theme='dark']) .loading {
		background-color: rgba(30, 48, 70, 0.347);
	}
	.loading > h1 {
		margin-top: 1rem;
		font-weight: 400;
	}
	.loading.show {
		backdrop-filter: blur(8px);
		opacity: 1;
		pointer-events: unset;
	}

	:global(.y-spinner) {
		width: 64px;
		height: 64px;
	}
</style>
