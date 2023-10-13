<script>
  import { onMount, setContext } from "svelte";
  import { page } from "$app/stores";
  import { El } from "yesvelte";
  import PageHeader from "./PageHeader.svelte";
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";

  export let title;

  export let htmlTitle = title;

  let loaded = false;

  onMount(() => {
    loaded = true;
  });

</script>

<svelte:head>
  <!-- {#if user.is(roles)} -->
  {#if htmlTitle}
    <title>{htmlTitle}</title>
  {/if}
  <!-- {:else} -->
  <!-- <title>No Access!</title> -->
  <!-- {/if} -->
</svelte:head>

<El container="lg">
  <PageHeader px="0">
    <slot name="title" slot="title">
      {title}
    </slot>
    <slot name="header-buttons" />
  </PageHeader>

  <El mt="3">
    <slot />
  </El>
</El>
