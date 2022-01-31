<script>
    import { ShowLoginStore } from "../stores"
    import { LoginStore } from "../stores"
    export let label
    export let link
    export let align = "left"

    const click = async () => {
        let res
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
            case "LocalRota":
                res = await fetch("http://localhost:8000/api/rota", {
                    // https://3.90.102.33  //
                    method: "GET",
                    mode: "cors",
                    // Allows cookies to be set/accessed
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((x) => x.json())
                    .then((data) => {
                        if (!data) {
                            // need to dispatch login request + last fetch request to queue up after login success
                            console.log("login error, no data found, using fake data")
                            // $ShowLoginStore.showLogin = 1
                        } else {
                            console.log(data)
                        }
                    })
            case "TestCookies":
                res = await fetch("http://localhost:8000/api/test", {
                    // https://3.90.102.33  //
                    method: "GET",
                    mode: "cors",
                    // Allows cookies to be set/accessed
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((x) => x.json())
                    .then((data) => {
                        if (!data) {
                            // need to dispatch login request + last fetch request to queue up after login success
                            console.log("login error, no data found, using fake data")
                            // $ShowLoginStore.showLogin = 1
                        } else {
                            console.log(data)
                        }
                    })
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
