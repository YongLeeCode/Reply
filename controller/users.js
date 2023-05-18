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


module.exports = {
    getUser,
    getSingle
};