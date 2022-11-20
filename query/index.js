const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'PostCreated') {
    const { id, title } = data; 
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { postId, id, content, status } = data;
    const post = posts[postId];
    if (!post) {
      throw new Error('');
    }
    post.comments.push({ id, content, status })
  }

  if (type === 'CommentUpdated') {
    const { postId, id, content, status } = data;
    const post = posts[postId];
    if (!post) {
      throw new Error('');
    }
    const updatedComments = post.comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          content,
          status
        }
      }
      return comment
    });
    post.comments = updatedComments
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
