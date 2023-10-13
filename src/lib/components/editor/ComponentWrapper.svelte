  import { selectedComponents } from "$lib/stores/selectedComponent";

  let element: HTMLDivElement;

    function onMouseEnter() {
        console.log('enter')
        $selectedComponents = [...$selectedComponents, {
            element
        }]

    }

    function onMouseLeave() {
        console.log('leave')

        $selectedComponents = $selectedComponents.slice(0, $selectedComponents.length - 1);
    }

$: console.log($selectedComponents)

</script>

<div bind:this={element} on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} class = 'component-wrapper'>
    <slot/>
</div>

<style>
    .component-wrapper{
        display:contents;

    }
</style>