import Layout from "../components/layout/Layout"
import Search from "../components/search/Search"

export default function HomePage() {
  return (
    <Layout>
      <h1>Find your next accomodation!</h1>
      <h2>Hotels, B&Bs and guesthouses</h2>
      <Search />
    </Layout>
  )
}