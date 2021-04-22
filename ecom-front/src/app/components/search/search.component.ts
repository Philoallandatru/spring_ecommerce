import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    // console.log(`value=${value}`);å
    
    // route the data to search route, and it will be handled by ProductListCom..
    this.router.navigateByUrl(`/search/${value}`);
  }

}
