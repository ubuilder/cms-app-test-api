import interact from 'interactjs';
export default function () {

	let update: Function;
	let insert: Function;
	let remove: Function;
	let focusIn: Function;
	let focusOut: Function;
	let resize: Function;
	let fireContoller: number = 0; //conttrol drag over event speed
	type details  ={
		id: string | number | undefined;
		target: HTMLElement | undefined;
		parentId: string | number | undefined;
		index: number | undefined;
		parent: HTMLElement | undefined;
		slots: [] | string | undefined;
	}
	function getDetails(event: Event): details {
		const response = {
			id: undefined,
			target: undefined,
			parent: undefined,
			parentId: undefined,
			index: undefined,
			slots: undefined
		};
		const target =event.target
		if (!(target?.tagName && target.classList.contains('component-wrapper'))){
			return response
		}

		const parent = target?.parentElement.closest('.component-wrapper') ?? target?.closest('.drop-zone');
		let index;
		if(parent.classList.contains('drop-zone')){
			index = Array.from(parent.childNodes).indexOf(event.target)
		}else{
			index = Array.from(parent?.querySelector('.u-slot')?.childNodes).indexOf(event.target)
		}

		return {
			id: target?.getAttribute('id'),
			target,
			parentId: parent?.getAttribute('id'),
			index,
			parent,
			slots: target?.getAttribute('slots')
		};
	}
	function makeReiszeAbleSelector(targetSelector: string, { onResize } = { onResize: undefined }) {
		interact(targetSelector)
		.resizable({
			edges: { top: '.top', left: '.left', bottom: '.bottom', right: '.right' },
			listeners: {
				move: function (event) {
					let { x, y } = event.target.dataset;

					x = (parseFloat(x) || 0) + event.deltaRect.left;
					y = (parseFloat(y) || 0) + event.deltaRect.top;

					Object.assign(event.target.style, {
						width: `${event.rect.width}px`,
						height: `${event.rect.height}px`,
						transform: `translate(${x}px, ${y}px)`
					});

					Object.assign(event.target.dataset, { x, y });
				}
			}
		})
		.on('down', (event) => {
			if (event.target.classList.contains('resize-point')) {
				event.preventDefault();
			}
		})
		.on('resizeend', (event) => {
			const details: details = getDetails(event);
			onResize && onResize(event, details);
			resize && resize(event, details);
		});
	}
	function makeDragAble(el: HTMLElement, { onDragStart, onDragEnd }) {
		el.setAttribute('draggable', 'true');
		const target = el;
		if (!target) return;
		target.setAttribute('tabindex', 0);
		el.addEventListener('dragstart', (event: Event) => {
			if (!event.dataTransfer) return;
			event.stopPropagation();
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
			const template = event.target.outerHTML;
			event.dataTransfer.setData('text/html', template);
			event.target.style.display = 'none';

			onDragStart && onDragStart(event);
			remove && remove(event, getDetails(event));
		});
		el.addEventListener('dragend', (event) => {
			event.target.remove();
			onDragEnd && onDragEnd(event);
		});
	}
	
	function makeDropZone(el: HTMLElement, { onDragEnter, onDragOver, onDragLeave, onDrop }) {
		onDragEnter &&
			el.addEventListener('dragenter', (event) => {
				event.preventDefault();
				onDragEnter(event);
			});
		el.addEventListener('dragover', (event) => {
			event.preventDefault();
			if (fireContoller < 20) {
				fireContoller++;
				return;
			}
			fireContoller = 0;
			
		    removePlaceholder();
		    addPlaceholder(event);
			onDragOver && onDragOver(event);
		});
		onDragLeave &&
			el.addEventListener('dragleave', (event) => {
				removePlaceholder();
				event.preventDefault();
				onDragLeave(event);
			});
		el.addEventListener('drop', (event) => {
			event?.preventDefault();
			const component = addWrapperToComponent(event?.dataTransfer.getData('text/html'));
			replacePlaceholder(component)
			onDrop && onDrop(event);
		});
		el.addEventListener('DOMNodeInserted', (event: Event) => {
			const details = getDetails(event);
			const target = details.target;
			if (target) {
				makeDragAble(target, { onDragEnd: undefined, onDragStart: undefined });
			}

			insert && insert(event, details);
		});
		el.addEventListener('focusin', (event: Event) => {
			event.preventDefault();
			event.stopPropagation();
			const details = getDetails(event);
			if (!details.target) return;
			focusIn && focusIn(event, details);
		});
		el.addEventListener('click', (event: Event) => {
			event.preventDefault();
			// event.stopPropagation();
			if (!event?.target?.classList?.contains('drop-zone')) return;
			focusOut && focusOut(event, {});
		});
	}
	function makeDragAbleSelector(query: string, { onDragStart, onDragEnd } = {onDragEnd: undefined, onDragStart: undefined}) {
		document.querySelectorAll(query).forEach((element) => {
			makeDragAble(element, { onDragStart, onDragEnd });
		});
	}
	function makeDropZoneSelector(query: string, { onDragEnter, onDragOver, onDragLeave, onDrop }) {
		document.querySelectorAll(query).forEach((element) => {
			makeDropZone(element, { onDragEnter, onDragOver, onDragLeave, onDrop });
		});
	}

	function onUpdate(callback: Function): void {
		update = callback;
	}
	function onInsert(callback: Function): void {
		insert = callback;
	}
	function onRemove(callback: Function): void {
		remove = callback;
	}
	function onFocusIn(callback: Function): void {
		focusIn = callback;
	}
	function onFocusOut(callback: Function): void {
		focusOut = callback;
	}
	function onResize(callback: Function): void {
		resize = callback;
	}

	return {
		makeDragAble,
		makeDropZone,
		makeDragAbleSelector,
		makeDropZoneSelector,
		makeReiszeAbleSelector,
		onUpdate,
		onInsert,
		onRemove,
		onFocusIn,
		onFocusOut,
		onResize
	};
}

//utils functions

function replacePlaceholder(element: HTMLElement): void {
	document.getElementById('component-placeholder')?.replaceWith(element);
}

function addPlaceholder(e: Event): void {
	const placeholder = document.createElement('div');
	placeholder.id = 'component-placeholder';

	if (!isSlot(e) && !isDropZone(e)) return;
	const index = findIndex(e);
	insertAtIndex(e.target, placeholder, index);
}
function isDropZone(e: Event): Boolean {
	return e.target.classList.contains('drop-zone');
}

function findIndex(e: Event): number {
	//crazy low level implementation
	const target = e.target;
	const children = target.childNodes;
	if (children.length == 0) return 0;
	if (children[0].nodeName.startsWith('#')) {
		const range = document.createRange();
		range.selectNode(children[0]);
		const top = range.getBoundingClientRect().top;
		range.detach();
		if (e.clientY < top) return 0;
	} else {
		if (e.clientY < children[0].getBoundingClientRect().top) return 0;
	}
	for (let i = 0; i < children.length; i++) {
		let child;
		let rect;
		if (children[i].nodeName.startsWith('#')) {
			child = children[i];
			const range = document.createRange();
			range.selectNode(child);
			rect = range.getBoundingClientRect();
			range.detach();
		} else {
			child = children[i];
			rect = child.getBoundingClientRect();
		}
		if (e.clientY > rect.top && e.clientY < rect.bottom) {
			return e.clientY < rect.top + rect.height / 2 ? i : i + 1;
		}
	}
	return children.length;
}
function insertAtIndex(parrent: HTMLElement, child: HTMLElement, index: number) {
	if (index == 0) {
		return parrent.prepend(child);
	} else if (index == parrent.children.length) {
		return parrent.append(child);
	} else {
		return parrent.insertBefore(child, parrent.children[index]);
	}
}

function isSlot(e: MouseEvent): Boolean {
	return e.target.classList.contains('u-slot');
}
function removePlaceholder(): void {
	document.getElementById('component-placeholder')?.remove();
}

function addWrapperToComponent(html: string):Element {
	const element = document.createElement('div');
	element.classList.add('component-wrapper')
	element.innerHTML = html;
	return element.firstChild
}

export const utilsFunction = {
	isSlot,
	isDropZone,
	findIndex,
	insertAtIndex,
	addPlaceholder,
	replacePlaceholder,
	removePlaceholder
};


/*****
 * 
 * 
 * 
 * 
import interact from 'interactjs';
export default function () {
	let update: Function;
	let insert: Function;
	let remove: Function;
	let focusIn: Function;
	let focusOut: Function;
	let resize: Function;
	let fireContoller: number = 0; //conttrol drag over event speed
	interface details {
		id: string | number | undefined;
		target: HTMLElement | undefined;
		parentId: string | number | undefined;
		index: number | undefined;
		parent: HTMLElement | undefined;
		slots: [] | string | undefined;
	}
	function getDetails(event: Event): details {
		const response = {
			id: undefined,
			target: undefined,
			parent: undefined,
			parentId: undefined,
			index: undefined,
			slots: undefined
		};
		if (!event?.target?.tagName)
			return response
		
		const target = event?.target?.classList?.contains('component-wrapper')
		? event?.target
		: event?.target?.querySelector('.component-wrapper');
		if(!target)return response;

		const parent = target?.parentElement.closest('.component-wrapper') ?? target?.closest('.drop-zone');
		let index;
		if(parent.classList.contains('drop-zone')){
			index = Array.from(parent.childNodes).indexOf(event.target)
		}else{
			index = Array.from(parent.querySelector('.u-slot').childNodes).indexOf(event.target)
		}

		return {
			id: target?.getAttribute('id'),
			target,
			parentId: parent?.getAttribute('id'),
			index,
			parent,
			slots: target?.getAttribute('slots')
		};
	}
	function makeReiszeAbleSelector(targetSelector: string, { onResize } = { onResize: undefined }) {
		interact(targetSelector)
		.resizable({
			edges: { top: '.top', left: '.left', bottom: '.bottom', right: '.right' },
			listeners: {
				move: function (event) {
					let { x, y } = event.target.dataset;

					x = (parseFloat(x) || 0) + event.deltaRect.left;
					y = (parseFloat(y) || 0) + event.deltaRect.top;

					Object.assign(event.target.style, {
						width: `${event.rect.width}px`,
						height: `${event.rect.height}px`,
						transform: `translate(${x}px, ${y}px)`
					});

					Object.assign(event.target.dataset, { x, y });
				}
			}
		})
		.on('down', (event) => {
			if (event.target.classList.contains('resize-point')) {
				event.preventDefault();
			}
		})
		.on('resizeend', (event) => {
			const details: details = getDetails(event);
			onResize && onResize(event, details);
			resize && resize(event, details);
		});
	}
	function makeDragAble(el: HTMLElement, { onDragStart, onDragEnd }) {
		el.setAttribute('draggable', 'true');
		const target = el;
		if (!target) return;
		target.setAttribute('tabindex', 0);
		if (!target.querySelector('.control')) {
			addComponentControllers(target);
		}
		if (!target.querySelector('.edges')) {
			addResizePoints(target);
		}
		el.addEventListener('dragstart', (event: Event) => {
			if (!event.dataTransfer) return;
			event.stopPropagation();
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
			const template = event.target.outerHTML;
			event.dataTransfer.setData('text/html', template);
			event.target.style.display = 'none';

			onDragStart && onDragStart(event);
			remove && remove(event, getDetails(event));
		});
		el.addEventListener('dragend', (event) => {
			event.target.parentElement.remove();
			onDragEnd && onDragEnd(event);
		});
	}
	function makeDropZone(el: HTMLElement, { onDragEnter, onDragOver, onDragLeave, onDrop }) {
		onDragEnter &&
			el.addEventListener('dragenter', (event) => {
				event.preventDefault();
				onDragEnter(event);
			});
		el.addEventListener('dragover', (event) => {
			event.preventDefault();
			if (fireContoller < 20) {
				fireContoller++;
				return;
			}
			fireContoller = 0;
			
		    removePlaceholder();
		    addPlaceholder(event);
			onDragOver && onDragOver(event);
		});
		onDragLeave &&
			el.addEventListener('dragleave', (event) => {
				removePlaceholder();
				event.preventDefault();
				onDragLeave(event);
			});
		el.addEventListener('drop', (event) => {
			event?.preventDefault();
			const component = addWrapperToComponent(event?.dataTransfer.getData('text/html'));
			replacePlaceholder(component)
			onDrop && onDrop(event);
		});
		el.addEventListener('DOMNodeInserted', (event: Event) => {
			const details = getDetails(event);
			const target = details.target;
			if (target) {
				makeDragAble(target, { onDragEnd: undefined, onDragStart: undefined });
			}

			insert && insert(event, details);
		});
		el.addEventListener('focusin', (event: Event) => {
			event.preventDefault();
			event.stopPropagation();
			const details = getDetails(event);
			if (!details.target) return;
			focusIn && focusIn(event, details);
		});
		el.addEventListener('click', (event: Event) => {
			event.preventDefault();
			// event.stopPropagation();
			if (!event?.target?.classList?.contains('drop-zone')) return;
			focusOut && focusOut(event, {});
		});
	}
	function makeDragAbleSelector(query: string, { onDragStart, onDragEnd } = {onDragEnd: undefined, onDragStart: undefined}) {
		document.querySelectorAll(query).forEach((element) => {
			makeDragAble(element, { onDragStart, onDragEnd });
		});
	}
	function makeDropZoneSelector(query: string, { onDragEnter, onDragOver, onDragLeave, onDrop }) {
		document.querySelectorAll(query).forEach((element) => {
			makeDropZone(element, { onDragEnter, onDragOver, onDragLeave, onDrop });
		});
	}

	function onUpdate(callback: Function): void {
		update = callback;
	}
	function onInsert(callback: Function): void {
		insert = callback;
	}
	function onRemove(callback: Function): void {
		remove = callback;
	}
	function onFocusIn(callback: Function): void {
		focusIn = callback;
	}
	function onFocusOut(callback: Function): void {
		focusOut = callback;
	}
	function onResize(callback: Function): void {
		resize = callback;
	}

	return {
		makeDragAble,
		makeDropZone,
		makeDragAbleSelector,
		makeDropZoneSelector,
		makeReiszeAbleSelector,
		onUpdate,
		onInsert,
		onRemove,
		onFocusIn,
		onFocusOut,
		onResize
	};
}

//utils functions

function replacePlaceholder(element: HTMLElement): void {
	document.getElementById('component-placeholder')?.replaceWith(element);
}

function addPlaceholder(e: Event): void {
	const placeholder = document.createElement('div');
	placeholder.id = 'component-placeholder';

	if (!isSlot(e) && !isDropZone(e)) return;
	const index = findIndex(e);
	insertAtIndex(e.target, placeholder, index);
}
function isDropZone(e: Event): Boolean {
	return e.target.classList.contains('drop-zone');
}

function findIndex(e: Event): number {
	//crazy low level implementation
	const target = e.target;
	const children = target.childNodes;
	if (children.length == 0) return 0;
	if (children[0].nodeName.startsWith('#')) {
		const range = document.createRange();
		range.selectNode(children[0]);
		const top = range.getBoundingClientRect().top;
		range.detach();
		if (e.clientY < top) return 0;
	} else {
		if (e.clientY < children[0].querySelector('.component-wrapper').getBoundingClientRect().top) return 0;
	}
	for (let i = 0; i < children.length; i++) {
		let child;
		let rect;
		if (children[i].nodeName.startsWith('#')) {
			child = children[i];
			const range = document.createRange();
			range.selectNode(child);
			rect = range.getBoundingClientRect();
			range.detach();
		} else {
			child = children[i].querySelector('.component-wrapper');
			rect = child.getBoundingClientRect();
		}
		if (e.clientY > rect.top && e.clientY < rect.bottom) {
			return e.clientY < rect.top + rect.height / 2 ? i : i + 1;
		}
	}
	return children.length;
}
function insertAtIndex(parrent: HTMLElement, child: HTMLElement, index: number) {
	if (index == 0) {
		return parrent.prepend(child);
	} else if (index == parrent.children.length) {
		return parrent.append(child);
	} else {
		return parrent.insertBefore(child, parrent.children[index]);
	}
}

function isSlot(e: MouseEvent): Boolean {
	return e.target.classList.contains('u-slot');
}
function removePlaceholder(): void {
	document.getElementById('component-placeholder')?.remove();
}
function addResizePoints(target: HTMLelemnt): void {
	const edges = document.createElement('div');
	edges.classList.add('edges');
	edges.innerHTML = `
			<div class = 'resize-point left'></div>
			<div class = 'resize-point right'></div>
			<div class = 'resize-point top'></div>
			<div class = 'resize-point bottom'></div>
			<div class = 'resize-point top left top-left'></div>
			<div class = 'resize-point top right top-right'></div>
			<div class = 'resize-point bottom left bottom-left'></div>
			<div class = 'resize-point bottom right bottom-right '></div>
			`;
	target.append(edges);
}
function addComponentControllers(target: HTMLElement): void {
	const control = document.createElement('div');
	control.classList.add('control');
	control.innerHTML = `<div class = 'holder'></div><div class = 'close'></div>`;
	target.append(control);
	target.querySelector('.close')?.addEventListener(
		'mousedown',
		(e) => {
			e.preventDefault();
			console.log('click', target);
			target.parentElement.remove();
		},
		true
	);
	target.querySelector('.holder')?.addEventListener(
		'focusin',
		(e) => {
			e.stopPropagation();
			e.preventDefault();
		},
		true
	);
}
function addWrapperToComponent(html: string): HTMLElement {
	const element = document.createElement('div');
	element.classList.add('component-wrapper')
	element.innerHTML = html;
	return element
}

export const utilsFunction = {
	isSlot,
	isDropZone,
	findIndex,
	insertAtIndex,
	addPlaceholder,
	replacePlaceholder,
	removePlaceholder
};


*/
