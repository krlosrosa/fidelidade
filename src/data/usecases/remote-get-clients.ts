
import { HttpClient, HttpStatusCode } from "../protocol/http/http-client";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { GetClientes, GetClientesParams, GetClientProps } from "@/domain/usecases/getClientes";

export class RemoteGetCliente implements GetClientes {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetClientProps[]>,
  ) {}

  async getClientes(params: GetClientesParams): Promise<GetClientProps[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as GetClientProps[] ;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
