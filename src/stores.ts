import { writable } from "svelte/store";

export const LoginStore = writable({
    username: 'test'
})

export const ShowLoginStore = writable({
    showLogin: 0
})

export const VolStore = writable([])
export const MenuInfoStore = writable({
    curr_vol: 'none'
})