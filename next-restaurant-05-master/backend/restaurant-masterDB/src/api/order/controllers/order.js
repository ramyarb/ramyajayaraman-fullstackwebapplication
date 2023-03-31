'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::order.order');
//adding code to include charge_id


const stripe = require("stripe")("sk_test_51MoouMIE8c2HMRLbaCimPigFRBoq9y3yUNCDLHMhZNpSuLeeGDQrcet1cAfygxHiogeuxFy0QnH0ivsea1QRuk5H001pkPBCuY");


  module.exports = createCoreController('api::order.order', ({strapi}) => ({

    create: async (ctx) => {
	console.log("context from stripe"+JSON.stringify(ctx));
      const { address, amount, dishes, token, city, state,user } = JSON.parse(
        ctx.request.body
      );
      const stripeAmount = Math.floor(amount * 100);
      // charge on stripe
      const charge = await stripe.charges.create({
        // Transform cents to dollars.
        amount: stripeAmount,
        currency: "usd",
        description: `Order ${new Date()} by ${ctx.state.user._id}`,
        source: token,
      });
  console.log("charge_id from stripe"+charge);
      // Register the order in the database
      const order = await strapi.services.order.create({
        user: ctx.state.user.id,
        charge_id: charge.id,
        amount: stripeAmount,
        address: address,
        dishes: dishes,
        city:city,
        state:state,
      });
  
      return order;
    }
  }));
 