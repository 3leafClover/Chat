window.onload = function() {
  const firebaseConfig = {
    apiKey: "AIzaSyCTEbevcryN7elI9cJnjpEmik9Wop-7osI",
    authDomain: "babouschka-5e9ef.firebaseapp.com",
    projectId: "babouschka-5e9ef",
    storageBucket: "babouschka-5e9ef.appspot.com",
    messagingSenderId: "137683061289",
    appId: "1:137683061289:web:5db85ea916934161996a38"
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database();

  class MEME_CHAT {
    constructor() {
      // ... (other code remains unchanged)
      this.timers = {}; // Initialize the timers object
    }
    home() {
      document.body.innerHTML = '';
      this.create_title();
      this.create_join_form();
    }
    create_name_list() {
      var parent = this;

      var name_list_container = document.createElement('div');
      name_list_container.setAttribute('id', 'name_list_container');

      var group_container = document.createElement('div');
      group_container.setAttribute('class', 'group-cont');

      name_list_container.append(group_container);
      document.body.append(name_list_container);
    }
    resetTimer(user) {
      var parent = this;
      clearTimeout(parent.timers[user]);
  
      // Set a new timer for 1 minute
      parent.timers[user] = setTimeout(function () {
        // Remove the user from the list after 1 minute of inactivity
        parent.removeUserFromList(user);
      }, 60000);
    }
    update_name_list(user) {
      var parent = this;
      var group_container = document.querySelector('.group-cont');
      var usernameElements = group_container.querySelectorAll('.user');
    
      // Check if the user is already in the list
      var userExists = Array.from(usernameElements).some(function (element) {
        return element.textContent === user;
      });
    
      if (!userExists) {
        var usernameElement = document.createElement('p');
        usernameElement.textContent = user;
        usernameElement.classList.add('user');
    
        group_container.appendChild(usernameElement);
    
        // Broadcast the updated name list
        parent.broadcastNameList();
      }
    
      // Reset the timer when a message is sent
      parent.resetTimer(user);
    }
    
    // Add a new method to broadcast the name list
    broadcastNameList() {
      var parent = this;
      var group_container = document.querySelector('.group-cont');
      var usernameElements = group_container.querySelectorAll('.user');
    
      // Extract usernames from the elements
      var usernames = Array.from(usernameElements).map(function (element) {
        return element.textContent;
      });
    
      // Broadcast the name list to other users
      // Here, you need to implement a mechanism to send this list to other users
      // using Firebase or any other appropriate method for your application
      // For example, you can store the list in the database and have clients listen for changes
      // and update their local name list accordingly.
      // Alternatively, you can use a WebSocket for real-time communication between clients.
    
      // Example using Firebase to store the name list
      db.ref('nameList').set(usernames);
    }
    
    // In your constructor or initialization code, add a listener for changes in the name list

    listenForNameListChanges() {
      var parent = this;
    
      // Example using Firebase to listen for changes in the name list
      db.ref('nameList').on('value', function(snapshot) {
        // Update the local name list when changes occur
        parent.updateLocalNameList(snapshot.val());
      });
    }
    
    
    // Update the local name list based on the received data
    updateLocalNameList(names) {
      var group_container = document.querySelector('.group-cont');
      group_container.innerHTML = ''; // Clear the existing list
    
      // Rebuild the list based on the received data
      names.forEach(function (name) {
        var usernameElement = document.createElement('p');
        usernameElement.textContent = name;
        usernameElement.classList.add('user');
        group_container.appendChild(usernameElement);
      });
    }
    
  
    removeUserFromList(user) {
      var parent = this;
      var group_container = document.querySelector('.group-cont');
      var usernameElements = group_container.querySelectorAll('.user');
  
      // Find and remove the user from the list
      usernameElements.forEach(function (element) {
        if (element.textContent === user) {
          element.remove();
        }
      });
  
      // Clear the timer associated with the removed user
      clearTimeout(parent.timers[user]);
    }
    
    playMessageSound() {
      var audioElement = document.getElementById('messageSound');
      audioElement.play();
    }

    chat() {
      this.create_title();
      this.create_chat();
    }

    create_title() {
      var title_container = document.createElement('div');
      title_container.setAttribute('id', 'title_container');
      var title_inner_container = document.createElement('div');
      title_inner_container.setAttribute('id', 'title_inner_container');
      var title = document.createElement('h1');
      title.setAttribute('id', 'title');
      title.textContent = 'BABOUSCHKA GC';
      title_inner_container.append(title);
      title_container.append(title_inner_container);
      document.body.append(title_container);
    }

    create_join_form() {
      var parent = this;
      var join_container = document.createElement('div');
      join_container.setAttribute('id', 'join_container');
      var join_inner_container = document.createElement('div');
      join_inner_container.setAttribute('id', 'join_inner_container');
      var join_button_container = document.createElement('div');
      join_button_container.setAttribute('id', 'join_button_container');
      var join_button = document.createElement('button');
      join_button.setAttribute('id', 'join_button');
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>';
      var join_input_container = document.createElement('div');
      join_input_container.setAttribute('id', 'join_input_container');
      var join_input = document.createElement('input');
      join_input.setAttribute('id', 'join_input');
      join_input.setAttribute('maxlength', 999);
      join_input.placeholder = 'enter Boobouschka, put your name';
      join_input.onkeyup = function() {
        if (join_input.value.length > 0) {
          join_button.classList.add('enabled');
          join_button.onclick = function() {
            parent.save_name(join_input.value);
            join_container.remove();
            parent.create_chat();
          };
        } else {
          join_button.classList.remove('enabled');
        }
      };
      join_button_container.append(join_button);
      join_input_container.append(join_input);
      join_inner_container.append(join_input_container, join_button_container);
      join_container.append(join_inner_container);
      document.body.append(join_container);
    }

    create_load(container_id) {
      var parent = this;
      var container = document.getElementById(container_id);
      container.innerHTML = '';
      var loader_container = document.createElement('div');
      loader_container.setAttribute('class', 'loader_container');
      var loader = document.createElement('div');
      loader.setAttribute('class', 'loader');
      loader_container.append(loader);
      container.append(loader_container);
    }

    create_chat() {
      var parent = this;
      var title_container = document.getElementById('title_container');
      var title = document.getElementById('title');
      title_container.classList.add('chat_title_container');
      title.classList.add('chat_title');
      var chat_container = document.createElement('div');
      chat_container.setAttribute('id', 'chat_container');
      var chat_inner_container = document.createElement('div');
      chat_inner_container.setAttribute('id', 'chat_inner_container');
      var chat_content_container = document.createElement('div');
      chat_content_container.setAttribute('id', 'chat_content_container');
      var chat_input_container = document.createElement('div');
      chat_input_container.setAttribute('id', 'chat_input_container');
      var chat_input_send = document.createElement('button');
      chat_input_send.setAttribute('id', 'chat_input_send');
      chat_input_send.setAttribute('disabled', true);
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`;
      var chat_input = document.createElement('input');
      chat_input.setAttribute('id', 'chat_input');
      chat_input.setAttribute('maxlength', 1000);
      chat_input.placeholder = `${parent.get_name()}. Say something...`;
      chat_input.onkeyup = function() {
        if (chat_input.value.length > 0) {
          chat_input_send.removeAttribute('disabled');
          chat_input_send.classList.add('enabled');
          chat_input_send.onclick = function() {
            chat_input_send.setAttribute('disabled', true);
            chat_input_send.classList.remove('enabled');
            if (chat_input.value.length <= 0) {
              return;
            }
            parent.create_load('chat_content_container');
            parent.send_message(chat_input.value);
            chat_input.value = '';
            chat_input.focus();
          };
        } else {
          chat_input_send.classList.remove('enabled');
        }
      };
      var chat_logout_container = document.createElement('div');
      chat_logout_container.setAttribute('id', 'chat_logout_container');
      var chat_logout = document.createElement('button');
      chat_logout.setAttribute('id', 'chat_logout');
      chat_logout.textContent = `${parent.get_name()} • logout`;
      chat_logout.onclick = function() {
        localStorage.clear();
        parent.home();
      };
      chat_logout_container.append(chat_logout);
      chat_input_container.append(chat_input, chat_input_send);
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container);
      chat_container.append(chat_inner_container);
      document.body.append(chat_container);
      parent.create_load('chat_content_container');
      parent.refresh_chat();
    }

    save_name(name) {
      localStorage.setItem('name', name);
    }

    send_message(message) {
      var parent = this;
      if (parent.get_name() == null && message == null) {
        return;
      }
    
      var isImage = false;
      if (message.startsWith('/image ')) {
        isImage = true;
        message = message.substring('/image '.length);
      } else if (message.match(/\bhttps?:\/\/\S+\.(gif)\b/gi)) {
        isImage = true;
      }
    
      var timestamp = firebase.database.ServerValue.TIMESTAMP;
    
      // Update the local name list immediately
      parent.update_name_list(parent.get_name());
    
      db.ref('chats/').once('value', function (message_object) {
        var index = parseFloat(message_object.numChildren()) + 1;
        var messageType = isImage ? 'image' : 'text';
    
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          type: messageType,
          index: index,
          timestamp: timestamp
        }).then(function () {
          db.ref('soundTrigger').set(true);
          parent.refresh_chat();
          
          // Broadcast the updated name list to other users
          parent.broadcastNameList();
        });
      });    
    }
    
    
    

    get_name() {
      if (localStorage.getItem('name') != null) {
        return localStorage.getItem('name');
      } else {
        this.home();
        return null;
      }
    }

    refresh_chat() {
      var parent = this;

      var chat_content_container = document.getElementById('chat_content_container');
      db.ref('soundTrigger').on('value', function(snapshot) {
        if (snapshot.val()) {
          parent.playMessageSound();
          db.ref('soundTrigger').set(false);
        }
      });

      db.ref('chats/').on('value', function(messages_object) {
        chat_content_container.innerHTML = '';
        if (messages_object.numChildren() == 0) {
          return;
        }

        var messages = Object.values(messages_object.val());
        var guide = [];
        var unordered = [];
        var ordered = [];

        for (var i, i = 0; i < messages.length; i++) {
          guide.push(i + 1);
          unordered.push([messages[i], messages[i].index]);
        }

        guide.forEach(function(key) {
          var found = false;
          unordered = unordered.filter(function(item) {
            if (!found && item[1] == key) {
              ordered.push(item[0]);
              found = true;
              return false;
            } else {
              return true;
            }
          });
        });

        ordered.forEach(function(data) {
          var name = data.name;
          var message = data.message;

          var message_container = document.createElement('div');
          message_container.setAttribute('class', 'message_container');

          var message_inner_container = document.createElement('div');
          message_inner_container.setAttribute('class', 'message_inner_container');

          var message_user_container = document.createElement('div');
          message_user_container.setAttribute('class', 'message_user_container');

          var message_user = document.createElement('p');
          message_user.setAttribute('class', 'message_user');
          message_user.textContent = `${name}`;

          var message_content_container = document.createElement('div');
          message_content_container.setAttribute('class', 'message_content_container');

          var message_content = document.createElement('p');
          message_content.setAttribute('class', 'message_content');
          message_content.textContent = `${message}`;

          message_user_container.append(message_user);
          message_content_container.append(message_content);
          message_inner_container.append(message_user_container, message_content_container);
          message_container.append(message_inner_container);

          chat_content_container.append(message_container);
        });

        chat_content_container.scrollTop = chat_content_container.scrollHeight;
      });
    }
  }

  

  var app = new MEME_CHAT();
  app.create_name_list();
  if (app.get_name() != null) {
    app.chat();
  }

  var chat_input = document.getElementById("chat_input");
  chat_input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("chat_input_send").click();
    }
  });
  
};
