export function formatRolesList(roles) {
    return roles.map(r => ({
        roleId: r.roleId,
        roleName: r.roleName,
        createdBy: {
            profileId: r.profileId,
            fname: r.fname,
            lname: r.lname
        }
    }))
}

export function getFormattedproduct(products) {
    return products.map(p => {
        const {productId, productName, profileId, fname, lname, teamId, teamName} = p;
        return {
            productId,
            productName,
            createdBy: {
                profileId,
                fname,
                lname
            },
            team: {
                teamId,
                teamName
            }
        }
    });
}

export function getFormattedproductWithTeamUsers(products, teamsWithUsers) {
    return products.map(p => {
        return {
            ...p,
            team: {
                ...p.team,
                teamsWithUsers
            }
        }
    });
}