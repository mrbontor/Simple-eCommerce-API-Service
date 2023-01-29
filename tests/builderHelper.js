
module.exports = {
    buildUser: (id, username = "test", email= "test@gmail.com", isActive = true, isAdmin = false) => {
        return {
            _id: id,
            username: username,
            email: email,
            isActive: isActive,
            infoLogin: {
                hash: "asdas",
                salt: "asda",
                iterations: 8912
            },
            updatedAt: "2022-12-04T19:53:20.387Z",
            createdAt: "2022-12-04T19:53:20.387Z"
        }
    }

};
