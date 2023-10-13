<script lang="ts">
  import {
    DatePicker,
    Popover,
    PopoverBody,
  } from "yesvelte";

  import FilterButton from "./FilterButton.svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { DbFilter } from "$lib/types";

  export let key: string;
  export let text: string;

  const filters = getContext<Writable<DbFilter>>("FILTERS");

  if (!$filters[key]) {
    $filters[key] = {
        value: ['', ''],
        operator: "between",
    };
  }
</script>

<FilterButton
  active={$filters[key].value?.[0]}
  on:clear={() => ($filters[key].value = [undefined, undefined])}
>
  {#if !$filters[key].value?.[0]}
    {text}: All
  {:else}
    {text}: {$filters[key].value[0]} to {$filters[key].value[1]}
  {/if}
</FilterButton>
<Popover autoClose="outside">
  <PopoverBody>
    <DatePicker range bind:value={$filters[key].value} />
  </PopoverBody>
</Popover>
