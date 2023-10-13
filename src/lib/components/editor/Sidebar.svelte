
<div class="component-panel">
	<slot />
</div>

<style>
	.component-panel {
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		grid-column-start: 1;
		grid-column-end: 2;
		height: 88vh;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color:  #383838 white ;
	}

	.component-panel::-webkit-scrollbar{
		color: #ff0202 white ;
	}
	

	:global(html){
		scrollbar-color:  #464646 white ;
	}
	:global(.component-panel .drag-wrapper:hover) {
		transform: scale(1.01, 1.1);
		cursor: move;
	}
</style>
