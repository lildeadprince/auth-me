# A rather overdone login form

## Ops
- Repo: Client + Server monorepo
- CI: GitHub actions set up for auto-deployment with diff tracking
- CD: 
  - client deployment to Firebase Hosting
  - server deployment to GCP Cloud Run

## Tech
+ Client:
  + **React** 
  + **PostCSS** _with a handful of plugins_
  + **CSS Modules** - _something that wouldn't bother me too much for a dummy app_
  + **Vite** - _decided to give it a try (far from infallible so far)_
  + **TS** - _a sprawling state and data flows are much less error-prone with some typecheck_
  + Some git-hooks with linting, some path aliasing,
+ Server:
  + **JS** - _just bootstrapped a prototype in a couple of hours, didn't want to complicate it_
  + Express with some security
  + Docker
+ Persistence:
  + serverless Redis (Upstash) - _session storage_ 
  + the same Redis - _the same instance for a pseudo-persistent database (don't tell the server)_

## A thought

The original goal was to make a form with as few non-major 3rd-party dependencies as possible.

The plan was overall straightforward, but in the end, it turned out so that the login form came up almost the last.

Login Form is kept as native as possible and _mostly_ relies on Browser validation and indication.
Otherwise, it would've been extremely tedious to handle all the pristine-dirty-blur-keydown shenanigans without a 
3rd-party lib.

The session is based on Http-Only Cookie from the server and email/password pair authenticity.

## Honorable mentions

* IntelliJ IDEA
* GitHub
* Google Could Platform
* Firebase
* Upstash (serverless redis)
* Squoosh (quick AVIF conversion)
* All the other things, so easily forgotten
