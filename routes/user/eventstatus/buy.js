const { findOne, updateDocument, insertNewDocument, pushIntoArray } = require("../../../helpers");
//const { find } = require("../../../helpers");
//const event = require("../../../models/event/index");

const buyEvents = async (req, res) => {
    try {
        const userId = req.params.userId;
        const _id = req.params.id;

    const user = await findOne("user", { _id:userId });
 console.log(user, "user...");

 if (!user) {
    return res.status(404).send({ status: 404, message: "No User Found" });
} 
        const eventss = await findOne("event", { _id:_id });

           console.log(eventss, "events...");

        if (!eventss) {
            return res.status(404).send({ status: 404, message: "No Events Found" });
        } 
        //else {
            const remainingTicket = eventss.remainingticket - 1

            console.log(remainingTicket, "remainingTicket..");

            const soldTicket = eventss.soldticket + 1
            console.log(soldTicket, "soldTicket...");

            
         //}

        
         const eventsupdate = await updateDocument("event" , {_id},{soldticket: soldTicket,remainingticket: remainingTicket ,status:"Sold"});
       
console.log(eventsupdate,"eventsupdate..");


// const usereventpurchase = await insertNewDocument("user" , {events:eventss._id});
       
// console.log(usereventpurchase,"eventsupdate..");

// const usereventpurchase = await updateDocument("user" , {_id:userId},{events:eventss._id});
       
// console.log(usereventpurchase,"eventsupdate..");
   
const eventpurchase = await pushIntoArray("user", {},{events:eventss._id})
console.log(eventpurchase,"eventpurchase...");

        return res.status(200).send({ status: 200, eventsupdate,eventpurchase});

    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = buyEvents;
