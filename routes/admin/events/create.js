const Joi = require("joi");
const { findOne, insertNewDocument } = require("../../../helpers");
const event = require("../../../models/event");
const cloudinary = require("cloudinary").v2;



const schema = Joi.object({

    organizerName: Joi.string(),
    personName: Joi.string(),
    eventName: Joi.string(),
    description: Joi.string(),
    loc: Joi.string(),
    price: Joi.number(),
    place: Joi.string(),
    startDate: Joi.date().raw().required(),
    endDate: Joi.date().raw().required(),
    // banner_img: Joi.string(),
    // banner_img_url: Joi.string(),
    // pass_img: Joi.string(),
    // pass_img_url: Joi.string()
    image: Joi.array(),
    image_url: Joi.array()
  
});

const createEvent = async (req, res) => {
    try {
            await schema.validateAsync(req.body);

const _id = req.params.id;
     
let user = await findOne("user", { _id });
if (!user) {
    return res.status(400).send({ status: 400, message: "No User Found" });
}

console.log(user,"user....");

        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;


            const newPath = await cloudinary.uploader.upload(path);

           // console.log(newPath, "newPath...");
           urls.push(newPath);

       //    console.log(urls, "urls...");
        }


//         urls.map((images) => {
//    const imageUrl =  images.public_id
//    const imagePhoto =  images.secure_url
   
// //    console.log(imageUrl, "imageurl");
// //    console.log(imagePhoto, "imagePhoto");
// })



// console.log(imageUrl, "imageurl");
//     console.log(imagePhoto, "imagePhoto");
       
        //Create instance of Events user
        let events = new event({
            organizerName: req.body.organizerName,
            personName: req.body.personName,
            eventName: req.body.eventName,
            description: req.body.description,
            loc: req.body.loc,
            price: req.body.price,
            place: req.body.place,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            bundle_image:{

                image: urls.map( url => url.secure_url ),
                image_url: urls.map( url => url.public_id ),
            },
            userID:_id
            // banner_img: result.secure_url,
            // banner_img_url: result.public_id,
            // pass_img: result.secure_url,
            // pass_img_url: result.public_id
            // banner_img: imagePhoto,
            // banner_img_url: imageUrl,
            // pass_img: imagePhoto,
            // pass_img_url: imageUrl

        });


     //   console.log(events, "events..");
    
        const eventCreate = await insertNewDocument("event", (events))


    //    console.log(eventCreate, "eventcreate");
    
        return res
            .status(200)

            .send({ status: 200, message: "Event created Successfully" , eventCreate});

                
        }  
    catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }

}
;

module.exports = createEvent;


