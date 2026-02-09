import type { Metadata } from "next";
import Link from "next/link";
import { StampBook } from "@/components/fun/StampBook";

export const metadata: Metadata = {
  title: "Stamp Rally",
  description: "Collect ekistamp-style stamps as you explore Japan 2026.",
};

export default function StampsPage() {
  return (
    <>
      <Link href="/" className="map-back">
        &larr; Back
      </Link>
      <StampBook />
    </>
  );
}
