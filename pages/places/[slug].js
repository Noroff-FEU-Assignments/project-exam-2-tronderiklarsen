import Layout from "../../components/layout/Layout"
import {API_URL} from "../../constants/api"
import Image from "next/image"

export default function PlacePage({place}) {
    return (
        <Layout>
            <Image src={place.image.formats.small.url} height={333} width={500}/>
            <h1>{place.name}</h1>
            <p>{place.description}</p>
            <p>Address: {place.address}</p>
            <h2>{place.price} NOK</h2>
            <a className="btn">Enquire</a>
        </Layout>
    )
}

export async function getServerSideProps({ query: { slug }}) {

    const response = await fetch(`${API_URL}/places?slug=${slug}`)
    const places = await response.json()

    return { 
        props: {
            place: places[0],
        }, 
    }
}

