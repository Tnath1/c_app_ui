import { NextResponse } from "next/server";
import { mockRoles } from "@/lib/mock-data/roles";
import type { ApiErrorResponse } from "@/types/api";
import type { RolesResponse } from "@/types/role";

const RESPONSE_DELAY_MS = 350;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  await wait(RESPONSE_DELAY_MS);

  // Query params let the UI preview required states without changing code.
  if (state === "error") {
    return NextResponse.json(
      {
        message: "Unable to load open roles. Please try again.",
      } satisfies ApiErrorResponse,
      { status: 500 },
    );
  }

  // The empty state is intentional; the frontend can show a proper no-roles message.
  if (state === "empty") {
    return NextResponse.json({ roles: [] } satisfies RolesResponse);
  }

  return NextResponse.json({ roles: mockRoles } satisfies RolesResponse);
}
