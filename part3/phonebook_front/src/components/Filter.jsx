export const Filter = ({setFilterNames, filterNames}) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="filter-name">filter shown with</label>
      <input id="filter-name" onChange={e => setFilterNames(e.target.value)} value={filterNames} type="text" />
    </form>
  )
}
