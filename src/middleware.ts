//withAuth function from middleware module
import { withAuth } from "next-auth/middleware"

//if unauthentication user tries to access protected route send to '/login'
export default withAuth({
  pages: {
    signIn: "/login",
  },
})

//tells next which routes the middleware should run 
export const config = { matcher: ["/questions/ask"] }
