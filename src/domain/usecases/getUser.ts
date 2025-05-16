export type ClientProps = {
  nome: string;
  email: string;
  telefone: string;
  plano_id: number;
  ativo: boolean;
  tipo_estabelecimento: string;
  subdomain:string
};

export interface GetAccount{
  get:(email: string)=> Promise<ClientProps>;
}