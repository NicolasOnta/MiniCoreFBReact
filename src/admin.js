import React, { useState, useEffect } from 'react';
import { db } from "./firebase-conf";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

function CRUDComponent() {
    const [contractName, setContractName]=useState("");
    const[customerName,setCustomerName]=useState("");
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [contractID,setContractID]=useState("");
  const [customerID, setCustomerID]=useState("");
  const[foundContracts, setFoundContracts]=useState([]);
  const [searchedDate, setSearchedDate]=useState();
  const[amount,setAmount]=useState();
  const[date,setDate]=useState();
  const [contractAssignations, setContractAssignations] = useState([]);
  const contractCollectionRef = collection(db, "contract");
  const customerCollectionRef = collection(db, "customer");
  const contractAssignationCollectionRef = collection(db, "contractAssignation");

  const loadData=()=> {
    const getComponents = async () => {
        const data = await getDocs(contractCollectionRef);
        const appData = await getDocs(customerCollectionRef);
        const notaData = await getDocs(contractAssignationCollectionRef);
        setContracts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setCustomers(appData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setContractAssignations(notaData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
      getComponents();
  };

  const createContracts = async () => {
    await addDoc(contractCollectionRef, { name: contractName });
  };

  const createCustomer = async () =>{
    await addDoc(customerCollectionRef, { name: customerName });
  }

  const createContractAssignations = async () =>{
    await addDoc(contractAssignationCollectionRef, { idCustomer:customerID, idContract: contractID, amount:amount, date:date});
  }

  const deleteContract = async (id) => {
    const userDoc = doc(db, "contracts", id);
    await deleteDoc(userDoc);
  };

  const deleteCustomer = async (id) =>{
    const userDoc = doc(db, "customer", id);
    await deleteDoc(userDoc);
  }

  function getTotalAmount(contract) {
    let total = 0;
    contract.forEach(contract => {
      total += contract.amount;
    });
    return total;
  }
  

  return (
    <div>
      {contracts.map(contract => (
        <div key={contract.id}>
          <p>{contract.name}</p>
          <button onClick={() => deleteContract(contract.id)}>Delete</button>
          </div>
  ))}

{customers.map(customer => (
        <div key={customer.id}>
          <p>{customer.name}</p>
          <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
          </div>
  ))}
<button onClick={loadData}>loadData</button>
  <h2>
    Contracts
  </h2>
  <div>
    <input placeholder='Contract Name' onChange={(e)=>{setContractName(e.target.value)}}>
    </input>
    <button onClick={createContracts}> Create Contract</button>
  </div>
  <h2>
    Customer
  </h2>
  <div>
    <input placeholder='Customer Name' onChange={(e)=>{setCustomerName(e.target.value)}}>
    </input>
    <button onClick={createCustomer}> Create Customer</button>
  </div>

  <select name="Assignation Contract" onChange={(event)=>{setContractID(event.target.value)}}>
      {contracts.map((component) => {
       return (
         <option value={component.id}>{component.name}</option>
       );
     })}
</select>

<select name="Assignation Customer" onChange={(event)=>setCustomerID(event.target.value)}>
      {customers.map((customer) => {
       return (
         <option value={customer.id}>{customer.name}</option>
       );
     })}
</select>

<input placeholder='amount' onChange={(e)=>{setAmount(parseFloat(e.target.value))}} type="number"></input>
<input type="date" placeholder='amount' onChange={(e)=>setDate(e.target.value)}></input>
<button onClick={createContractAssignations}>Assign Contract</button>


<h2>Search Contract</h2>
<input type="date" placeholder='searchedDate' onChange={(e)=>setSearchedDate(e.target.value)}></input>
<button onClick={()=>setFoundContracts(contractAssignations.filter(e=>e.date==searchedDate))}>Search</button>

<h2>Result</h2>
{foundContracts.map((contract)=>{
  return(
    <div key={contract.id}>
    <div>Name: {contracts.find(e=>e.id==contract.idContract).name}</div>
    <div>Customeer: {customers.find(e=>e.id==contract.idCustomer).name}</div>
    <div>{contract.date}</div>
    </div>
  );
})}

<h2>Total</h2>
<div>{foundContracts && getTotalAmount(foundContracts)}</div>
</div>



)
}

export default CRUDComponent;


