import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = "https://stage.ema-api.com/ema-dev/firm/entpmsandbox393/ema";

export async function handleProxy(req: NextRequest) {
  try {
    const targetUrl = req.nextUrl.searchParams.get("path");

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }
const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined;

    const response = await fetch(`${BASE_URL}/${targetUrl}`, {
      method: 'GET',
      headers: {
        "x-api-key": "f69902ad-c2bc-4b30-aa89-e136d26a04b3",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmaGlyX3BtT1lTIiwidXJsUHJlZml4IjoiZW50cG1zYW5kYm94MzkzIiwidmVuZG9yIjoiZmhpcl9wbU9ZU0BlbnRwbXNhbmRib3gzOTMiLCJpc3MiOiJtb2RtZWQiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJwb2wiOiJjaGFuZ2VtZSIsImp0aSI6IjE1OTQwZmUwNDJmMzQyYjRhYTA5NDQzZDk2OTg5MTIyIn0.i99QXONtnt5gwZuXPMXiM6Ioa6aaHGNpIQ8C5DP7eq4",
}});

    const data = await response.text(); // could be JSON or plain text
    return new NextResponse(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

