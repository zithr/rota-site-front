<script>
    import { LoginStore } from "../stores"
    import { createEventDispatcher } from "svelte"
    import { SyncLoader } from "svelte-loading-spinners"

    const dispatch = createEventDispatcher()
    const close = () => dispatch("close")
    let logLoad = false
    let loginError = 0
    let username = $LoginStore.username ? $LoginStore.username : ""
    let password = ""

    const setEmailInput = (e) => {}
    const loginSubmit = async () => {
        logLoad = true
        document.cookie = "account_credentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (username === "wrong") {
            loginError = -1
            logLoad = false
            return
        }
        loginError = 0
        if (username === "") {
            // await new Promise(r => setTimeout(r, 2000))
            username = "test"
            $LoginStore["username"] = username
            console.log("test login")
            close()
            logLoad = false
            return
        }
        let data = { username: username, password: password }
        let res = await fetch("https://3.90.102.33/api/login", {
            method: "POST",
            mode: "cors",
            // Allows cookies to be set
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }) //.then(x => x.json())
        $LoginStore["username"] = username
        logLoad = false
        console.log(res.json())
        close()
    }
</script>

<div class="flex">
    <div class="bg-green-200 w-96 rounded-xl shadow-lg">
        <div class="container w-10/12 m-auto">
            <div class="py-4 text-green-800 font-semibold text-xl">3Rings Log in</div>
            <input
                class={`mt-1 p-1 block w-full h-12 rounded-md focus:outline-none ${
                    loginError === -1
                        ? "border-2 border-red-500 bg-red-100"
                        : "border border-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                }`}
                type="text"
                placeholder="Username"
                bind:value={username}
            />
            <input
                class={`mt-3 p-1 block w-full h-12 rounded-md focus:outline-none ${
                    loginError === -1
                        ? "border-2 border-red-500 bg-red-100"
                        : "border border-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                }`}
                type="password"
                placeholder="Password"
                bind:value={password}
            />
            <!-- svelte-ignore a11y-autofocus -->
            {#if !logLoad}
                <button
                    class="my-4 w-20 h-12 bg-green-400 rounded-lg shadow-md text-white font-semibold hover:bg-green-500"
                    autofocus
                    on:click={loginSubmit}
                >
                    Login
                </button>
            {:else}
                <button
                    class="my-4 w-20 h-12 bg-gray-400 rounded-lg shadow-md"
                    autofocus
                    disabled={true}
                    on:click={loginSubmit}
                >
                    <div class="flex items-center justify-center">
                        <SyncLoader size="20" color="green" unit="px" />
                    </div>
                </button>
            {/if}
        </div>
    </div>
</div>
