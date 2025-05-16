import { AddAccount, ClientProps } from "@/domain/usecases/onboarding";
import { HttpClient, HttpStatusCode } from "../protocol/http/http-client";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ClientProps>,
  ) {}

  async create(params: ClientProps): Promise<ClientProps> {
    console.log(params)
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as ClientProps ;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
