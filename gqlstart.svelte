<script lang="ts">
    import NavBar from "../components/NavBar.svelte"
    import {client} from '$lib/graphql-client'
    import { gql } from 'graphql-request'

    const get = async (): Promise<any> => {
    console.log("here")
    try {
        const query = gql`query books {
            book {
              author { name, age }
            }
          }
          `
          console.log("and")
          const books = await client.request(query)
          console.log(books)
          console.log("then")
          return {
              status:200,
              body: {books}
          }
    } catch (error) {
        return {
            status:500,
            body: {error: 'There was a server error'}
        }
    }
}
</script>

<main>
    <NavBar />
    <h1 class="text-2xl font-bold text-center text-gray-800">New Site</h1>
    <div class="p-4">
        <button class="rounded-md bg-blue-400 text-white py-2 px-4" on:click={get}>Get</button>
    </div>
</main>
