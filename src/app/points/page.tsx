"use client";
import { SupabaseHttpClient } from "@/infra/supa-base-http";
import { useUser } from "@clerk/nextjs";
import { RemoteAddPoints } from "@/data/usecases/remote-add-points";
import AdicionarPontosPage from "./outros";
import { Suspense } from "react";

export default function PagePoints() {
  const { user } = useUser();
  const novo = new SupabaseHttpClient(user?.id);
  const repository = new RemoteAddPoints("loyalty_points", novo);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdicionarPontosPage addPoints={repository} />
    </Suspense>
  );
}
