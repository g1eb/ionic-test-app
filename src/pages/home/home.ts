import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as moment from 'moment';
import * as d3 from 'd3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  private now = moment().endOf('day').toDate();
  private time_ago = moment().startOf('day').subtract(10, 'year').toDate();
  data = d3.timeDays(this.time_ago, this.now).map((dateElement: any, index: number) => {
    return {
      date: dateElement,
      details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map((e: number, i: number, arr: any) => {
        return {
          'name': 'Project ' + Math.ceil(Math.random() * 10),
          'date': function () {
            var projectDate = new Date(dateElement.getTime());
            projectDate.setHours(Math.floor(Math.random() * 24))
            projectDate.setMinutes(Math.floor(Math.random() * 60));
            return projectDate;
          }(),
          'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
        }
      }),
      init: function () {
        this.total = this.details.reduce((prev: number, e: any) => {
          return prev + e.value;
        }, 0);
        return this;
      }
    }.init();
  });

  color = '#cd2327';
  overview = 'year';

}
