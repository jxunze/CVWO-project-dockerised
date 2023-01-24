# CVWO_project - dockerised

###### Author: Jin Xunze (A0255453A)

This is a project I did up for NUS's CVWO project. It resembles a forum that users can log in, post and comment on other's posts.

It features CRUD functions and JWT authentication.

Tech stack:

- PostgreSQL as database
- Ruby on Rails as backend
- ReactJS as frontend

The backend is hosted on https://cvwo-project.onrender.com/ and frontend is hosted on https://main--dreamy-dodol-f0dd1c.netlify.app/.

To deploy locally, ensure that ports 3000 and 3001 on the local machine are available, then run in terminal

```
git clone https://github.com/jxunze/CVWO-project-dockerised.git
docker-compose build
docker-compose run web rails db:create db:migrate
docker-compose up
```

Backend will be available at http://localhost:3000/ and frontend will be available at http://localhost:3001/
