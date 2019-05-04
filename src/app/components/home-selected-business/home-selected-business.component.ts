import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-selected-business',
  templateUrl: './home-selected-business.component.html',
  styleUrls: ['./home-selected-business.component.css']
})
export class HomeSelectedBusinessComponent implements OnInit {
  @Input() selectedBusiness;
  constructor() { }

  ngOnInit() {
  }

}
