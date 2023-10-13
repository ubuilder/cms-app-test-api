<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import SlotList from "$lib/ui/SlotList.svelte";
  import { El } from "yesvelte";

  export let props: any = {};
  export let items: any = {};
</script>

<El p="3">
  <DynamicFormField
    type="plain_text"
    {items}
    label="Title"
    bind:value={props.title}
  />
  <DynamicFormField
    type="image"
    {items}
    label="Card Image"
    bind:value={props.image}
  />
  <SlotList bind:slotList={props.slot} {items} id={$$props.id} />
</El>
