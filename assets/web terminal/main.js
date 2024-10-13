var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log(
  "%cSecurity Breached!",
  "color: #04ff00; font-weight: bold; font-size: 26px;"
);
console.log("%cPassword: '" + password + "' - Just Hack it?", "color: grey");

textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        const typedCommand = command.innerHTML.trim();
        const matches = availableCommands.filter(c => c.startsWith(typedCommand));
        if (matches.length === 1) {
            command.innerHTML = matches[0];
        }
    }
});

  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) {
      pwd = true;
    }
    if (pwd && e.keyCode == 13) {
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
    } else if (e.keyCode == 13) {
      addLine("Wrong PASSWORD", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("guest@learnsec101.com:~$ " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  const input = cmd.split(' ');
  const command = input[0];
  const argument = input[1];

  cmd = cmd.trim().toLowerCase();

  if (cmd.includes("ls -la")) {
    loopLines([
      '  ',
      'drwxr-xr-x  10 guest guest 4096 Oct 12 12:34 .',
      'drwxr-xr-x  12 guest guest 4096 Oct 12 12:34 ..',
      '-rw-r--r--   1 guest guest   123 Oct 12 12:34 .profile',
      '  ',
      'Looks like you’ve got nothing but dreams in here.'
    ], "color2 margin", 80);
    return;
  }

  if (cmd.includes("ps aux")) {
    loopLines(['USER       PID %CPU %MEM COMMAND',
      'guest      1337  99.0 100.0 /usr/bin/fun',
      '  ',
      'Oops, I mixed up your processes with a game!'], "color2 margin", 80);
    return;
  }

  if (cmd.includes("df -h")) {
    loopLines([
      '  ',
      'Filesystem      Size  Used Avail Use%',
      '  ',
      'Not a byte of data is real. Infinite space available!'
      
    ], "color2 margin", 80);
    return;
  }
  
    if(cmd.includes("uname -a")) {
      loopLines([
        '  ',
        'Linux guest-vm 5.4.0-42-generic #46-Ubuntu',
        'You’re running on Pure Imagination OS, kernel version 42.0, built in the year 3000!',
        '  ',
      ], "color2 margin", 80);
      return;
    }

  if (cmd.includes("rm -rf /")) {
    loopLines([
      '  ',
      'Warning: You are about to delete everything!',
      '  ',
    ], "color2 margin", 80);
    return;
  }

  switch (command.toLowerCase()) {
    case "pwd":
      addLine(currentDirectory, "color2 margin", 80);
      break;

    case "ls":
      const path = argument ? `${currentDirectory}/${argument}` : currentDirectory;
      const listing = handleLs(path);
      addLine(listing, "color2 margin", 80);
      break;

    case "cd":
      if (argument) {
        changeDirectory(argument);
      } else {
        currentDirectory = '/home/user';
        addLine(`Changed directory to ${currentDirectory}`, "color2 margin", 80);
      }
      break;

    case "cat":
      if (argument) {
        const fileContent = handleCat(argument);
        if (fileContent) {
          addLine(fileContent, "color2 margin", 80);
          break;
        } else {
          addLine("File not found", "error", 80);
        }
      }
      break;

    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whois":
      loopLines(whois, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    
    case "showme":
      addLine("You're in!", "color2", 80);
      setTimeout(function() {
        window.open('https://youtu.be/xMPkgtOxlfo');
      }, 1000); 
      break;

    case "quote":
      const quotes = [
        `So much internet money everywhere now you just have to grab it!`,
        `Congrats! You will receive an email shortly with a survey. Please be sure to fill it out completely. Don't mind the redirect to login to your bank. That's just to verify you're a human and not a bot.`,
        `If at first you don't succeed; call it version 1.0.`,
        `There are 10 types of people in the world: those who understand binary, and those who don’t.`,
        `I’m not great at the advice. Can I interest you in a sarcastic comment?`,
        `It works on my machine...`,
        `To err is human – and to blame it on a computer is even more so.`,
        `I'm not lazy, I'm just buffering.`,
        `A bug in the code is worth two in the specs.`,
        `Programmers: turning coffee into code since forever.`,
        `Have you tried turning it off and on again?`,
        `404: Inspiration not found.`,
        `First, solve the problem. Then, write the code.`,
        `Artificial intelligence is no match for natural stupidity.`,
        `In case of fire: git commit, git push, leave building.`,
        `My code doesn’t have bugs, it just develops random features.`,
        `I’m not a great programmer; I’m just a good programmer with great habits.`,
        `There’s no place like 127.0.0.1.`,
        `I don’t always test my code, but when I do, I do it in production.`,
        `Debugging: Being the detective in a crime movie where you are also the murderer.`,
        `Code is like humor. When you have to explain it, it’s bad.`,
        `Programming is like writing a book... except when you miss a single comma on page 126, the whole thing makes no sense.`
      ];
    
      function wrapText(text, maxLength) {
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';
    
        words.forEach(word => {
          if ((currentLine + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        });
        
        if (currentLine) {
          lines.push(currentLine);
        }
    
        return lines.join('\n');
      }
    
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
      const wrappedQuote = wrapText(randomQuote, 80);
    
      wrappedQuote.split('\n').forEach(line => {
        addLine(line, "color2", 80);
      });
      break;
    
    case "?":
      liner.classList.add("password");
      pw = true;
      break;

    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;

    case "password":
      addLine("<span class=\"inherit\"> Mate you can do better tha this for sure. Just at least try</span>", "error", 100);
      break;

    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;

    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;

      case "sudo":
      loopLines([
        '[sudo] password for guest: ',
        '  ',
        'Nice try, you don’t have superuser privileges. Stick to being a guest.'
      ], "color2 margin", 80);
      break;

      case "top":
      loopLines([
        'Monitoring system resources...',
        'CPU: 99% chill | Memory: 100% imagination | Processes: Too many to count!'
      ], "color2 margin", 80);
      break; 

      case "ifconfig":
        loopLines([
          'eth0      Link encap:Ethernet  HWaddr 00:1A:2B:3C:4D:5E',
          'inet addr:192.168.0.101  Bcast:192.168.0.255  Mask:255.255.255.0',
          '  ',
          'Status: Connected to a parallel universe!'
        ], "color2 margin", 80);
        break;

      case "ping":
        loopLines([
          'pinging moon (240.0.0.1) with 64 bytes of data...',
          '64 bytes from moon: icmp_seq=1 ttl=128 time=384.400 ms',
          '64 bytes from moon: icmp_seq=2 ttl=128 time=385.200 ms',
          '64 bytes from moon: icmp_seq=3 ttl=128 time=383.900 ms',
          '64 bytes from moon: icmp_seq=4 ttl=128 time=384.100 ms',
          '  ',
          '--- moon ping statistics ---',
          '4 packets transmitted, 4 received, 0% packet loss, time 4000ms',
          'rtt min/avg/max/mdev = 383.900/384.400/385.200/0.500 ms',
          'Approximate distance: 1.28 light years',
          'Mission accomplished! The moon is online.'
        ], "color2 margin", 80);
        break;

      case "acknowledged":
        setTimeout(function() {
          window.open('https://youtu.be/dQw4w9WgXcQ');
        }, 1000);
        break;

      case "linux":
        loopLines(linux, "color2 margin", 80);
        break;

      case "id":
      loopLines([
        '<span class="command">uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)</span>',
        'Just kidding! This isn\'t Linux, remember?'
      ], "color2 margin", 80);
      break;
      
    default:
      addLine("Command not found. Type 'help' for available commands.", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

function simulateFileSystem() {
  return {
    'home': {
      'user': {
        'documents': {
          'notes.txt': "World's first hacking movie?",
          'answer.txt': "If you know the answer, type '?' in the terminal > enter > your answer.",
          'secret.txt': "Wanna know a secret? Type 'acknowledged' in the terminal."
        }
      }
    }
  };
}

const fileSystem = simulateFileSystem();
let currentDirectory = '/home/user';

function handleLs(path) {
  const parts = path.split('/').filter(Boolean);
  let currentDir = fileSystem;

  for (let part of parts) {
    if (currentDir[part]) {
      currentDir = currentDir[part];
    } else {
      return "Directory not found";
    }
  }

  if (typeof currentDir === 'object') {
    return Object.keys(currentDir).join('\n');
  } else {
    return "Not a directory";
  }
}

function changeDirectory(dir) {
  const path = dir.startsWith('/') ? dir : `${currentDirectory}/${dir}`;
  const parts = path.split('/').filter(Boolean);
  let currentDir = fileSystem;

  for (let part of parts) {
    if (currentDir[part]) {
      currentDir = currentDir[part];
    } else {
      addLine("Directory not found", "error", 80);
      return;
    }
  }

  if (typeof currentDir === 'object') {
    currentDirectory = '/' + parts.join('/');
    addLine(`Changed directory to ${currentDirectory}`, "color2 margin", 80);
  } else {
    addLine("Not a directory", "error", 80);
  }
}

function handleCat(file) {
  const path = `${currentDirectory}/${file}`;
  const parts = path.split('/').filter(Boolean);
  let currentDir = fileSystem;

  for (let part of parts) {
    if (currentDir[part]) {
      currentDir = currentDir[part];
    } else {
      return null; 
    }
  }

  if (typeof currentDir === 'string') {
    return currentDir;
  } else {
    return null;
  }
}