/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    postMessage: async (request, response) => {
        // Make sure this is a socket request (not traditional HTTP)
      if (!request.isSocket) {
        return response.badRequest();
      }
    
        try {
            let user = await User.findOne({email:'johnnie86@gmail.com'});
            let msg = await ChatMessage.create({message:request.body.message, createdBy:user });
            if(!msg.id) {
                throw new Error('Message processing failed!');
            }
            msg.createdBy = user;
            ChatMessage.publishCreate(msg);
        } catch(err) {
            return response.serverError(err);
        }
    
        return response.ok();
    }

};

