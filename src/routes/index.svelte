<script lang="ts">
    import "../input.css" 
    import { ShowLoginStore } from "../stores"
    import { LoginStore } from "../stores"
    import { fade, scale } from "svelte/transition"
    import NavBar from "../components/NavBar.svelte"
    import Modal from "../components/Modal.svelte"
    import Login from "../components/Login.svelte"
    import RotaTable from "../components/RotaTable.svelte"
</script>

<main class="min-h-screen bg-blue-200">
    <NavBar />
    {#if $ShowLoginStore["showLogin"]}
        <Modal on:close={() => ($ShowLoginStore["showLogin"] = 0)}>
            <Login on:close={() => ($ShowLoginStore["showLogin"] = 0)} />
        </Modal>
    {/if}
    {#if $LoginStore["username"]}
        <RotaTable />
    {/if}
    <!-- <h1 class="text-2xl font-bold text-center text-gray-800">New Site</h1> -->
</main>
