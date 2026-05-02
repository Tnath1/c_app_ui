import { NextResponse } from "next/server";
import { mockRoles } from "@/lib/mock-data/roles";
import { applicationSchema } from "@/lib/validation/application-schema";
import type { ApiErrorResponse } from "@/types/api";
import type { ApplicationSubmissionResponse } from "@/types/application";

const RESPONSE_DELAY_MS = 600;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createApplicationId() {
  return `app_${crypto.randomUUID().slice(0, 8)}`;
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  await wait(RESPONSE_DELAY_MS);

  if (searchParams.get("state") === "error") {
    return NextResponse.json(
      {
        message: "We could not submit this application. Please try again.",
      } satisfies ApiErrorResponse,
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "The application request is not valid JSON.",
      } satisfies ApiErrorResponse,
      { status: 400 },
    );
  }

  const parsedApplication = applicationSchema.safeParse(body);

  if (!parsedApplication.success) {
    return NextResponse.json(
      {
        fieldErrors: parsedApplication.error.flatten().fieldErrors,
        message: "Please review the highlighted fields.",
      } satisfies ApiErrorResponse,
      { status: 422 },
    );
  }

  const selectedRole = mockRoles.find(
    (role) => role.id === parsedApplication.data.roleId,
  );

  if (!selectedRole) {
    return NextResponse.json(
      {
        fieldErrors: {
          roleId: ["Select a valid role."],
        },
        message: "Please select one of the available roles.",
      } satisfies ApiErrorResponse,
      { status: 422 },
    );
  }

  return NextResponse.json(
    {
      applicationId: createApplicationId(),
      candidateName: parsedApplication.data.fullName,
      message: `Application received for ${selectedRole.title}.`,
      receivedAt: new Date().toISOString(),
      status: "received",
    } satisfies ApplicationSubmissionResponse,
    { status: 201 },
  );
}
