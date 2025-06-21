export const SCHEMA = `
    type Query {
       getProducts: [Product]
       getOneProduct(id: String!): Product
    }

    type Product {
       _id: String
       name: String
       description: String
       price: Int
       quantity: Int
       createdAt: String
       updatedAt: String
    }

    type Order {
       createdAt: String
       totalPrice: Int
       products : Product
    }
`;
