import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'tt-infinite-scroll',
  imports: [],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss',
})
export class InfiniteScrollComponent implements OnInit{
  loaded = output()
  ngOnInit() {
    this.loaded.emit()
  }
}
