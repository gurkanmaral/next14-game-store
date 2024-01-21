import React, { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

interface UserSearchProps {
  value: string;
  setValue: (value: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ value, setValue }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='mt-5  col-span-1 w-full items-center justify-center flex'>
      <Input
        placeholder='Search users'
        onChange={handleInputChange}
        value={value}
        className='bg-black text-white border border-white/15 w-full md:w-[50%] '
      />
    </div>
  );
};

export default UserSearch;