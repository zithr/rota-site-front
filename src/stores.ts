import { writable } from "svelte/store";

export const LoginStore = writable({
    username: ''
})

export const ShowLoginStore = writable({
    showLogin: 1
})

export const VolStore = writable([])
export const MenuInfoStore = writable({
    curr_vol: 'none'
})