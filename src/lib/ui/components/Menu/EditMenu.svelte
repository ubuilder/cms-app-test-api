<script lang="ts">
  import ButtonList from "$lib/components/core/ButtonList.svelte";
  import {
    El,
    FormInput,
    Button,
    Icon
  } from "yesvelte";

  export let props: any = {};
  
</script>

  <El p="3">
    <El row>
      {#each props.links ?? [] as link}
        <FormInput colSm="5" label="Text" bind:value={link.title} />
        <FormInput
          colSm="5"
          label="Link"
          bind:value={link.link}
        />
        <El colSm="2">
          <Button
            ghost
            color="danger"
            on:click={() =>
              (props.links = props.links.filter((x) => x !== link))}
          >
            <Icon name="trash" />
          </Button>
        </El>
      {/each}
      <ButtonList>

      <Button
        color="primary"
        on:click={() => (props.links = [...(props.links ?? []), {}])}
      >
        <Icon name="plus" />
        Add Link
      </Button>
    </ButtonList>

    </El>
  </El>
