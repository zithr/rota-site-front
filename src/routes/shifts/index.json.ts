import {client} from '$lib/graphql-client'
import { gql } from 'graphql-request'



type Book = {
    title: string
    author: {
        name: string
        age: number
    }
}
export const get = async () => {
    try {
        const query = gql`query books {
            title
            book {i
              author { name, age }
            }
          }
          `
          const books = await client.request(query)
          return {
              status:200,
              body: books
          }
    } catch (error) {
        return {
            status:500,
            body: {error: 'There was a server error'}
        }
    }
}