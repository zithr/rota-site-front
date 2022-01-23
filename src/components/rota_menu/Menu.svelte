<script>
    import { onMount, setContext, createEventDispatcher } from "svelte"
    import { fade } from "svelte/transition"
    // import { key } from './menu.js';

    export let x
    export let y

    // whenever x and y is changed, restrict box to be within bounds
    $: () => {
        if (!menuEl) return

        const rect = menuEl.getBoundingClientRect()
        x = Math.min(window.innerWidth - rect.width, x)
        if (y > window.innerHeight - rect.height) y -= rect.height
    } //(x, y);

    const dispatch = createEventDispatcher()

    // setContext(key, {
    // 	dispatchClick: () => dispatch('click')
    // });

    let menuEl
    function onPageClick(e) {
        if (e.target === menuEl || menuEl.contains(e.target) ||e.defaultPrevented === true) return
        dispatch("clickoutside")
    }
</script>

<svelte:body on:click={onPageClick} />

<div transition:fade={{ duration: 100 }} bind:this={menuEl} style="top: {y}px; left: {x}px;" class="p-1 bg-blue-300 rounded-md absolute grid border border-gray-800 shadow">
    <slot />
</div>
