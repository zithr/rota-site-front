<script lang="ts">
    import { ShowLoginStore } from "../stores"
    import { LoginStore } from "../stores"
    import { fade, scale } from "svelte/transition"
    import NavBar from "../components/NavBar.svelte"
    import Modal from "../components/Modal.svelte"
    import Login from "../components/Login.svelte"
    import RotaTable from "../components/RotaTable.svelte"
</script>

<main class="">
    <NavBar />
    {#if $ShowLoginStore["showLogin"]}
        <Modal on:close={() => ($ShowLoginStore["showLogin"] = 0)}>
            <Login />
        </Modal>
    {/if}
    {#if $LoginStore["username"]}
        <RotaTable />
    {/if}
    <!-- <h1 class="text-2xl font-bold text-center text-gray-800">New Site</h1> -->
</main>
