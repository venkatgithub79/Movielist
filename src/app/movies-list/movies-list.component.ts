import { Component, OnInit, TemplateRef } from '@angular/core';
import { MoviesService } from '../core/services/movies.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  moviesList: any = [];
  pageNumber = 0;
  totalMovies = 10;
  loader = false;
  movieDetails: any = {};
  modalRef?: BsModalRef;

  constructor(private ms: MoviesService, private router: Router, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getMoviesList();
  }

  open(template: TemplateRef<any>, movie: any) {
    this.movieDetails = movie;
		this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
	}

  getMoviesList() {
    this.pageNumber++;
    if (this.pageNumber * 10 <= this.totalMovies) {
      this.loader = true;
      this.ms.getMovies(this.pageNumber).subscribe((res: any) => {
        console.log('getMoviesList', res);
        this.loader = false;
        if (res && res.results) {
          this.totalMovies = res.count;
          this.moviesList = [...this.moviesList, ...res.results];
        }
      }, (error: any) => {
        this.loader = false;
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
