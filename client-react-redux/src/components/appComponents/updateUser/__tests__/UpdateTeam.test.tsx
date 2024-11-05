import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateUser from '../UpdateUser';
import { UserState, UserUpdateReqPaylod } from '../../../../utils/types/types';

// Mock props
const userStateMock: UserState = {
  allUsers: {
    status: 'idle',
    users: [
      {
        profileId: 1,
        fname: 'John',
        lname: 'Doe',
        roleId: 2,
        roleName: 'Developer',
      },
      {
        profileId: 2,
        fname: 'Jane',
        lname: 'Smith',
        roleId: 3,
        roleName: 'BA',
      },
    ],
  },
  roles: [
    {
      roleId: 2,
      roleName: 'Admin',
      createdBy: { profileId: 1, fname: 'Test', lname: '' },
    },
    {
      roleId: 3,
      roleName: 'User',
      createdBy: { profileId: 2, fname: 'Test2', lname: '' },
    },
  ],
};

const hideUpdateUserModalMock = jest.fn();
const updateUserMock = jest.fn((userFormData: UserUpdateReqPaylod) => {});

describe('UpdateUser Component', () => {
  beforeEach(() => {
    render(
      <UpdateUser
        userState={userStateMock}
        selectedUserId="1"
        hideUpdateUserModal={hideUpdateUserModalMock}
        updateUser={updateUserMock}
      />
    );
  });

  it('renders UpdateUser modal with correct fields and data', async () => {
    // Verify the modal is open
    const header = await screen.findByTitle('Update User');
    expect(header).toBe('Update User');
    //expect(screen.getByText('Update User')).toBeInTheDocument();

    // Check if the input fields are populated correctly
    const firstNameInput = screen.getByPlaceholderText(
      'Fist Name'
    ) as HTMLInputElement;
    const lastNameInput = screen.getByPlaceholderText(
      'Last Name'
    ) as HTMLInputElement;

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    // expect(screen.getByText('Assign Role')).toBeInTheDocument();
  });

  it('updates input fields correctly when user types', () => {
    const firstNameInput = screen.getByPlaceholderText('Fist Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');

    fireEvent.change(firstNameInput, { target: { value: 'Johnny' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(firstNameInput).toHaveValue('Johnny');
    expect(lastNameInput).toHaveValue('Doe');
  });

  it('calls updateUser with correct data when Update User button is clicked', () => {
    const updateButton = screen.getByRole('button', { name: /Update User/i });

    fireEvent.click(updateButton);

    expect(updateUserMock).toHaveBeenCalledWith({
      fname: 'John',
      lname: 'Doe',
      role_id: 2, // role_id of selectedUser based on `userStateMock`
    });
  });

  it('calls hideUpdateUserModal when the modal is closed', () => {
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    expect(hideUpdateUserModalMock).toHaveBeenCalled();
  });

  it('renders role options correctly and updates role on selection', async () => {
    // const selectRoleDropdown = screen.getByText('Developer');
    const selectRoleDropdown = await screen.getByText('Admin');
    // screen.findByPlaceholderText
    fireEvent.mouseDown(selectRoleDropdown);

    const userRoleOption = screen.getByText('User');
    fireEvent.click(userRoleOption);

    // Confirm the updateUser function will now be called with role_id of 3 for "User"
    const updateButton = screen.getByRole('button', { name: /Update User/i });
    fireEvent.click(updateButton);

    expect(updateUserMock).toHaveBeenCalledWith({
      fname: 'John',
      lname: 'Doe',
      role_id: 3,
    });
  });
});
