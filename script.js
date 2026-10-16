const repositoryList = document.querySelector("#repository-list");

async function renderRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren();

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.name;
      description.className = "description";
      description.textContent = repository.description;
      date.className = "starred-date";
      date.dateTime = repository.starredAt;
      date.textContent = `Starred on ${repository.starredAt}`;

      item.append(link, description, date);
      repositoryList.append(item);
    }
  } catch (error) {
    repositoryList.replaceChildren();
    const item = document.createElement("li");
    item.textContent = "Starred repositories could not be loaded.";
    repositoryList.append(item);
    console.error("Could not load starred repositories:", error);
  }
}

renderRepositories();