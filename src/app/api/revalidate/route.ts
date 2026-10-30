import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { GITHUB_CACHE_TAG } from "@/lib/github";

export async function POST(request: NextRequest) {
  const secret =
    request.nextUrl.searchParams.get("secret") ||
    request.headers.get("x-revalidate-secret");

  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      {
        success: false,
        message: "REVALIDATE_SECRET is not configured on the server",
      },
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid revalidation secret",
      },
      { status: 401 }
    );
  }

  try {
    revalidateTag(GITHUB_CACHE_TAG, "max");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      revalidated: true,
      tag: GITHUB_CACHE_TAG,
      path: "/",
      timestamp: new Date().toISOString(),
      message: `Cache purged and revalidated for tag '${GITHUB_CACHE_TAG}' and path '/'`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Revalidation failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
