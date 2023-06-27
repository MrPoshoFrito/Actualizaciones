import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerAmigos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Amigos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre: string;
  readonly apellido: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAmigos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Amigos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre: string;
  readonly apellido: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Amigos = LazyLoading extends LazyLoadingDisabled ? EagerAmigos : LazyAmigos

export declare const Amigos: (new (init: ModelInit<Amigos>) => Amigos) & {
  copyOf(source: Amigos, mutator: (draft: MutableModel<Amigos>) => MutableModel<Amigos> | void): Amigos;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre: string;
  readonly apellido: string;
  readonly codigo: string;
  readonly sub?: string | null;
  readonly Amigos?: (Amigos | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre: string;
  readonly apellido: string;
  readonly codigo: string;
  readonly sub?: string | null;
  readonly Amigos: AsyncCollection<Amigos>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}