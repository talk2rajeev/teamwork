export const SQL_QUERIES = {
    product: {
        insertWithTeamQuery: 'insert into product (productName, createdById, teamId) values(?,?,?)',
        insertWithoutTeamQuery: 'insert into product (productName, createdById) values(?,?)',
        getProducts: `SELECT * from product`,
        getProductsWithTeam: `SELECT product.productId, product.productName, 
            user_profile.fname, user_profile.lname,
            team.teamId, team.teamName
            FROM  product
            JOIN  user_profile ON product.createdById = user_profile.profileId
            JOIN team ON product.teamId = team.teamId;`,
        getProductByIdQuery: `SELECT product.productId, product.productName, 
            user_profile.fname, user_profile.lname,
            team.teamName
            FROM  product
            JOIN  user_profile ON product.createdById = user_profile.profileId
            JOIN team ON product.teamId = team.teamId WHERE productId = ?`,
        updateProductName: `Update product SET productName = ? WHERE productId = ?`,
        updateProductTeam: `Update product SET teamId = ? WHERE productId = ?`,
        updateProductNameAndTeam: `Update product SET productName = ?, teamId = ? WHERE productId = ?`,
    },
    user: {
        createUserLogin: 'insert into users (username, password, createdAt) values(?,?,?)',
        createUserProfile: 'insert into user_profile (fname, lname, roleId, userId, createdAt) values(?,?,?,?,?)',
    }
};