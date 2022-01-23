<script>
    import Menu from "./Menu.svelte"
    import MenuOption from "./MenuOption.svelte"
    import { VolStore } from "../../stores"
    import { MenuInfoStore } from "../../stores"
    import { vols_list } from "../../test_vols.json"
    export let pos = { x: 0, y: 0 }
    export let showMenu

    export async function onRightClick(e) {
        if (showMenu) {
            showMenu = false
            await new Promise((res) => setTimeout(res, 100))
        }

        pos = { x: e.clientX, y: e.clientY }
        showMenu = true
    }

    function closeMenu() {
        showMenu = false
    }

    $: real_list = $VolStore.filter(vol => vol != $MenuInfoStore.curr_vol)
    
</script>

{#if showMenu}
    <Menu {...pos} on:click={console.log} on:clickoutside={closeMenu}>
        <MenuOption on:click={console.log} text="Sign up:" />
        <MenuOption on:click={console.log} dropdown={real_list} />
        <div class="px-2 py-1 flex justify-center rounded-md bg-red-400">Close Shift</div>
        
    </Menu>
{/if}


<!-- <svelte:body on:contextmenu|preventDefault={onRightClick} /> -->
