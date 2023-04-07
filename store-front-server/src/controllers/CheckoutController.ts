import { Response, Request, NextFunction } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import productRepo from '../repositories/ProductRepository';

interface CheckoutItem {
    id: string | number;
    quantity: number;
}

class CheckoutController {
    private domain = process.env.CLIENT_URL;
    create = async (req: Request, res: Response) => {
        const line_items = await Promise.all(
            req.body.items.map(async (item: CheckoutItem) => {
                const storeItem = await productRepo.show(item.id.toString());
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
            }),
        );
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

export default new CheckoutController();
