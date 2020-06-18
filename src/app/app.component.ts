import { Component, VERSION } from "@angular/core";
import { Observable, of } from "rxjs";
import { flatMap, delay } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  ngOnInit() {
    this.myObs()
      .pipe(
        flatMap((result: number) => {
          console.log("result-1", result);
          return fromPromise(this.myPromise(result));
        }),
        flatMap((result: number) => {
          console.log("result-2", result);
          return fromPromise(this.myPromise(result));
        })
      )
      .subscribe((result: number) => {
        console.log("result-3", result);
      });
  }

  myObs() {
    return of(1).pipe(delay(Math.random() * 1000));
  }

  myPromise(number: number) {
    return of(number + 1)
      .pipe(delay(Math.random() * 1000))
      .toPromise();
  }
}
