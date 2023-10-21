import { Content } from "./Content"
import { Header } from "./Header"
import { Total } from "./Total"
export const Course = ({courses}) => {
  return (
    <ul>
    {courses.map(course => {
      return (
        <li key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </li>
      )
    
    })}
    </ul>
  )
}
