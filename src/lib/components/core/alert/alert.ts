import type { Colors } from 'yesvelte'
import { writable } from 'svelte/store'

export type AlertType = {
	duration: number
	title: string
	description: string | string[]
	color: Colors
}

function createAlertStore() {
	const { update, subscribe } = writable<AlertType[]>([])

	function open(alert: any) {
		setTimeout(() => {
			update((alerts) => alerts.filter((a) => a !== alert))
		}, alert.duration)
		update((alerts) => [...alerts, alert])
	}

	return {
		subscribe,
		danger(description: string | string[], title = '', duration = 5000) {
			open({ description, title, color: 'danger', duration })
		},
		success(description: string | string[], title = '', duration = 5000) {
			open({ description, title, color: 'success', duration })
		},
		info(description: string | string[], title = '', duration = 5000) {
			open({ description, title, color: 'info', duration })
		},
		warning(description: string | string[], title = '', duration = 5000) {
			open({ description, title, color: 'warning', duration })
		},
	}
}

export const alert = createAlertStore()
