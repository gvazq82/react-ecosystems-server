import { Todos as TodosEntity} from '../data/dbConnectors';

const TodosController = {
    getAllTodos: async () => {
        try {
            return await TodosEntity.find({});
        } catch(error) {
            console.error('Error', error);
        }
    },
    getTodoById: async (id) => {
        try {
            return await TodosEntity.findById(id);
        } catch(error) {
            console.error('Error', error);
        }
    },
    createTodo: async (todo) => {
        try {
            const { text, isCompleted } = todo; 
            const newTodo = new TodosEntity({
                text,
                isCompleted,
                createdAt: Date.now(),
            });
            newTodo.id = newTodo._id;

            return await newTodo.save(todo);
        } catch(error) {
            console.error('Error', error);
        }
    },
    getCompletedTodos: async (todo) => {
        try {
            return await TodosEntity.find({
                isCompleted: true,
            });
        } catch(error) {
            console.error('Error', error);
        } 
    },
    deleteTodo: async(id) => {
        try {
            return TodosEntity.deleteOne({
                _id: id,
            });
        } catch(error) {
            console.error('Error', error);
        }
    },
    completeTodo: async (id) => {
        try {
            const updatedTodo = await TodosEntity.findOneAndUpdate({
                _id: id,
            }, { 
                isCompleted: true 
            }, {
               new: true 
            });

            return updatedTodo;
        } catch(error) {
            console.error('Error', error);
        }
    },
};

export default TodosController;