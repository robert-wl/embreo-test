import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { Nullable } from "@/lib/type/utils.ts";

export type QueryParams<T> = Partial<UseQueryOptions<Nullable<T>>>;

export type MutationParams<T, R> = Partial<UseMutationOptions<T, Error, R>>;
