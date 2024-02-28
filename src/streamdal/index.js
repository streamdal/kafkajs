const produceProcess = async (messages, streamdal, streamdalAudience, topic) => {
  if (streamdal && (streamdalAudience || !streamdal.configs.disableAutomaticPipelines)) {
    const encoder = new TextEncoder()

    const audience = streamdalAudience || {
      serviceName: streamdal.configs.serviceName || process.env.STREAMDAL_SERVICE_NAME,
      componentName: 'kafka',
      operationType: 2,
      operationName: topic,
    }

    const results = await Promise.all(
      messages.map(async message => {
        const streamdalResult = await streamdal.registration.process({
          audience,
          data: encoder.encode(message.value),
        })
        if (streamdalResult.status === 3 && streamdal.configs.abortOnError) {
          throw Error(
            'Error processing streamdal pipeline, aborting per configuration',
            streamdalResult.statusMessage
          )
        }
        return { ...message, value: Buffer.from(streamdalResult.data) }
      })
    )

    return results
  }

  return messages
}

const consumeProcess = async (messages, streamdal, streamdalAudience, topic) => {
  if (streamdal && (streamdalAudience || !streamdal.configs.disableAutomaticPipelines)) {
    const audience = streamdalAudience || {
      serviceName: streamdal.configs.serviceName || process.env.STREAMDAL_SERVICE_NAME,
      componentName: 'kafka',
      operationType: 1,
      operationName: topic,
    }

    const results = await Promise.all(
      messages.map(async message => {
        const streamdalResult = await streamdal.registration.process({
          audience,
          data: Uint8Array.from(message.value),
        })
        if (streamdalResult.status === 3 && streamdal.configs.abortOnError) {
          throw Error(
            'Error processing streamdal pipeline, aborting per configuration',
            streamdalResult.statusMessage
          )
        }
        return { ...message, value: Buffer.from(streamdalResult.data) }
      })
    )

    return results
  }

  return messages
}

module.exports = { produceProcess, consumeProcess }
