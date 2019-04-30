const http = require("http");
const app = require("./app");

const { connect } = require("./connect");

const port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
const server = http.createServer(app);

const mongoosePromise = connect();

mongoosePromise.then(() => {
  server.listen(port, () => console.log(`server listen on ${port}`));
});
