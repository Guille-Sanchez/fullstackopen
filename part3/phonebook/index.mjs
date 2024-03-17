import { app } from "./app.mjs"
import { PORT } from "./utils/config.mjs"
import { info } from "./utils/logger.mjs"

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
