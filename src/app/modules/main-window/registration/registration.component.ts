import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/services/permission/all-users-role.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
// eslint-disable-next-line @typescript-eslint/naming-convention
    public UserRole: typeof UserRole = UserRole;
  constructor() { }

  ngOnInit(): void {
  }

}
