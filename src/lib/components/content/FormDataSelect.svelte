<script lang="ts">
  import { onMount } from "svelte";
  import { El, FormAutocomplete } from "yesvelte";
  
  export let multiple = false
  export let table: string | undefined = undefined
  export let title: string | undefined = undefined
  
  export let value: any;

  let items: any[] = []
  let loading = true

  onMount(async () => {
    const data = await fetch(`/items/${table}`).then(res => res.json())

    loading = false
    items = data.data
  })
  

</script>

{#if loading}
  <El p="3">Loading...</El>
{:else}
  <FormAutocomplete {multiple} {items} key="id" {...$$restProps} bind:value let:item>
      {item[title ?? 'id']}
  </FormAutocomplete>
{/if}