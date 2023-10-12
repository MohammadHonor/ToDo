let form=document.getElementById("form")
let textInput=document.getElementById("textInput")
let errmsg=document.getElementById("msg")
let dateInput=document.getElementById("dateInput")
let textArea=document.getElementById("textArea")
let add=document.getElementById("add")
let taskContainer=document.getElementById("taskContainer")
let tasks=[];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
})

let formValidation=()=>{
    if(textInput.value===""){
        console.log("failed")
        errmsg.innerText="Text can not be blank"
    }
    else{
        //console.log("success")
        errmsg.innerText=""
        saveData();
        add.setAttribute("data-bs-dismiss","modal")
        add.click(()=>{
            add.setAttribute("data-bs-dismiss","")
        })

    }
}
let saveData=()=>{
    tasks.push({
        title:textInput.value,
        date:dateInput.value,
        description:textArea.value
    })
    //console.log(tasks)
    localStorage.setItem("task",JSON.stringify(tasks))
    showTask()
}

let showTask=()=>{
    taskContainer.innerHTML="";
    tasks.map((task,idx)=>{
        return(taskContainer.innerHTML+=`<div class="task_id" id="${idx}">
        <b id="title" >${task.title}</b>
        <span id="date">${task.date}</span>
        <p id="description">${task.description}</p>
      <span id="icon">
      <i class="fa-regular fa-pen-to-square" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#exampleModal" ></i>
        <i class="fa-solid fa-trash-can" onclick="deleteTask(this)" ></i>
        
      </span> 
    </div> `)
        
    })
    resetForm();
}
let resetForm=()=>{
    textInput.value=""
    dateInput.value=""
    textArea.value=""
}
let deleteTask=(e)=>{
console.log(e.parentElement.parentElement)
//it remove from the ui
e.parentElement.parentElement.remove();
//it remove the array element
tasks.splice(e.parentElement.parentElement.id,1)
localStorage.setItem("task",JSON.stringify(tasks))
}
let editTask=(e)=>{
  //console.log(e.parentElement.children)
  let selectedTask=e.parentElement.parentElement.children
  textInput.value=selectedTask[0].innerHTML;
  dateInput.value=selectedTask[1].innerHTML;
  textArea.value=selectedTask[2].innerHTML;
  deleteTask(e);
  console.log(tasks)
}

