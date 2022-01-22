<script>
    import NavBarButton from "./NavBarButton.svelte"
    import { LoginStore } from "../stores"
</script>

<div class="h-11 sticky top-0 py-1 px-3 bg-gray-50 shadow-md">
    <NavBarButton label="Home" link="/home" />
    <NavBarButton label="Rota" link="/rota" />
    <NavBarButton label="Else" link="/else" />
    {#if !$LoginStore["username"]}
        <NavBarButton label="Login" link="/login" align="right" />
    {:else}
    <NavBarButton label="Logout" link="/logout" align="right" />
        <span class="p-2 border-gray-600 text-gray-700 font-semibold text-md float-right">
            {$LoginStore["username"]}</span
        >
    {/if}
</div>
