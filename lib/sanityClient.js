import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'enae315k',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'ski9m0IrK52hBgulyZKYa4A6vvwUsUIB5NqNnXcSpENPR4Ko9BEM0rDJdpLKSj4x6GOVKHm5Kcp9Ny5aWzgCPJOE74oB67IOU7GNf8jPfjgR3VyOSi1eM8ZQIwKKhtw27PhZa1XsZ44aDhllWJ0KZS2r6aMJwRAotp6pQhni4sfLigEfLxtH',
  useCdn: false,
})
