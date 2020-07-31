export default {
  api: {
    root_url: 'http://localhost:3001/v1',
  },
  socket: {
    endpoint: 'http://localhost:3001',
    events: {
      update_message: 'update-message',
    },
  },
}
