<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import { FormField } from "yesvelte";
  import SlotList from "$lib/ui/SlotList.svelte";

  import { El } from "yesvelte";

  export let items: any = {};
  export let props: any = {};
</script>

<El p="3">
  <DynamicFormField
    {items}
    type="select"
    label="Size"
    options={["sm", "md", "lg", "xl", true]}
    bind:value={props.size}
  />
  <FormField label="Slot">
    <SlotList bind:slotList={props.slot} {items} id={$$props.id} />
  </FormField>
</El>
