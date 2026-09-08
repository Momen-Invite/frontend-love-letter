import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import nextConfig from "../../next.config";

describe("SEO & Security Compliance Test (BRIEF-MASTER-SEO & BRIEF_UNIT_TEST)", () => {
  it("sitemap.ts harus menghasilkan URL kanonikal https dengan priority dan changeFrequency yang valid", () => {
    const sitemapData = sitemap();
    expect(Array.isArray(sitemapData)).toBe(true);
    expect(sitemapData.length).toBeGreaterThan(0);

    for (const entry of sitemapData) {
      expect(entry.url).toMatch(/^https:\/\/momeninvite\.web\.id\/love-letter/);
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1.0);
      expect(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]).toContain(
        entry.changeFrequency
      );
    }
  });

  it("robots.ts harus mengizinkan publik dan mengarahkan sitemap resmi", () => {
    const robotsData = robots();
    expect(robotsData.sitemap).toBe("https://momeninvite.web.id/love-letter/sitemap.xml");

    const rules = Array.isArray(robotsData.rules) ? robotsData.rules[0] : robotsData.rules;
    expect(rules).toBeDefined();
    expect(rules?.userAgent).toBe("*");
    expect(rules?.allow).toContain("/");
    expect(rules?.disallow).toContain("/api/");
  });

  it("next.config.ts harus mendefinisikan security headers modern (HSTS, nosniff, Referrer-Policy, CSP)", async () => {
    expect(typeof nextConfig.headers).toBe("function");

    if (nextConfig.headers) {
      const headersConfig = await nextConfig.headers();
      expect(Array.isArray(headersConfig)).toBe(true);

      const rootHeader = headersConfig.find((h) => h.source === "/:path*");
      expect(rootHeader).toBeDefined();

      const headerKeys = rootHeader?.headers.map((h) => h.key);
      expect(headerKeys).toContain("Strict-Transport-Security");
      expect(headerKeys).toContain("X-Content-Type-Options");
      expect(headerKeys).toContain("Referrer-Policy");
      expect(headerKeys).toContain("Permissions-Policy");
      expect(headerKeys).toContain("Content-Security-Policy");

      // Verifikasi nilai spesifik
      const nosniff = rootHeader?.headers.find((h) => h.key === "X-Content-Type-Options");
      expect(nosniff?.value).toBe("nosniff");

      const csp = rootHeader?.headers.find((h) => h.key === "Content-Security-Policy");
      expect(csp?.value).toContain("frame-ancestors 'self' https://momeninvite.web.id");
    }
  });
});
