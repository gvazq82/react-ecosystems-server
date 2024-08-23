import mongoose from "mongoose";

async function connectMongo() {
    try {
        await mongoose.connect('mongodb://localhost/todos');
        console.log('Connected to MongoDB');
    } catch(e) {
        console.error('Error Connecting', e);
    }
}

connectMongo();

const todoSchema = new mongoose.Schema({
    id: String,
    text: String,
    isCompleted: Boolean,
    createdAt: Date,
});

const Todos = mongoose.model('todos', todoSchema);

export { Todos };
