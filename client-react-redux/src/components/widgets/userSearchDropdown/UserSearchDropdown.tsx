import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../appStore/hooks';
import { Select } from 'antd';
import {
  searchUsersAsync,
  allUsers,
  getAllUsersAsync,
} from '../../../slices/users/userSlice';
import { useDebounce } from '../../../hooks/debounce/debounce';
import * as Types from '../../../utils/types/types';

interface UserSearchDropdownProps {
  label?: string;
  placeholder: string;
  excludedUsers?: Array<number>;
  onUserSelect: (user: Types.UserType) => void;
}

const UserSearchDropdown: FC<UserSearchDropdownProps> = ({
  label,
  placeholder,
  excludedUsers,
  onUserSelect,
}) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(allUsers);

  const [userSearchPattern, setUserSearchPattern] = useState<string>('');

  const debouncedUserSearchString = useDebounce(userSearchPattern, 500);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  useEffect(() => {
    if (debouncedUserSearchString) {
      dispatch(searchUsersAsync(debouncedUserSearchString));
    }
  }, [debouncedUserSearchString]);

  useEffect(() => {}, []);

  const onChange = (value: number) => {
    const user = users.users.find((u) => u.profileId === value);
    if (user) onUserSelect(user);
  };

  const onUserSearch = (value: string) => {
    console.log('onUserSearch ', value);
    setUserSearchPattern(value);
  };

  const userOptions = users.users
    .map((u) => ({
      value: u.profileId,
      label: `${u.fname} ${u.lname}`,
    }))
    .filter((u) => !excludedUsers?.includes(u.value));

  return (
    <div>
      {label && <div className="text-grey-700">{label}</div>}
      <Select
        onChange={onChange}
        onSearch={onUserSearch}
        showSearch
        loading={users.status === 'loading'}
        className="w-full"
        placeholder={placeholder}
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={userOptions}
      />
    </div>
  );
};

export default UserSearchDropdown;
