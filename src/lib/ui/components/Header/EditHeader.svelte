<script lang="ts">
  import { El } from "yesvelte";
  import SlotList from "../../SlotList.svelte";
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";

  export let props: any = {};
  export let items: any = {}; // [{ text: "Page slot", key: "page.slot" }];
</script>

<El p="3">
  <DynamicFormField
    label="Title"
    type="plain_text"
    {items}
    bind:value={props.title}
  />

  <DynamicFormField type="image" bind:value={props.logo} {items} label="Logo" />
  <DynamicFormField
    type="plain_text"
    accept={["select"]}
    bind:value={props.color}
    {items}
    label="Color"
  />

  <DynamicFormField
    type="select"
    bind:value={props.container_size}
    {items}
    options={["sm", "md", "lg", "xl"]}
    label="Container Size"
  />

  <SlotList bind:slotList={props.slot} {items} id={$$props.id} />
</El>
