<script lang="ts">
  import {
    El,
    FormDatePicker,
    FormEditor,
    FormField,
    FormInput,
    FormSelect,
    FormSwitch,
    FormTextarea,
    Popover,
    PopoverBody,
  } from "yesvelte";
  import FilePicker from "./FilePicker.svelte";
  import FormDataSelect from "./FormDataSelect.svelte";
  import type { Field } from "$lib/types";

  export let field: Field;
  export let data: any = {}; 

  export let label: string = field.name;
  export let items: any[] = [];

  $: fieldProps = {
    required: field.required,
    label,
  };
  $: props = {
    required: field.required,
    placeholder: field.placeholder,
  };
</script>

<FormField position="relative" {...fieldProps}>
  
  <El row>
    {#if field.type === "plain_text"}
      {#if field.input_type === "textarea"}
        <FormTextarea rows="10" {...props} bind:value={data[field.name]} />
      {:else}
        <FormInput
          {...props}
          minlength={field.minlength}
          maxlength={field.maxlength}
          bind:value={data[field.name]}
        />
      {/if}
    {:else if field.type === "rich_text"}
      <FormEditor {...props} bind:value={data[field.name]} />
    {:else if field.type === "number"}
      <FormInput
        {...props}
        type="number"
        min={field.min}
        max={field.max}
        bind:value={data[field.name]}
      />
    {:else if field.type === "date_time"}
      <FormDatePicker
        {...props}
        range={field.range}
        bind:value={data[field.name]}
      />
    {:else if field.type === "select"}
      <FormSelect
        items={(field.options ?? "").split(",").map((x) => x.trim())}
        {...props}
        let:item
        bind:value={data[field.name]}
      >
        {item}
      </FormSelect>
      <!-- <FormFileUpload {...props} label="use Asset picker (check multiple)" bind:value={data[field.name]}/> -->
    {:else if field.type === "file"}
      <FilePicker {...props} bind:value={data[field.name]} />
    {:else if field.type === "image"}
      <FilePicker type="image" {...props} bind:value={data[field.name]} />

      <!-- <FormFileUpload {...props} label="use Asset picker (check multiple)" bind:value={data[field.name]}/> -->
    {:else if field.type === "switch"}
      <FormSwitch {...props} bind:checked={data[field.name]} />
    {:else if field.type === "relation"}
      <FormDataSelect
        multiple={field.multiple}
        table={field.table}
        title={field.title}
        bind:value={data[field.name]}
      />
    {/if}
  </El>
</FormField>

