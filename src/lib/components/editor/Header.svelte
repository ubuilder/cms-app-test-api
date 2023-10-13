<script>	
	import { Icon, Button } from "yesvelte";
    export let screenSize = undefined

</script>


<div class="header">
    <h6>Ubuilder editor</h6>
    <div style="display:  flex ; justify-content: center;  flex-grow: 2">
        <Button style = ' background-color: inhirit;'>
            <Icon size = 'lg'   name= 'settings'></Icon>
        </Button>
        <Button style = ' background-color: inhirit;'  color = "{screenSize == 'laptop' ? 'primary': undefined}"    on:click={()=>screenSize = 'laptop'}>
            <Icon size = 'lg'   name= 'device-laptop'></Icon>
        </Button>
        <Button color = "{screenSize == 'tablet' ? 'primary': undefined}" on:click={(e)=>screenSize = 'tablet'}>
            <Icon size = 'lg'  name= 'device-tablet'></Icon>
        </Button>
        <Button color = "{screenSize == 'mobile' ? 'primary': undefined}" on:click={(e)=>screenSize = 'mobile'}>
            <Icon size = 'lg'  name= 'device-mobile'></Icon>
        </Button>
    </div>
</div>

<style>
    .header{
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 5px;
        background: linear-gradient(90deg, #959590, #d9d9d9 , #d9d9d9, #959590);
    }
    h6{
        padding: 0;
        margin: 0;
    }
    .center{
        align-self: flex-end;
        padding: 2px;
    }
</style>