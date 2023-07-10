const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

let clients = [];

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

const openConnection = (request, response, _next) => {
  response.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  response.write("data: false\n\n");

  const clientId = Date.now();

  clients.push({
    id: clientId,
    response,
  });

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);

    clients = clients.filter((client) => client.id !== clientId);
  });
};

app.get("/open-server-connection", openConnection);

const sendEventToAllClients = () => {
  clients.forEach((client) =>
    client.response.write(
      `event: test-event\ndata: Event set at ${new Date()
        .toUTCString()
        .substring(17, 25)}\n\n`
    )
  );
};

setInterval(sendEventToAllClients, 4000);
