
const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

    },

    Mutation: {
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async(parent, { books }, context) => {
            if(context.user){
                const book = new Book({ books });

                await User.findByIdAndUpdate(context.user._id, { $addToSet: { books: book } });

                return book;
            }

            throw new AuthenticationError('Not logged in');
        },
        removeBook: async(parent, { bookId }) => {
            const book = await Book.findOne({ bookId: bookId })

            if(context.user){
                return await User.findByIdAndUpdate(context.user._id, { $pull: { Book: book } });
            }

            throw new AuthenticationError('Not logged in');
        }
    }
}

module.exports = resolvers;