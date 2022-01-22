<script>
    import Menu from "./Menu.svelte"
    import MenuOption from "./MenuOption.svelte"

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
        console.log("close menu")
        // showMenu = false
    }
</script>


{#if showMenu}
<div class="bg-red-600 flex float-right">menu up showmenu: {showMenu}</div>
    <Menu {...pos} on:click={console.log} on:clickoutside={closeMenu}>
        <MenuOption on:click={console.log} text="Do nothing" />
        <MenuOption on:click={console.log} text="Do nothing, but twice" />

        <MenuOption isDisabled={true} on:click={console.log} text="Whoops, disabled!" />
        <MenuOption on:click={console.log}>
            <span>Look! An icon!</span>
        </MenuOption>
    </Menu>
{/if}
<div class="bg-red-600">menu hidden</div>

<!-- <svelte:body on:contextmenu|preventDefault={onRightClick} /> -->
