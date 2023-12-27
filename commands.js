function handleCommand(command, parent) {
    // Trim leading and trailing whitespaces from the command
    command = command.trim();

    // Check if the command starts with a specific string
    if (command.startsWith('/help')) {
        displayHelp();
        
    } else if (command.startsWith('/logout')) {
        logoutC(parent);
    } else {
        parent.refresh_chat()
    }
    
}



function displayHelp() {
    console_message("hi");
}

function logoutC(parent) {
    localStorage.clear();
    parent.home();
}


