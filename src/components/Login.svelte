<script>
    import { LoginStore } from "../stores"
    let loginError = 0

    const setEmailInput = (e) => {}
    const loginSubmit = () => {
        $LoginStore["username"] = "test"
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
                onChange={(e) => setEmailInput(e.target)}
            />
            <input
                class={`mt-3 p-1 block w-full h-12 rounded-md focus:outline-none ${
                    loginError === -1
                        ? "border-2 border-red-500 bg-red-100"
                        : "border border-gray-500 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                }`}
                type="password"
                placeholder="Password"
                onChange={(e) => setEmailInput(e.target)}
            />
            <!-- svelte-ignore a11y-autofocus -->
            <button
                class="my-4 w-20 h-12 bg-green-400 rounded-lg shadow-md text-white font-semibold hover:bg-green-500"
                autofocus
                onClick={loginSubmit}
            >
                Login
            </button>
        </div>
    </div>
</div>
