import { HttpClient, HttpStatusCode } from "../protocol/http/http-client";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { EditCliente, EditClientProps } from "@/domain/usecases/editClient";

export class RemoteEditCliente implements EditCliente {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<EditClientProps>,
  ) {}

  async editClient(params: EditClientProps): Promise<EditClientProps> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as EditClientProps ;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
