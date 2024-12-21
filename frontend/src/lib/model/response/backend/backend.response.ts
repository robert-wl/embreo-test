import { BackendErrorResponse } from "@/lib/model/response/backend/error.response.ts";

export type BackendResponse<T> = Promise<APIResponse<T>>;

type APIResponse<T> = [T, null] | [null, BackendErrorResponse];
