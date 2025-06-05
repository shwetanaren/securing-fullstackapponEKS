

export const handleProfile = (req,res, db) => {
    const { id } = req.params; //attacker controls this 
    let found = false; 
    db.select('*').from('users').where({id}) // SINK: fetches any user profile. 
      .then(user => {
        if(user.length){
          res.json(user[0])
        } else {
        res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json('not found'))

};

