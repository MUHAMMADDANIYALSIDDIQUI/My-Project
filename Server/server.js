const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
const users = [
    {
        fullName: "Moiz",
        userName: "MZ1",
        pwd: "123",
        profilURL: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
        posts: ["Post-1", "Post-2", "Post-3"]
    }
];

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
});

app.get('/', (req, res) => {
    res.send("I am Here for you HOw May I Help YOu")
})

app.post('/signup', (req, res) => {
    const found = users.find((items) => { return items.userName == req.body.userName });
    if (!found) {
        users.push(req.body);
        res.json(users);
    }
    else {
        res.send(false);
    }
})

app.post('/signin', (req, res) => {
    const found = users.find((items) => { return items.userName == req.body.userName && items.pwd == req.body.pwd });
    if (found) {
        res.json(found);
    }
    else {
        res.send(false);
    }
})

app.get('/profile', (req, res) => {
    res.json(users);
})

app.post('/post', (req, res) => {
    const found = users.find((items) => { return items.userName == req.body.userName });
    if (found) {
        found.posts.unshift(req.body.newPost);
        res.send("Post Created");
    }
    else {
        res.send("Invalid");
    }
})

app.delete('/post', (req, res) => {
    const found = users.find((items) => { return items.userName == req.body.userName });
    if (found) {
        found.posts.splice(req.body.postIndex, 1);
        res.send("Post Deleted");
    }
    else {
        res.send("Invalid");
    }
})

app.put('/post', (req, res) => {
    const found = users.find((items) => items.userName === req.body.userName);

    if (found) {
        const postIndex = req.body.postIndex;
        if (postIndex >= 0 && postIndex < found.posts.length) {
            found.posts[postIndex] = req.body.newPostData;
            res.status(200).send("Post Updated");
        } else {
            res.status(404).send("Post not found");
        }
    } else {
        res.status(404).send("User not found");
    }
});



