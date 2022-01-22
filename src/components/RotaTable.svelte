<script>
    import ShiftCard from "./ShiftCard.svelte"
    import InteractMenu from "./rota_menu/InteractMenu.svelte"
    import { obj } from "../test_rota.json"
    const shifts_list = obj["Shifts"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    $: display_start = []
    
    
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
        const newShifts = comboShifts(displayShifts)
        
        return newShifts
    }

    const comboShifts = (shifts) => {
        let combo = [[], [], [], [], [], [], []]
        for (let i = 0; i < shifts.length; i++){
            for (let j = 0; j < shifts[i].length; j++){
                if (shifts[i][j].type === "(Duty Room)" && shifts[i][j+1].type === "(Leader)" && shifts[i][j+1].time === shifts[i][j].time && shifts[i][j+1].date === shifts[i][j].date) {
                    let new_combo = {...shifts[i][j], "leader_shift_id": shifts[i][j+1].shift_id, "leader_vols": shifts[i][j+1].vols, "leader_vol_shift_id": shifts[i][j+1].vol_shift_id}
                    combo[i].push(new_combo)
                    j++
                }
                else {
                    combo[i].push({...shifts[i][j], "leader_shift_id": null, "leader_vols": null, "leader_vol_shift_id": null})
                }
            }
        }
        return combo
    }
       
    const viewShifts = (start_date = null) => {
        let displayShifts = [[], [], [], [], [], [], []]
        let d = new Date()
        if (start_date) {
            d = start_date
        }

        const target_start = d
        const target_end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)
        let j = 0
        for (const shift of shifts_list) {
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
        visible_shifts = findStartDates(dt)
    }

    const rotaNext = () => {
        let dt = currDt()
        dt.setDate(dt.getDate() + 7)
        visible_shifts = findStartDates(dt)
    }

    const rotaPrevious = () => {
        let dt = currDt()
        dt.setDate(dt.getDate() - 7)
        visible_shifts = findStartDates(dt)
    }

    $: visible_shifts = findStartDates()
    const button_css =
        "p-6 rounded-lg border-gray-600 text-gray-700 font-semibold text-md hover:text-gray-900 hover:bg-slate-300"

    import Menu from "./rota_menu/Menu.svelte"
    let showMenu = false
    let pos = {x:0, y:0}
    console.log(`showmenu: ${showMenu}`)
    const handleSign = (e) => {
        console.log(e)
        console.log(e.explicitOriginalTarget.offsetLeft,e.explicitOriginalTarget.offsetTop)
        pos = {x:e.explicitOriginalTarget.offsetLeft, y:e.explicitOriginalTarget.offsetTop}
        showMenu = true
        console.log(showMenu)
    }

</script>

<InteractMenu {showMenu} {pos}/>
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
