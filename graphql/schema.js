const { buildSchema } = require('graphql');



module.exports = buildSchema(`
   
 type Query {
 
          login(nickName: String, password: String): String
          getUserById(id: ID):User
          getUsers:[User]
           
          getTasks:[Task]
          
    }
    
    
    type Mutation {

          registration(User: UserInput, password: String): String
          CreateTask(Task: TaskInput): Task
          
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
          password: String!
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

`);


