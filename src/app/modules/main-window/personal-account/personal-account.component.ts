import { Component, OnInit } from '@angular/core';
import { TestLifeTimeService } from "../../../services/test-life-time/test-life-time.service";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss']
})
export class PersonalAccountComponent implements OnInit {

  constructor(test: TestLifeTimeService) { }

  ngOnInit(): void {
  }

}
