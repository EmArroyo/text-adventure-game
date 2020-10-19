// DEFINITIONS

// Classes

class Room {
  constructor(name, number, description, floor, requiredItem, item, character) {
    this._roomName = name;
    this._roomNumber = number;
    this._roomDescription = description;
    this._roomFloor = floor;
    this._requiredItem = requiredItem;
    this._roomItem = item;
    this._roomCharacter = character;
    this._linkedRooms = {};
  }

  get name() {
    return Room._name;
  }

  get roomDescription() {
    return Room._roomDescription;
  }

  get rooms() {
    return Room._linkedRooms;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Room name is too short.");
      return;
    }
    this._name = value;
  }

  set roomDescription(value) {
    if (value.length < 4) {
      alert("Room description is too short.");
      return;
    }
    this._roomDescription = value;
  }

  set roomFloor(value) {
    if (
      value !== "topfloor" ||
      "secondfloor" ||
      "firstfloor" ||
      "groundfloor"
    ) {
      alert(
        "Room floor is not a valid value. Please use topfloor, secondfloor, firstfloor or groundfloor."
      );
      return;
    }
    this._roomFloor = value;
  }

  set roomItem(name) {
    if (name.length < 2) {
      alert("Item name is too short.");
      return;
    }
    this._roomItem = name;
  }

  describe() {
    return (
      "This room is the " + this._roomName + " and " + this._roomDescription
    );
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      let roomToCheckItem = this._linkedRooms[direction];
      if (roomToCheckItem._requiredItem == undefined) {
        return this._linkedRooms[direction];
      } else if (checkRequiredItem(roomToCheckItem._requiredItem)) {
        return this._linkedRooms[direction];
      } else {
        alert("Looks like you need an item to access this room");
        return this;
      }
    } else {
      alert("You can't go that way");
      return this;
    }
  }
}

class Character {
  constructor(charName, charDescription, charConversation, charRoomLocation) {
    this._charName = charName;
    this._charDescription = charDescription;
    this._charConversation = charConversation;
    this._charRoomLocation = charRoomLocation;
  }

  get charName() {
    return Character._charName;
  }

  get charDescription() {
    return Character._charDescription;
  }

  get charConversation() {
    return Character._charConversation;
  }

  get charRoom() {
    return Character._charRoom;
  }

  set charName(value) {
    if (value.length < 2) {
      alert("Character name is too short.");
      return;
    }
    this._charName = value;
  }

  set charDescription(value) {
    if (value.length < 4) {
      alert("Character description is too short.");
      return;
    }
    this._charDescription = value;
  }

  set charConversation(value) {
    this._charConversation = value;
  }

  charDescribe() {
    return " The " + this._charName + " " + this._charRoomLocation + ".";
  }

  talk() {
    if (this._charName === "gatekeeper") {
      if (gatekeeperConversation === undefined) {
        gatekeeperDemand = this._charConversation[Math.floor((Math.random() * 3) + 1)];
        gatekeeperConversation = this._charName + ": " + this._charConversation[0] + " " + gatekeeperDemand
      return gatekeeperConversation;
    } return gatekeeperConversation;
    } return this._charName + ": " + this._charConversation + "."
  }
}

class Item {
  constructor(name, description, roomLocation) {
    this._itemName = name;
    this._itemDescription = description;
    this._itemRoomLocation = roomLocation;
  }

  get itemName() {
    return Item._itemName;
  }

  get itemDescription() {
    return Item._itemDescription;
  }

  set itemName(value) {
    if (value.length < 2) {
      alert("Item name is too short.");
      return;
    }
    this._itemName = value;
  }

  set itemDescription(value) {
    auto;
    if (value.length < 4) {
      alert("Item description is too short.");
      return;
    }
    this._itemDescription = value;
  }

  itemDescribe() {
    return " There is a " + this._itemName + " " + this._itemRoomLocation + ".";
  }

}

// Functions

function showInstructions() {
  document.getElementById("intro-screen").style = "display: none";
  document.getElementById("menu").style = "display: none"
  document.getElementById("instructions").style = "display: block";
}

function backToMenu() {
  document.getElementById("intro-screen").style = "display: block";
  document.getElementById("instructions").style = "display: none";
  document.getElementById("menu").style = "display:block"
}

function displayRoomInfo(room) {
  if ((room._roomItem === undefined || "") && (room._roomCharacter === undefined || "")) {
    textContent = room.describe();
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").focus();
  } else if ((room._roomItem !== undefined || "") && (room._roomCharacter !== undefined || "")) {
    textContent = room.describe() + room._roomItem.itemDescribe() + room._roomCharacter.charDescribe();
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").focus();
  } else if ((room._roomItem !== undefined || "") && (room._roomCharacter === undefined || "")) {
    textContent = room.describe() + room._roomItem.itemDescribe();
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").focus();
  } else if ((room._roomItem === undefined || "") && (room._roomCharacter !== undefined || "")) {
    textContent = room.describe() + room._roomCharacter.charDescribe();
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("usertext").focus();
  }
}

function checkRequiredItem(requiredItem) {
  for (i = 0; i < backpack.length; i++) {
    console.log(backpack[i]);
    if (backpack[i]._itemName === requiredItem) {
      return true;
    }
  }
}

function pickupItem() {
  if (currentRoom._roomItem !== undefined) {
    currentRoom._roomItem._itemRoomLocation = "Backpack";
    backpack.push(currentRoom._roomItem);
    console.log(backpack);
    alert(
      currentRoom._roomItem._itemName +
        " has been added to your backpack."
    );
    currentRoom._roomItem = undefined;
  } else {
    alert("There are no objects to pick up in this room.");

  }
}

function giveItem () {
  let itemToGive = prompt("What item would you like to give to the gatekeeper?");
  console.log(itemToGive);
  if (itemToGive === null || undefined) {
    alert("No item name was specified");
    giveItem();
  } else {
    for (i in backpack) {
      console.log(backpack[i]);
      if (backpack[i]._itemName === itemToGive) {
      gatekeeperItem = backpack[i];
      console.log(gatekeeperItem);
      backpack.splice(i, 1);
      console.log(backpack);
    }
} if (gatekeeperItem === undefined) {
  return alert("That is not one of the items in your backpack")
} alert ("You handed the item over to the gatekeeper")
}
}

function startGame() {
  gameStart = 1;
  document.getElementById("intro-screen").style = "display: none";
  document.getElementById("text-section").style = "display: block";
  currentRoom = room1;
  document.getElementById("room1").style = "background-color: blue";
  displayRoomInfo(currentRoom);
  document.getElementById(currentRoom._roomFloor).style = "display: grid;";
  document.getElementById("usertext").style = "display: grid;";
}

function winGame() {
  alert ("The gatekeeper smiles at you after you hand him the " + gatekeeperItem._itemName + ". He slowly heads to the door and proceeds to unlock it. You are free to leave this house forever.")
  document.getElementById("text-section").style = "display: none";
  document.getElementById(currentRoom._roomFloor).style = "display: none;";
  document.getElementById("win-screen").style = "display: block;";  
}

function loseGame() {
  alert ("The gatekeeper becomes enraged after you hand him the " + gatekeeperItem._itemName + ". What happened after that is all blurry in your mind. You wake up in the loft, the door locked this time, hearing the gatekeeper storm down the stairs while shouting: That's it. I will never let you leave this house.")
  document.getElementById("text-section").style = "display: none";
  document.getElementById(currentRoom._roomFloor).style = "display: none;";
  document.getElementById("gameover-screen").style = "display: block;";  
}

function endGame() {
  switch (gatekeeperDemand) {
    case "I am cold":
      if (gatekeeperItem._itemName === "blanket") {
        winGame();
      } else {
        loseGame();
      }
      break;
      case "I am hungry":
        if (gatekeeperItem._itemName === "cheese sandwich") {
          winGame();
        } else {
          loseGame();
        }
        break;
        case "I am bored":
      if (gatekeeperItem._itemName === "book") {
        winGame();
      } else {
        loseGame();
      }
      break;
    default:
      loseGame();
  }
}

function resetTextBox () {
  document.getElementById("usertext").value = "";
  document.getElementById("usertext").focus();
}

document.addEventListener("keydown", function (event) {
  if (gameStart === 0) {
    document.getElementById("pressanykey").style = "display:none"
    document.getElementById("menu").style = "display:block"
  } else if (event.key === "Enter") {
    command = document.getElementById("usertext").value;
    const directions = ["up", "down", "north", "south", "east", "west"];
    const actions = ["pick-up", "give", "talk"];
    if (directions.includes(command.toLowerCase())) {
      document.getElementById(currentRoom._roomFloor).style = "display: none;";
      document.getElementById(currentRoom._roomNumber).style =
        "white)";
      currentRoom = currentRoom.move(command);
      displayRoomInfo(currentRoom);
      document.getElementById(currentRoom._roomFloor).style = "display: grid;";
      document.getElementById(currentRoom._roomNumber).style =
        "background-color: blue";
      resetTextBox();
    } else if (actions.includes(command.toLowerCase())) {
      switch (command) {
        case "pick-up":
          pickupItem();
          resetTextBox();
          break;
        case "give":
          if (currentRoom !== room12) {
            alert("You should only give items to the gatekeeper")
            resetTextBox();
          } else {
              giveItem();
              endGame();
              resetTextBox();
          }
          break;
        case "talk":
          if (currentRoom._roomCharacter === undefined) {
            return alert("There is no one to talk to in this room.")
          }
          alert(currentRoom._roomCharacter.talk());
          resetTextBox();
          break;
      }
    } else {
      alert("That is not a valid direction or action. Please try again");
      resetTextBox();
    }
  }
}
);

// GAME CODE

// Rooms

let room1 = new Room(
  "loft",
  "room1",
  "this room is completely empty. There is a staircase to go down.",
  "topfloor"
);
let room2 = new Room(
  "second floor lobby",
  "room2",
  "there is a door to a staircase heading down with a red padlock on it. There are also four doors to other rooms.",
  "secondfloor"
);
let room3 = new Room(
  "master bedroom",
  "room3",
  "There is a bed, an armchair, a window and a fireplace.",
  "secondfloor",
  undefined,
  (mug = new Item("mug", "a heavy red mug", "on the night table"))
);
let room4 = new Room(
  "bathroom",
  "room4",
  "there is a bathtub, a sink and a toilet.",
  "secondfloor",
  undefined,
  (towel = new Item("towel", "a big soft towel", "hanging on the rail"))
);
let room5 = new Room(
  "library",
  "room5",
  "There is an armchair by the fire and a small coffee table by it.",
  "secondfloor",
  undefined,
  (smRedKey = new Item(
    "small red key",
    "a small red key",
    "on the coffee table"
  ))
);
let room6 = new Room(
  "dining room",
  "room6",
  "In the middle of the room there is a long table, flanked by 6 chairs on each side.",
  "secondfloor",
  undefined,
  (book = new Item("book", "a thick green book", "on the table")),
  (maid = new Character(
    "maid",
    "a young girl, average height, seems shy",
    "Someone needs to fix that front door, it is very drafty on days like today",
    "polishing cutlery by the window"
  ))
);

let room7 = new Room(
  "first floor lobby",
  "room7",
  "there is a door to a staircase heading down with a blue padlock on it. There are also four doors to other rooms.",
  "firstfloor",
  "small red key"
);

let room8 = new Room(
  "kitchen",
  "room8",
  "there is plenty of food on the counter, as if someone was planning to cook a meal for a gathering.",
  "firstfloor",
  undefined,
  (sandwich = new Item(
    "cheese sandwich",
    "a toasted cheese sandwich",
    "by the stove"
  )),
  (cook = new Character(
    "cook",
    "a man, can't tell much more since all I can see is his back",
    "I wouldn't go anywhere near that gatekeeper until he's had his lunch",
    "peeling potatoes over a bucket ready to catch the peels"
  ))
);

let room9 = new Room(
  "utility room",
  "room9",
  "there are all sort of things in here.",
  "firstfloor",
  undefined,
  (lever = new Item("black lever", "a strange lever", "on one of the shelfs"))
);

let room10 = new Room(
  "airing cupboard",
  "room10",
  "there are shelves on the wall and a railing hanging off of the ceiling.",
  "firstfloor",
  undefined,
  (blanket = new Item(
    "blanket",
    "a thick woollen blanket",
    "on top of a pile"
  ))
);

let room11 = new Room(
  "study room",
  "room11",
  "there are bookshelves to the right and a big desk under the window.",
  "firstfloor",
  undefined,
  (smBlueKey = new Item("small blue key", "a small blue key", "on the desk")),
  (boy = new Character(
    "boy",
    "a young boy, no more than ten years old.",
    "Sometimes I feel for the poor gatekeeper. Standing all day and night by that door must be really boring. If it was me, I'd spend my time reading",
    "is browsing the books on the shelves"
  ))
);

let room12 = new Room(
  "entrance",
  "room12",
  "there is only one door heading south but there is a red lock and a blue lock.",
  "groundfloor",
  "small blue key",
  undefined,
  (gatekeeper = new Character(
    "gatekeeper",
    "the old gatekeeper. Looks like he's been standing by that exit door since the dawn of time",
    ["Who are you and why are you here? I will not let anyone out until I think my needs have been satisfied.", "I am cold.", "I am hungry", "I am bored"],
    "is by the entrance door"
  ))
);

// Characters

// Rooms

roomsArray = [
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
  room7,
  room8,
  room9,
  room10,
  room11,
  room12,
];

room1.linkRoom("down", room2);
room2.linkRoom("up", room1);
room2.linkRoom("north", room3);
room3.linkRoom("south", room2);
room2.linkRoom("east", room4);
room4.linkRoom("west", room2);
room2.linkRoom("south", room5);
room5.linkRoom("north", room2);
room2.linkRoom("west", room6);
room6.linkRoom("east", room2);
room2.linkRoom("down", room7);
room7.linkRoom("up", room2);
room7.linkRoom("north", room8);
room8.linkRoom("south", room7);
room7.linkRoom("east", room9);
room9.linkRoom("west", room7);
room7.linkRoom("south", room10);
room10.linkRoom("north", room7);
room7.linkRoom("west", room11);
room11.linkRoom("east", room7);
room7.linkRoom("down", room12);
room12.linkRoom("up", room7);

// Other

let gameStart = 0;
let backpack = [];
let gatekeeperItem;
let gatekeeperConversation;
let gatekeeperDemand;

// START GAME

// startGame()
