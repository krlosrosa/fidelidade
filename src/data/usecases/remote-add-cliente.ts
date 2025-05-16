import { HttpClient, HttpStatusCode } from "../protocol/http/http-client";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { AddCliente, AddClientProps } from "@/domain/usecases/addClient";

export class RemoteAddACliente implements AddCliente {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddClientProps>,
  ) {}

  async addClient(params: AddClientProps): Promise<AddClientProps> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as AddClientProps ;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
