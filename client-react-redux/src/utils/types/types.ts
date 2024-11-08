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

export interface GenericResponseType<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
}

/**
 * Product
 */
export type ActionType = 'View' | 'Update' | 'Create';
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

export interface ProductReqPayload {
  productName: string;
  createdById: number;
  product_owner_id: number;
}

export interface CreateProductReqPayload {
  productName: string;
  createdById: number;
  product_owner_id?: number;
  teamId?: number;
}

/**
 * User
 */

export interface UserState {
  allUsers: {
    status: StatusType;
    users: Array<UserType>;
  };
  userCreated?: {
    status: StatusType;
    type: 'error' | 'success' | 'info';
    message?: string;
  };
  roles: Role[];
  userUpdated?: {
    status: StatusType;
    type: 'error' | 'success' | 'info';
    message?: string;
  };
}

export interface UserType {
  roleName: string;
  roleId: number;
  profileId: number;
  fname: string;
  lname: string;
}

export interface UserCreationReqPaylod {
  username: string;
  password: string;
  fname: string;
  lname: string;
  role_id: number;
}
export interface UserUpdateReqPaylod {
  fname: string;
  lname: string;
  role_id: number;
}

/**
 * Team
 */

export interface TeamState {
  TeamWithUser: {
    status: StatusType;
    TeamWithUsers: TeamWithUserInterface[];
  };
  allTeams: {
    status: StatusType;
    teams: Array<Team>;
  };
  selectedTeamId: number;
  teamCreated?: TeamCreated;
  updateTeam: {
    status: 'idle' | 'loading' | 'failed' | 'success';
    message?: string;
  };
  deleteTeamUser: {
    status: 'idle' | 'loading' | 'failed' | 'success';
    message?: string;
  };
  todo: string;
}

type status = 'idle' | 'loading' | 'failed';
export type TeamCreated = {
  status: StatusType;
  type: 'error' | 'success' | 'info';
  error?: boolean;
  message?: string;
};

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

export interface DeleteTeamUserReqPayload {
  teamId: number;
  profileId: number;
}

export interface TeamType {
  createdByProfileId: number;
  createdByFname: string;
  createdByLname: string;
  teamId: number;
  teamName: string;
}

/**
 * Product
 */

export interface ProductState {
  list: {
    productList: Array<Product>;
    status: 'idle' | 'loading' | 'failed';
  };
  productCreated?: ProductCreated;
  selectedProduct: SelectedProduct;
  selectedProductId: number;
  productFormData: ProductFormDataInterface;
  productUpdated?: ProductUpdated;
}

export interface ProductFormDataInterface {
  productId: number;
  productName?: string;
  product_owner_id?: number;
  teamId?: number;
}

export type ProductCreated = TeamCreated;

interface ProductUpdated {
  message?: string;
  success?: boolean;
  status?: StatusType;
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
  notification: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
}

export interface Role {
  roleId: number;
  roleName: string;
  createdBy: {
    profileId: number;
    fname: string;
    lname: string;
  };
}

/* Epic */
export interface EpicState {
  epics: {
    status: StatusType;
    epicList: EpicType[];
  };
  selectedEpicUserStories: {
    status: StatusType;
    epicUserStories: DetailedEpicType[];
  };
}

export interface EpicType {
  epicId: number;
  epicName: string;
  epicDescription: string;
  productName: string;
  productId: number;
  created_by_fname: string;
  created_by_lname: string;
}

export interface DetailedEpicType {
  userStoryId: number;
  title: string;
  description: string;
  userStoryPoint: number;
  createdAt: string;
  userStoryType: string;
  priority: string;
  assignedToFname: string;
  assignedToLname: string;
  assignedtoId: number;
  status: string;
  statusId: number;
  productName: string;
  productId: number;
  epicName: string;
  epicId: number;
  sprintName: string;
  sprintId: number;
  reportedByFname: string;
  reportedByLname: string;
  sotryReporterid: number;
}
