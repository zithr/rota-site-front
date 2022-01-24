import { writable } from "svelte/store";
import { obj } from "./test_rota.json"

export const RotaStore = writable(obj)

export const LoginStore = writable({
    username: ''
})

export const ShowLoginStore = writable({
    showLogin: 1
})

export const VolStore = writable([])
export const MenuInfoStore = writable({
    curr_vol: null,
    curr_vsid: null,
    id: null,
    index: 0,
    combo: 0,
    x: null,
    y: null
})

export const DateStore = writable(new Date())