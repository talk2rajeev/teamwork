export const SQL_QUERIES = {
    product: {
        insertQuery: 'insert into product (productName, userId, createdAt) values(?,?,?)',
        getAllQuery: `SELECT 
            product.productName,
            user_profile.fname,
            user_profile.lname
            FROM 
                product
            JOIN 
                users ON product.userId = users.userId
            JOIN 
            user_profile ON users.userId = user_profile.userId`,
        getByIdQuery: `SELECT 
            product.productName,
            user_profile.fname,
            user_profile.lname
            FROM 
                product
            JOIN 
                users ON product.userId = users.userId
            JOIN 
            user_profile ON users.userId = user_profile.userId where productId = ?`,
        updateQuery: `Update product SET productName = ? WHERE productId = ?`         
    },
    user: {
        createUserLogin: 'insert into users (username, password, createdAt) values(?,?,?)',
        createUserProfile: 'insert into user_profile (fname, lname, roleId, userId, createdAt) values(?,?,?,?,?)',
    }
};