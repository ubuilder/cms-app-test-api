<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, El, Icon } from "yesvelte";

  const dispatch = createEventDispatcher();

  function onClear() {
    dispatch("clear");
  }

  export let active = false;
</script>

<Button
  style="border-radius: 20px"
  ps="3"
  pe={active ? "0" : "3"}
  py="1"
  color={active ? "primary" : undefined}
  size="sm"
>
  <slot />
  {#if active}
    <El
      style="line-height: 0; padding-left: 0.5rem; padding-right: 0.5rem"
      on:click!stopPropagation={() => onClear()}
      tag="span"
    >
      <Icon name="x" />
    </El>
  {/if}
</Button>

<!-- 

  
      {text}: {$filters[key].value !== ""
        ? items.find((x) => x.key == $filters[key].value).text
        : "All"}
      {#if $filters[key].value !== ""}
        <El
        
        style="line-height: 0; padding-left: 0.5rem; padding-right: 0.5rem"
          on:click!stopPropagation={() => ($filters[key].value = "")}
          tag="span"
        >
          <Icon name="x" />
        </El>
      {/if}
    </> -->
