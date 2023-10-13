<script lang="ts">
  import Element from "$lib/ui/Element.svelte";
  import { components } from "$lib/ui";

  import { El } from "yesvelte";

  export let items: any = {};
  export let props: any = {};
</script>

<El row>
  {#each items[props.itemName] ?? [] as item}
    <El col={props.size}>
      {#each props.slot as slot}
        <Element
          element={{ ...slot, slot: slot.props.slot }}
          items={{ ...items, [props.name]: item }}
          {components}
        />
      {/each}
    </El>
  {/each}
</El>
