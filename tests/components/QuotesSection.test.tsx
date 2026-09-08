import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuotesSection } from "@/components/QuotesSection";
import type { Quote } from "@/types";

const dummyQuotes: Quote[] = [
  { id: 1, text: "Kutipan pertama cinta kita" },
  { id: 2, text: "Kutipan kedua selalu indah" },
  { id: 3, text: "Kutipan ketiga selamanya bersama" },
];

describe("QuotesSection Component", () => {
  it("harus merender seluruh kutipan dalam slider track horizontal", () => {
    render(<QuotesSection quotes={dummyQuotes} />);

    expect(screen.getByText(/Kutipan pertama cinta kita/i)).toBeInTheDocument();
    expect(screen.getByText(/Kutipan kedua selalu indah/i)).toBeInTheDocument();
    expect(screen.getByText(/Kutipan ketiga selamanya bersama/i)).toBeInTheDocument();
  });

  it("harus menyediakan tombol panah navigasi kiri dan kanan", () => {
    render(<QuotesSection quotes={dummyQuotes} />);

    expect(screen.getByRole("button", { name: /Kutipan sebelumnya/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kutipan berikutnya/i })).toBeInTheDocument();
  });

  it("harus berpindah ke kutipan berikutnya saat tombol panah kanan diklik", () => {
    render(<QuotesSection quotes={dummyQuotes} />);

    const nextBtn = screen.getByRole("button", { name: /Kutipan berikutnya/i });
    fireEvent.click(nextBtn);

    // Indikator slide 2 aktif
    const dots = screen.getAllByRole("button", { name: /Go to quote/i });
    expect(dots[1]).toHaveClass("w-8");
  });

  it("harus berpindah kutipan saat di-swipe touch", () => {
    render(<QuotesSection quotes={dummyQuotes} />);
    const sliderContainer = screen.getByTestId("quotes-slider");

    // Simulasi swipe ke kiri (swipe next)
    fireEvent.touchStart(sliderContainer, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(sliderContainer, { touches: [{ clientX: 100 }] }); // beda 100px > threshold 40px
    fireEvent.touchEnd(sliderContainer, { changedTouches: [{ clientX: 100 }] });

    const dots = screen.getAllByRole("button", { name: /Go to quote/i });
    expect(dots[1]).toHaveClass("w-8");
  });
});
