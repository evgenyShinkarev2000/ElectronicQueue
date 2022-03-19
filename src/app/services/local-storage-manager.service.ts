import { Injectable } from '@angular/core';
import { IUserAuthData, UserRoleType } from "./user-auth-data.interface";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageManagerService {

    public static tokenGetter(): string {
        return localStorage.getItem("token");
    }

    constructor() {
    }

    public saveUserAuthData(data: IUserAuthData): void {
        Object.keys(data).forEach((key) => {
            // как задать тип key при вызове?
            if (!data?.[key as keyof IUserAuthData]) {
                throw new Error("Попытка сохранить в локальное хранилище пустое значение с ключом " + key);
            }
            localStorage.setItem(key, data[key as keyof IUserAuthData]);
        });
    }

    public loadUserAuthData(): IUserAuthData {
        try {
            return {
                id: this.loadItem("id"),
                role: <UserRoleType>this.loadItem("role"),
                token: this.loadItem("token")
            };
        } catch {
            return null;
        }
    }

    public clearLocalStorage(): void {
        localStorage.clear();
    }

    private loadItem(key: string): string {
        if (!key.trim()) {
            throw new Error("Попытка получить значение из локального хранилища по пустому ключу");
        }

        return localStorage.getItem(key);
    }

    private setItem(key: string, value: string): void {
        if (!key.trim()) {
            throw new Error("Попытка сохранить в локальное хранилище значение с пустым ключом");
        }
        if (!value.trim()) {
            throw new Error("Попытка сохранить в локальное хранилище пустое значение с ключом " + key);
        }

        localStorage.setItem(key, value);
    }

    private removeItem(key: string): void {
        if (!key.trim()) {
            throw new Error("Попытка удалить из локального хранилища значение по пустому ключу");
        }

        localStorage.removeItem(key);
    }

}
