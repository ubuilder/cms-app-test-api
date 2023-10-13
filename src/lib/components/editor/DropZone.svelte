<script lang="ts">
  import DragDrop, { utilsFunction as uf } from "./utils";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  export let screenSize: string;
  export let dropZone: HTMLElement;

  export let page: any;
  
  const dragDrop = DragDrop();

  function onDrop(e) {
    console.log('onDrop')
    const element = e.dataTransfer.getData('text/html')


    page.slot = [...page.slot, {
      type: element,
      slot: [],
      props: {}
    }]



  }
  onMount(() => {
    dragDrop.makeDropZone(dropZone, { onDrop });
    dragDrop.makeDragAbleSelector(".component-wraper");
    dragDrop.makeReiszeAbleSelector(".component-wraper");
  });

  $: console.log("dropzone", dropZone);
</script>

<div
  bind:this={dropZone}
  class="drop-zone {screenSize == 'laptop'
    ? 'laptop'
    : screenSize == 'mobile'
    ? 'mobile'
    : 'tablet'}"
  role="region">
  <slot />
</div>

<style>
  .drop-zone {
    position: relative;
    /* background-color: rgba(196, 190, 196, 0.3); */
    border: 1px solid rgb(0, 119, 255);
    border-radius: 5px;
    grid-column-start: 2;
    grid-column-end: 3;
    min-height: 300px;
    height: max-content;
    padding: 5px;
    padding-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    width: 100%;
    background-color: white;
    overflow-x: auto;
  }
  .laptop {
  }
  .tablet {
    max-width: 900px;
    min-width: 500px;
  }
  .mobile {
    max-width: 500px;
    min-width: 300px;
  }
</style>
