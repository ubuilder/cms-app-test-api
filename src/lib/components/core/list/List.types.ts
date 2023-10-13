export type ListBoxContext<T> = {
	register: (name: string, getFooter: (items: T[]) => string | number) => void
	unregister: (name: string) => void
}
