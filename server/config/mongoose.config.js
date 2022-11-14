const mongoose = require('mongoose');
// "mongodb://0.0.0.0:27017/clickityclack" windows
// "mongodb://localhost/clickityclack"
mongoose.connect("mongodb://localhost/clickityclack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
