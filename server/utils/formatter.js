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