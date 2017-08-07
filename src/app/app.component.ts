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

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  curve: any = shape.curveLinear;

  dataNodes = [
    {
      id: 'start',
      label: 'start',
      x: 10,
      y: 20
    }, {
      id: '1',
      label: 'Query ThreatConnect',
      x: 10,
      y: 20
    }, {
      id: '2',
      label: 'Query XForce',
      x: 10,
      y: 20
    }, {
      id: '3',
      label: 'Format Results',
      x: 10,
      y: 20
    }, {
      id: '4',
      label: 'Search Splunk',
      x: 10,
      y: 20
    }, {
      id: '5',
      label: 'Block LDAP',
      x: 10,
      y: 20
    }, {
      id: '6',
      label: 'Email Results',
      x: 10,
      y: 20
    }
  ];

  dataLinks = [
    {
      source: 'start',
      target: '1',
      label: 'links to'
    }, {
      source: 'start',
      target: '2'
    }, {
      source: '1',
      target: '3',
      label: 'related to'
    }, {
      source: '2',
      target: '4'
    }, {
      source: '2',
      target: '6'
    }, {
      source: '3',
      target: '5'
    }
  ]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // let ravenClient = raven(`http://localhost:8080`, `Neo.Apu`);

    // ravenClient.getDocument('NeoEventMetadatas/1986', function (err, result) {
    //   if (err) console.error(err)
    //   else console.log(result)
    // })

    this.httpClient.get(`${this.documentUrl}?start=0&pageSize=100&query=${this.documentQuery}`)
      .subscribe((results: any[]) => {
        console.log(results);
      });
  }
}
