<script lang="ts">
  import DynamicFormField from "$lib/components/content/DynamicFormField.svelte";
  import SlotList from "$lib/ui/SlotList.svelte";

  import { El, FormInput, FormSelect } from "yesvelte";

  export let items: any = {};
  export let props: any = {};

  console.log("items: ", items)
  
  const options = [
    "auto",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    true,
  ];

  function getItemsArray(items: any, array: any[] = [], key = "") {
    let list: any[] = [];

    Object.keys(items).map((item) => {
      list.push({
        text: items[item].text,
        key: key ? key + "." + item : item,
        type: items[item].type,
      });
      if (items[item].type === "object" && items[item].content) {
        list = getItemsArray(items[item].content, list, item);
        console.log(list);
      }
    });

    console.log({ array, list });
    return [...array, ...list];
  }

  function getItems(items: any, key: string) {
    if (!items[key]) return items;

    return {
      ...items,
      [props.name]: {
        type: "object",
        text: props.name,
        content: items[key].content,
      },
    };
  }
</script>

<El p="3">
  <El row>
    <FormSelect
      col="6"
      label="items"
      bind:value={props.itemName}
      items={getItemsArray(items).filter((item) => item.type === "array")}
      key="key"
      let:item
    >
      {item.text}
    </FormSelect>
    <FormInput col="6" label="Name" bind:value={props.name} />

    <DynamicFormField
      type="select"
      {items}
      col="6"
      label="Column Size (1-12)"
      bind:value={props.size}
      {options}
    />
  </El>

  <SlotList
    bind:slotList={props.slot}
    items={getItems(items, props.itemName)}
    id={$$props.id}
  />
</El>
