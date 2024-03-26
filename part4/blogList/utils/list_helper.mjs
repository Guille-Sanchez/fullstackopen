import lodash from 'lodash'

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  if (blogs.length > 0) {
    totalLikes = blogs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.likes,
      0
    )
  }
  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null

  if (blogs.length > 0) {
    favoriteBlog = blogs[0]

    blogs.forEach((blog) => {
      if (blog.likes > favoriteBlog.likes) {
        favoriteBlog = {...blog}
      }
    })
  }

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  let mostActiveWriter = null

  if (blogs.length > 0) {
    const authors = lodash.groupBy(blogs, (blog) => {
      return blog.author
    })

    const keys = Object.keys(authors)

    const authorsWithBlogNumber = keys.map((key) => {
      return {
        author: key,
        blogs: lodash.size(authors[key]),
      }
    })

    mostActiveWriter = lodash.sortBy(authorsWithBlogNumber, 'blogs')[
      authorsWithBlogNumber.length - 1
    ]
  }

  return mostActiveWriter
}
const mostLikes = (blogs) => {
  const likesByAuthor = {}

  if (blogs.length === 0) {
    return null
  }

  blogs.forEach((blog) => {
    if (likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] += blog.likes
    } else {
      likesByAuthor[blog.author] = blog.likes
    }
  })

  let mostLikedAuthor = ''
  let maxLikes = 0
  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      mostLikedAuthor = author
      maxLikes = likesByAuthor[author]
    }
  }

  return {
    author: mostLikedAuthor,
    likes: maxLikes,
  }
}

export {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}
