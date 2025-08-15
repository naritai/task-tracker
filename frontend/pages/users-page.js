import { getUsers } from "../api/users.js";

export class UsersPage {
  constructor({ container }) {
    this.container = container;
    this.usersElems = [];
    this.renderUsers = this.renderUsers.bind(this);

    console.log("USERS PAGE RENDERED!");
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
    // if (!Array.isArray(users)) {
    //   throw new Error("tasks must be an array type");
    // }

    const usersList = this.container.querySelector(".users-list");

    users.forEach((user) => {
      console.log("users", user);
    });

    // this.usersElems.forEach((user) => user.destroy());
    // this.usersElems = [];

    // const tasksList = this.container.querySelector(".task-list");
    // if (!usersElems) {
    //   throw new Error(
    //     "No tasks list container element. Create container first."
    //   );
    // }
    // usersElems.innerHTML = "";
    // users.forEach((user) => {
    //   const nextTask = new TaskItem({
    //     user,
    //     onDelete: this.handleDeleteTask,
    //     onEdit: this.handleEditTask,
    //   });
    //   this.usersElems.push(nextTask);
    //   usersElems.append(nextTask.render());
    // });
  }
}
