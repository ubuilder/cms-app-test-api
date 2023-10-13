<script lang="ts">
    import {
      El,
      Icon,
      NavbarItem,
      Offcanvas,
      OffcanvasBody,
      Sidebar,
      SidebarItem,
    } from "yesvelte";
  
    export let props: any = {};
    let show: boolean = false;
  </script>
  
    <El dMd="none">
      <Icon name="user" on:click={() => show = true}/>
      <Offcanvas placement="end" autoClose backdrop bind:show>
        <OffcanvasBody>
          <Sidebar w="100">
            {#each props.links as link}
              <SidebarItem title={link.title} icon={link.icon} href={link.link} />
            {/each}
          </Sidebar>
        </OffcanvasBody>
      </Offcanvas>
    </El>
    <El d="none" dMd="block">
        {#each props.links as link}
          <NavbarItem title={link.title} icon={link.icon} href={link.link} />
        {/each}
    </El>
  
  <style>
      :global(.y-navbar-wrapper) {
          background-color: transparent;
  
      }
      </style>