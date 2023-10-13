import type { Modal } from 'yesvelte'
import type { SvelteComponent, ComponentProps } from 'svelte'
import { writable } from 'svelte/store'

const defaultModalProps: ComponentProps<Modal> = {
	placement: 'center',
	backdrop: true,
	size: 'md'
}

export type ModalParams = {
	open: boolean
	component?: new (...args: any) => SvelteComponent
	props?: any
	config?: ComponentProps<Modal>
	close: () => void
	resolve: (data: any) => void
	reject: (reason: any) => void
}

function createModalStore() {
	let { subscribe, set, update } = writable<ModalParams>()

	function open<Component extends SvelteComponent, Props extends ComponentProps<Component> | {}>(
		component: new (...args: any) => Component,
		props: Props,
		modalProps?: ComponentProps<Modal>
	): Promise<any> {
		return new Promise((resolve, reject) => {
			function close() {
				update((modal) => ({
					...modal!,
					open: false
				}))
			}
			set({
				open: true,
				component,
				props,
				config: { ...defaultModalProps, ...modalProps },
				resolve: (payload: any) => {
					close()
					resolve(payload)
				},
				reject: (reason: any) => {
					close()
					reject(reason)
				},
				close() {
					close()
					resolve(false)
				}
			})
		})
	}

	function create<Component extends SvelteComponent, Props extends ComponentProps<Component>>(
		component: new (...args: any) => Component,
		defaultProps: Props,
		defaultModalProps: ComponentProps<Modal>
	) {
		return {
			open: (props?: Props, config?: ComponentProps<Modal>) =>
				open(component, { ...defaultProps, ...props }, { ...defaultModalProps, ...config })
		}
	}

	return {
		subscribe,
		set,
		open,
		create
	}
}
export const modal = createModalStore()
