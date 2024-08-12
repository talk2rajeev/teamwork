export function formatRolesList(roles) {
  return roles.map((r) => ({
    roleId: r.roleId,
    roleName: r.roleName,
    createdBy: {
      profileId: r.profileId,
      fname: r.fname,
      lname: r.lname,
    },
  }));
}

export function getFormattedproduct(products) {
  return products.map((p) => {
    const {
      productId,
      productName,
      profileId,
      fname,
      lname,
      teamId,
      teamName,
    } = p;
    return {
      productId,
      productName,
      createdBy: {
        profileId,
        fname,
        lname,
      },
      productOwner: {
        owner_profileID: p.owner_profileID,
        owner_fname: p.owner_fname,
        owner_lname: p.owner_fname,
      },
      team: {
        teamId,
        teamName,
      },
    };
  });
}

export function getFormattedproductWithTeamUsers(products, teamsWithUsers) {
  return products.map((p) => {
    return {
      ...p,
      team: {
        ...p.team,
        teamsWithUsers,
      },
    };
  });
}

export function getFormattedTeamsWithUsers(teamWithUsers) {
  return teamWithUsers.reduce((accumulator, currentValue) => {
    let team = accumulator.find(
      (obj) => obj.team_name === currentValue.team_name
    );

    if (team) {
      team.users.push({
        user_profile_id: currentValue.user_profile_id,
        first_name: currentValue.first_name,
        last_name: currentValue.last_name,
        role_name: currentValue.role_name,
        role_id: currentValue.role_id,
      });
    } else {
      const newTeam = {
        team_id: currentValue.team_id,
        team_name: currentValue.team_name,
        users: [
          {
            user_profile_id: currentValue.user_profile_id,
            first_name: currentValue.first_name,
            last_name: currentValue.last_name,
            role_name: currentValue.role_name,
            role_id: currentValue.role_id,
          },
        ],
      };
      accumulator.push(newTeam);
    }

    return accumulator;
  }, []);
}
