<script lang="ts">
  import { FormInput, FormRadioGroup, Popover, PopoverBody } from "yesvelte";

  import FilterButton from "./FilterButton.svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let key: string;
  export let text: string;

  const filters = getContext<Writable<any>>("FILTERS");

  if (!$filters[key]) {
    $filters[key] = {
      value: "",
      operator: "like",
    };
  }
</script>

<FilterButton active={$filters[key].value !== ''} on:clear={() => $filters[key].value = ''}>
  {#if $filters[key].value === ""}
    {text}: All
  {:else}
    {text}{$filters[key].value === "" ? ":" : " " + $filters[key].operator}
    {$filters[key].value}
  {/if}
</FilterButton>
<Popover autoClose="outside">
  <PopoverBody>
    <FormRadioGroup
      bind:value={$filters[key].operator}
      label="Type"
      key="key"
      items={[
        { key: "=", text: "Equal" },
        { key: "like", text: "Like" },
        { key: "!=", text: "Not Equal" },
      ]}
      let:item
    >
      {item.text}
    </FormRadioGroup>

    <FormInput
      on:change={(e) => ($filters[key].value = e.target.value)}
      label="Text"
      value={$filters[key].value}
    />
  </PopoverBody>
</Popover>
