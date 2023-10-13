<script lang="ts">
    import { El, Icon } from "yesvelte";
  
  import { createEventDispatcher } from "svelte";
  import AssetImage from "../../../routes/admin/assets/AssetTypes/AssetImage.svelte";
  
    export let asset: any;
  

    const dispatch = createEventDispatcher()
   
    async function onSelect() {
        dispatch('select')
    }
  </script>
  
  <El col="6" colMd="4" colLg="3">
    <El
      border
      borderRoundSize="3"
      style="overflow: hidden"
      on:click={() => onSelect()}
      position="relative"
    >
      {#if asset.type === "image"}
        <AssetImage {asset} />
  
        <El
          h="50"
          d="flex"
          alignItems="end"
          textColor="light"
          justifyContent="between"
          style="background: linear-gradient(0deg, black, transparent);"
          p="2"
          position="absolute"
          bottom="0"
          start="0"
          end="0"
        >
          <El tag="strong">{asset.name}</El>
        </El>
      {:else if asset.type === "audio"}
        AUDIO
      {:else if asset.type === "video"}
        VIDEO
      {:else}
        PREVIEW NOT SUPPORTED
      {/if}
    </El>
  </El>
  