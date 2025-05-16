export type ClientProps = {
  nome: string;
  email: string;
  telefone: string;
  plano_id: number;
  ativo: boolean;
  tipo_estabelecimento: string;
  subdomain:string
  clerk_id: string
};

export interface AddAccount {
  create: (client: ClientProps) => Promise<ClientProps>;
}
