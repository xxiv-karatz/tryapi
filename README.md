Building an API using **Node.js** and **Express.js** is a great way to get started with backend development. Here’s a **step-by-step guide** for beginners, including how to test it using **Postman**.

---

## **Step 1: Install Node.js and npm**
Before you start, make sure you have **Node.js** installed. You can check by running:

```sh
node -v
npm -v
```

If Node.js is not installed, download and install it from [Node.js official site](https://nodejs.org/).

---

## **Step 2: Set Up Your Project**
1. **Create a new folder for your project** and navigate to it:
   ```sh
   mkdir my-api
   cd my-api
   ```

2. **Initialize a Node.js project**:
   ```sh
   npm init -y
   ```
   This will create a `package.json` file.

---

## **Step 3: Install Express.js**
Express is a lightweight framework for building web applications in Node.js.

Run:
```sh
npm install express
```

---

## **Step 4: Create an Express Server**
Create a new file **`server.js`** inside your project folder.

Add the following code:

```javascript
const express = require('express'); // Import Express
const app = express(); // Create an instance of Express
const port = 3000; // Define the port

app.use(express.json()); // Middleware to parse JSON requests

// Test route
app.get('/', (req, res) => {
    res.send('Hello, World! This is my first API.');
});

// Sample API route
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];
    res.json(users);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

---

## **Step 5: Run the Server**
Start your API by running:

```sh
node server.js
```

You should see:
```
Server running at http://localhost:3000
```

Now, open your browser and go to:
```
http://localhost:3000
```
You should see: **"Hello, World! This is my first API."**

---

## **Step 6: Test API with Postman**
1. Open **Postman** (Download it if you don’t have it: [Postman](https://www.postman.com/)).
2. Create a **new request**.
3. **Select GET** and enter:
   ```
   http://localhost:3000/api/users
   ```
4. Click **Send**.
5. You should receive:
   ```json
   [
       { "id": 1, "name": "John Doe" },
       { "id": 2, "name": "Jane Doe" }
   ]
   ```

---

## **Step 7: Add More API Endpoints**
Now, let's add more endpoints:

### **Create a new user (POST)**
Modify `server.js`:

```javascript
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

// Create a new user
app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});
```

### **Test POST request in Postman**
1. Select **POST**.
2. Enter **http://localhost:3000/api/users**.
3. Go to **Body > raw > JSON** and enter:
   ```json
   {
       "name": "Alice"
   }
   ```
4. Click **Send**.
5. You should receive:
   ```json
   {
       "id": 3,
       "name": "Alice"
   }
   ```

### **Get a Single User (GET)**
```javascript
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});
```
- Test with **http://localhost:3000/api/users/1**.

### **Update a User (PUT)**
```javascript
app.put('/api/users/:id', (req, res) => {
    let user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    res.json(user);
});
```
- Test with **PUT http://localhost:3000/api/users/1** and send a JSON body:
  ```json
  { "name": "John Updated" }
  ```

### **Delete a User (DELETE)**
```javascript
app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.send('User deleted');
});
```
- Test with **DELETE http://localhost:3000/api/users/1**.

---

## **Step 8: Use Nodemon for Auto-restart**
Instead of restarting manually, install **nodemon**:

```sh
npm install -g nodemon
```
Run the server with:
```sh
nodemon server.js
```

---

## **Conclusion**
You have now built a basic REST API using **Node.js** and **Express.js** and tested it with **Postman**! 🎉

Would you like to add **MongoDB** to store data? 🚀
