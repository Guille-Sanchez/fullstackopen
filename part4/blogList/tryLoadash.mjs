import lodash from 'lodash'

const manyBlogEntries = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  },
  {
    title: 'Testing 101',
    author: 'Guillermo',
    url: 'http://localhost:3000',
    likes: 0,
  },
  {
    title: 'Testing 202',
    author: 'Guillermo',
    url: 'http://localhost:3001',
    likes: 17,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  },
  {
    title: 'Testing 202',
    author: 'Sanchez',
    url: 'http://localhost:3001',
    likes: 17,
  },
  {
    title: 'Testing 202',
    author: 'Guillermo',
    url: 'http://localhost:3001',
    likes: 17,
  },
  {
    title: 'Testing 202',
    author: 'Sanchez',
    url: 'http://localhost:3001',
    likes: 17,
  },
]

const authorsWithBlogNumber = lodash
  .chain(manyBlogEntries)
  .countBy('author')
  .map((blogs, author) => ({author, blogs}))
  .value()

console.log(authorsWithBlogNumber)

//  const mostProlificAuthor = lodash.maxBy(authorsWithBlogNumber, 'blogs')

//  console.log(mostProlificAuthor)
