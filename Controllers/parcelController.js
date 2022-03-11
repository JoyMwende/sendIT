const mssql = require('mssql')
const config = require('../config/config')
const{v4:uuidv4}=require('uuid')

//fetch all parcel delivery orders
async function getParcels (req, res){
    try{
      await mssql.connect(config);
      const results = await (new mssql.Request).execute('getParcels');
      res.send(results.recordset);
    }
    catch (err){
      console.log(err);
    }
  }
 
  //fetch a specific parcel delivery order
  async function getAParcel (req, res){
    const id = req.params.id
    try {
      let pool = await mssql.connect(config)
      let results = await pool.request()
      .input('id', id)
      .execute('getAParcel')
      res.json(results)
    } catch (err) {
      console.log(err);
    }
  }
 
   //fetch all parcel delivery orders by a specific user
   async function getSomeParcel (req, res){
    // const sender_id = req.params.sender_id
    try {
      let pool = await mssql.connect(config)
      let results = await pool.request()
      // .input('sender_id', mssql.VarChar, sender_id)
      .execute('getSomeParcel')
      res.send(results)
    } catch (err) {
      console.log(err);
    }
  }
 
  //cancel the specific parcel delivery order
  async function deleteParcel (req, res){
    const id = req.params.id
    try {
      let pool = await mssql.connect(config)
      let answ = await pool.request()
      .input('id',id)
      .execute('deleteParcel')
      res.json("Parcel delivery order cancelled!")
    } catch (err) {
      console.log(err);
    }
  }
  
  //create a parcel delivery order
  async function createParcel (req, res){
    const {id, description, sender_number, receiver_number, start_location, end_location, isDeleted, isUpdated, isSent, isDelivered, current_location, sender_id} = req.body
    try {
      let pool = await mssql.connect(config)
      await pool.request()
      .input('id', uuidv4 (id))
      .input('description', mssql.VarChar, description)
      .input('sender_number', mssql.VarChar, sender_number)
      .input('receiver_number', mssql.VarChar, receiver_number)
      .input('start_location', mssql.VarChar, start_location)
      .input('end_location', mssql.VarChar, end_location)
      .input('isDeleted', mssql.VarChar, isDeleted)
      .input('isUpdated', mssql.VarChar, isUpdated)
      .input('isSent', mssql.VarChar, isSent)
      .input('isDelivered', mssql.VarChar, isDelivered)
      .input('current_location', mssql.VarChar, current_location)
      .input('sender_id', mssql.VarChar, sender_id)
      .execute('createParcel')
      res.json("You have successfully created a parcel delivery order!")
    } catch (err) {
      console.log(err);
    }
  }

   //update a parcel delivery order
   async function updateParcel (req, res){
       const id = req.params.id
    const {description, sender_number, receiver_number, start_location, end_location, isDeleted, isUpdated, isSent, isDelivered, current_location, sender_id} = req.body
    try {
      let pool = await mssql.connect(config)
      await pool.request()
      .input('id',id)
      .input('description', mssql.VarChar, description)
      .input('sender_number', mssql.VarChar, sender_number)
      .input('receiver_number', mssql.VarChar, receiver_number)
      .input('start_location', mssql.VarChar, start_location)
      .input('end_location', mssql.VarChar, end_location)
      .input('isDeleted', mssql.VarChar, isDeleted)
      .input('isUpdated', mssql.VarChar, isUpdated)
      .input('isSent', mssql.VarChar, isSent)
      .input('isDelivered', mssql.VarChar, isDelivered)
      .input('current_location', mssql.VarChar, current_location)
      .input('sender_id', mssql.VarChar, sender_id)
      .execute('updateParcel')
      res.json("You have successfully updated a parcel delivery order!")
    } catch (err) {
      console.log(err);
    }
  }
 
  module.exports = {getParcels, getAParcel, getSomeParcel, deleteParcel, createParcel, updateParcel}