<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import { El } from "yesvelte";

  export let items: any = {};
  export let props: any = {};
</script>

<El p="3">
  <DynamicFormField
    {items}
    type="plain_text"
    label="text"
    bind:value={props.text}
  />
  <DynamicFormField
    type="select"
    {items}
    label="Position"
    options={["start", "center", "end"]}
    bind:value={props.position}
  />
  <DynamicFormField
    {items}
    type="select"
    label="Background color"
    bind:value={props.bgcolor}
  />
</El>
