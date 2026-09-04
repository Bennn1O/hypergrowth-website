import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/immersion-session/route";

describe("POST /api/immersion-session", () => {
  it("exchanges a URL token for an HttpOnly session cookie", async () => {
    const response = await POST(
      new Request("http://localhost/api/immersion-session", {
        body: JSON.stringify({
          accessToken:
            "11111111-1111-4111-8111-111111111111.22222222-2222-4222-8222-222222222222",
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain(
      "hg_immersion_session=11111111-1111-4111-8111-111111111111.22222222-2222-4222-8222-222222222222",
    );
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("rejects an invalid token", async () => {
    const response = await POST(
      new Request("http://localhost/api/immersion-session", {
        body: JSON.stringify({ accessToken: "invalid" }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }),
    );

    expect(response.status).toBe(401);
  });
});
