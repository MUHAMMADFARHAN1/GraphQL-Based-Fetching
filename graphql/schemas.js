export const SCHEMA = `
    type Query {
       getProducts: [Product]
       getProduct(id: String!): Product
       getOrders: [Order]
       getOrder(id: String!): Order
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
