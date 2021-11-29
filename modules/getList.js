function toDoList() {

}


toDoList.prototype.getList = async function (id){
let url= "/showToDoList?id=" + id;
return new Promise(async function(resolve, reject){
    try{
        let response = await fetch(url);

        if(response.status == 500) {
            throw("server error");
        }

        let data= await response.json();
        resolve(data);
    } 
    catch(error){
        reject (error);
    }
});
}
