# Student Tracker Proxy Server

This server is used to call GitHub's API with basic auth to get the most recent commit of the students in my class. GitHub's API allows 60 calls/hour without auth, and 5000 with auth.

To use the server, set up two environment variables with your GitHub username and password, clone and enjoy up to 5000 GitHub API calls!

## Setup

### Create self-signed cert

The string argument is what you intend your local development URL for your project to be (see Hotel section below).

```sh
./makecerts.sh 'proxy.localhost'
```

### Using Hotel in Development

[Hotel](https://github.com/typicode/hotel) is a process manager for starting up local servers in development. It supports `https` with some configuration.

### Install Hotel

```sh
npm install -g hotel
```

Add proxy service to Hotel

```sh
hotel add 'NODE_ENVIRONMENT="Development" ghusername="{insert yours here}" ghpassword="{insert yours here}" node server.js' -o spyproxy.log --name spyproxy --port 6060
```

If you have 2FA enabled, use an OTP token.

```sh
hotel add 'NODE_ENVIRONMENT="Development" GITHUB_TOKEN="a9f9d937d6a8e9e9d5a8c96c"  node server.js' -o spyproxy.log --name spyproxy --port 6060
```

Start Hotel

```sh
hotel start
```

Visit [http://localhost:2000](http://localhost:2000) and start the `spyproxy` server.

## Verify Proxy Service is Running


Visit [http://spyproxy.localhost:6060](http://spyproxy.localhost:6060) you should get a message from the browser about how you are visiting an unsafe site. Allow the browser to continue to the site.