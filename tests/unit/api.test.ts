import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchInvitationData } from "@/lib/api";

describe("fetchInvitationData API Client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("harus mengembalikan data undangan saat API merespons sukses 200", async () => {
    const mockData = {
      order: { id: 2, slug: "sayang", status: "COMPLETED", isPublished: true },
      birthdayGreeting: { celebrantName: "Sayang", celebrantAge: 20 },
      galleries: [],
    };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockData }),
    } as Response);

    const result = await fetchInvitationData("sayang");
    expect(result).toEqual(mockData);
  });

  it("harus mengembalikan null secara aman saat API merespons 404 (Not Found)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ success: false, message: "Not found" }),
    } as Response);

    const result = await fetchInvitationData("slug-tidak-ada");
    expect(result).toBeNull();
  });

  it("harus menangani network failure atau throw error tanpa merusak aplikasi", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network connection timeout"));

    const result = await fetchInvitationData("sayang");
    expect(result).toBeNull();
  });

  it("harus meng-encode karakter slug dengan aman", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: { order: { slug: "nama & dia" } } }),
    } as Response);

    await fetchInvitationData("nama & dia");
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining("nama%20%26%20dia"),
      expect.any(Object)
    );
  });
});
