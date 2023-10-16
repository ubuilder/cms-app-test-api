<script>
  // your script goes here
  import { cms_api } from "$lib/helpers/cms-api";
  import { onMount } from "svelte";

  import {Page, FormSelect, Button, FormTextarea, El, FormField, FormInput, FormSwitch } from "@ulibs/yesvelte";
  import { PUBLIC_API_URL } from "$env/static/public";


  export let data;

  const apiUrl = PUBLIC_API_URL ?? 'https://cms-api.hadiahmadi.dev'
  let loading = false;
  let api;
  
  let token = "";

  onMount(() => {
    window.parent.window.postMessage({
      type: "init",
    }, {
        targetOrigin: '*' // from env
    });

    window.onmessage = (e) => {
      const data = e.data;

      if (data.type === "init") {
        token = data.token;
        if(token) {

        api = cms_api({
          baseUrl: apiUrl + "/api/" + data.siteId,
          token: token,
        });
    }

      }
    };
  });

  let useCustomUrl = false;
  let customUrl = ''

  let body = "{}";

  let result = "";
  let selectedItem;
  async function run() {
    loading = true;

    result = await api[selectedItem](JSON.parse(body));
    loading = false;
  }
</script>

<Page theme={data.theme} dir={data.dir} title="Test API">
  
  {#if api}
    <El row>
      <FormSwitch col="auto" bind:checked={useCustomUrl} label="Custom URL"/>
      {#if !useCustomUrl}
      <FormSelect
        col
        
        bind:value={selectedItem}
        items={Object.keys(api)}
        label="Method"
        let:item
      >
        {item}
      </FormSelect>
    {:else}
      <FormInput col bind:value={customUrl} label="URL" />
      {/if}
      <El col="auto" mt="1">
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
