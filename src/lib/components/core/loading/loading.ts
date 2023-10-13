import { derived, writable } from 'svelte/store'

function createLoadingCountStore() {
	const { update, subscribe } = writable(0)

	return {
		subscribe,
		push: () => update((prev) => prev + 1),
		pop: () => update((prev) => prev - 1)
	}
}

export const loadingCount = createLoadingCountStore()

export const loading = derived(loadingCount, (value) => {
	return value > 0
})
