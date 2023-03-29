const taskinput=document.querySelector(".task-input input");
const filters=document.querySelectorAll(".filter span");
const taskbox=document.querySelector(".task-box");
let editid;
let iseditedtask=false;

let todos=JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showtodo(btn.id);
    });
});

function showtodo(filter1){
    let li="";
    if(todos){
        todos.forEach((todo,id) => {
            let iscompleted=todo.status == "completed" ? "checked" : "";
            if(filter1==todo.status || filter1=="all"){
                li+=`<li class="task"> 
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}"${iscompleted}>
                        <p class="${iscompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul class="task-menu">
                            <li onclick="edittask(${id},'${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                            <li onclick="deletetask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }
            
        });
    }
    taskbox.innerHTML=li || `<span>You don't have any task here</span>`;
}
showtodo("all");

function showMenu(selectedtask){
    let taskmenu=selectedtask.parentElement.lastElementChild;
    taskmenu.classList.add("show");
    document.addEventListener("click",e=>{
        if(e.target.tagName !="I" || e.target != selectedtask){
            taskmenu.classList.remove("show");
        }
    })
}

function edittask(taskid,taskname){
    editid=taskid;
    iseditedtask=true;
    taskinput.value=taskname;
}

function deletetask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showtodo("all");
}

function updateStatus(selectedtask){
    let taskname=selectedtask.parentElement.lastElementChild;
    if(selectedtask.checked){
        taskname.classList.add("checked");
        todos[selectedtask.id].status="completed";
    }
    else{
        taskname.classList.remove("checked");
        todos[selectedtask.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskinput.addEventListener("keyup",e=>{
    let usertask = taskinput.value.trim();
    if(e.key=="Enter" && usertask){
        if(!iseditedtask){
            if(!todos){
                todos=[];
            }
            let taskinfo={name:usertask,status:"pending"};
            todos.push(taskinfo);
        }
        else{
            iseditedtask=false;
            todos[editid].name=usertask;
        }
        taskinput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showtodo("all");
    }
})

