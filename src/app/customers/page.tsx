"use client";
import { SupabaseHttpClient } from "@/infra/supa-base-http";
import CustomerLoyaltySystem from "./outro";
import { RemoteAddACliente } from "@/data/usecases/remote-add-cliente";
import { RemoteGetCliente } from "@/data/usecases/remote-get-clients";
import { useUser } from "@clerk/nextjs";
import { RemoteEditCliente } from "@/data/usecases/remote-edit-client";

export default function Customer() {
  const { user } = useUser();
  
  const novo = new SupabaseHttpClient(user?.id);

  const repository = new RemoteAddACliente("customers", novo);
  const getClients = new RemoteGetCliente("customers", novo);
  const editClient = new RemoteEditCliente("customers", novo);
  return (
    <CustomerLoyaltySystem
      editClient={editClient}
      getClients={getClients}
      useCase={repository}
    />
  );
}
