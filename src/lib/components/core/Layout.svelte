<script>
  import {
    Avatar,
    El,
    Icon,
    Offcanvas,
    OffcanvasHeader,
    Sidebar,
    SidebarItem,
  } from "yesvelte";
  import ModalProvider from "./modal/ModalProvider.svelte";

  export let header = true;
  export let sidebar = true;
  let offcanvasShow = false;
</script>

{#if header}
  <El
    d="flex"
    px="3"
    py="2"
    borderBottom
    alignItems="center"
    justifyContent="between"
    class="layout-navbar"
  >
    <El dSm="none" me="3" style="margin-bottom: -0.4rem;">
      <Icon
        size="xl"
        name="menu-2"
        on:click={() => (offcanvasShow = !offcanvasShow)}
      />
    </El>
    <El class="layout-brand">
      <slot name="logo">
        <h1 style="margin-bottom: 0 !important;">UBuilder</h1>
      </slot>
    </El>
    <El d="flex" alignItems="center" gap="2" ms="auto">
      <slot name="header-end">
        <Avatar shape="circle">
          <img src="/favicon.png" alt="profile" />
        </Avatar>
      </slot>
    </El>
  </El>
{/if}

{#if sidebar}
  <Sidebar
    borderEnd="1"
    h="100"
    d="none"
    dSm="block"
    class="layout-sidebar"
    position="fixed"
    style="margin-top: 57px; width: 15rem;"
  >
    <slot name="sidebar-items">
      <SidebarItem title="User Management" icon="user">
        <SidebarItem icon="users" title="Users" />
        <SidebarItem icon="key" title="Roles" />
      </SidebarItem>
    </slot>
  </Sidebar>
  <Offcanvas
    class="layout-offcanvas"
    style="width: 15rem;"
    backdrop
    autoClose
    bind:show={offcanvasShow}
  >
    <OffcanvasHeader m="0" ps="3" py="3" class="layout-brand">
      <slot name="logo">
        <h1 style="margin-bottom: 0 !important;">UBuilder</h1>
      </slot>
    </OffcanvasHeader>
    <Sidebar class="layout-sidebar" position="static" h="100">
      <slot name="sidebar-items">
        <SidebarItem title="User Management" icon="user">
          <SidebarItem icon="users" title="Users" />
          <SidebarItem icon="key" title="Roles" />
        </SidebarItem>
      </slot>
    </Sidebar>
  </Offcanvas>
  <El class="layout-content">
	<slot />
  </El>
  {:else}
  <El style="overflow-y: hidden">
	<slot/>
  </El>
  {/if}

<ModalProvider />

<style>
  :global(.layout-content) {
    margin-left: 0;
    overflow: auto;
    height: calc(100% - 57px);
  }

  @media (min-width: 576px) {
    :global(.layout-content) {
      margin-left: 240px;
    }
  }
</style>
