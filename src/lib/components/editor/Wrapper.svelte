<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import interact from "interactjs";
  // import Element from "$lib/ui/Element.svelte";
  export let dropZone: Element;
  import { selectedComponents } from "$lib/stores/selectedComponent";

  let element: HTMLDivElement;

  interface IUpdateControl {
    wrapper: any;
    selectedComponent: any;
    dropZone: any;
    selecteComponent(selectedComponent: any): any;
    placeWrapper(): any;
    makeWrapperResizeAble(): any;
    obserWrapperSize(): any;
    applyResizeToComponent(rect: any): any;
    unSelectComponent(): any;
  }

  // class Wrapper implements IUpdateControl {
  //   wrapper: any;
  //   selectedComponent: any;
  //   dropZone: any;
  //   constructor(wrapper: any) {
  //     this.wrapper = wrapper;
  //   }

  //   selecteComponent(selectedComponent: any): any {
  //     this.selectedComponent = selectedComponent;
  //   }
  //   positionWrapper() {
  //     const dropZone = document.querySelector(".drop-zone");
  //     const range = document.createRange();
  //     const range1 = document.createRange();
  //     range1.selectNode(dropZone);
  //     range.selectNode($selectedComponent);
  //     let componentRect = range.getBoundingClientRect();
  //     let dropZoneRect = range1.getBoundingClientRect();
  //     // console.log(computedStyle)
  //     Object.assign(this.wrapper.style, {
  //       width: componentRect.width + "px",
  //       height: componentRect.height + "px",
  //       top: componentRect.top - dropZoneRect.top + "px",
  //       left: componentRect.left - dropZoneRect.left + "px",
  //       display: "block",
  //     });
  //     range.detach();
  //     range1.detach();
  //   }
  //   placeWrapper(): any {
  //     this.positionWrapper();
  //   }
  //   makeWrapperResizeAble(): any {
  //     console.log("this", this);
  //     let wrapper = this.wrapper;
  //     let selectedComponent = this.selectedComponent;
  //     let positionWrapper = this.positionWrapper;
  //     interact(this.wrapper)
  //       .resizable({
  //         edges: {
  //           top: ".top",
  //           left: ".left",
  //           bottom: ".bottom",
  //           right: ".right",
  //         },
  //         listeners: {
  //           move: function (event) {
  //             let { x, y } = event.target.dataset;
  //             console.log("moving");

  //             x = (parseFloat(x) || 0) + event.deltaRect.left;
  //             y = (parseFloat(y) || 0) + event.deltaRect.top;

  //             if (wrapper) {
  //               Object.assign(wrapper.style, {
  //                 width: `${event.rect.width}px`,
  //                 height: `${event.rect.height}px`,
  //                 transform: `translate(${x}px, ${y}px)`,
  //               });
  //               Object.assign(selectedComponent.style, {
  //                 width: `${event.rect.width}px`,
  //                 height: `${event.rect.height}px`,
  //                 transform: `translate(${x}px, ${y}px)`,
  //               });
  //             }
  //             Object.assign(event.target.dataset, { x, y });
  //           },
  //         },
  //       })
  //       .on("down", (event) => {
  //         if (event.target.classList.contains("resize-point")) {
  //           event.preventDefault();
  //         }
  //       })
  //       .on("resizeend", (event) => {
  //         Object.assign(event.target.style, {
  //           transform: `translate(${0}px, ${0}px)`,
  //         });
  //       });
  //   }

  //   unSelectComponent(): any {
  //     this.selectedComponent = null;
  //   }
  // }

  // $: activate(dropZone, $selectedComponent);

  // function activate(dropZone, selectedComponent) {
  // console.log('handeler is callin')

  //   if($selectedComponent && dropZone){
  //     const instance = new Wrapper(wrapper)
  //     instance.selecteComponent(selectedComponent);
  //     instance.placeWrapper();
  //     instance.makeWrapperResizeAble();
  //   }
  // }

  let x: number, y: number, w: number, h: number;

  $: selectedComponent = $selectedComponents[$selectedComponents.length - 1];

  $: if (selectedComponent) {
    const parentRects = dropZone.getClientRects();
    const rects = selectedComponent.element.firstChild.getClientRects();

    if (rects[0]) {
      x = rects[0].x - 2 - parentRects[0].x;
      y = rects[0].y - 1 - parentRects[0].y;
      w = rects[0].width + 2;
      h = rects[0].height + 1;
    }
  }
</script>

<div
  bind:this={element}
  class="wrapper"
  class:d-block={selectedComponent}
  style="left: {x}px; top: {y}px; width: {w}px; height: {h}px"
>
  <div class="resize-point left" />
  <div class="resize-point right" />
  <div class="resize-point top" />
  <div class="resize-point bottom" />
  <div class="resize-point top left top-left" />
  <div class="resize-point top right top-right" />
  <div class="resize-point bottom left bottom-left" />
  <div class="resize-point bottom right bottom-right" />
  <div class="control">
    <div class="holder" />
    <div class="close" />
  </div>
</div>

<style>
  .wrapper {
    display: none;
    position: absolute;
    min-height: 10px;
    z-index: 1;
    border: 1px solid var(--y-primary);
    pointer-events: none;
  }
  .d-block {
    display: block;
  }
</style>
