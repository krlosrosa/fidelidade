"use client";
import { SupabaseHttpClient } from "@/infra/supa-base-http";
import OnboardingInput from "./outro";
import { RemoteAddAccount } from "@/data/usecases/remote-add-account";

export default function Onboarding() {
  const novo = new SupabaseHttpClient();
  const repository = new RemoteAddAccount("tenants", novo);
  return <OnboardingInput useCase={repository} />;
}
