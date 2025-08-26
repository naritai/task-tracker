export class UserItem {
  constructor({ user }) {
    this.user = user;
    this.elem = null;
  }

  render() {
    const { name, age, role, avatar } = this.user;

    const userContainer = document.createElement("div");
    this.elem = userContainer;
    userContainer.innerHTML = `
        <div>name: ${name} </div>
        <div>age: ${age} </div>
        <div>role: ${role} </div>
        <div>
          avatar:
          <img src="${avatar}" width="100" height="100"/>
        </div>
      `;

    return this.elem;
  }
}
