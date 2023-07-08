
if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require("express");
const app = express()
const passport = require('passport')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const initializePassport = require("./passport-config")
const User = require('./models/user')
initializePassport(
    passport,
    async (email) => {
        try{
            const user = await User.find({'email': email})
            return user
        } catch (e){
            console.log("error"+e)
            let user = null
            return user
        }
    },
    async (id) => {
        try{
            const user = await User.findById(id)
            return user
        } catch (e) {
            console.log(e);
        }
    }
)

let map = new Map()
// Configure the session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.set('view-engine', 'ejs')
// app.set('views', './views')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev')) //for path viewer
app.use(bodyParser.json())
app.use(express.static('public'))



app.get('/', async (req,res) => {
    let name
    if(req.isAuthenticated())  {
        name = req.user.name
        session.loggedIn=true
        console.log(session.loggedIn)
    } else {
        session.loggedIn=false
    }
    
    res.render('index.ejs', {
        username: name,
        session: session
        // req: req
    })
}) 


// app.post("/",  async (req, res) => {
//     let index = req.body.submitButton-'0'
//     if(s[index] == 1)
//     s[index] = 0
//     else
//     s[index] = 1
//     let user = await User.findById(req.user._id)
//     user.array = s;
//     await user.save()
//     res.redirect("/")    
// })
app.get('/dsa', async (req, res) => {
    let name
    if(req.isAuthenticated())
    name = req.user.name
    res.render('dsa.ejs',{
        username: name,
        session:session
    })
})
app.get('/Array',  async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"Array"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    let index = 0
    res.render('Array.ejs',{
        index: index,
        username: name,
        map: map,
        session: session
    } )
})

app.get('/web', async (req, res) => {
    let name
    // if(req.isAuthenticated()) {
    //     const coll = db.collection('checkboxes')
    //     const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"web"}).toArray()
    //     allCheckbox.forEach(checkbox => {
    //         map[checkbox.checkboxData.name] = checkbox.isChecked
    //     })
    //     name = req.user.name
    //     session.loggedIn=true
    // }
    if(req.isAuthenticated())
    name = req.user.name
    res.render('web.ejs', {
        username: name,
        session: session
    })
})
app.get('/core', async (req, res) => {
    let name
    if(req.isAuthenticated())
    name = req.user.name
    res.render('core.ejs', {
        username: name,
        session: session
    })
})

app.get('/misc', async (req, res) => {
    let name
    if(req.isAuthenticated())
    name = req.user.name
    res.render('misc.ejs', {
        username: name,
        session: session
    })
})
app.get('/backtrack', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"backtrack"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    if(req.isAuthenticated())
    name = req.user.name
    res.render('backtrack.ejs', {
        username: name,
        map: map,
        session: session
    })
})
app.get('/bit', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"bit"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    if(req.isAuthenticated())
    name = req.user.name
    res.render('bit.ejs', {
        username: name,
        session: session
    })
})
app.get('/bst', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"bst"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    if(req.isAuthenticated())
    name = req.user.name
    res.render('bst.ejs', {
        username: name,
        session: session
    })
})
app.get('/bt', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"bt"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('bt.ejs', {
        username: name,
        session: session
    })
})
app.get('/dp', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('dp.ejs', {
        username: name,
        session: session
    })
})
app.get('/graph', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"graph"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('graph.ejs', {
        username: name,
        session: session
    })
})
app.get('/greedy', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"greedy"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('greedy.ejs', {
        username: name,
        session: session
    })
})
app.get('/heap', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"heap"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
    }
    res.render('heap.ejs', {
        username: name,
        session: session
    })
})
app.get('/linked_list', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"linked_list"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('linked_list.ejs', {
        username: name,
        map: map,
        session: session
        // req: req
    })
})
app.get('/mat', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"mat"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('mat.ejs', {
        username: name,
        session: session
    })
})
app.get('/sort', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"sort"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('sort.ejs', {
        username: name,
        session: session
    })
})
app.get('/stack', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"stack"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('stack.ejs', {
        username: name,
        session: session
    })
})
app.get('/string', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"string"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('string.ejs', {
        username: name,
        map: map,
        session: session
    })
})
app.get('/trie', async (req, res) => {
    let name
    if(req.isAuthenticated()) {
        const coll = db.collection('checkboxes')
        const allCheckbox = await coll.find({"checkboxData.id": req.user.id, "type":"trie"}).toArray()
        allCheckbox.forEach(checkbox => {
            map[checkbox.checkboxData.name] = checkbox.isChecked
        })
        name = req.user.name
        // session.loggedIn=true
    }
    res.render('trie.ejs', {
        username: name,
        session: session
    })
})
app.get('/About', async (req, res) => {
    let name
    if(req.isAuthenticated())
    name = req.user.name
    res.render('About.ejs', {
        username: name,
        session: session
    })
})

app.post('/checkbox/update',  async (req, res) => {
    console.log("checkbox updating")
    if(req.isAuthenticated()) {
        const { isChecked, checkboxData, type, pageName} = req.body;
        map[checkboxData.name] = isChecked
        console.log(isChecked);
        const idd = req.user.id
        const value = isChecked
        const collection =  db.collection('checkboxes');
        const document = await collection.find({"checkboxDAta.id": idd, "checkboxData.name":checkboxData.name, "type": type}).toArray();
        try {
            if(document.length > 0) {
                console.log("updated..")
                await collection.updateOne({ "checkboxData.id": idd }, { $set: { isChecked: value } });
            } else {
                console.log("inserted...");
                const document = {
                    isChecked: isChecked,
                    checkboxData: { 
                        id:req.user.id,
                        name:checkboxData.name 
                    },
                    type: type
                }
                await collection.insertOne(document)
            }

        } catch(e) {
            console.log(e)
        }
        res.render(pageName)
    }
})



app.get('/login', checkNotAuthenticated, (req,res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))



app.get('/signUp', checkNotAuthenticated, (req,res) => {
    res.render('signUp.ejs')
})

app.post('/signUp', checkNotAuthenticated,  async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        await user.save()
        res.redirect('/login')
    } catch (e){
        console.log(e)
        res.redirect('/signUp')
    }
})


app.delete('/logout',  async (req, res) => {
    // req.session.destroy()
    console.log("sdgsdf")
    req.logOut(function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred during logout');
        }
        map = new Map()
        console.log(map)
        res.redirect('/login');
    });
});



function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

mongoose.connect('mongodb://127.0.0.1:27017',
{ useNewUrlParser: true, useUnifiedTopology: true })
 const db = mongoose.connection
 db.on('error', error => console.error(error))
 db.once('open', () => console.log('connected to mongoose'))
 
 app.listen(3000)
 // function checkAuthenticated(req, res, next) {
 //     if(req.isAuthenticated()) {
 //         return next()
 //     }
 //     res.redirect('/login')
 // }

//(user => id === user.id): This is an arrow function that 
// serves as the condition to be checked for each user object.
//  The function takes a user parameter and compares its id 
// property with the id value you provided.

// const users = []


// dbms - sql , normalisation , 
// os - process scheduling , deadlocks 
// oops
//redux hooks
//container m docker kese implement

//passport local - essentially allows us to use username and password for loging in
//passport has a bunch of different ways you can log in like google facebook
//session - 
//Express session is a popular middleware module for session management in Express.js, 
// which is a web application framework for Node.js. Sessions are a way to store data about a user's 
// interaction with a website or application across multiple requests.

//Express session provides a simple and flexible way to handle sessions by abstracting 
// away the complexities of session management. It allows you to easily create, manage, and destroy sessions,
//  as well as store and retrieve session data.

// secret: A string used to sign the session ID cookie. It should be a secret and not shared publicly.
// resave: Specifies whether to save the session back to the session store, even if the session was never modified 
// during the request. It's recommended to set this to false to improve performance.
// saveUninitialized: Specifies whether to save uninitialized sessions to the session store. If set to true,
//  a session will be created even if it's not modified.

// I am really good in data structures and algorithms and competitive programming and have some projects in nodejs 
// in any field the main thing is how you tackle new problems and how you find the solution and it's my strength 






