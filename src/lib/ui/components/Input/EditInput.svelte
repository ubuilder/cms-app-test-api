<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import { El } from "yesvelte";

  export let props: any = {};
  export let items: any = {};
</script>

<El p="3">
  <DynamicFormField type="plain_text" {items}
    label="Label"
    bind:value={props.label} />
  <DynamicFormField type="plain_text" {items}
    label="Type"
    bind:value={props.type} />
  <DynamicFormField type="plain_text" {items}
    label="Name"
    bind:value={props.name} />
  <!-- {#if insertVariable}
    <InsertVariable target={valueInput} />
  {/if} -->
  <DynamicFormField type="plain_text" {items}
    label="Default Value"
    bind:value={props.defaultValue} />
  </El>

