

export const handleRegister = (req,res, db, bcrypt) => {
    // extracting the variables through destructuring.
    const { name, email, password }  = req.body;
    console.log("Received:", email, name);  // 🔍 log input
    if(!email || !name || !password) {
        console.log("❌ Missing fields");
        return res.status(400).json("incorrect form submission");
    }
  
  // Set the number of salt rounds (a common default is 10)
  const saltRounds = bcrypt.genSaltSync(10);

  // Hash the plaintext password using bcrypt.hashSync to store in DB
  const hash = bcrypt.hashSync(password, saltRounds);

//   console.log('Hashed password:', hash);
//   db.transaction(trx => { //transactions are feature of knex to keep things consistent both fails/successes
//     trx.insert({
//         hash:hash,
//         email:email
//     })
//     .into('login')
//     .returning('email')
//     .then(loginEmail => {
//         return trx('users')
//         .returning('*')
//         .insert({
//         email: loginEmail[0].email,
//         name: name,
//         joined: new Date()
//         }).then(user => {
//             res.json(user[0]);
//         })
//     })
//         .then(trx.commit)
//         .catch(trx.rollback)

//   })  
//   .catch(err => res.status(400).json("unable to register"))
//     };

//Catches DB or hashing errors, rolls back transaction, returns HTTP 400 with "unable to register".

db.transaction(async trx => {
    try {
      const loginInsert = await trx('login')
        .insert({ hash, email })
        .returning('email');

      console.log("🔑 Login insert result:", loginInsert);

      const userInsert = await trx('users')
        .insert({
          email: loginInsert[0].email || loginInsert[0],
          name: name,
          joined: new Date()
        })
        .returning('*');

      console.log("✅ Registered user:", userInsert[0]);
      res.json(userInsert[0]);

    } catch (err) {
      console.error("❌ Registration error:", err.message || err);
      res.status(400).json("unable to register");
    }
  });
};