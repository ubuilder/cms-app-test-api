<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import {
    Button,
    ButtonGroup,
    FormInput,
    FormSelect,
    FormTextarea,
  } from "yesvelte";
  // import { selectedComponent } from "$lib/stores/selectedComponent";

  let one = true;
</script>

<div class="control-panel">
  <ButtonGroup w="100">
    <Button w="50" color={one ? "primary" : ""} on:click={() => (one = true)}
      >Content</Button
    >
    <Button w="50" color={one ? "" : "primary"} on:click={() => (one = false)}
      >Style</Button
    >
  </ButtonGroup>
  <div class="panels">
    {#if one}
      <div class="contents-panel">
        <FormTextarea label="Content" />
        <FormInput size="sm" label="Size" />
        <FormSelect label="Alignment" items={["Center", "Left", "Right"]} />
      </div>
    {:else}
      <div class="style-panel">
        <FormInput size="sm" type="number" label="Margin" />
        <FormInput size="sm" type="number" label="Padding" />
        <FormInput size="sm" type="number" label="Width" />
        <FormInput size="sm" type="number" label="Height" />
        <FormInput size="sm" type="color" label="Color" />
        <FormInput size="sm" type="color" label="BgColor" />
      </div>
    {/if}
  </div>
  <slot />
</div>

<style>
  div {
    margin: 0px;
  }
  .control-panel {
    width: 100%;
    height: 100%;
  }
</style>
