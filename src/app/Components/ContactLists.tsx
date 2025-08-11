"use client";

import React, { useState } from 'react';
import AddContactForm from './AddContactForm';
import { useReadContract, useWriteContract } from "wagmi";
import { abi as contactBookABI } from '../../out/ContactBook.sol/ContactBook.json';

interface Contact {
  name: string;
  contact: string;
  index: bigint;
}

const ContactLists = () => {
  const [addContact, setAddContact] = useState(false);
  const {writeContractAsync} = useWriteContract();
  const {
    data: contactsData,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
    abi: contactBookABI,
    functionName: 'getContacts',
  });

  const contacts: Contact[] = Array.isArray(contactsData) ? contactsData as Contact[] : [];

  const handleRemoveContact = async (index: number) => {
    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
        abi: contactBookABI,
        functionName: "removeContact",
        args: [index]
      });
      refetch?.();
    } catch (error) {
      console.error("Failed to remove contact:", error);
    }
  };
  let content;
  if (addContact) {
    content = <AddContactForm />;
  } else if (isLoading) {
    content = <p className="text-blue-500 mt-4">Loading...</p>;
  } else if (error) {
    content = <p className="text-red-500 mt-4">Error: {error.message}</p>;
  } else {
    content = (
      <ul className="mt-4 space-y-3">
        {contacts.map((contact, index) => (
          <li
            key={contact.index.toString()}
            className="flex justify-between items-center bg-blue-100 text-blue-900 p-3 rounded-md shadow-sm hover:shadow-md transition"
          >
            <div className='flex w-full justify-between'>
                <div>
              <p className="font-semibold text-sm">
                #{index} — {contact.name}
              </p>
              <p className="text-xs text-gray-700">{contact.contact}</p>
              </div>
              <button onClick={() => handleRemoveContact(index)} className='text-red-600 py-2 px-4 rounded-sm border-2'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto border rounded-lg p-6 border-blue-400 bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-blue-700">Contacts</h4>
        <button
          onClick={() => setAddContact(prev => !prev)}
          className="bg-blue-600 text-white py-1.5 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {addContact ? 'Close' : 'Add Contact'}
        </button>
      </div>

      {content}
    </div>
  );
};

export default ContactLists;

