<script lang="ts">
	export let name: string;
	export let image: string;

	function dragHandler(e: DragEvent): void {
		console.log('drag started');
		// const thumbImage = new Image(100, 100);
		// thumbImage.src = image;
		// thumbImage.style.background = 'rgba(34,34,34, 1)';
		// thumbImage.style.border = '1px solid red';
		// thumbImage.style.borderRadius = '5px';
		// e.dataTransfer?.setDragImage(thumbImage, 20, 20);

		if(!e.dataTransfer)return
		e.dataTransfer.effectAllowed = 'copy';

		e.dataTransfer.setData('text/html', name);
	}
</script>

<div
	class="drag-wrapper"
	draggable="true"
	on:dragstart={dragHandler}
	role="region"
>
	<div class="name">{name}</div>
	<!-- <img class="thumb" src={image} alt={name} /> -->
</div>

<style>
	.drag-wrapper {
		position: relative;
		background-color: rgb(131, 131, 131);
		border-radius: 5px;
		padding: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.thumb {
		width: 40px;
		height: 40px;
		border-radius: 5px;
	}
	.name {
		text-align: center;
		color: white;
		/* position: absolute;
		top: 0px;
		left: 0px; */
	}
</style>
