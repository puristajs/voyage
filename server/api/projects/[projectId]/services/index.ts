export default eventHandler((_event) => {
  return [
    {
      id: 'service-a',
      name: 'Service A',
      versions: [
        {
          id: 'service-a:1',
          version: '1',
          deprecated: true,
        },
        {
          id: 'service-a:2',
          version: '2',
          deprecated: false,
        },
      ],
    },
    {
      id: 'service-b',
      name: 'Service B',
      versions: [
        {
          id: 'service-b:1',
          version: '1',
          deprecated: false,
        },
      ],
    },
    {
      id: 'service-c',
      name: 'Service C',
      versions: [
        {
          id: 'service-c:1',
          version: '1',
          deprecated: false,
        },
      ],
    },
    {
      id: 'service-d',
      name: 'Service D',
      versions: [
        {
          id: 'service-d:1',
          version: '1',
          deprecated: false,
        },
      ],
    },
  ]
})
