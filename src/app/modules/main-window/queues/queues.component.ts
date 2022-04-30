import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/services/permission/all-users-role.enum';

@Component({
    selector: 'app-queues',
    templateUrl: './queues.component.html',
    styleUrls: ['./queues.component.scss']
})
export class QueuesComponent implements OnInit {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public UserRole: typeof UserRole = UserRole;
    constructor() {
    }

    ngOnInit(): void {
    }

}
