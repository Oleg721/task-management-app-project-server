const { buildSchema } = require('graphql');



module.exports = buildSchema(`
   
    type Query {
 
          login(login: String, password: String): String
          verifyToken(authToken: String): Boolean
          
          getUserById(id: ID):User
          getUsers:[User]
           
           
          getUserProjects:[Task]
          getTaskChildren(Task: TaskInput):[Task]
          getAllTaskChildren(id: ID) : String
    }
    
    
    type Mutation {

          registration(User: UserInput, password: String): String
          createTask(Task: TaskInput, userId: ID, parentTaskId: ID): Task
          createSubTask(Task: TaskInput, parentId: ID): Task
          
    }


    type User{
          id: ID
          createdAt: String
          name: String
          login : String
          tasks: [Task]
    }
    

    input UserInput{
          name: String
          login: String!
          password: String!
    }

    type Task{
          id: ID
          name: String
          state: String
          description: String
          startDate : String
          endDate : String
          path: String
            children: [Task]
            users: [User]
            task: Task
    }
    
    input TaskInput{
          id : ID
          name: String
          state: String
          description: String
          startDate : String
          endDate : String
    }

`);


