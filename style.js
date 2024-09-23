
const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector('.item-list');
const addBtn =document.querySelector("#addItems");
let completedCount = 0;

let todoItems =[];



// 1. Get list from the input field
const getList = function(todoItems){
    itemList.innerHTML = "";  //It will empty sample text

    //This will create new div/item as a list
    todoItems.forEach((item,index) => {
        const newItem = 
            `
                <div class="item w-full flex justify-center my-3 border border-blue-500  bg-white px-5 py-1 rounded-xl hover:bg-blue-100 hover:cursor-pointer">
                        <!-- Number & text -->
                        <div class="item-info flex justify-between items-center gap-4 w-full">
                            <h6 class="item-index border border-grey-300 rounded-xl px-2 bg-yellow-300 font-bold">${index+1}</h6>

                            <p class=" item-name w-3/6">${item}</p>

                            <!-- Three Icons -->
                                <div id="icons" class="item-icon flex gap-3 items-center ">
                                    <i class="fa-solid fa-pen-to-square  cursor-pointer items-icon edit-item text-green-500 hover:text-green-700"></i>
        
                                    <i class="fa-sharp fa-solid fa-circle-check cursor-pointer items-icon text-blue-500 complete-item hover:text-blue-700"></i>
        
                                    <i class="fa-solid fa-trash cursor-pointer items-icon text-red-500 delete-item hover:text-red-700"></i>
                                </div>

                        </div>

                </div>
            `;
        itemList.insertAdjacentHTML("beforeend", newItem);

        const count = document.querySelector(".count"); 
        count.innerHTML = `${todoItems.length} task has been added, ${completedCount} task completed.`
            
    });
        handleItem();  //add event lister to new Items
    };

// 2. Handle Item - when clicked three icons
const handleItem = function (){
    const items = itemList.querySelectorAll(".item");

    items.forEach(item => {
        const itemName = item.querySelector(".item-name").textContent.trim();
        
        // If we click "Complete event" icon
        item.querySelector(".complete-item").addEventListener( "click", () => {
           const itemIndex = item.querySelector(".item-index").classList.toggle("bg-green-500");
           const NameComplete = item.querySelector(".item-name");
           NameComplete.classList.toggle("line-through");

           if (NameComplete.classList.contains("line-through")) {
            completedCount++;
           } else {
            completedCount--;
           }

            const count = document.querySelector(".count"); 
            count.innerHTML = `${todoItems.length} task has been added, ${completedCount} task completed.`
    });

            // If we click "delete event" icon
            item.querySelector(".delete-item").addEventListener("click", () => {
                const index = todoItems.indexOf(itemName);
                
                if (index > -1) {
                    todoItems.splice(index, 1);  // Remove the item from the array
                    setLocalStorage(todoItems);  // Update local storage
                    getList(todoItems);          // Re-render the list
                }
            });


            // If we click "Edit event" icon
            item.querySelector(".edit-item").onclick = () => {
                itemInput.value = itemName;
                itemList.removeChild(item);

                todoItems = todoItems.filter((item) => {
                    return item !== itemName;
                });
                setLocalStorage(todoItems);
            };

        });
};


// 3. Add item to the list
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    const itemName = itemInput.value.trim();   // Get the item input value

    if (itemName === ""){
        alert(`Please type your task here`);
    } else {
        todoItems.push(itemName);  // Add the item to the array
        setLocalStorage(todoItems); // Save to local storage
        getList(todoItems);        // Re-render the list
        itemInput.value = "";      // Clear the input field
    }
});


// 4. Save & load from local storage
const setLocalStorage = (todoItems)=>{
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
};


// 5. Load items from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
        todoItems = JSON.parse(storedItems);
        getList(todoItems);  // Re-render the list with stored items
    }
});











