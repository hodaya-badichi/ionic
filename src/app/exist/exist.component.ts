import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exist',
  templateUrl: './exist.component.html',
  styleUrls: ['./exist.component.scss'],
})
export class ExistComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }
id:number
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res=>
      this.id= Number(res.get("id")) );
  }

}
