/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(cb) {
  sails.config.appName = "New Sails App";
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Generate Chat Messages
try {
  let messageCount = ChatMessage.count();
  if(messageCount > 0){
    return; // don't repeat messages
  }

  let users = await User.find();
  if(users.length >= 3) {
    console.log("Generating messages...")

    let msg1 = await ChatMessage.create({
      message: 'Hey Everyone! Welcome to the community!',
      createdBy: users[1]
    });
    console.log("Created Chat Message: " + msg1.id);

    let msg2 = await ChatMessage.create({
      message: "How's it going?",
      createdBy: users[2]
    });
    console.log("Created Chat Message: " + msg2.id);

    let msg3 = await ChatMessage.create({
      message: 'Super excited!',
      createdBy: users[0]
    });
    console.log("Created Chat Message: " + msg3.id);

  } else {
    console.log('skipping message generation');
  }
}catch(err){
  console.error(err);
}

// It's very important to trigger this callback method when you're finished with Bootstrap! (Otherwise your server will never lift, since it's waiting on Bootstrap)
cb();

};
