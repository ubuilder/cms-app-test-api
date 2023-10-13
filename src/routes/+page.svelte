<script>
  // your script goes here
  import Page from "$lib/components/core/Page.svelte";
  import { cms_api } from "$lib/helpers/cms-api";
  import { onMount } from "svelte";

  import { FormSelect, Button, FormTextarea, El, FormField } from "yesvelte";

  export let data;

  let loading = false;
  let api;
  
  let token = "";

  onMount(() => {
    window.parent.window.postMessage({
      type: "init",
    }, {
        targetOrigin: 'https://first.cms.hadiahmadi.dev' // from env
    });

    window.onmessage = (e) => {
      const data = e.data;

      if (data.type === "init") {
        token = data.token;
        if(token) {

        api = cms_api({
          baseUrl: "https://cms-api.hadiahmadi.dev/api/" + data.siteId,
          token: token,
        });
    }

      }
    };
  });

  let body = "{}";

  let result = "";
  let selectedItem;
  async function run() {
    loading = true;
    result = await api[selectedItem](JSON.parse(body));
    loading = false;
  }
</script>

<Page title="Test API">
  {#if api}
    <El row>
      <FormSelect
        col="9"
        bind:value={selectedItem}
        items={Object.keys(api)}
        label="Method"
        let:item
      >
        {item}
      </FormSelect>
      <El col="3" mt="1">
        <Button
          w="100"
          mt="4"
          mb="3"
          {loading}
          color="primary"
          on:click={() => run()}>Run</Button
        >
      </El>

      <FormTextarea col="12" label="Body" bind:value={body} />

      {#if result}
        <FormField label="Response">
          <El border tag="pre" p="2" bgColor="light" textColor="dark"
            >{JSON.stringify(result, null, 2)}</El
          >
        </FormField>
      {/if}
    </El>
    {:else}
    Loading
  {/if}
</Page>
