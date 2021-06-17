const express = require("express");
const cors = require('cors')
// const db = require('./models');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.use(cors());

require("./routes/userRoutes")(app);
require("./routes/spotRoutes")(app);
require("./routes/albumRoutes")(app);
require("./routes/pictureRoutes")(app);
require("./routes/s3BucketRoute")(app);

// db.sequelize.sync().then((res) => {
    app.listen(port, () => console.log(`Server started on ${port}`));
// })