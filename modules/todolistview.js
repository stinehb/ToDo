function createView() {
    let container = document.createElement("div");
    container.classList.add("todolistview");

    container.refresh = function(data){
        for(let value of data){
            let myDiv= document.createElement("div");

            myDiv.classList.add("item");
            myDiv.innerHTML = value.updata.content || value.content;
            container.appendChild(myDiv);

            
        }
    }
    return container;
}