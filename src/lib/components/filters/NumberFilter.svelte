<script lang="ts">
    import {
      DatePicker,
      FormInput,
      Popover,
      PopoverBody,
    } from "yesvelte";
  
    import FilterButton from "./FilterButton.svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
  
    export let key: string;
    export let text: string;
  
    const filters = getContext<Writable<any>>("FILTERS");
  
    if (!$filters[key]) {
      $filters[key] = {
        value: [undefined, undefined],
        operator: "between",
      };
    }
    $: active = typeof $filters[key].value?.[0] !== 'undefined'
  </script>
  
  <FilterButton
    {active}
    on:clear={() => ($filters[key].value = [undefined, undefined])}
  >
    {#if !active}
      {text}: All
    {:else}
      {text}: {$filters[key].value?.[0]} to {$filters[key].value?.[1]}
    {/if}
  </FilterButton>
  <Popover autoClose="outside">
    <PopoverBody>
      {#if $filters[key].value}
        <FormInput label="From" value={$filters[key].value[0]} on:change={(e) => $filters[key].value[0] = e.target.value}/>
        <FormInput label="To" value={$filters[key].value[1]} on:change={(e) => $filters[key].value[1] = e.target.value}/>
      {/if}
    </PopoverBody>
    
  </Popover>
  