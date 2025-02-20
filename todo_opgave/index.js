
//Navngivning efter hvad det er. QSL betyder queryselector. Så jeg ved hvor den høre til.
const toDoListQsl = document.querySelector(".to_do_list");
const toDoListDoneQsl = document.querySelector(".to_do_done");

const newTaskInput = document.querySelector(".new_task_input");
const newTaskButton = document.querySelector(".new_task_button");

//Vi vil harvorder 3 objekter - Det er altid en god ide med 3. 
//Jeg har udkommenteret den hardcoded objecter der er skrevet, da jeg ikke får brug for dem mere. 
const toDoArr = [];
// {id: self.crypto.randomUUID(), text:"Gåtur med lille mona", done: false, antal: "0"}, 
// {id: self.crypto.randomUUID(), text:"Ret opgave", done: false, antal: "0"}, 
// {id: self.crypto.randomUUID(), text:"Øv din skala", done: false, antal: "0"}

// Eventlistener til knappen newTaskButton, funktionen addNewTask kaldes
newTaskButton.addEventListener("click", addNewTask);

function addNewTask(){
    //Henter og trimmer brugerens input. 
    const textTask = newTaskInput.value.trim();

    //En alert, som vises hvis textTast er tomt 
    if(textTask === ""){
        alert("Du skal skrive en opgave!");
        return;
    }

    const newTask = {
        //Der bliver genereret et unikt ID pr. opgave.
        id: self.crypto.randomUUID(),
        //Gemmer opgaven brugeren har lavet i en tekst streng
        text: textTask,
        //Opgaven er somudgangspunkt false, hvilket betyder at den pr default står inder todo
        done: false,
        //Fortæller at stk som udgangspunkt er 0, medmindre brugeren selv ændre det.
        quantity: 0,
    };

    //Pusher/tilføjer opgave-objekt til toDoArr som er arrayet.
    toDoArr.push(newTask);
    //Nulstiller inputfeltet, så man selv kan skrive uden at slette den gamle.
    newTaskInput.value = "";
    //Opdatere UI.
    showToDo();
};


//Jeg laver en funktion som skal vise "alt" hvad der er at se og kan gøres på siden.
function showToDo(){
    //Der ryddes op i mine to lister 
    toDoListQsl.innerHTML = "";
    toDoListDoneQsl.innerHTML = "";


    //Den looper igennem todoArr og opretter en li for hver task
    //index er positionen af task i arrayet.
    toDoArr.forEach((task, index) =>{

        //Kreaer li elementer. lister
        const li = document.createElement("li");

        //Vi tilføjer mere html her tilføjer vi også en knap:
        //Vi fortæller altså her hvad der skal vises i html, når der er tilføjet en liste. 
        //Linje 37 Checkbox knap fortæller at hvis task.done er true, indsættes "checked" i strengen, ellers indsættes en tom streng "".

        li.innerHTML += `
        <div class="buttom_h3">
        <input type="checkbox" class="mark_toggle_done" ${task.done ? "checked" : ""}>
        <h3>${task.text}</h3>
        </div>
        <div class="stk_delete">
        <input class="stk" type="number" value="${task.quantity}";>
        <button class="delete_row">❌</button>
        </div>
        `;
        
       
        //Komprimeret if-sætninger (ternary):
        //Tilføjer colorDone, hvis opgaven er færdig (task.done === true).
        // Ellers tilføjer den colorTodo, hvis opgaven ikke er færdig (task.done === false
        li.classList.add(task.done? "colorDone" : "colorTodo")
        //Gemmes i local storage er li et array med objecter.
        //Der lyttes efter click på et li
        li.addEventListener("click", (evt)=>{
            console.log("evt", evt.currentTarget)
            
                    // const currentTarget = evt.currentTarget;
                    //Target er den man klikker på i et elemen listeners
                    const target = evt.target;
                    // console.log("currentTarget", currentTarget);
                    // console.log("target", target);

                    //Event delegation:
                    //Hvis brugeren klikker på checkboxen mark_toggle_done 
                    if(target.classList.contains("mark_toggle_done")){
                        // console.log("JEG HAR KLIKKET PÅ target done");
                    
                    //udråbstegn er det modsatte   
                    //Det vil sige skifter task.done mellem true og false.
                    task.done = !task.done; 
                    // console.log("ToDoArr", toDoArr);

                    //opdatere ui og genkøre
                    showToDo();
                    }
                });

                // Tilføjer task til den rette liste.
                //Så at det kommer til at stå det rigtige sted. 
                if (task.done) {
                    toDoListDoneQsl.appendChild(li);
                } else {
                    toDoListQsl.appendChild(li);
                }

        // Delete-knap, som sletter et element i li ved klik på knappen ved navn delete_row
        const deleteBtn = li.querySelector(".delete_row");
        deleteBtn.addEventListener("click", () => {
            // splice() er en metode i JavaScript, der bruges til at fjerne elementet i et array.
            toDoArr.splice(index, 1); // Fjern elementet fra arrayet
            showToDo(); // Opdater UI igen.
        });

        // Find input-feltet for antal stk i input. 
        const quantityInput = li.querySelector(".stk");
        quantityInput.addEventListener("input", (event) => {
            task.quantity = event.target.value; // Opdaterer objektet med den nye værdi
        });
 });
};



//Vi kalder på funktionen, så den vises i html.
    showToDo();




