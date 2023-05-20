const mongodb = require('../db/connect');
var ObjectID = require('mongodb').ObjectId;

//get all replies
const getReplies = async(req, res, next) => {
    const result = await mongodb.getDB().db('CSE341').collection('replies').find();

    result.toArray().then((items) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(items);
    });
};

//get one reply
const getOneReply = async(req, res, next) => {
    var a_id = new ObjectID(req.params.id);
    const result = 
        await mongodb
            .getDB()
            .db('CSE341')
            .collection('replies')
            .find({_id: a_id});
    
    (await result.count()) > 0
        ? result.toArray().then((items)=>{
            res.setHeader('content-type', 'application/json');
            res.status(200).json(items);
        })
        : res.status(200).json({message: 'no doc found'});
};

///post reply
const addReply = async(req, res, next) => {
    const reply = {
        name: req.body.name,
        reply: req.body.reply
    }

    try{
        const result = 
            await mongodb
                .getDB()
                .db('CSE341')
                .collection('replies')
                .insertOne(reply);
        res.setHeader('content-type', 'application/json');
        result
            ? res
                .status(201)
                .json({message:'added!'})
            : res
                .status(204)
                .json({message: 'failed :('});
    }catch(error){
        console.log(error);
    }
};

// put request
const updateReply = async (req, res, next) => {
    try{
        const o_id = new ObjectID(req.params.id);
        const data = 
            await mongodb
                .getDB()
                .db('CSE341')
                .collection('replies')
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
const deleteReply = async (req, res, next) => {
    try {
      const o_id = new ObjectID(req.params.id);
      const _ = await mongodb
        .getDB()
        .db('CSE341')
        .collection('replies')
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
    getReplies,
    getOneReply,
    addReply,
    updateReply,
    deleteReply
};