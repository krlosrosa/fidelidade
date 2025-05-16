'use client'
import { SupabaseHttpClient } from "@/infra/supa-base-http";
import { useUser } from "@clerk/nextjs";
import { RemoteAddPoints } from "@/data/usecases/remote-add-points";
import AdicionarPontosPage from "./outros";

export default function PagePoints() {
    const { user } = useUser();
  const novo = new SupabaseHttpClient(process.env.URL_SUPA_BASE || '', user?.id)
  const repository = new RemoteAddPoints('loyalty_points', novo)
  return <AdicionarPontosPage addPoints={repository} />
}