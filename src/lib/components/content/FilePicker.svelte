<script lang="ts">
  import { Button, El, Icon } from "yesvelte";
  import { modal } from "../core/modal";
  import FilePickerModal from "./FilePickerModal.svelte";
  import ButtonList from "../core/ButtonList.svelte";

  export let type: "image" | "video" | "file" = "file";
  export let multiple: boolean = false;

  export let value: string | undefined = undefined;

  async function openFilePicker() {
    const file_id = await modal.open(
      FilePickerModal,
      {
        type,
        multiple,
      },
      {
        size: "lg",
        backdrop: true,
      }
    );

    if (file_id) {
      value = file_id;
    }
  }
</script>

{#if type === "image"}
  <El border borderRoundSize="2" mb="3" position="relative" style="max-width: 300px; min-height: 200px">
    {#if value} 
    {#if !value.includes('{{')}
    
    <img src="/files/{value}" alt="test" />
    {/if}
    {/if}

    <El
      class="overlay {value && !value.includes('{{') ? '' : 'show'}"
      position="absolute"
      end="0"
      bottom="0"
      start="0"
      top="0"
      d="flex"
      style="flex-direction: column"
      alignItems="center"
      justifyContent="center"
    >
    {#if value?.includes('{{')}
    <El tag="span" mb="2">
      Dynamic: {value}
    </El>
    {/if}
      <ButtonList>
        {#if value}
          
          <Button color="primary" on:click={() => openFilePicker()}>
            <Icon name="refresh" />
          </Button>
          <Button on:click={() => (value = null)} color="danger">
            <Icon name="trash" />
          </Button>
      
        {:else}
          <Button on:click={openFilePicker}>
            {#if type === "image"}
              {#if multiple}
                Choose Images
              {:else}
                Choose Image
              {/if}
            {:else}
              Choose File
            {/if}
          </Button>
        {/if}
      </ButtonList>
    </El>
  </El>
{:else}
  Type
{/if}

<style>
  :global(.overlay) {
    transition: all 0.3s ease;
    opacity: 0;
  }
  :global(.overlay):hover, :global(.overlay.show) {
    opacity: 1;
    background-color: #20202020;
  }
</style>
