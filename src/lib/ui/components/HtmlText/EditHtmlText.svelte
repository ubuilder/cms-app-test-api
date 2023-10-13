<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import { El } from "yesvelte";

  export const data = {
    props: [{ type: "rich_text", name: "text" }],
    hasSlot: true,
  };

  export let props: any = {};
</script>

<El p="3">
  <DynamicFormField label="Content" type="rich_text" bind:value={props.text} />
</El>
