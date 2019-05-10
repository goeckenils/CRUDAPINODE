const http = require("http");
const app = require("./app");

const { connect } = require("./connect");

const port = process.env.PORT || 3000;
console.log("###", process.env.PORT);
const server = http.createServer(app);

const mongoosePromise = connect();

mongoosePromise.then(() => {
  server.listen(port, () => console.log(`server listen on ${port}`));
});
