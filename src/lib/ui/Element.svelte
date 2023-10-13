<script lang="ts">
  import { renderVariable } from "$lib/helpers";

  export let element: any = {};

  export let components: any = {};
  export let mode: "edit" | "view" = "view";
  export let items: any = {};
  // let items = {}

  let props = renderVariable({ ...element.props, slot: undefined }, items) ?? {}; // dynamic types
  props.slot = element.props.slot;

  let component = components[element.type]?.[mode] ?? undefined;
  let slot = element.props.slot ?? [];
</script>

{#if mode === "edit"}
  {#if typeof element === "string"}
    {element}
  {:else if slot.length > 0}
    {#if component}
      <svelte:component this={component} bind:props={element.props} {items}>
        {#each slot as slotItem}
          <svelte:self {mode} bind:element={slotItem} {items} {components} />
        {/each}
      </svelte:component>
    {/if}
  {:else if component}
    <svelte:component this={component} bind:props={element.props} {items} />
  {/if}
{:else if mode === "view"}
  {#if typeof element === "string"}
    {renderVariable(element, items)}
  {:else if slot.length > 0}
    {#if component}
      <svelte:component this={component} {props} {items}>
        {#each slot as slotItem}
          <svelte:self {mode} element={slotItem} {items} {components} />
        {/each}
      </svelte:component>
    {/if}
  {:else if component}
    <svelte:component this={component} {props} {items} />
  {/if}
{/if}
