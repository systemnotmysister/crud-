const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4444;
const app = express();
app.use(bodyParser.json());




let users = [
    {
        username: 'test_user',
        password: 'test_password'
    }
];

app.post("/register", (request, response) => { // регистрация пользователя с предварительной проверкой на наличие такого же логина 

    if(request.body.username && request.body.password)
    {
    if (users.find(it => it.username === request.body.username)) {
        response.send(`user ${request.body.username} already exists`);
        console.log(`user ${request.body.username} already exists`);
    }
    else {
        users.push(request.body)
        console.log(users);
        console.log(`user ${request.body.username} registered succsessfully`);
        response.send(`user ${request.body.username} registered succsessfully`)
    }
} else 
{
 console.log('no login ');
 response.send('no login ')
}
 
})

app.post("/authentication", (request, response) => { // проверяем есть ли введеныые данные пользователем при регистрации , в массиве

    if (users.map(it => it.username).includes(request.body.username) && users.map(it => it.password).includes(request.body.password)) {
        response.send(`user ${request.body.username} authenticated succsessfully`);
        console.log(`Congrats  ${request.body.username}, authentication succeeded ! , 200`);
    }
    else {
        response.send('user doesnt exist')
        console.log('user doesnt exist');
    }

})


app.put("/useradd", (request, response) => {

    let new_user_query = request.query
     const generated_password = Math.random().toString(36).slice(-8);
     new_user_query.password = generated_password;
    // // request.body = new_user_query


    if (users.find(it => it.username === new_user_query.username)) { //добавление нового юзера передавая ник в квери с предварительной проверкой на наличие такого же логина (+генерация ранд. пароля)
        response.send(`user ${request.body.username} already exists`);
        console.log(`user ${request.body.username} already exists`);
    }
    else {


        users.push(new_user_query)
        console.log(`user ${new_user_query.username} has been added succsessfully`);
        console.log(users)
        response.send(`user ${new_user_query.username} has been added succsessfully`)
    }
})

app.delete("/userdelete", (request, response) => { // удаление юзера по нику , с предварительной проверкой на зарегестрированность 

    const user_delete = request.body

    if (users.find((it) => it.username === user_delete.username)) {
        users = users.filter((it) => it.username !== request.body.username)
        console.log(`user ${user_delete.username} has been deleted succsessfull`)
        response.send(`user ${user_delete.username} has been deleted succsessfull `)
        console.log(users)
    }
    else {
        response.send(`user ${request.body.username} doesnt register `)
        console.log(`user ${request.body.username} doesnt register `)
    }
})


app.patch("/userpatch", (request, response) => { //замена данных юзера , находя его по логину , с предварительно проверкой на зарегестрированность

    let user_pre_patch = request.body[0]

    let user_patch = request.body[1]

    if (users.find(it => it.username === request.body[1].username)) {
        console.log(`user ${user_patch} already exists`);
        response.send(`user ${user_patch} already exists`)
    }
    else if (users.find((it) => it.username === request.body[0].username)) {
        users = users.filter((it) => it.username !== user_pre_patch.username)
        users.push(user_patch)
        console.log(`user ${request.body[0].username} has been patched succsessfull `)
        response.send(`user ${request.body[0].username} has been patched succsessfull , new username: ${user_patch.username}`)
        console.log(users)
    }

    else {
        response.send(`user ${request.body.username} doesnt register `)
        console.log(`user ${request.body.username} doesnt register `)
    }
})


const server = app.listen(port, () => {
    console.log('Server is listening on 4040 ')
})

module.exports = app

app.use(express.json())


