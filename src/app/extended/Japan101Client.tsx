"use client";
import { Japan101 } from "@/components/extended/Japan101";
import type { ExtendedPracticalTips } from "@/types/trip";

export function Japan101Client({ tips, dietaryReminder }: { tips: ExtendedPracticalTips; dietaryReminder: string }) {
  return <Japan101 tips={tips} dietaryReminder={dietaryReminder} />;
}
