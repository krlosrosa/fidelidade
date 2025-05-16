// src/infrastructure/http/supabase-http-client.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from "@/data/protocol/http/http-client";


export class SupabaseHttpClient implements HttpClient {
  private readonly supabase: SupabaseClient;

  constructor(
    supabaseUrl: string,
    private readonly tenant_id?: string,
  ) {
    this.supabase = createClient(supabaseUrl, process.env.SUPA_BASE_KEY || '');
  }

  async request<R = any>(data: HttpRequest): Promise<HttpResponse<R>> {
    console.log(data)
    try {
      let response: any;

      switch (data.method) {
        case "get":
          response = await this.supabase.from(data.url).select('*').eq('tenant_id',  this.tenant_id)
          break;
        case "post":
          response = await this.supabase.from(data.url).insert(data.body);
          break;
        case "put":
          response = await this.supabase
            .from(data.url)
            .update(data.body)
            .eq("id", data.body.id);
          break;
        case "delete":
          response = await this.supabase
            .from(data.url)
            .delete()
            .eq("id", data.body.id);
          break;
        default:
          throw new Error(`Método HTTP não suportado: ${data.method}`);
      }

      if (response.error) {
        return {
          statusCode: this.mapSupabaseErrorToHttpStatus(response.error),
          body: response.error,
        };
      }

      return {
        statusCode: HttpStatusCode.ok,
        body: response.data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.serverError,
        body: error as any,
      };
    }
  }

  private mapSupabaseErrorToHttpStatus(error: any): HttpStatusCode {
    // Mapeamento de erros do Supabase para códigos HTTP
    if (error.code === "23505") {
      // Violação de chave única
      return HttpStatusCode.badRequest;
    }
    if (error.code === "42501") {
      // Não autorizado
      return HttpStatusCode.unauthorized;
    }
    if (error.code === "42502") {
      // Proibido
      return HttpStatusCode.forbidden;
    }
    if (error.code === "42703") {
      // Coluna não existe
      return HttpStatusCode.badRequest;
    }
    return HttpStatusCode.serverError;
  }
}
