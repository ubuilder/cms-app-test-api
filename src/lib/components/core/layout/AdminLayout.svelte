<script lang="ts">
	import { browser } from '$app/environment'
	import Layout from '@components/core/Layout.svelte'
	import { user } from '@stores'
	import { onMount } from 'svelte'
	import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, Icon, SidebarItem } from 'yesvelte'

	let dark = false

	onMount(() => {
		dark = localStorage.getItem('THEME_DARK') === 'dark'

	})

	$: if (browser) {
		document.body.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
		document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
	}

	function setTheme(newTheme: 'light' | 'dark') {
		localStorage.setItem('THEME_DARK', newTheme)
		dark = newTheme === 'dark'
	}
</script>

<Layout>
	<svelte:fragment slot="header-end">
		<Button shape="pill" on:click={() => setTheme(dark ? 'light' : 'dark')}>
			<Icon name={dark ? 'sun' : 'moon'} />
		</Button>
		<Dropdown arrow={false} placement="bottom-end">
			{#if $user.authenticated}
				<Avatar slot="target" shape="circle">
					{$user.profile?.firstName?.[0]}{$user.profile?.lastName ? $user.profile.lastName[0] : ''}
				</Avatar>
			{:else}
				<Button href="/account/login">Login</Button>
			{/if}
			<DropdownMenu>
				<DropdownItem href="/account/profile">Profile</DropdownItem>
				<DropdownItem on:click={() => user.logout()}>Logout</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</svelte:fragment>
	<svelte:fragment slot="logo">Logo</svelte:fragment>
	<svelte:fragment slot="sidebar-items">
		<SidebarItem icon="dashboard" title="Dashboard" />
		<SidebarItem icon="users" title="User Management">
			<SidebarItem href="/admin/users" icon="users" title="Users" />
			<SidebarItem href="/admin/roles" icon="key" title="Roles" />
		</SidebarItem>
	</svelte:fragment>

	<slot />
</Layout>
