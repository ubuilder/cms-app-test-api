<script lang="ts">
  import { El } from "yesvelte";
  export let props: any = {}
</script>

<El
  bgColor={props.bgcolor}
  bgOpacity="50"
  borderTop
  p="4"
  d="flex"
  alignItems="center"
  justifyContent={props.position ?? "center"}
>
  {props.text}
</El>
