import React, { useEffect, useState } from 'react'
import InputUI from './InputUI'
import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi"
import {abi as ContactBookABI} from '../../out/ContactBook.sol/ContactBook.json';

const AddContactForm = () => {
    const [name, setName] = useState('');
    const [addr, setAddr] = useState('');

    const { 
        writeContract, 
        data: hash, 
        isPending,
        error 
    } = useWriteContract();

    const { 
        isLoading: isConfirming, 
        isSuccess: isConfirmed 
    } = useWaitForTransactionReceipt({
        hash,
    });

   
   const addingContact =() =>{
    if(!addr || !name) {
        return
    };
    console.log(name, addr)
    try {
       writeContract({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
            abi: ContactBookABI,
            functionName: 'addContact',
            args: [name, addr]
        })
    } catch (error) {
        console.log(error)
    }

   }

   useEffect(() => {
    if (isConfirmed) {
        console.log('Transaction confirmed!');
        setName('');
        setAddr('');
    }
}, [isConfirmed]);

useEffect(() => {
    if (hash) {
      console.log("Tx hash:", hash);
    }
  }, [hash]);

  useEffect(() => {
    if (error) {
      console.error("Error sending transaction:", error);
    }
  }, [error]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        addingContact();
       
    };
  return (
    <form onSubmit={handleSubmit}>
      <InputUI placeholder='Name' label='Name' value={name} onChange={setName} />
      <InputUI placeholder='Contact' label='Contact' value={addr} onChange={setAddr} />
        <button type='submit' className='bg-blue-500 w-full text-white py-2 px-4 rounded mt-2'>
            Add Contact </button>
    </form>
  )
}

export default AddContactForm
