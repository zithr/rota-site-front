<script>
    import { onMount, getContext } from "svelte"
    // import { key } from './menu.js';

    export let isDisabled = false
    export let text = ""
    export let dropdown = []

    import { createEventDispatcher } from "svelte"
    const dispatch = createEventDispatcher()

    // const { dispatchClick } = getContext(key);

    const handleClick = (e) => {
        if (isDisabled) return

        dispatch("click")
        // dispatchClick();
    }
</script>

<div
    class={`px-1 py-1 items-center`}
    on:click={handleClick}
>
        {#if dropdown.length >= 1}
            <form action="">
                <select name="" id="">
                    {#each dropdown as vol}
                        <option value={vol}>{vol}</option>
                    {/each}
                </select>
                <div class="rounded-md bg-green-300 flex justify-center py-1 my-1"> Submit </div>
            </form>
        {/if}
    {#if text}
        {text}
    {:else}
        <slot />
    {/if}
</div>
