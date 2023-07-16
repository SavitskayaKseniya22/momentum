import './todoList.scss';

export class TodoList {
  constructor() {}

  addListener() {
    document
      .querySelector('.todolist__main-input')
      ?.addEventListener('change', (event) => {
        const todoItemContent = (event.target as HTMLInputElement).value;
        if (todoItemContent) {
          this.addTodoItem(todoItemContent);
          (event.target as HTMLInputElement).value = '';
          this.toggleTodoView('on');
        }
      });

    document.addEventListener('click', async (event) => {
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
          this.editTodoItem('on', event.target as HTMLElement);
        } else if (event.target.closest('.todolist__toggle-button')) {
          this.toggleTodoView('toggle');
        } else if (event.target.closest('.todolist-item-editor__close')) {
          this.editTodoItem('toggle', event.target as HTMLElement);
        } else if (event.target.closest('.todolist-item-editor__confirm')) {
          this.editTodoItem('off', event.target as HTMLElement);
        }
      }
    });
  }

  toggleEditMode(editor: Element, content: Element) {
    editor.classList.toggle('hidden');
    content.classList.toggle('hidden');
  }

  editTodoItem(
    type: 'on' | 'off' | 'toggle',
    target: HTMLElement | HTMLInputElement
  ) {
    const targetParent = target.closest('.todolist-item');
    const editor = targetParent?.querySelector('.todolist-item__editor');
    const content = targetParent?.querySelector('.todolist-item__content');
    const input = targetParent?.querySelector('.todolist-item__editor input');
    if (editor && content && input) {
      this.toggleEditMode(editor, content);
      if (type === 'on') {
        if (content.textContent) {
          input.setAttribute('placeholder', content.textContent);
          (input as HTMLInputElement).value = content.textContent;
        }
      } else if (type === 'off') {
        content.textContent = (input as HTMLInputElement).value;
      } else {
        return;
      }
    }
  }

  addTodoItem(todoItemContent: string) {
    const todolist = document.querySelector('.todolist__content');
    if (todolist) {
      todolist.insertAdjacentHTML(
        'beforeend',
        this.makeTodoItem(todoItemContent)
      );
    }
  }

  toggleTodoView(type: 'on' | 'off' | 'toggle') {
    this.toggleTodolistContent(type);
    this.toggleTodolistButton(type);
  }

  toggleTodolistContent(type: 'on' | 'off' | 'toggle') {
    const todolist = document.querySelector('.todolist__content');
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
    const todolistButton = document.querySelector('.todolist__toggle-button');
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

  makeTodoItem(todoItemContent: string) {
    return `

    <li class="todolist-item">
        <input
          type="checkbox"
          class="todolist-item__toggle"
          title="complete item"
        />
        <span class="todolist-item__content" title="click to edit">${todoItemContent}</span>
        <div class="todolist-item__editor todolist-item-editor hidden">
          <input type="text" />
          <div class="todolist-item-editor__controls">
            <button class="todolist-item-editor__close" title="close editor">
              <i class='bx bx-x-circle'></i>
            </button>
            <button
              class="todolist-item-editor__confirm"
              title="confirm changes"
            >
              <i class='bx bx-check-circle'></i>
            </button>
          </div>
        </div>
        <button class="todolist-item__delete" title="delete item">
          <i class='bx bx-x-circle'></i>
        </button>
      </li>`;
  }

  content() {
    return `<div class="todolist"  data-id="todolist-toggle">
        <div class="todolist__controls">
        <input id="todoText" type="text" class="todolist__main-input" placeholder="What is your plans for today?" />
        <button class="todolist__toggle-button" title="toggle todo list" >
         <i class='bx bx-chevron-right' ></i>
        </button>
        </div>
        <ol class="todolist__content hidden">
        </ol>
      </div>`;
  }
}
