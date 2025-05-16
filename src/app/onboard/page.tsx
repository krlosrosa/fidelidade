'use client'
import { SupabaseHttpClient } from "@/infra/supa-base-http";
import OnboardingInput from "./outro";
import { RemoteAddAccount } from "@/data/usecases/remote-add-account";


export default function Onboarding() {
  const novo = new SupabaseHttpClient('https://ivubxlbpotpngoffndfm.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dWJ4bGJwb3RwbmdvZmZuZGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNTM2NzgsImV4cCI6MjA2MjgyOTY3OH0.nejYLomMfcc4zZsRR5ogO2pR6EaxOhX1YTK8dZNkDXU')
  const repository = new RemoteAddAccount('tenants', novo)
  return <OnboardingInput useCase={repository}/>
}