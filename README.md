# Simple Chat Application

A minimal terminal chat room built with Node.js and raw TCP sockets (the built-in `net` module), with no dependencies.

The project is a learning exercise. It shows how a TCP server accepts connections and broadcasts messages to every connected client, and how a terminal client sends and receives messages at the same time.

## Features

- Multiple users can chat in a single shared room
- Each user gets a numeric ID when they connect
- Everyone is notified when a user joins or leaves

## Requirements

- [Node.js](https://nodejs.org/) (no `npm install` needed)

## Usage

Start the server:

```sh
node server.js
```

Then open one or more other terminals and start a client in each:

```sh
node client.js
```

Type a message and press Enter to send it to everyone in the room.

The server listens on `127.0.0.1:4020`. To change this, edit `HOST` and `PORT` in both files.

## How it works

| File | Role |
| --- | --- |
| `server.js` | Accepts TCP connections, gives each client an ID, and broadcasts messages and join/leave notices to all clients |
| `client.js` | Connects to the server, reads your input with `readline`, and prints incoming messages above the prompt |

Messages are sent as plain text. The client sends `<id>-message-<text>`, and the server receives its ID as `id-<number>`.
