import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
})
export class UserInformationComponent implements OnInit {
  constructor() {}
  @Input() name = '';
  @Input() email = '';
  @Input() mobileNo = '';
  @Input() address = '';
  role = '';
  ngOnInit(): void {
    this.role = (localStorage.getItem('role') ?? 'No Role').replace(
      /['"]+/g,
      ''
    );
  }
  ngOnChanges(): void {
    this.name = this.name.substring(0, this.name.lastIndexOf('@'));
  }
}
