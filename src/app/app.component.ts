import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as  raven from 'ravendb';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  databaseUrl = `http://localhost:8080`;
  documentUrl = `${this.databaseUrl}/databases/Neo.Apu/indexes/dynamic/NeoEventMetadatas`;
  documentQuery = `ProcessingContextKey:DE100257/2017-01-01`;

  view: any[] = [1024, 768];
  curve: any = shape.curveLinear;
  dataNodes = [];

  // dataLinks = [
  //   {
  //     source: 'start',
  //     target: '1',
  //     label: 'links to'
  //   }, {
  //     source: 'start',
  //     target: '2'
  //   }, {
  //     source: '1',
  //     target: '3',
  //     label: 'related to'
  //   }, {
  //     source: '2',
  //     target: '4'
  //   }
  // ]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // let ravenClient = raven(`http://localhost:8080`, `Neo.Apu`);

    // ravenClient.getDocument('NeoEventMetadatas/1986', function (err, result) {
    //   if (err) console.error(err)
    //   else console.log(result)
    // })

    this.httpClient.get(`${this.documentUrl}?start=0&pageSize=100&query=${this.documentQuery}`)
      .subscribe((results: any) => {
        console.log(results);
        let i = 0;
        this.dataNodes = results.Results.map((obj) => {
          i = i + 1;
          const dataNode = {
            id: i.toString(),
            label: obj.EventName,
            time: obj.LogTimestamp,
            task: obj.TaskId,
            x: 1,
            y: 1
          };
          return dataNode;
        });
        console.log(this.dataNodes);
      });
  }
}
