<script>
    import { ShowLoginStore } from "../stores"
    import { LoginStore } from "../stores"
    export let label
    export let link
    export let align = "left"

    const click = () => {
        console.log(`push ${link}`)
        switch (label) {
            case "Login":
                ShowLoginStore.update((currentStore) => {
                    currentStore.showLogin = 1
                    return currentStore
                })
                break
            case "Rota":
                if (!$LoginStore["username"]) {
                    $ShowLoginStore["showLogin"] = 1
                }
            case "Logout":
                $LoginStore["username"] = ""
        }
    }
</script>

<button
    on:click={click}
    class="p-2 border-gray-600 text-gray-700 font-semibold text-md hover:text-gray-900 hover:bg-slate-300  {align ===
    'right'
        ? 'float-right'
        : 'float-left'}">{label}</button
>
