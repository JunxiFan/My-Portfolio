import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { SearchItem} from './itunes.model';

//https://codecraft.tv/courses/angular/http/http-with-observables/
@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';

  constructor(private http: Http) {
  }

  search(term: string): Observable<SearchItem[]> {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    return this.http.get(apiURL)
        .map(res => {
          return res.json().results.map(item => {
            return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
            );
          });
        });
  }
}