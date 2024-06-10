const servers = [
  {
    name: "Thinkzone Production",
    adr: "https://thinkzone.co/thinkzone",
    icon: "fa fa-globe",
  },
  {
    name: "Prakshak Production",
    adr: "https://tatvagyan.co.in/",
    icon: "fa fa-globe",
  },
  {
    name: "Thinkzone Test",
    adr: "https://thinkzone.in.net/thinkzone",
    icon: "fa fa-server",
  },
  {
    name: "Prakshak Test",
    adr: "https://tatvagyan.in/",
    icon: "fa fa-server",
  },
];

let isFirstFetch = true;
async function fetchServerStatus() {
  if (isFirstFetch) {
    displayLoader();
    isFirstFetch = false;
  }

  const statusResults = [];
  for (let server of servers) {
    try {
      const response = await fetch(server?.adr);
      statusResults.push({ url: server?.adr, status: response?.status });
    } catch (error) {
      statusResults.push({ url: server?.adr, error: error?.message });
    }
  }

  // console.log(statusResults);

  servers.forEach((server, index) => {
    server.status = statusResults[index].status === 200;
  });

  renderServerList();

  // displayLoader();
  /*
  fetch("/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls: servers.map((server) => server.adr) }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server status response:", data);
      const statusResults = data.results;
      servers.forEach((server, index) => {
        server.status = statusResults[index].status === 200;
      });
      renderServerList();
    })
    .catch((error) => {
      console.error("Error fetching server status:", error);
    });
    */
}

function displayLoader() {
  const serverList = document.getElementById("serverList");
  serverList.innerHTML = '<div class="loader"></div>';
}

function renderServerList() {
  const serverList = document.getElementById("serverList");
  serverList.innerHTML = "";
  servers.forEach((server) => {
    const serverDiv = document.createElement("div");
    serverDiv.className = `server ${server.status ? "" : "has-failed"}`;
    serverDiv.innerHTML = `
      <span class="server-icon"><i class="${server.icon}"></i></span>
      <ul class="server-details">
        <li><span class="data">${server.name}</span></li>
        <li><span class="data signal">${
          server.status ? "ONLINE" : "OFFLINE"
        }</span></li>
        <li><span class="data">${server.adr}</span></li>
      </ul>
    `;
    serverList.appendChild(serverDiv);
  });
}
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const digitalClock = document.getElementById("digitalClock");
  digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchServerStatus();
  setInterval(fetchServerStatus, 5000);
  setInterval(updateClock, 1000);
});
