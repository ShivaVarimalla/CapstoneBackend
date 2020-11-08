//save current users in a array
const users = [];
//adding a user to the array
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const user = { id, name, room };

  users.push(user);

  return { user };
}
//removing the user from array on disconnect
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
}
//get a user by id
const getUser = (id) => users.find((user) => user.id === id);
//get the list of users in a room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };