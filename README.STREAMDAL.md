KafkaJS (instrumented with Streamdal)
=====================================================================================

This is a minimally intrusive fork of [KafkaJS](https://github.com/tulios/kafkajs)
that provides Streamdal's code-native data pipeline functionality via the 
[Streamdal Node SDK](https://github.com/streamdal/streamdal/tree/main/sdks/node).

### Prerequisites

Streamdal's platform must be running either locally or remotely, to install it locally:

```shell
curl -s https://sh.streamdal.com | bash
```

For other install options, see [here](https://github.com/streamdal/streamdal/tree/main/docs/install)

### Getting Started

```
npm install @streamdal/kafkajs
```

Streamdal can be configured via code as constructor arguments or via environment variables.

At a minimum, the following configuration variables must be set via the environment or 
constructor arguments to the Kafkajs client for Streamdal functionality to be enabled. 
If *only* these are set then all instrumentation will happen automatically.

1. `STREAMDAL_URL`
    - Address for the streamdal server (Example: `localhost:8082`) 
1. `STREAMDAL_TOKEN`
    - Authentication token used by the server (Example: `1234`)
1. `STREAMDAL_SERVICE_NAME`
    - How this application/service will be identified in Streamdal Console

Here is an example of configuring via constructor args. Here you can also see the other 
configuration options available.

```typescript

const streamdalConfigs = {
  streamdalUrl: "localhost:8082",
  streamdalToken: "1234",
  serviceName: "user-management-service",
  pipelineTimeout: "100",
  stepTimeout: "10",
  dryRun: false,
  quiet: true,
  disableAutomaticPipelines: true,
  abortOnError: true
};

const kafka = new Kafka({
  clientId: "user-management",
  brokers: ["localhost:9092", "localhost:9092"],
  streamdalConfigs
});

```

🎉 That's it - you're ready for the example! 🎉

## Example

A fully working example is provided at [here](https://github.com/streamdal/streamdal-examples/tree/main/kafka/kafkajs-shim).

