import { NextRequest, NextResponse } from 'next/server';

// Note: Install razorpay package first: npm install razorpay
// Uncomment when ready to use:
/*
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
*/

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();
    
    // TODO: Uncomment when Razorpay is configured
    /*
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // 12 months
      quantity: 1,
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    });
    */

    // Temporary response for development
    return NextResponse.json({
      error: 'Razorpay not configured yet. Please add your API keys to .env.local',
      message: 'See DEPLOYMENT_GUIDE.md for setup instructions',
    }, { status: 501 });

  } catch (error: any) {
    console.error('Subscription creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription', details: error.message },
      { status: 500 }
    );
  }
}
