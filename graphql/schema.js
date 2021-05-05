const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
 type Query {
          getUserById(id: ID):User
          getUsers:[User]
                   
          getTasks:[Task]
    }
    
    
    type Mutation {
          addUser(User: UserInput): User
          
    }


    type User{
          id: ID
          createdAt: String
          name: String
          nickName : String
    }

    input UserInput{
          name: String
          nickName: String!
    }

    type Task{
          id: ID
          name: String
          description: String
          startDate : String
          endDate : String
    }
    
    input TaskInput{
      name: String!
      description: String
      startDate : String
      endDate : String
}

`)

