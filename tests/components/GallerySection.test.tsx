import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GallerySection } from "@/components/GallerySection";
import type { GalleryItem } from "@/types/gallery";

const dummyItems: GalleryItem[] = [
  {
    id: "01",
    title: "Momen 1",
    description: "Deskripsi momen 1",
    category: "momen",
    type: "image",
    src: "/images/img1.jpeg",
  },
  {
    id: "02",
    title: "Momen 2",
    description: "Deskripsi momen 2",
    category: "spesial",
    type: "video",
    src: "/images/vid2.mp4",
  },
  {
    id: "03",
    title: "Momen 3",
    description: "Deskripsi momen 3",
    category: "cinta",
    type: "image",
    src: "/images/img3.jpeg",
  },
  {
    id: "04",
    title: "Momen 4",
    description: "Deskripsi momen 4",
    category: "jalan-jalan",
    type: "image",
    src: "/images/img4.jpeg",
  },
];

describe("GallerySection Component", () => {
  it("harus merender seluruh kategori dalam format kapital", () => {
    render(<GallerySection items={dummyItems} />);

    expect(screen.getByRole("button", { name: "Semua" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Momen" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Spesial" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cinta" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Jalan-Jalan" })).toBeInTheDocument();
  });

  it("harus memfilter item saat tombol kategori diklik", () => {
    render(<GallerySection items={dummyItems} />);

    expect(screen.getByText("Momen 1")).toBeInTheDocument();
    expect(screen.getByText("Momen 2")).toBeInTheDocument();
    expect(screen.getByText("Momen 3")).toBeInTheDocument();
    expect(screen.getByText("Momen 4")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Spesial" }));

    expect(screen.getByText("Momen 2")).toBeInTheDocument();
    expect(screen.queryByText("Momen 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Momen 3")).not.toBeInTheDocument();
  });

  it("harus kembali menampilkan seluruh item saat tombol 'Semua' diklik", () => {
    render(<GallerySection items={dummyItems} />);

    fireEvent.click(screen.getByRole("button", { name: "Cinta" }));
    expect(screen.queryByText("Momen 1")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Semua" }));
    expect(screen.getByText("Momen 1")).toBeInTheDocument();
    expect(screen.getByText("Momen 2")).toBeInTheDocument();
  });
});
