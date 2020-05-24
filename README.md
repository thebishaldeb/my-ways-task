# Demo App for MyWays

### Functionalities

- See the list of internships
- See the details of a particular internship, i.e, all the users who have applied for it.
- Send messages to user as a recruiter and send message as user.

<br/>

### The repository is divided as follows:

    ---> root
        |---> client
            |---> public
            |---> src
                |---> components
                |---> config
                |---> functions
        |---> server
            |---> config
            |---> models
            |---> seeds

<br/>

### To see the repository working, please follow the following instructions:

- Install the dependencies

```
    yarn
```

- Run seed file to seed the database with initial data from the root directory

```
    yarn seed
```

- Run the concurrent server in the root directory

```
    yarn dev
```

Note that you can use `npm install`, `npm run seed` and `npm run dev` in place of `yarn`, `yarn seed` and `yarn dev` respectively.

<br/>

## Author 
Bishal Deb