  

$(document).ready(() => {

  let list = [
  {
    id: 0,
    desc: "Something really nice",
    done: false
  },
  {
    id: 1,
    desc: "Something really bad",
    done: true
  },
  {
    id: 2,
    desc: "Something in between",
    done: false
  }
  ];


  // Get current list of to do items
  const getCurrentItems = () => {
    return JSON.parse(localStorage.getItem('todoList'));
  }

  // Add new to do item
  const addItem = (desc) => {
    let current = getCurrentItems();

    let currentItemsNo = current.length;

    let newItemId = parseInt(localStorage.getItem('counter')) + 1;

    let newItem = {
      id: newItemId,
      desc: desc,
      done: false
    }

    current.push(newItem);

    if (updateList(current)) {
      if (currentItemsNo >= 1) {
        $('#todo').append(`<li class="todo-item" data-todo-id="${newItem.id}"><div><button class="todo-check btn btn-link"><i class="far fa-circle"></i></button><span>${newItem.desc}</span></div><button class="todo-remove btn btn-link"><i class="fas fa-trash"></i></button></li>`);
      } else {
        $('#todo').html(`<li class="todo-item" data-todo-id="${newItem.id}"><div><button class="todo-check btn btn-link"><i class="far fa-circle"></i></button><span>${newItem.desc}</span></div><button class="todo-remove btn btn-link"><i class="fas fa-trash"></i></button></li>`);

      }
      localStorage.setItem('counter', newItemId);
      return true;
    } else {
      return false;
    }
  }

  // Update existing list of item
  const updateList = (newList) => {
    localStorage.setItem('todoList', JSON.stringify(newList));
    return true;
  }

  // Delete item
  const deleteItem = (id) => {
    let current = getCurrentItems();

    current = current.filter((element) => element.id.toString() !== id);
    console.log(current);

    if (updateList(current)) {
      return true;
    } else {
      return false;
    }
  }

  // Mark item as done
  const markDone = (id) => {
    let current = getCurrentItems();


    current.find(element => element.key == id).done = (current.find(element => element.key == id).done !== true) ? true : false;

    if (updateList(current)) {
      return true;
    } else {
      return false;
    }
  }

  //updateList(list);

  //const retList = localStorage.getItem('todoList');
  //console.log(retList);
  //addItem('Something stupid');


  // Actual events

  // Add a new item
  $('#submitBtn').on('click', (e) => {
    e.preventDefault();

    let descField = $('input[name=description]');
    addItem(descField.val());
    descField.val("");
  });

  // Delete an item
  $('body').on('click', '.todo-remove', function() {
    //console.log($(this));
    //console.log($(this).parent().attr('data-todo-id'));
    if (deleteItem($(this).parent().attr('data-todo-id'))) {
      $(this).parent().remove();
    } else {
      console.log('Error on trying to remove item!');
    }
  });

  // Mark item as done
  $('body').on('click', '.todo-check', function() {

    if (markDone($(this).parent().attr('data-todo-id'))) {
      $(this).children('i').toggleClass('fa-circle fa-circle-check');
    } else {
      console.log('Error trying to mark item done!');
    }
  });


  // Load all to do items and append them
  let currentTodos = Object.values(getCurrentItems());

  /*for(item of currentTodos) {
  }*/

  console.log(currentTodos);
  if (currentTodos.length > 0) {
    currentTodos.forEach((item) => {
      $('#todo').append(`<li class="todo-item" data-todo-id="${item.id}"><div><button class="todo-check btn btn-link"><i class="far ${(item.done) ? 'fa-circle-check' : 'fa-circle'}"></i></button><span>${item.desc}</span></div><button class="todo-remove btn btn-link"><i class="fas fa-trash"></i></button></li>`);
    });
    
  } else {
    $('#todo').append(`<p class="text-center">You haven't added anything yet!</p>`)
  }


});