import { writable } from "svelte/store";

// type Shift = {
//     date: null,
//     dt_obj: null,
//     shift_id: null,
//     time: null,
//     type: null,
//     vol_shift_id: [],
//     vols: [],
//     leader_shift_id: null, 
//     leader_vols: null, 
//     leader_vol_shift_id: null

// }

export const RotaStore = writable({})

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