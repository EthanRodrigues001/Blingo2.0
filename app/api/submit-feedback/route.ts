import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Discord webhook URL is not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { rating, feedback } = body;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New UI Feedback:\nRating: ${rating}/8\nFeedback: ${feedback}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send feedback to Discord');
    }

    return NextResponse.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

