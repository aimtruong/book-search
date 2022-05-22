
import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        user{
            username
            email
            books{
                _id
                author
                bookId
                title
                description
                image
                link
            }
        }
    }
`;