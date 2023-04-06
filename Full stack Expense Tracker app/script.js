var flag=true;
var id;

   window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:3000/expense')
    .then((response)=>{
       
        for(let i=0;i<response.data.length;i++)
        {
            showexpenseonscreen(response.data[i])
        }

    })
    .catch((error)=>{console.log(error)})
   
   
})




   function userdetails(event)
{
    event.preventDefault();
    const expenseamount=event.target.expenseamount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    
   const obj={
        expenseamount,
        description,
        category
    }
    console.log(obj)
    
    if(flag)
{

   axios.post('http://localhost:3000/expense',obj)
    .then((response)=>{
       showexpenseonscreen(response.data)
       console.log(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
   
}
else{
    axios.put(`http://localhost:3000/expense/edit-expense/${id}`,{
    "expenseamount":expenseamount,
    "description":description,
    "category":category
   })
     .then(()=>{
        let obj2={
    "expenseamount":expenseamount,
    "description":description,
    "category":category,
    "id":id
   }

        
        showexpenseonscreen(obj2)
        
      })
     .catch((err)=>{
        console.log(err)
      })
      flag=true; 
}

    // let newobj=JSON.stringify(obj)
}

function showexpenseonscreen(obj)
{
    const parentElem=document.getElementById('itemlist')
    const childElem=document.createElement('li')
    childElem.textContent=obj.expenseamount+'-'+obj.description+'-'+obj.category;

    const deleteButton=document.createElement('input')
    deleteButton.type='button'
    deleteButton.className='btn btn-danger btn-sm my-2'
    deleteButton.value='Delete'
    deleteButton.onclick=()=>{
     parentElem.removeChild(childElem);
     axios.delete(`http://localhost:3000/expense/delete-expense/${obj.id}`)
    .then((response)=>{
     console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
    

    }

    const editButton=document.createElement('input')
    editButton.type='button'
    editButton.className='btn btn-secondary btn-sm mx-2 my-2'
    editButton.value='Edit'
    editButton.onclick=()=>{
        
        
        document.getElementById('expenseamount').value=obj.expenseamount;
        document.getElementById('description').value=obj.description;
        document.getElementById('category').value=obj.category;

       
        parentElem.removeChild(childElem);
        flag=false;
        id=obj.id; 
    }

    childElem.appendChild(editButton);
    childElem.appendChild(deleteButton);
    parentElem.appendChild(childElem);
}

