import qs from "qs";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { API_URL } from "../constants/api";
import ResultItem from "../components/results/ResultItem";
import Link from "next/link";

export default function ResultsPage({ places }) {
  const router = useRouter();

  return (
    <Layout title="Results - Holidaze">
      <Link href="/">Return</Link>
      <h1>
        Search results for: <i>{router.query.term}</i>
      </h1>

      {places.map((place) => (
        <ResultItem key={place.id} place={place} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { address_contains: term },
      ],
    },
  });
  const response = await fetch(`${API_URL}/places?${query}`);
  const places = await response.json();

  return {
    props: {
      places,
    },
  };
}
