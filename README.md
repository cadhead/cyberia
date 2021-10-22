# Cyberia
About
---
Web application that provides media synchronization and chat for a number of rooms.

The both serverside and frontside is written in modern JavaScript and runs on Node.JS. It makes use of a mongodb database to store user registrations and data about each room.
Cyberia make use preact for frontend developing and parceljs as bundler.

This is a pet project that developed just for fun and learning. I hosting cyberia server at https://cyberiatv.online/

Todo
---
**Code:**
- Refactor current code
- Optimize http and db requests
- Redis for stroing messages, playlists etc.
  - Also make collections for messages and playlist on mongodb

**Futures:**
- Admin panel
- Room creation panel
- Room ranks
- Site and Room permissions 

Version 1
---
I wanna write it by typescript, also using nestjs.
Feel free to send pull requests. I'm also opened for futures suggestions and code review.

License
---
Original source code in this repository is provided under the MIT license (see the LICENSE file for the full text).
Bundled source code, such as third-party CSS and JavaScript libraries, are provided under their respective licenses.
