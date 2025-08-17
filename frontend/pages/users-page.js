import { getUsers } from "../api/users.js";

export class UsersPage {
  constructor({ container }) {
    this.container = container;
    this.usersElems = [];
    this.renderUsers = this.renderUsers.bind(this);
  }

  async render() {
    this.container.innerHTML = `
        <h1 id="main_title">Users List</h1>
        <div class="users">
          <ul class="users-list"></ul>
        </div>
    `;

    const users = await getUsers();
    this.renderUsers(users);
  }

  renderUsers(users) {
    if (!Array.isArray(users)) {
      throw new Error("tasks must be an array type");
    }

    const usersList = this.container.querySelector(".users-list");
    usersList.innerHTML = "";
    users.forEach(({ name, age, role, avatar }) => {
      const userContainer = document.createElement("div");
      userContainer.innerHTML = `
        <div>name: ${name} </div>
        <div>age: ${age} </div>
        <div>role: ${role} </div>
        <div>
          avatar: 
          <img src="${avatar}" width="100" height="100"/>
        </div>
      `;
      usersList.append(userContainer);
    });
  }
}
