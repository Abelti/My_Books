const mongoose = require('mongoose');

const DBConnection = async () => {
    try {
        const db = await mongoose.connect(process.env.CONN);
        console.log('Database connected successfully to ' + db.connection.host, db.connection.name);
    }

    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = DBConnection;