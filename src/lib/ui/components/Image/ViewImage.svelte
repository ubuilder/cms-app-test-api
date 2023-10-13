<script lang="ts">
  import { El } from "yesvelte";

  export let props: any = {};
</script>

<El>
  <img src="/files/{props.image_id}" alt={props.alt} />
</El>
