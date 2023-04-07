"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
class CheckoutController {
    constructor() {
        this.domain = process.env.CLIENT_URL;
        this.create = async (req, res) => {
            const line_items = await Promise.all(req.body.items.map(async (item) => {
                const storeItem = await ProductRepository_1.default.show(item.id.toString());
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.price * 100,
                    },
                    quantity: item.quantity,
                };
            }));
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items,
                success_url: `${this.domain}?success=true`,
                cancel_url: `${this.domain}?canceled=true`,
            });
            res.status(200).json({ url: session.url });
        };
    }
}
exports.default = new CheckoutController();
