<script>
    import { onMount } from 'svelte'
    import ShiftCard from "./ShiftCard.svelte"
    import InteractMenu from "./rota_menu/InteractMenu.svelte"
    import { RotaStore } from "../stores";
    import { VolStore } from "../stores";
    import { MenuInfoStore } from "../stores";
    import { DateStore } from "../stores";
    // import { obj } from "../test_rota.json"
    import { vols_list } from "../test_vols.json"
    // const shifts_list = obj["Shifts"]
    let shifts_list = $RotaStore["Shifts"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    $: display_start = []
    
    let combo_shifts = []
    onMount(async () => {
        let temp_shifts = $RotaStore["Shifts"]
        for (let i=0; i<temp_shifts.length; i++) {
            if (temp_shifts[i].type === "(Duty Room)" && temp_shifts[i+1].type === "(Leader)" && temp_shifts[i+1].time === temp_shifts[i].time && temp_shifts[i+1].date === temp_shifts[i].date) {
                    let new_combo = {...temp_shifts[i], "leader_shift_id": temp_shifts[i+1].shift_id, "leader_vols": temp_shifts[i+1].vols, "leader_vol_shift_id": temp_shifts[i+1].vol_shift_id}
                    combo_shifts.push(new_combo)
                    i++
                }
                else {
                    combo_shifts.push({...temp_shifts[i], "leader_shift_id": null, "leader_vols": null, "leader_vol_shift_id": null})
                }

            
        }
        visible_shifts = findStartDates()

    })


    const findStartDates = (datetime) => {
        let d = !datetime ? new Date() : datetime
        display_start = []
        d =
        d.getDay() === 0
        ? new Date(d.getFullYear(), d.getMonth(), d.getDate() - 6)
        : new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 1) // set date to a monday
        
        for (let i = 0; i < 7; i++) {
            let a = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i)
            let a_str = `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}`
            display_start.push(a_str)
        }
        const displayShifts = viewShifts(d)
        // const newShifts = comboShifts(displayShifts)
        
        return displayShifts
    }

    // const comboShifts = (shifts) => {
    //     let combo = [[], [], [], [], [], [], []]
    //     for (let i = 0; i < shifts.length; i++){
    //         for (let j = 0; j < shifts[i].length; j++){
    //             if (shifts[i][j].type === "(Duty Room)" && shifts[i][j+1].type === "(Leader)" && shifts[i][j+1].time === shifts[i][j].time && shifts[i][j+1].date === shifts[i][j].date) {
    //                 let new_combo = {...shifts[i][j], "leader_shift_id": shifts[i][j+1].shift_id, "leader_vols": shifts[i][j+1].vols, "leader_vol_shift_id": shifts[i][j+1].vol_shift_id}
    //                 combo[i].push(new_combo)
    //                 j++
    //             }
    //             else {
    //                 combo[i].push({...shifts[i][j], "leader_shift_id": null, "leader_vols": null, "leader_vol_shift_id": null})
    //             }
    //         }
    //     }
    //     return combo
    // }

    
    //
    const viewShifts = (start_date = null,) => {
        let displayShifts = [[], [], [], [], [], [], []]
        let d = new Date()
        if (start_date) {
            d = start_date
        }

        const target_start = d
        const target_end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)
        for (const shift of combo_shifts) {
            let shift_day = shift.date.slice(0, 2)
            let shift_month = shift.date.slice(3, 6)
            let shift_year = `20${shift.date.slice(7, 9)}`
            for (let i = 0; i < 12; i++) {
                if (shift_month === months[i]) {
                    shift_month = `${i}`
                }
            }

            let shift_date = new Date(Number(shift_year), Number(shift_month), Number(shift_day))
            if (shift_date >= target_start && shift_date < target_end) {
                console.log("push")
                let index = shift_date.getDay() === 0 ? 6 : shift_date.getDay() - 1
                displayShifts[index].push(shift)
            }
        }
        return displayShifts
    }

    const currDt = () => {
        let curr_visible = display_start[0].split(" ")
        for (let i = 0; i < 12; i++) {
            if (curr_visible[1] === months[i]) {
                curr_visible[1] = `${i}`
            }
        }
        let dt = new Date(Number(curr_visible[2]), Number(curr_visible[1]), Number(curr_visible[0]))
        return dt
    }

    const rotaToday = () => {
        let dt = new Date()
        $DateStore = dt
        visible_shifts = findStartDates(dt)
    }

    const rotaNext = () => {
        // let dt = currDt()
        let dt = $DateStore
        dt.setDate(dt.getDate() + 7)
        $DateStore = dt
        visible_shifts = findStartDates(dt)
    }

    const rotaPrevious = () => {
        // let dt = currDt()
        let dt = $DateStore
        dt.setDate(dt.getDate() - 7)
        $DateStore = dt
        visible_shifts = findStartDates(dt)
    }

    $: visible_shifts = findStartDates()
    const button_css =
        "p-6 rounded-lg border-gray-600 text-gray-700 font-semibold text-md hover:text-gray-900 hover:bg-slate-300"

    $: showMenu = false
    let pos = {x:0, y:0}
    let handleSign = (e) => {
        if ($VolStore.length < 1) {
            //update Volstore
            $VolStore = vols_list["vols"]
        }
        $MenuInfoStore = e.detail
        console.log(e.detail, $MenuInfoStore)
        pos = {x:e.detail.x, y:e.detail.y}
        showMenu = true
    }
    const handleUpdate = () => {
        console.log("Update")
        visible_shifts = findStartDates($DateStore)

    }

</script>

<InteractMenu bind:showMenu={showMenu} {pos} on:rota_updated={handleUpdate}/>
<div class="bg-blue-200">
    <div class="flex py-4 justify-center items-center">
        <button on:click={rotaPrevious} class="${button_css} px-4 py-2">Previous</button><button
            on:click={rotaToday}
            class="${button_css} px-4 py-2">Today</button
        ><button on:click={rotaNext} class="${button_css} px-4 py-2">Next</button>
    </div>

    <div class="flex justify-center">
        {#each visible_shifts as shifts, j}
            <div class="flex-col py-2 px-6">
                <div class="font-semibold">
                    <div class="flex justify-center items-center">{days[j + 1]}</div>
                    <div class="flex justify-center items-center text-sm">{display_start[j]}</div>
                </div>
                {#each shifts as shift}
                    <ShiftCard {shift} on:sign={handleSign}/>
                    
                {/each}
            </div>
        {/each}
    </div>
</div>
