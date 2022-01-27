<script type="ts">
    type shiftytype = {
        date: string
        shift_id: string
        time: string
        type: string
        vol_shift_id: string[]
        vols: string[]
        leader_shift_id: string
        leader_vol_shift_id: string
        leader_vols: string
    }

    export let shift: shiftytype
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    // handle duty room sign ups/edits [handles any sign ups in non-combo shifts]
    // index can be 0 or 1, depending on vol position in shift (top/bottom)
    // if shift is a combo shift (duty + leader), it will have attribute leader_shift_id
    // dispatch id if shift is empty, or id+current_vol if shift is occupied
    // dispatch mouse pos for menu popup location
    const handleClick = (event, i) => {
        // console.log(event.clientX, event.clientY)
        let pos = { x: event.clientX, y: event.clientY }
        let target_name = event.target.textContent.trim()
        if (target_name == "[sign up]") {
            console.log(`Sign up to empty slot in shift ${shift.shift_id}`)
            dispatch("sign", { curr_vol:null, id: shift.shift_id, index: i, combo:shift.leader_shift_id, ...pos }) // dispatch current empty shift id to be filled, open menu at mouse location
        } else {
            console.log(`${target_name} vsid: ${shift.vol_shift_id[i]}`)
            dispatch("sign", { curr_vol:target_name, curr_vsid:shift.vol_shift_id[i], id: shift.shift_id, index: i, combo:shift.leader_shift_id, ...pos }) // dispatch current vol, vsid, shift_id to be replaced/removed from shift
        }
    }

    // handle leader sign ups/edits
    // dispatches leader shift in comboshifts only, as different id attribute for leadershift in a comboshift
    // dispatch id if shift is empty, or id+current_vol if shift is occupied
    // dispatch mouse pos for menu popup location
    const handleClickLeader = (event) => {
        let target_name = event.target.textContent.trim()
        let pos = { x: event.clientX, y: event.clientY }
        if (target_name == "[sign up]") {
            console.log(`handleSignUp for Leader in shift ${shift.leader_shift_id}`)
            dispatch("sign", { curr_vol:null, id: shift.leader_shift_id, ...pos })
        } else {
            console.log(`${target_name} leader_vsid: ${shift.leader_vol_shift_id}`)
            dispatch("sign", { curr_vol:target_name, curr_vsid:shift.leader_vol_shift_id, id: shift.leader_shift_id, ...pos })  // same as above but for leader shifts
        }
    }


    // background colours for shift cards, using colour_code
    const colour_code = { "(Duty Room)": "green-300", "(Leader)": "orange-300", "[closed]": "gray-300" }
    const get_bg_colour = (shift_type) => {
        if (shift.vols.includes("[closed]")) {
            let colour_string = "bg-gray-300"
            return colour_string
        }
        if (shift_type in colour_code) {
            let colour_string = "bg-" + colour_code[shift_type]
            return colour_string
        } else return "bg-purple-300"
    }
    $: dutyColour = shift.vols.includes("[closed]") ? "bg-gray-300" : get_bg_colour("(Duty Room)")
    $: leaderColour = shift.vols.includes("[closed]") ? "bg-gray-300": get_bg_colour("(Leader)")
    $: unsortedColour = shift.vols.includes("[closed]") ? "bg-gray-300": get_bg_colour(shift.type)
</script>

<div class="bg-orange-300"></div>
{#if shift.type.startsWith("(WEEK")}
    <div class="pb-1 px-2 rounded-lg border-2 border-gray-700 flex justify-center items-center bg-red-600 text-white">
        {shift.type}
    </div>
{:else}
    <div class="w-48 rounded-lg border-2 border-gray-700 mt-1 hover:border-blue-500">
        {#if shift.leader_vols}
            <div class={`${dutyColour} py-1 px-2 rounded-md`}>
                <div class="flex justify-center items-center font-semibold text-sm">{shift.time}</div>

                <div class="flex justify-center items-center text-xs">Duty:</div>
                {#each shift.vols as vol, i}
                    <div
                        on:click|preventDefault={(event) => handleClick(event, i)}
                        class="flex justify-center items-center hover:text-blue-600 hover:font-bold"
                    >
                        {vol}
                    </div>
                {/each}
            </div>
            <div class={`${leaderColour} rounded-b-md`}>
                <div class="px-1 flex justify-center items-center text-xs">Leader:</div>
                <div
                    on:click|preventDefault={(event) => handleClickLeader(event)}
                    class="pb-1 px-2 flex justify-center items-center hover:text-blue-600 hover:font-bold"
                >
                    {shift.leader_vols[0]}
                </div>
            </div>
        {:else}
            <div class={`${unsortedColour} rounded-lg px-1`}>
                <div class="flex justify-center items-center font-semibold">{shift.time}</div>
                <div class="flex justify-center items-center text-xs">{shift.type}</div>
                {#each shift.vols as vol, i}
                    <div on:click={(event) => handleClick(event, i)} class="flex justify-center items-center font-black">
                        {vol}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/if}
