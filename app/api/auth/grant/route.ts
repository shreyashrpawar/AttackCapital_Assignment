import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      "https://stage.ema-api.com/ema-dev/firm/entpmsandbox393/ema/ws/oauth2/grant",
      {
        method: "POST",
        headers: {
          "x-api-key": "f69902ad-c2bc-4b30-aa89-e136d26a04b3",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: "fhir_pmOYS",
          password: "NmrxdT7I34",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
