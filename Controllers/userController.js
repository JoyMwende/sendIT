const mssql = require('mssql')
const config = require('../config/config')
const{v4:uuidv4}=require('uuid')
const { message } = require('../Helpers/validation')


  //register user
  async function createUsers (req, res){
    const {id, username, full_name, phone_number, email, password, isAdmin, isDeleted, isSent} = req.body
    try {
      let pool = await mssql.connect(config)
      await pool.request()
      .input('id', uuidv4 (id))
      .input('username', username)
      .input('full_name', full_name)
      .input('phone_number', mssql.VarChar, phone_number)
      .input('email', mssql.VarChar, email)
      .input('password', mssql.VarChar, password)
      .input('isAdmin', isAdmin)
      .input('isDeleted', isDeleted)
      .input('isSent', isSent)
      .execute('createUsers')
      res.send("Registration successful!")
    } catch (err) {
      console.log(err);
    }
  }
  
  //login user
  async function getAUser (req, res){
    const {email, password} = req.body
    // const {error} = validationSchema.validate(req.body);
    // if(error){
    //   return req
    //   .status(400)
    //   .send({success:false, message: error.details[0].message});
    // }
    try {
      let pool = await mssql.connect(config)
      let {recordset} = await pool.request()
      .input('email', mssql.VarChar, email)
      .input('password', mssql.VarChar, password)
      .execute('getAUser')
      const user = recordset[0];

      // if(!user){
      //   res.status(400).send({message: "User does not exist!"})
      // }

      // const validPassword = await bycrypt.compare(password, user,password)
      // if(!validPassword) {
      //   return res.send('Invalid Credentials!')
      // }

      res.json(results)
    } catch (err) {
      console.log(err);
    }
  }

//fetch all users
async function getUsers (req, res){
    try{
      await mssql.connect(config);
      const results = await (new mssql.Request())
      .execute('getUsers');
      res.send(results.recordset);
    }
    catch (err){
      console.log(err);
    }
  }
  
  //delete a user
  async function deleteUsers (req, res){
    const id = req.params.id
    try {
      let pool = await mssql.connect(config)
      let answ = await pool.request()
      .input('id',id)
      .execute('deleteUsers')
      res.json("User deleted!")
    } catch (err) {
      console.log(err);
    }
  }
 
  //update user
  async function updateUsers (req, res){
    const id = req.params.id;
    const {username, full_name, phone_number, email, password, isAdmin, isDeleted, isSent} = req.body
    try {
      let pool = await mssql.connect(config)
      await pool.request()
      .input('id',id)
      .input('username', mssql.VarChar, username)
      .input('full_name', mssql.VarChar, full_name)
      .input('phone_number', mssql.VarChar, phone_number)
      .input('email', mssql.VarChar, email)
      .input('password', mssql.VarChar, password)
      .input('isAdmin', mssql.VarChar, isAdmin)
      .input('isDeleted', mssql.VarChar, isDeleted)
      .input('isSent', mssql.VarChar, isSent)
      .execute('updateUsers')
      res.json("User updated!")
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = {createUsers, getAUser, getUsers, deleteUsers, updateUsers}
  
  