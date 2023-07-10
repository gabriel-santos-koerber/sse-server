const eventSource = new EventSource(
  "http://localhost:3000/open-server-connection"
);

eventSource.addEventListener("test-event", (event) => {
  const listItem = document.createElement("li");

  const eventList = document.getElementById("event-list");

  listItem.innerHTML = `
    <b>Event:</b> ${event.type}
    <br />
    <b>Data:</b> ${event.data}
    <br /><br />
  `;

  eventList.appendChild(listItem);
});
