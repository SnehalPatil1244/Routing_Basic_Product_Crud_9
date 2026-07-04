import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../model/fairs';
import { FairsService } from '../../services/fairs.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
  fairsId !: string
  fairsObj !: Ifairs

  constructor(private fairservice: FairsService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe((param: Params) => {
      this.fairsId = param['fairsId']
      if (this.fairsId) {
        this.fairservice.fetchfairsById(this.fairsId)
          .subscribe({
            next: res => {
              this.fairsObj = res
            },
            error: err => {
              console.log(err);

            }
          })
      }

    })
  }

}
