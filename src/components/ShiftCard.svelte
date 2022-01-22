<script>
    export let shift
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    const colour_code = { "(Duty Room)": "green-300", "(Leader)": "orange-300", "[closed]": "gray-300" }
    const handleClick = (event, i) => {
        let target_name = event.target.textContent.trim()
        if (target_name == "[sign up]") {
            dispatch("sign", shift.shift_id)
            handleSignUp()
        } else {
            console.log(`${target_name} vsid: ${shift.vol_shift_id[i]}`)
        }
    }

    const handleSignUp = (leader = false) => {
        if (leader) {
            console.log(`Sign up a leader for shift ${shift.leader_shift_id}`)
        } else {
            console.log(`Sign up a vol for shift ${shift.shift_id}`)
        }
    }

    const handleClickLeader = (event) => {
        let target_name = event.target.textContent
        console.log(target_name.length)
        if (target_name == "[sign up]") {
            handleSignUp(true)
            console.log(`handleSignUp for Leader in shift ${shift.leader_shift_id}`)
        } else {
            console.log(`${target_name} leader_vsid: ${shift.leader_vol_shift_id}`)
        }
    }

    $: get_bg_colour = (shift_type) => {
        if (shift.vols.includes("[closed]")) {
            return "bg-gray-300"
        }
        if (shift_type in colour_code) {
            return "bg-" + colour_code[shift_type]
        } else return "bg-purple-300"
    }
</script>

{#if shift.type.startsWith("(WEEK")}
    <div class="pb-1 px-2 rounded-lg border-2 border-gray-700 flex justify-center items-center bg-red-600 text-white">
        {shift.type}
    </div>
{:else}
    <div class="w-48 rounded-lg border-2 border-gray-700 mt-1 hover:border-blue-500">
        {#if shift.leader_vols}
            <div class="{get_bg_colour('(Duty Room)')} py-1 px-2 rounded-md">
                <div class="flex justify-center items-center font-semibold text-sm">{shift.time}</div>

                <div class="flex justify-center items-center text-xs">Duty:</div>
                {#each shift.vols as vol, i}
                    <div
                        on:click={(event) => handleClick(event, i)}
                        class="flex justify-center items-center hover:text-blue-600 hover:font-bold"
                    >
                        {vol}
                    </div>
                {/each}
            </div>
            <div class="{get_bg_colour('(Leader)')} rounded-b-md">
                <div class="px-1 flex justify-center items-center text-xs">Leader:</div>
                <div
                    on:click={(event) => handleClickLeader(event)}
                    class="pb-1 px-2 flex justify-center items-center hover:text-blue-600 hover:font-bold"
                >
                    {shift.leader_vols[0]}
                </div>
            </div>
        {:else}
            <div class="{get_bg_colour(shift.type)} rounded-lg px-1">
                <div class="flex justify-center items-center font-semibold">{shift.time}</div>
                <div class="flex justify-center items-center text-xs">{shift.type}</div>
                {#each shift.vols as vol, i}
                    <div on:click={(event) => handleClick(event, i)} class="flex justify-center items-center">
                        {vol}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/if}
