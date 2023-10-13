<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import SlotList from "$lib/ui/SlotList.svelte";


  import { El } from "yesvelte";

  export let props: any = {}
  export let items: any = {}


</script>
<El p="3">
  <El row>

  <DynamicFormField col="6"
  label="URL"
  type="plain_text"
  {items}
  bind:value={props.href}
/>
<DynamicFormField col="6"
  label="Text"
  type="plain_text"
  {items}
  bind:value={props.text}
/>
</El>

<!--TODO: use select for page link...  -->
<!--       
<DynamicFormField
type="select"
bind:value={props.container_size}
{items}
options={}
label="Container Size"
/> -->

<SlotList bind:slotList={props.slot} {items} />
</El>
