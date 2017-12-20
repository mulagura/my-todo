import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { Data } from '../data';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

   public ActivityData: Array<Data>;

   constructor(private dataService:DataService) { }

    ngOnInit() {

        this.dataService.getData()
                        .subscribe( resData => this.ActivityData = resData );
    }

//get method to subscribe data
    getData(){

        this.dataService.getData()
                        .subscribe( resData => this.ActivityData = resData );
    }

//post method
    sendData(data){

        console.log("inside display data");
        console.log(data);

        let newActivityData:Data={
          itemName: data,
          itemDone: false
        }

        this.dataService.postData(newActivityData)
                        .subscribe(resData => this.ActivityData.push(resData));

        this.getData(); // to load get data after sending

    }

//put method to update

    postAndUpdateData(data){

          console.log("insode put");
          console.log(data);

          let update = "This is update one";

          let newActivityData:Data={
            _id:data._id,
            itemName:update,
            itemDone: false
          }

          this.dataService.updateData(newActivityData)
                          .subscribe(resData => newActivityData = resData);

            this.getData(); // to load get data after sending

    }

//delete method
      deleteData(data){

          console.log("inside delete");
          console.log(data);

          let newActivityData = this.ActivityData;

          this.dataService.deleteData(data)
                          .subscribe(resData => {
                  for(let i=0;i<newActivityData.length;i++){
                    if(newActivityData[i]._id === data._id){
                      newActivityData.splice(i,1);
                    }
                  }
                          });

            this.getData();

        }




}
