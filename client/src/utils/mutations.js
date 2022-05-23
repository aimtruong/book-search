
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
    ){
        addUser(
            username: $username
            email: $email
            password: $password
        ){
            token
            user{
                _id
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(
        $bookId: String!
        $author: String!
        $title: String!
        $description: String!
        $image: String!
        $link: String!
    ){
        saveBook(
            bookId: $bookId
            author: $author
            title: $title
            description: $description
            image: $image
            link: $link
        ){
            user{
                _id
                username
                email
                books{
                    bookId
                    author
                    title
                    description
                    image
                    link
                }
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            user{
                books{
                    bookId
                    author
                    title
                    description
                    image
                    link
                }
            }
        }
    }
`;