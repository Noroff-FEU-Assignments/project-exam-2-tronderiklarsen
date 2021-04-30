import Layout from "../components/layout/Layout"
import Search from "../components/search/Search"
import { API_URL } from "../constants/api"

export default function HomePage() {
  return (
    <Layout>
      <h1>Find your next accomodation!</h1>
      <h2>Hotels, B&Bs and guesthouses</h2>
      <Search />
      <h1>Explore Bergen</h1>
      <h2>Featured acommodations</h2>
    </Layout>
  )
}

export async function getServerSideProps({place}) {
  const response = await fetch(`${API_URL}/places`)
  const places = await response.json();

  return {
    props: {places},
  }
}