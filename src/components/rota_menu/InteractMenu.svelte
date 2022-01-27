<script lang="ts">
    import Menu from "./Menu.svelte"
    import MenuOption from "./MenuOption.svelte"
    import { RotaStore } from "../../stores"
    import { VolStore } from "../../stores"
    import { MenuInfoStore } from "../../stores"
    import { vols_list } from "../../test_vols.json"
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    export let pos = { x: 0, y: 0 }
    export let showMenu
    let selected

    export async function onRightClick(e) {
        if (showMenu) {
            showMenu = false
            await new Promise((res) => setTimeout(res, 100))
        }

        pos = { x: e.clientX, y: e.clientY }
        showMenu = true
    }

    // close and reset expand toggle
    function closeMenu() {
        showMenu = false
        showExpand = false
        selected = "unsign"
    }

    // on popup menu submit, call requests eventually
    const handleSubmit = () => {
        console.log(`selected vol is ${selected}`)
        let id = volIdFromName(selected)
        if ($MenuInfoStore.index === undefined) $MenuInfoStore.index = 0
        if (selected === "remove") {
            console.log("never runs, error if here")
            tempUnSign($MenuInfoStore.curr_vol, $MenuInfoStore.id, $MenuInfoStore.index)
            console.log(`Unsigning ${$MenuInfoStore.curr_vol}`)
        } else if ($MenuInfoStore.curr_vol) {
            console.log(`Replacing... index: ${$MenuInfoStore.index}`)
            // unSign($MenuInfoStore.curr_vsid)
            tempUnSign($MenuInfoStore.curr_vol, $MenuInfoStore.id, $MenuInfoStore.index)
        }
        if (selected !== "unsign") {
            // makeSign($MenuInfoStore.id, id)
            const ind = tempSign(selected, $MenuInfoStore.id, $MenuInfoStore.index)
            console.log(`Sign up complete: ${$RotaStore["Shifts"].vols}`)
        }
        dispatch("rota_updated")
        closeMenu()
    }

    // TODO list should be created along with vol list in RotaTable
    const volIdFromName = (name) => {
        return name
    }

    const unSign = (vsid) => {
        console.log(`unsign vsid ${vsid}`)
        return
    }

    // only changes store
    const tempUnSign = (name: string, id: string, index: number) => {
        console.log("unsign from id: ", id)
        let shifts = $RotaStore["Shifts"]
        for (let i = 0; i < shifts.length; i++) {
            console.log(shifts[i].vols[index] === name)
            if (shifts[i].shift_id === id) {
                $RotaStore["Shifts"][i].vols[index] = "[sign up]"
                return i
            }
        }
    }

    // only changes store
    const tempSign = (name: string, id: string, index: number = 0) => {
        let shifts = $RotaStore["Shifts"]
        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].shift_id === id) {
                $RotaStore["Shifts"][i].vols[index] = name
                if ($RotaStore["Shifts"][i].vols.length === 1 && name !== "[closed]") {
                    $RotaStore["Shifts"][i].vols.push("[sign up]")
                }
                return i
            }
        }
    }

    const makeSign = (shift_id, vol_id) => {
        console.log(`signup vol_id ${vol_id} for shift_id ${shift_id}`)
        return
    }

    // only changes store
    const handleCloseShift = () => {
        let shifts = $RotaStore["Shifts"]
        console.log(`Close shift id: ${$MenuInfoStore.id}`)
        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].shift_id === $MenuInfoStore.id) {
                console.log("shift to close found")
                //need to remove vol & close shift
                shifts[i].vols = ["[closed]"]
                if (shifts[i].leader_shift_id) {
                    shifts[i].leader_vols = ["[closed]"]
                    console.log("Attached leadershift closed")
                }
                console.log("new shift:")
                console.log(shifts[i])
                break
            }
        }
        $RotaStore["Shifts"] = shifts
        closeMenu()
        dispatch("rota_updated")
        console.log("dispatched")
    }

    // only changes store
    // will delete duty + leader if the shifts are combo'd
    const handleDeleteShift = () => {
        let shifts = $RotaStore["Shifts"]
        for (let i = 0; i < shifts.length; i++) {
            if (shifts[i].shift_id === $MenuInfoStore.id) {
                // if ($MenuInfoStore.combo !== 0) { // removed since combo shifts are stored as one object now
                //     console.log(`delete 2 shifts: ${$MenuInfoStore.id} and ${$MenuInfoStore.combo}`)
                //     $RotaStore["Shifts"].splice(i, 2)
                // } else {}
                    console.log(`delete 1 shift: ${$MenuInfoStore.id}`)
                    $RotaStore["Shifts"].splice(i, 1)
                
                break
            }
        }
        closeMenu()
        dispatch("rota_updated")
    }

    let showExpand = false

    const toggleExpand = () => {
        showExpand = !showExpand
    }

    // remove current vol from drop down menu replacement option (no replacing self with self)
    $: real_list = $VolStore.filter((vol) => vol != $MenuInfoStore.curr_vol)
</script>

{#if showMenu}
    <Menu {...pos} on:click={console.log} on:clickoutside={closeMenu}>
        <MenuOption on:click={console.log} text="Sign up:" />
        {#if real_list.length >= 1}
            <form on:submit|preventDefault={handleSubmit}>
                <select bind:value={selected} class={`${selected === "unsign" ? "bg-red-300" : "bg-none"}`}>
                    <option class="bg-red-300" value="unsign">None</option>
                    {#each real_list as vol}
                        <option class="bg-blue-200" value={vol}>{vol}</option>
                    {/each}
                </select>
                <button
                    type="submit"
                    class="rounded-md bg-green-300 hover:bg-green-600 flex w-full justify-center py-1 my-1"
                >
                    Submit
                </button>
            </form>
        {/if}
        <!-- <MenuOption on:click={console.log} dropdown={real_list} /> -->
        {#if !showExpand}
            <div on:click|preventDefault={toggleExpand}>Expand ⇓</div>
        {:else}
            <div on:click|preventDefault={toggleExpand} class="">Hide ⇑</div>
            <div
                on:click={handleCloseShift}
                class="mt-2 px-2 py-1 flex justify-center rounded-md bg-gray-400 hover:bg-gray-600 cursor-pointer"
            >
                Close Shift
            </div>
            <div
                on:click={handleDeleteShift}
                class="mt-2 px-2 py-1 flex justify-center rounded-md bg-red-400 hover:bg-red-600 cursor-pointer"
            >
                Delete Shift
            </div>
        {/if}
    </Menu>
{/if}

<!-- <svelte:body on:contextmenu|preventDefault={onRightClick} /> -->
