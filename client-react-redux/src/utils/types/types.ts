export type StatusType = 'idle' | 'loading' | 'failed';
export type CreateResponseType = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
};
/**
 * Product
 */
export type ActionType = 'view' | 'update' | 'create';
export type Product = {
  productId: number;
  productName: string;
  product_owner_id: number;
  product_owner_fname: string;
  product_owner_lname: string;
};
export interface ProductwithTeam {
  productId: number;
  productName: string;
  createdBy: {
    profileId: number;
    fname: string;
    lname: string;
  };
  productOwner: {
    owner_profileID: number;
    owner_fname: string;
    owner_lname: string;
  };
  team: {
    teamId: number;
    teamName: string;
    teamsWithUsers: Array<{
      profileId: number;
      fname: string;
      lname: string;
      teamId: number;
    }>;
  };
}
export interface SelectedProduct {
  status: 'idle' | 'loading' | 'failed';
  product: Array<ProductwithTeam>;
}

/**
 * User
 */
export interface UserType {
  roleName: string;
  roleId: number;
  profileId: number;
  fname: string;
  lname: string;
}

/**
 * Team
 */
export interface TeamUser {
  user_profile_id: number;
  first_name: string;
  last_name: string;
  role_name: string;
  role_id: number;
}
export interface TeamWithUserInterface {
  team_id: number;
  team_name: string;
  users: Array<TeamUser>;
}
export interface Team {
  team_id: number;
  team_name: string;
  created_by_profile_id: number;
  created_by_fname: string;
  created_by_lname: string;
  created_by: string;
  users?: Array<TeamUser>;
}

export interface AssignTeamUserReqPayload {
  teamId: number;
  profileId: number;
  roleId: number;
}

/**
 * Product
 */
export interface ProductFormDataInterface {
  productId: number;
  productName?: string;
  product_owner_id?: number;
  teamId?: number;
}

/**
 * Toast
 */
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

/**
 * NotificationState
 */
export interface NotificationState {
  showNotification: boolean;
  type: '' | 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
}
