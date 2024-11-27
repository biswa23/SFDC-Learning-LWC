//25 session
import { LightningElement,wire, api } from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';
const DELAY = 300;
export default class CustomLookup extends LightningElement {
 
    @api apiName = "Account";
    searchValue;
    @api objectLabel = "Account";
    @api iconName = "standard:account";
    delayTimeout;
    selectedRecord = {
        selectedId : '',
        selectedName : ''
    }
    displayOptions = false;

    // pass the method in the form of object to pass the object name and key
    // wire is called when a parameter is called or loaded 
    // wire will also be called as soon as possoble the parameter is changed
    //we have to define the reactive parameter
    @wire(searchRecords, 
        {
            apiName : '$apiName',
            searchKey: '$searchValue'
        }) outputs;

        // get showOutput(){
        //     return this.output.data;
        // }

        get isRecordSelected(){
            return this.selectedRecord.selectedId === "" ? false : true;
        }
    

        changeHandler(event){
            window.clearTimeout();
           let enteredValue =  event.target.value;
            //debouncing- when we are working with a large amount of data
        //we need to make sure that the data is not called too many times
        //debounce will wait for a certain time to make sure that the data is not called too many times
        //this.debounce(()=>{
           this.delayTimeout = setTimeout(() => {
            this.searchValue = enteredValue;
            this.displayOptions = true;
         }, DELAY);
    }
    
    clickHandler(event){
        let selectedID = event.currentTarget.dataset.item;
        console.log('selectedID', selectedID);
        let outputRecord = this.outputs.data.find((currentItem) => currentItem.Id === selectedID);
        console.log('outputRecord', outputRecord);
        this.selectedRecord = {
            selectedId : outputRecord.Id,
            selectedName :outputRecord.Name
        };
        this.displayOptions = false;
    }
    removalSelection(event){
        this.selectedRecord = {
            selectedId : "",
            selectedName : ""
        };
        this.displayOptions = false;
    }

}





// outputsFunction({data, error}){
//     if(data){
//         console.log('data' , data);
//     }else if(error){
//         console.log(error)
//     }
// }