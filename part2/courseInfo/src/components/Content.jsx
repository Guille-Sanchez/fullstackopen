export const Content = ({parts}) => {
  return (
    <ul>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </ul>
  )
}
