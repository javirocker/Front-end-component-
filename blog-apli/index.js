const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conexión a MongoDB (asegúrate de que MongoDB esté corriendo localmente)
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('No se pudo conectar a MongoDB', err));

// Definición del esquema de Post
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Rutas CRUD

// Crear un nuevo post
app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
});

// Obtener todos los posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.status(200).send(posts);
});

// Obtener un post por ID
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).send({ error: 'Post no encontrado' });
    }
    res.status(200).send(post);
});

// Actualizar un post por ID
app.put('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
        return res.status(404).send({ error: 'Post no encontrado' });
    }
    res.status(200).send(post);
});

// Eliminar un post por ID
app.delete('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
        return res.status(404).send({ error: 'Post no encontrado' });
    }
    res.status(200).send({ message: 'Post eliminado' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
