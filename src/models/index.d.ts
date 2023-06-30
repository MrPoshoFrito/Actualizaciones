import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerLocation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Location, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userLocation?: User | null;
  readonly untitledfield?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly locationUserLocationId?: string | null;
}

type LazyLocation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Location, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userLocation: AsyncItem<User | undefined>;
  readonly untitledfield?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly locationUserLocationId?: string | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location) & {
  copyOf(source: Location, mutator: (draft: MutableModel<Location>) => MutableModel<Location> | void): Location;
}

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