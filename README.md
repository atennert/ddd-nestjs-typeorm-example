# Dddauction

This is an example SW for showing how DDD can be done in NestJS.

## About DDD with NestJS

DDD on code side is all about coding using the ubiquitous language (the business language). The code should represent the business processes. The code design follows the aggregate schema from the tactical design.

The `domain` folders contain the domain logic. I explicitly created folders inside of `domain` to mark the aggregates. The folder `infrastructure` contains code for supporting technical things like repository access. `application` contains some intermediary code between `infrastructure` and `domain` where necessary / useful.

Login/logout, session and role handling should be part of a third party system, like Keycloak. We could get the user ID from the session to use it as `bidderId` in the `Bid` entity.

What feels generally a little dirty in this example is the amount of logic in the repository files. It might be worth to extract that into services. However, doing that should keep the repository access closely tied to the DDD entities. Usually the repository should be accessed through the DDD entities. It is advisable to let them overlap with the TypeORM entities. However, TypeORM doesn't like repository access through entities very much, so there needs to be some way to work around that. The work-around in this example is to access the entity through the repository helper instead. This can also make sense, if the repo helper and it's methods have useful names from the ubiquitous language, like accessing company cars through a `CarPool`.

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Environment variables

```sh
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306

PLATFORM_DB=ddd-auction
ADMIN_DB=ddd-auction-admin

PLATFORM_ADDRESS=localhost:3000
ADMIN_ADDRESS=localhost:3001
```

## Start the application

Run `npm start` to start the development server. Happy coding!

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

...or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
