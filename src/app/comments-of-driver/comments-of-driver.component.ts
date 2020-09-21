import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/user';
import { UserService } from '../servises/user.service';
import { Opinion } from '../class/opinion';
import { OpinionService } from '../opinion.service';
import { isNgTemplate } from '@angular/compiler';
import { element } from 'protractor';
import { TravelsService } from '../servises/travels.service';
import { RequestService } from '../servises/request.service';
import { setFlagsFromString } from 'v8';

@Component({
  selector: 'app-comments-of-driver',
  templateUrl: './comments-of-driver.component.html',
  styleUrls: ['./comments-of-driver.component.scss', '../app.component.scss'],
})
export class CommentsOfDriverComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private opinionService: OpinionService,
    private router: Router, private travelService: TravelsService, private requestService: RequestService) {

  }
  driver: User = null;
  thisUser: User;
  stars: number = 1;
  opinionArr: Opinion[] = [];
  click: number;
  travelCodeO: number = null;
  addOpinion: boolean = false;

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(res => {

      // this.opinionService.getOpinionArr(res.get("DriverId")).subscribe(
      //     (opinions)=>{this.opinionArr=opinions},
      //     (e)=>{console.log("errrrr");}
      //   );
      this.userService.getUserById(res.get("DriverId")).subscribe(
        (driver) => {
          this.driver = driver;
          this.travelService.getTravelsById(this.driver.UserId)
            .subscribe(
              (travels) => {
                console.log(travels);
                this.requestService.getRequests().subscribe(
                  (requests) => {
                    this.thisUser = JSON.parse(localStorage.getItem("user"));
                    requests = requests.filter(element => element.UserId == this.thisUser.UserId);
                    requests.forEach(element => {
                      travels.forEach(e => {
                        this.travelCodeO = element.TravelCode && e.TravleCode == element.TravelCode ? e.TravleCode : this.travelCodeO;
                      });
                    });
                  }
                );
              },
              (e) => { console.log('No Travel found!'); }
            );
          this.opinionService.getOpinionArr(this.driver.UserId).subscribe(

            (opinionArr) => {
              console.log(opinionArr);
              this.opinionArr = opinionArr;

            },
            (e) => { console.log("errr"); }
          )
        },
        (e) => { console.log("err: " + e); }
      );
    });

  }

  getClassStar(star: number, item: Opinion): string {
    if (star <= item.Stars)
      return "sT";
    return "sF";
  }

  starsArr: boolean[] = new Array(true, false, false, false, false);
  AddStars(size: number): void {
    this.stars = size + 1;
    for (var i = 0; i <= size; i++)
      this.starsArr[i] = true;
    for (; i < 5; i++)
      this.starsArr[i] = false;
  }

  AddOpinion() {
    this.opinionService.getLastOpinionCode().subscribe(
      (opinionCode) => {
        let summery = (<HTMLInputElement>document.getElementById("summery")).value;
        //let summery="";

        let o: Opinion = new Opinion(opinionCode, this.thisUser.UserId, this.travelCodeO,
          this.driver.UserId, summery, this.stars, false);
        this.opinionService.AddOpinion(o);
        this.addOpinion = false;
      }
    )

  }
  GO() {
    this.router.navigateByUrl("/requests");
  }
}
