import { writable } from "svelte/store";

export let selectedComponents = writable<any[]>([])