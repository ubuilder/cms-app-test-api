import ConfirmModal from './ConfirmModal.svelte'
import { modal } from './modal'

export const confirmModal = modal.create(
	ConfirmModal,
	{},
	{
		size: 'sm',
		placement: 'top'
	}
)

export { modal }
