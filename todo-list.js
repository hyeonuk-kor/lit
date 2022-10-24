import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export class ToDoList extends LitElement {
	static properties = {
		_listItems: { state: true },
		hideCompleted: {},
	};
	static styles = css`
		.completed {
			text-decoration-line: line-through;
			color: #777;
		}
	`;

	constructor() {
		super();
		this._listItems = [{ text: "To do list 작성하기", completed: true }];
		this.hideCompleted = false;
	}

	render() {
		const items = this.hideCompleted ? this._listItems.filter((item) => !item.completed) : this._listItems;
		const todos = html`
			<ul>
				${items.map((item) => html` <li class=${item.completed ? "completed" : ""} @click=${() => this.toggleCompleted(item)}>${item.text}</li>`)}
			</ul>
		`;
		const caughtUpMessage = html` <p>오늘 할일 끝</p> `;
		const todosOrMessage = items.length > 0 ? todos : caughtUpMessage;

		return html`
			<h2>오늘의 할일</h2>
			${todosOrMessage}
			<input id="newitem" aria-label="New item" />
			<button @click=${this.addToDo}>Add</button>
			<br />
			<label>
				<input type="checkbox" @change=${this.setHideCompleted} ?checked=${this.hideCompleted} />
				완료된 목록 가리기
			</label>
		`;
	}

	toggleCompleted(item) {
		item.completed = !item.completed;
		this.requestUpdate();
	}

	setHideCompleted(e) {
		this.hideCompleted = e.target.checked;
	}

	get input() {
		return this.renderRoot?.querySelector("#newitem") ?? null;
	}

	addToDo() {
		this._listItems = [...this._listItems, { text: this.input.value, completed: false }];
		this.input.value = "";
	}
}
customElements.define("todo-list", ToDoList);
