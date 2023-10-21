export const Total = ({parts}) => {
  const totalNumber = parts.reduce((sum, part) => sum += part.exercises, 0)
  return (
    <h2>Number of exercises {totalNumber}</h2>
  )
}
