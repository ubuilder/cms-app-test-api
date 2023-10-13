<script context="module">
  export const data = {
    props: [
      { type: "plain_text", name: "Text" },
      { type: "plain_text", name: "Color" },
    ],
    hasSlot: false,
  };
</script>

<script lang="ts">
  import {
    Button,
    Card,
    El,
    FormField,
    FormInput,
    Icon,
    Input,
    TabContent,
    TabItem,
    TabList,
    TabPanel,
    Tabs,
  } from "yesvelte";
  import SlotList from "../../SlotList.svelte";
  import { components } from "../..";
  import Element from "../../Element.svelte";

  export let props: any = {}

  let new_size = 'auto'
  export let edit = false;
  export let items: any = {}

  function addSlot() {
    console.log(props, new_size)
    props.sizes = [...(props.sizes ?? []), new_size]
    props.slots = [...(props.slots ??[]), []]
    new_size = 'auto'
  }

  function removeSlot(index: number) {
    props.slots = props.slots.filter((x, i) => i !== index)
    props.sizes = props.sizes.filter((x, i) => i !== index)
  
  }
  
  $: if(!props.sizes) props.sizes = []
</script>

{#if edit}
  <!-- <Tabs>
    <TabList>
      <TabItem>Columns</TabItem>
      <TabItem>Advanced</TabItem>
    </TabList>
    <TabContent>
      <TabPanel p="3"> -->
      <El p="3">
        <FormField label="Sizes (add resize handle)">
          <El row m="0">
            {#each props.sizes ?? [] as size, i}          
            <El col="auto" d="flex" me="2" border py="1" px="2">
              <Input border="0" style="width: 64px; padding: 0" col="6" bind:value={size}/>
              <Button on:click={() => removeSlot(i)} border="0" col="6" me="2" style="background-color: transparent"><Icon name="minus"/></Button>
            </El>
            {/each}

            <El col="auto" d="flex" me="2" border py="1" px="2">
              <Input border="0" style="width: 64px; padding: 0" col="6" bind:value={new_size}/>
              <Button on:click={() => addSlot()} border="0" col="6" me="2" style="background-color: transparent"><Icon name="plus"/></Button>
            </El>
          </El>
        </FormField>

        <FormField mt="3" label="Content">
          <El row m="0">
            {#each props.slots ?? [] as _, i}
              <El border position="relative" col={props.sizes[i] ??'auto'}>
                <!-- <El
                  top="0"
                  style="left: -2px; position: absolute; width: 1px; background-color: #dbe0e6; height: 100%"
                /> -->
                <Card style="border: none;" my="2">
                  <SlotList bind:slotList={props.slots[i]} {items} id = {$$props.id}/>
                </Card>
                <!-- <El
                  top="0"
                  style="right: -2px; position: absolute; width: 1px; background-color: #dbe0e6; height: 100%"
                >                 -->
                <!-- </El> -->
              </El>
            {/each}
          </El>
        </FormField>
      </El>
      <!-- </TabPanel>
      <TabPanel p="3">
        
        <FormInput label="type" bind:value={props.type} />
      </TabPanel>
    </TabContent>
  </Tabs> -->
{:else}
  <El row {...$$restProps}>
    {#each props.slots ?? [] as slot, i}
      <El col={props.sizes[i] ??'auto'}>
        {#each slot as slotItem}
          <Element element={slotItem} {items} {components} />
        {/each}
      </El>
    {/each}
  </El>
{/if}
