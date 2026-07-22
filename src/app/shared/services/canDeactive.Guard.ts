import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { IcanDeactivate } from "../model/canDeactive";

@Injectable({
    providedIn: "root"
})
export class canDeactivatecomponent implements CanDeactivate<IcanDeactivate> {
    canDeactivate(component: IcanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate()
    }


}