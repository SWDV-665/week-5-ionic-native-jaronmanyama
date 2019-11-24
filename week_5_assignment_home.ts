import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//Used to update Title of App
  title = "Grocery";
//Used to render grocery list items
  //MOVED THESE ITEMS TO GROCERIES-SERVICE.TS FILE for DEPENDENCY INJECTION

//Reading what was imported above
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }
// returning Items from Groceries-Service.TS file
  loadItems(){
    return this.dataService.getItems();//linked this to getItems function on GROCERY-SERVICES.TS FILE
  }

  //Used to remove grocery items from list
  removeItem(item, index){
    console.log("Removing Item - ", item, index);
    //Toast feature to display message when item removed
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name + "...",
      duration: 3000 //Display for 3 seconds
    });
    toast.present();
    this.dataService.removeItem(index);// calling the Data Service on this line
    //MOVED THE this.items statement to GROCERIES-SERVICES.TS FILE
  }

  //Used to share grocery items from list
  shareItem(item, index){
    console.log("Sharing Item - ", item, index);
    //Toast feature to display message when item is shared
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name + "...",
      duration: 3000 //Display for 3 seconds
    });
    toast.present();

    let message = "Grocery Item - Name : " + item.name + "- Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing", error);
    
    });
    
  }

   //Used to display edited grocery items on list
   editItem(item, index){
    console.log("Edit Item - ", item, index);
    //Toast feature to display message when item edited
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + item.name + "...",
      duration: 3000 //Display for 3 seconds
    });
    toast.present();
    this.inputDialogService.showPrompt(item,index);
  }

  //Used to display newly added grocery items to the list
  addItem(){
    console.log("Adding Item");
    this.inputDialogService.showPrompt();//call function
  }

//MOVED addItemPrompt and showEditItemPrompt into INPUT-DIALOG-SERVICE.TS FILE

}
