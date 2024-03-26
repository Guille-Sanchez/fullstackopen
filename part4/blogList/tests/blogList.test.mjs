import assert from 'node:assert'
import {test, describe} from 'node:test'
import {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
} from '../utils/list_helper.mjs'

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)

  assert.strictEqual(result, 1)
})

describe('Total Likes', () => {
  test('Successfully adds likes for an empty list', () => {
    const blogs = []

    const likesSum = totalLikes(blogs)
    assert.strictEqual(likesSum, 0)
  })

  test('Successfully adds likes for a list with one value', () => {
    const blogs = [
      {
        title: 'Testing 101',
        author: 'Guillermo',
        url: 'http://localhost:300',
        likes: 5,
      },
    ]

    const likesSum = totalLikes(blogs)
    assert.strictEqual(likesSum, 5)
  })

  test('Successfully adds likes for a list with more than one value', () => {
    const blogs = [
      {
        title: 'Testing 101',
        author: 'Guillermo',
        url: 'http://localhost:3000',
        likes: 5,
      },
      {
        title: 'Testing 202',
        author: 'Sanchez',
        url: 'http://localhost:3001',
        likes: 7,
      },
    ]

    const likesSum = totalLikes(blogs)
    assert.strictEqual(likesSum, 12)
  })
})

describe('Favorite Blog', () => {
  const emptyBlog = []
  const oneBlogEntry = [
    {
      title: 'Testing 101',
      author: 'Guillermo',
      url: 'http://localhost:3000',
      likes: 17,
    },
  ]
  const manyBlogEntries = [
    {
      title: 'Testing 101',
      author: 'Guillermo',
      url: 'http://localhost:3000',
      likes: 0,
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
  ]

  test('Successfully process empty blog list', () => {
    const favorite = favoriteBlog(emptyBlog)
    assert.strictEqual(favorite, null)
  })

  test('Successfully process one blog entry', () => {
    const favorite = favoriteBlog(oneBlogEntry)
    assert.deepStrictEqual(favorite, oneBlogEntry[0])
  })

  test('Successfully process more than one blog entry', () => {
    const favorite = favoriteBlog(manyBlogEntries)
    assert.deepStrictEqual(favorite, manyBlogEntries[2])
  })
})

describe('Most active blogger', () => {
  const emptyBlog = []
  const oneBlogEntry = [
    {
      title: 'Testing 101',
      author: 'Guillermo',
      url: 'http://localhost:3000',
      likes: 17,
    },
  ]
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

  test('Successfully process empty blog list', () => {
    const mostActiveWriter = mostBlogs(emptyBlog)
    assert.strictEqual(mostActiveWriter, null)
  })

  test('Successfully process writer for one blog entry', () => {
    const mostActiveWriter = mostBlogs(oneBlogEntry)
    assert.deepStrictEqual(mostActiveWriter, {author: 'Guillermo', blogs: 1})
  })

  test('Successfully process writer for more than one blog entry', () => {
    const mostActiveWriter = mostBlogs(manyBlogEntries)
    assert.deepStrictEqual(mostActiveWriter, {author: 'Guillermo', blogs: 3})
  })
})

describe('Most liked blogpost', () => {
  const emptyBlog = []
  const oneBlogEntry = [
    {
      title: 'Testing 101',
      author: 'Guillermo',
      url: 'http://localhost:3000',
      likes: 17,
    },
  ]
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

  test('Successfully process empty blog list', () => {
    const mostActiveWriter = mostLikes(emptyBlog)
    assert.strictEqual(mostActiveWriter, null)
  })

  test('Successfully process writer for one blog entry', () => {
    const mostActiveWriter = mostLikes(oneBlogEntry)
    assert.deepStrictEqual(mostActiveWriter, {author: 'Guillermo', likes: 17})
  })

  test('Successfully process writer for more than one blog entry', () => {
    const mostActiveWriter = mostLikes(manyBlogEntries)
    assert.deepStrictEqual(mostActiveWriter, {author: 'Guillermo', likes: 34})
  })
})
