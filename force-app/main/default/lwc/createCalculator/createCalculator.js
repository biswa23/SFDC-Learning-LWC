import { LightningElement } from 'lwc';

export default class CreateCalculator extends LightningElement {
    numberOne= '';
    numberTwo = '';
    result = 0;
    displayOutput = false;
    // changeNumberOne (event){
    //     this.numberOne = event.target.value;
    //     console.log('numberOne' ,this.numberOne);
    // }

    // changeNumberTwo (event){
    //     this.numberTwo = event.target.value;
    //     console.log('numberTwo' ,this.numberTwo);
    // }

    changeNumber(event){
      // let name = event.target.name;
      // let value = event.target.value;
//OR
      let { name, value} = event.target;

      if(name === "numberOne"){
        this.numberOne = value;
        console.log('this.numberOne', this.numberOne);
      }else if(name === "numberTwo"){
        this.numberTwo = value;
        console.log('this.numberTwo', this.numberTwo);
      }

    }

//BEST PRACTICE METHOD
    calculateInput(event){
        this.displayOutput = true;
        let lablelelement = event.target.label;
        console.log('this.lablelelement', this.lablelelement);
        if(lablelelement === "Add"){
            this.result = parseInt(this.numberOne) + parseInt(this.numberTwo);
        }else if(lablelelement === "Subtract"){
            this.result = parseInt(this.numberOne) - parseInt(this.numberTwo);
        }else if(lablelelement === "Multiply"){
            this.result = parseInt(this.numberOne) * parseInt(this.numberTwo);
        }else if(lablelelement === "Divide"){
            this.result = parseInt(this.numberOne) / parseInt(this.numberTwo);
        }
        console.log('this.numberOne', this.numberOne);
        console.log('this.numberTwo', this.numberTwo);
        this.numberOne = "";
        this.numberTwo = "";

    }
    //OR 
    // addHandler(){
    //    this.result = parseInt(this.numberOne) + parseInt(this.numberTwo);
    // }
    // subHandler(){
    //     this.result = parseInt(this.numberOne) - parseInt(this.numberTwo);
    // }

    // mulHandler(){
    //     this.result = parseInt(this.numberOne) * parseInt(this.numberTwo);
    // }
    // divHandler(){
    //     this.result = parseInt(this.numberOne) / parseInt(this.numberTwo);
    // }

}