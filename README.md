# README #

> Docker image to check lighthouse for failures, intended for use in CI pipelines

[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is a great tool for recommending changes to a website. By adding it to your CI pipeline you can get instant feedback if there has been a change with your performance, accesibility, SEO, PWA-ness, and if you've not followed some best practices. This is **not** a replacement for running manual checks but is intended to catch low-hanging fruit.

## Requirements ##

* Docker

## Usage ##

Run the docker image [alsmith/lighthouse-failures:latest](https://hub.docker.com/r/alsmith/lighthouse-failures).

```bash
docker run alsmith/lighthouse-failures:latest checkLighthouseFailures <your website>
```

E.g.

```
$ docker run alsmith/check-lighthouse-failures:latest checkLighthouseFailures https://broken.alsmith.dev

The following rules had failures:
❌ Does not redirect HTTP traffic to HTTPS
❌ Does not register a service worker that controls page and start_url
❌ Current page does not respond with a 200 when offline
❌ Web app manifest does not meet the installability requirements
❌ Does not provide a valid `apple-touch-icon`
❌ Is not configured for a custom splash screen
❌ Does not set an address-bar theme color
❌ start_url does not respond with a 200 when offline
Total lighthouse failures: 8

$ docker run alsmith/lighthouse-failures:latest checkLighthouseFailures https://fixed.alsmith.dev

All lighthouse rules passed
```

## Build ##

To build the image yourself:

1. Clone this repository
1. `docker build . -t lighthouse-failures:latest`
