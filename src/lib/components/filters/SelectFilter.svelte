<script lang="ts">

  import { Dropdown, DropdownItem, DropdownMenu } from "yesvelte";
  import FilterButton from "./FilterButton.svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let text: string;
  export let key: string;
  export let items: any[] = [];

  $: allItems = [{ text: "All", key: "" }, ...items];


  const filters = getContext<Writable<any>>("FILTERS");

    if (!$filters[key]) {
      $filters[key] = {
          value: "",
          operator: "=",
      };
    }
</script>
<Dropdown autoClose placement="bottom-start">
    <FilterButton active={$filters[key].value !== ''} on:clear={() => $filters[key].value = ''}>
        {text}: {$filters[key].value !== ""
        ? items.find((x) => x.key == $filters[key].value)?.text
        : "All"}
    </FilterButton>
    <DropdownMenu>
      {#each allItems as item}
        <DropdownItem on:click={() => ($filters[key].value = item.key)}>
          {item.text}
        </DropdownItem>
      {/each}
    </DropdownMenu>
  </Dropdown>