/**
 * ChatMessageController
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
            const user = await User.findOne({email:'johnnie86@gmail.com'});

            
            const msg = await ChatMessage.create({ message: request.body.message, createdBy: user.id }).fetch();

            if(!msg) {
                throw new Error('Message processing failed!');
            }
            msg.createdBy = user;
            ChatMessage._publishCreate(msg);

        } catch(err) {
            console.log('I am here');
            return response.serverError(err);
        }
    
        return response.ok();
    }

};

