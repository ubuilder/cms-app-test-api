<script lang="ts">
  import { nanoid } from "nanoid";
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    El,
    FormEditor,
    FormField,
    FormInput,
    Label,
    Button,
    FormSelect,
    FormSwitch,
    Icon,
    FormRadioGroup,
  } from "yesvelte";
  import FilePicker from "./FilePicker.svelte";

  const id = "form-field-" + nanoid();

  function onAdd(key: string) {
    if (["image", "file", "switch", "select"].includes(type)) {
      localValue = "{{" + key + "}}";
    } else {
      localValue = localValue + "{{" + key + "}}";
    }
  }

  export let items: any = {};
  export let type: string = "plain_text";
  export let accept: string[] = [];

  export let label: string | undefined = undefined;
  export let required: boolean = false;
  export let value: any;

  export let col: any | undefined = undefined;

  let localValue = value ?? "";

  $: value = localValue;

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

    return [...array, ...list];
  }

  $: itemsArray = getItemsArray(items);
  $: filteredItems = itemsArray.filter(
    (x) => x.type === type || accept.includes(x.type)
  );
  $: isDynamic = localValue?.includes?.("{{");
</script>

<FormField colSm={col} {...$$restProps}>
  <Label d="flex" gap="2" for={id} {required} slot="label">
    <span>{label}</span>
    {#if filteredItems.length > 0}
      <Dropdown autoClose arrow={false} placement="right-start">
        <div slot="target" tabindex="0" class="dynamic-icon" />
        <DropdownMenu>
          {#each filteredItems as item}
            <DropdownItem on:click={() => onAdd(item.key)}>
              {item.text}
            </DropdownItem>
          {/each}
        </DropdownMenu>
      </Dropdown>
    {/if}
  </Label>
  {#if type === "plain_text"}
    <FormInput {...$$restProps} bind:value={localValue} />
  {:else if type === "rich_text"}
    <FormEditor {...$$restProps} bind:value={localValue} />
  {:else if type === "select"}
    {#if isDynamic}
      <FormInput disabled value="Dynamic: {value}">
        <Button color="danger" slot="end" on:click={() => (localValue = "")}>
          <Icon name="minus" />
        </Button>
      </FormInput>
    {:else}
      {@const isObject = typeof $$restProps.options?.[0] === "object"}
      {#if $$props.input_type === "radio_group"}
        <FormRadioGroup
          {...$$restProps}
          items={$$restProps.options}
          bind:value={localValue}
          key={isObject ? $$props.key ?? "key" : undefined}
          let:item
        >
          {isObject ? item[$$props.text ?? "text"] : item}
        </FormRadioGroup>
      {:else}
        <FormSelect
          {...$$restProps}
          items={$$restProps.options}
          bind:value={localValue}
          key={isObject ? $$props.key ?? "key" : undefined}
          let:item
        >
          {isObject ? item[$$props.text ?? "text"] : item}
        </FormSelect>
      {/if}
    {/if}
  {:else if type === "image"}
    <FilePicker {...$$restProps} bind:value={localValue} type="image" />
  {:else if type === "file"}
    <FilePicker {...$$restProps} bind:value={localValue} type="file" />
  {:else if type === "switch"}
    {#if isDynamic}
      <FormInput disabled value="Dynamic: {value}">
        <Button color="danger" slot="end" on:click={() => (localValue = "")}>
          <Icon name="minus" />
        </Button>
      </FormInput>
    {:else}
      <FormSwitch {...$$restProps} bind:checked={localValue} />
    {/if}
  {/if}

  <slot />
</FormField>

<style>
  .dynamic-icon {
    z-index: 10;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    /* position: absolute; */
    top: 22px;
    background: #57bfffc2;
    border-radius: 50%;
    left: -7px;
    width: 20px;
    height: 20px;
  }

  .dynamic-icon::before {
    content: "+";
    color: white;
    margin-bottom: 1px;
  }
  .dynamic-icon:hover {
    /* top: 17px; */
    background: #1da1f2;
    /* left: -12px;
      width: 25px;
      height: 25px; */
  }
  .dynamic-icon:hover::before {
    font-size: 20px;
    /* margin-bottom: 5px; */
  }
</style>
