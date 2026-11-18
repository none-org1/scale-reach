import { NextResponse } from "next/server";

// Mock implementation of Videos API endpoint for the vertical slice
export async function GET() {
  const mockVideos = [
    { id: 1, title: "How to Scale your AI business", duration: "12:45", status: "complete", clips: 12 },
    { id: 2, title: "Podcast Episode #42: Future of LLMs", duration: "45:30", status: "complete", clips: 24 },
    { id: 3, title: "Twitch Stream: Deep Dive into Coding", duration: "2:15:00", status: "processing", progress: 65 },
  ];

  return NextResponse.json({ success: true, data: mockVideos });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    // Simulate video ingest and queuing
    const newVideo = {
      id: Date.now(),
      title: `Processing Video from ${new URL(url).hostname}`,
      source_url: url,
      status: "fetching",
      clips: 0,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: newVideo });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }
}
