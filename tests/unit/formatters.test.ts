import { describe, it, expect } from "vitest";
import { formatCategoryLabel } from "@/components/GallerySection";

describe("formatCategoryLabel Helper", () => {
  it("harus mengkapitalisasi kata tunggal dengan benar", () => {
    expect(formatCategoryLabel("momen")).toBe("Momen");
    expect(formatCategoryLabel("spesial")).toBe("Spesial");
    expect(formatCategoryLabel("cinta")).toBe("Cinta");
    expect(formatCategoryLabel("semua")).toBe("Semua");
  });

  it("harus mengkapitalisasi kata ulang berpenghubung strip (hyphenated)", () => {
    expect(formatCategoryLabel("jalan-jalan")).toBe("Jalan-Jalan");
    expect(formatCategoryLabel("momen-momen")).toBe("Momen-Momen");
  });

  it("harus mengkapitalisasi kata dengan spasi", () => {
    expect(formatCategoryLabel("jalan santai")).toBe("Jalan Santai");
  });

  it("harus mempertahankan kata yang sudah kapital", () => {
    expect(formatCategoryLabel("Momen")).toBe("Momen");
    expect(formatCategoryLabel("Jalan-Jalan")).toBe("Jalan-Jalan");
  });

  it("harus aman menangani input kosong, null, atau undefined", () => {
    expect(formatCategoryLabel("")).toBe("");
    expect(formatCategoryLabel(null)).toBe("");
    expect(formatCategoryLabel(undefined)).toBe("");
  });
});
