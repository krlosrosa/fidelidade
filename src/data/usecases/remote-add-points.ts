import { HttpClient, HttpStatusCode } from "../protocol/http/http-client";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { AddPoints, AddPointsProps } from "@/domain/usecases/addPoints";

export class RemoteAddPoints implements AddPoints {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddPointsProps>,
  ) {}

  async addPoints(params: AddPointsProps): Promise<AddPointsProps> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as AddPointsProps ;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
