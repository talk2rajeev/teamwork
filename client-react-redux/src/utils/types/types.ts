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
 * Team
 */
export interface TeamUser {
  user_profile_id: number;
  first_name: string;
  last_name: string;
  role_name: string;
  role_id: 2;
}
export interface TeamWithUserInterface {
  team_id: number;
  team_name: string;
  users: Array<TeamUser>;
}

/**
 * Product
 */
export interface ProductFormDataInterface {
  productName?: string;
  product_owner_id?: number;
  teamId?: number;
}
