const mongodb = require('../db/connect');
var ObjectID = require('mongodb').ObjectId;

//get users' information
const getUser = async (req, res, next) => {
    const result = await mongodb.getDB().db('CSE341').collection('userInfo').find();

    result.toArray().then((items) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(items);
    })
};

//get one user information with ID
const getSingle = async (req, res, next) => {
    var a_id = new ObjectID(req.params.id);
    const result = await mongodb.getDB().db('CSE341').collection('userInfo').find({_id: a_id});

    (await result.count()) > 0
    ? result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
      })
    : res.status(200).json({ message: `No document found.` });

    // result.toArray().then((items) =>{
    //     res.setHeader('content-Type', 'application/json');
    //     res.status(200).json(items);
    // })
};

// post request
const addUser = async (req, res, next) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone
    }

    try{
        const result = await mongodb.getDB().db('CSE341').collection('userInfo').insertOne(user);
        res.setHeader('Content-Type', 'application/json');
        result 
            ? res
                .status(201)
                .json({message: 'Successfully added!', docId: result.insertedId.toString()})
            : res
                .status(204)
                .json({message: 'Oh no. Cannot add the user!'});
    } catch(error){
        console.log(error);
    }
};


// put request
const updateUser = async (req, res, next) => {
    try{
        const o_id = new ObjectID(req.params.id);
        const data = 
            await mongodb
                .getDB()
                .db('CSE341')
                .collection('userInfo')
                .updateOne({_id: o_id}, {$set: req.body})
                .then((result) => {
                    res.setHeader(`Content_Type`, `application/json`);
                    result.modifiedCount > 0
                        ? res.status(204).send()
                        : res.stauts(404).json({message: 'Oh no! Cannot update the user.'});
                });
    }catch(error){
        console.log(error)
    }
};

// DELETE requests
const deleteUser = async (req, res, next) => {
    try {
      const o_id = new ObjectID(req.params.id);
      const _ = await mongodb
        .getDB()
        .db('CSE341')
        .collection('userInfo')
        .deleteOne({ _id: o_id }, {})
        .then((result) => {
          result.deletedCount > 0
            ? res
                .status(200)
                .json({ message: `Document with ID: ${req.params.id} successfully deleted.` })
            : res.status(404).json({ message: 'No document deleted' });
        });
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {
    getUser,
    getSingle,
    addUser,
    updateUser,
    deleteUser
};