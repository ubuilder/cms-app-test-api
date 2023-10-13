<script lang="ts">
  import Element from "../../Element.svelte";
  import {components} from '$lib/ui'
  
    export let props: any = {};
    export let items: any = {}; // [{ text: "Page slot", key: "page.slot" }];
  </script>
  
    <a href={props.href}>
        {#if props.text}
            {props.text}
        {:else}
        <!-- {JSON.stringify(props.slot)} -->
        {#each props.slot as slot}
                <Element element={{ ...slot, slot: slot.props.slot }} {items} {components} />
            {/each}
        {/if}
    </a>
  