import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyQueueComponent } from "./my-queue/my-queue.component";
import { AllQueueComponent } from "./all-queue/all-queue.component";
import { CreateQueueComponent } from "./create-queue/create-queue.component";
import { CreateDayComponent } from "./create-queue/create-day/create-day.component";
import { QueuesComponent } from "./queues.component";

const routes: Routes = [
    {
        path: "",
        component: QueuesComponent,
        children: [
            {
                path: "my",
                component: MyQueueComponent
            },
            {
                path: "all",
                component: AllQueueComponent
            },
            {
                path: "create",
                component: CreateQueueComponent,
                children: [
                    {
                        path: "day",
                        component: CreateDayComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QueuesRoutingModule {
}
