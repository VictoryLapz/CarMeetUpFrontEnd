import { NodeCompatibleEventEmitter } from "rxjs/internal/observable/fromEvent";

export interface User {

    userid?: number;
    firstName: string;
    lastName: string;
    email: string | undefined;
    bio: string | undefined;
    carInterests: string | undefined;
}
