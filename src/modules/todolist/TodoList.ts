import { TodoItem } from '../../interfaces';
import './todoList.scss';

class TodoList extends HTMLDivElement {
  constructor() {
    super();

    this.className = 'todolist';
    this.dataset.id = 'todolist-toggle';
  }

  addListener() {
    this.querySelector('.todolist__main-input')?.addEventListener(
      'change',
      (event) => {
        const todoItemContent = (event.target as HTMLInputElement).value;
        if (todoItemContent) {
          this.addTodoItem(todoItemContent);
          const { target } = event;
          (target as HTMLInputElement).value = '';
          this.toggleTodoView('on');
        }
      }
    );

    this.addEventListener('click', (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest('.todolist-item__delete')) {
          const parent = event.target.closest('.todolist-item');
          if (parent) {
            if (!parent.nextElementSibling && !parent.previousElementSibling) {
              this.toggleTodoView('toggle');
            }
            parent.remove();
          }
        } else if (event.target.closest('.todolist-item__content')) {
          TodoList.editTodoItem('on', event.target as HTMLElement);
        } else if (event.target.closest('.todolist__toggle-button')) {
          this.toggleTodoView('toggle');
        } else if (event.target.closest('.todolist-item-editor__close')) {
          TodoList.editTodoItem('toggle', event.target as HTMLElement);
        } else if (event.target.closest('.todolist-item-editor__confirm')) {
          TodoList.editTodoItem('off', event.target as HTMLElement);
        }
      }
    });

    window.addEventListener('beforeunload', () => {
      this.storeTodoList();
    });

    window.addEventListener('load', () => {
      this.restoreTodoList();
    });
  }

  restoreTodoList() {
    const storage = window.localStorage;
    const todolist = storage.getItem('todolist');
    if (todolist) {
      const parsedTodo: TodoItem[] = JSON.parse(todolist);
      if (parsedTodo.length) {
        parsedTodo.forEach((elem) => {
          const { value, checked } = elem;
          this.addTodoItem(value, checked);
        });
        this.toggleTodoView('on');
      }
    }
  }

  storeTodoList() {
    const storage = window.localStorage;
    const data: {
      value: string;
      checked: boolean;
    }[] = [];
    const items = this.querySelectorAll('.todolist-item');
    if (items) {
      items.forEach((elem) => {
        const contentElement = elem.querySelector('.todolist-item__content');
        const checkboxElement = elem.querySelector('.todolist-item__toggle');
        const itemData: TodoItem = {} as TodoItem;
        itemData.value = contentElement?.textContent as string;
        itemData.checked = (checkboxElement as HTMLInputElement).checked;
        data.push(itemData);
      });
      storage.setItem('todolist', JSON.stringify(data));
    }
  }

  static toggleEditMode(editor: Element, content: Element) {
    editor.classList.toggle('hidden');
    content.classList.toggle('hidden');
  }

  static editTodoItem(
    type: 'on' | 'off' | 'toggle',
    target: HTMLElement | HTMLInputElement
  ) {
    const targetParent = target.closest('.todolist-item');
    const editor = targetParent?.querySelector('.todolist-item__editor');
    const content = targetParent?.querySelector('.todolist-item__content');
    const input = targetParent?.querySelector('.todolist-item__editor input');
    if (editor && content && input) {
      TodoList.toggleEditMode(editor, content);
      if (type === 'on') {
        if (content.textContent) {
          input.setAttribute('placeholder', content.textContent);
          (input as HTMLInputElement).value = content.textContent;
        }
      } else if (type === 'off') {
        content.textContent = (input as HTMLInputElement).value;
      }
    }
  }

  addTodoItem(todoItemContent: string, checked?: boolean) {
    const todolist = this.querySelector('.todolist__content');
    if (todolist) {
      todolist.insertAdjacentHTML(
        'beforeend',
        TodoList.makeTodoItem(todoItemContent, checked)
      );
    }
  }

  toggleTodoView(type: 'on' | 'off' | 'toggle') {
    this.toggleTodolistContent(type);
    this.toggleTodolistButton(type);
  }

  toggleTodolistContent(type: 'on' | 'off' | 'toggle') {
    const todolist = this.querySelector('.todolist__content');
    switch (type) {
      case 'on':
        todolist?.classList.remove('hidden');
        break;
      case 'off':
        todolist?.classList.add('rotated');
        break;
      case 'toggle':
        todolist?.classList.toggle('hidden');
        break;
      default:
        break;
    }
  }

  toggleTodolistButton(type: 'on' | 'off' | 'toggle') {
    const todolistButton = this.querySelector('.todolist__toggle-button');
    switch (type) {
      case 'on':
        todolistButton?.classList.add('rotated');
        break;
      case 'off':
        todolistButton?.classList.remove('hidden');
        break;
      case 'toggle':
        todolistButton?.classList.toggle('rotated');
        break;
      default:
        break;
    }
  }

  static makeTodoItem(todoItemContent: string, checked?: boolean) {
    return `
    <li class="todolist-item">
        <input
          type="checkbox"
          class="todolist-item__toggle"
          data-i18n="[title]todo.item.complete"
          title="complete item"
          ${checked ? 'checked' : ''}
        />
        <span class="todolist-item__content" title="click to edit" data-i18n="[title]todo.item.edit">${todoItemContent}</span>
        <div class="todolist-item__editor todolist-item-editor hidden">
          <input type="text" placeholder="Update item" data-i18n="[placeholder]todo.item.update" />
          <div class="todolist-item-editor__controls">
            <button class="todolist-item-editor__close" title="close editor" data-i18n="[title]todo.item.close">
              <i class='bx bx-x-circle'></i>
            </button>
            <button
              class="todolist-item-editor__confirm"
              title="confirm changes" data-i18n="[title]todo.item.confirm"
            >
              <i class='bx bx-check-circle'></i>
            </button>
          </div>
        </div>
        <button class="todolist-item__delete" title="delete item" data-i18n="[title]todo.item.delete">
          <i class='bx bx-x-circle'></i>
        </button>
      </li>`;
  }

  render() {
    this.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="todolist__controls">
        <input id="todoText" type="text" class="todolist__main-input title_big" placeholder="What is your plans for today?" data-i18n="[placeholder]todo.placeholder" />
        <button class="todolist__toggle-button" title="toggle todo list" data-i18n="[title]todo.toggle" >
         <i class='bx bx-chevron-right' ></i>
        </button>
        </div>
        <ol class="todolist__content hidden">

        </ol>
    `
    );
  }

  connectedCallback() {
    this.render();
    this.addListener();
  }
}

export default TodoList;
