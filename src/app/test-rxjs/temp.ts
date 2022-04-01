import { catchError, firstValueFrom, map, Observable, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { IUser } from "../models/user-model.interface";

type UserRole = "admin" | "operator" | "client";


interface IAuthData {
    login: string,
    password: string
}

interface ILogInSuccessData {
    token: string,
    id: string,
    role: UserRole
}

class SomeService {
    constructor(private _httpClient: HttpClient, private _router: Router) {
    }

    //Надо переписать этот метод без async, используя RxJs
    public async logInAsync(authData: IAuthData): Promise<boolean> {
        try {
            const response = await firstValueFrom(this._httpClient.post<ILogInSuccessData>
            ("https://localhost:44315/api/auth/login", authData));
            localStorage.setItem("token", response.token);
            localStorage.setItem("id", response.id);
            localStorage.setItem("role", response.role);

            return true;
        } catch (e) {
            const responseError = e as HttpErrorResponse;
            if (responseError.status === 401) {
                return false;
            }
            console.log("ошибка login, обработчик catch(e)");
            console.log(responseError);
            this._router.navigate(["error_page"]);
            return false;
        }
    }

    // У меня получился такой гавнокод

    public logIn(authData: IAuthData): Observable<any> {
        const stream$ = this._httpClient.post<ILogInSuccessData>
        ("https://localhost:44315/api/auth/login", authData);

        return stream$.pipe(
            catchError(err => {
                debugger;
                const responseError = err as HttpErrorResponse;
                if (responseError.status === 401){
                    return of(false);
                }
                console.log("ошибка login, обработчик catchError");
                console.log(responseError);
                this._router.navigate(["error_page"]);

                return of();
            }),
            map(response => {
                debugger;
                if (response) {
                    response = response as ILogInSuccessData;
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("id", response.id);
                    localStorage.setItem("role", response.role);

                    return true;
                }

                return false;
            })
        );
    }

    //как переписать нормально?
}
