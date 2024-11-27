import { LightningElement } from 'lwc';

export default class ToDoApplication extends LightningElement {
    taskname = '';
    taskdate = null;
    incompleteTask = [];
    completedTask = [];
    changeHandler(event){
        let {name,value} = event.target;
        //name attribute of html is used to store the value of task name and date
        if(name === 'taskname'){
            this.taskname = value;
        }else if (name === 'taskdate'){
            this.taskdate = value;
        }

    }

    resetHandler(){
        //value attribute is used to reset the value of the task
        this.taskname = "";
        this.taskdate = null;

    }

    addTaskHandler(){
        //if end date is missing, then populate todays date
        if(!this.taskdate){
        this.taskdate = new Date().toISOString().slice(0,10);
        }   
        // spread operator is used to push the task into incomplete task array
        if(this.validateTask()){
            this.incompleteTask = [...this.incompleteTask,
                {
            taskname : this.taskname,
            taskdate : this.taskdate
        }
    ];
        this.resetHandler();
        let sortedArray =  this.sortTaskDate(this.incompleteTask);
        this.incompleteTask = [...sortedArray];
       console.log('this.incompleteTask', this.incompleteTask);
    }
    }

    validateTask(){
        let isValid = true;
        //element will capture the property of the taskname so that we can show the error when the task name is invalid
        let element = this.template.querySelector(".taskname");

        //if task name is empty
        if(!this.taskname ){
            isValid = false;

            }else{
            // if find method, will find an item in an array it will return task item if not found, remains undefined
            let taskItem =  this.incompleteTask.find(
                (currItem) =>
                    currItem.taskname === this.taskname &&
                    currItem.taskdate === this.taskdate
            );
        
            if (taskItem){
                isValid=false;
                // this is done to check if the same task is entered again
                element.setCustomValidity('Task is already avaible');

            }
        }
            if (isValid){
                element.setCustomValidity("");
            }
            element.reportValidity(); // this is done to display the error message on the UI
            return isValid;
        }

    sortTaskDate(inputArr){
       let sortedArray =  inputArr.sort((a,b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return  dateA - dateB;
        });

        return sortedArray;
    }

    removeHandler(event){
        console.log('enter removeHandler');
        //remove current item from incomplete task array 
        let index = event.target.name;
        console.log('enter index');
        this.incompleteTask.splice(index,1);
        let sortedArray =  this.sortTaskDate(this.incompleteTask);
        console.log('enter sortedArray');
        this.incompleteTask = [...sortedArray];
       console.log('this.incompleteTask after removal', this.incompleteTask);

        }

        completeHandler(event){
        //remove the incomplete task item
        console.log('enter completeHandler', this.incompleteTask);
        let index = event.target.name;
            this.refreshData(index);
    }

    dragStartHandler(event){
    
        event.dataTransfer.setData("index",event.target.dataset.Item); // index name can be anything

    }

    dragOverHandler(event){
        event.preventDefault();
    }

    dropElementHandler(event){
        let index = event.dataTransfer.getData("index");
        this.refreshData(index);
    }

    refreshData(index){
        let removeItem = this.incompleteTask.splice(index,1); //splice always return a array
        let sortedArray =  this.sortTaskDate(this.incompleteTask);
        console.log('enter sortedArray');
        this.incompleteTask = [...sortedArray];
       console.log('this.incompleteTask for final complete task', this.incompleteTask);
        //add the same entry in complete item
        this.completedTask = [...this.completedTask,removeItem[0]];
    }
    }

