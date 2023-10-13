<script context="module">
  export const hasSlot = true;
</script>

<script lang="ts">
  import FieldInput from "$lib/components/content/FieldInput.svelte";

  import { El } from "yesvelte";
  import Button from "../Button/ViewButton.svelte";
  import ButtonList from "$lib/components/core/ButtonList.svelte";
  import { page } from "$app/stores";
  import type { Table } from "$lib/types";

  export let props: any = {};

  const tables: Table[] = $page.data.tables;

  async function onSubmit(event: SubmitEvent) {
    const a = await fetch("/actions/" + props.actionid, {
      method: "POST",
      body: JSON.stringify({ data: props.data, table: props.table }),
    })
      .then((res) => res.json())
      .then((x) => location.reload());
  }
</script>

<form
  action="/actions/{props.actionid}"
  on:submit|preventDefault={onSubmit}
  method="post"
>
  <El row>
    {#each props.fields as field}
      <FieldInput {field} bind:data={props.data} />
    {/each}
  </El>

  <El d="flex" justifyContent="end" gap="2">
    <ButtonList>
      {#each props.buttons as button}
        <Button props={button} />
      {/each}
    </ButtonList>
  </El>
</form>
