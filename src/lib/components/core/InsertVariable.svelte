<script lang='ts'>
  import { FormSelect } from "yesvelte";
  import type {FormInput} from "yesvelte";

  export let target:  FormInput
  export let items : string[] | any[]  = [
    "{{title}}", "{{description}}", "{{something_else}}", "{{itme_next}}"
  ]
  let value = "" 

  $:onselect(value)
  function onselect(value){
    target.value = target.value + value

  }
</script>


<FormSelect {items}  bind:value  label = "Insert Variable"/>