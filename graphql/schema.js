const { buildSchema } = require('graphql');



module.exports = buildSchema(`
   
    type Query {
 
          login(nickName: String, password: String): String
          verifyToken(authToken: String): Boolean
          
          getUserById(id: ID):User
          getUsers:[User]
           
          getTasks:[Task]
          getTaskChildren(Task: TaskInput):[Task]
          getTaskById(id: ID) : Task
          getAllTaskChildren(id: ID) : String
    }
    
    
    type Mutation {

          registration(User: UserInput, password: String): String
          createTask(Task: TaskInput, userId: ID, parentId: ID): Task
          createSubTask(Task: TaskInput, parentId: ID): Task
          
    }


    type User{
          id: ID
          createdAt: String
          name: String
          nickName : String
          tasks: [Task]
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
          path: String
            children: [Task]
            users: [User]
            task: Task
    }
    
    input TaskInput{
          id : ID
          name: String!
          description: String
          startDate : String
          endDate : String
    }

`);


