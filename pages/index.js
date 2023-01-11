import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import List from '../components/List'
import Map from '../components/Map'
import { getPlacesData } from './api'

const Home = () => {
  const [places, setPlaces] = useState([])
  console.log(places)
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [bounds, setBounds] = useState(null)
  const [type, setType] = useState('restaurants')
  const [ratings, setRatings] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // get the users current location on intial login
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log({ latitude, longitude })
        setCoordinates({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  useEffect(() => {
    const filteredData = places.filter((place) => place.rating > ratings)
    setFilteredPlaces(filteredData)
  }, [ratings])

  useEffect(() => {
    setIsLoading(true)
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      setPlaces(data)
      setIsLoading(false)
    })
  }, [type, coordinates, bounds])

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      width={'100vw'}
      height={'100vh'}
      maxWidth={'100vw'}
      maxHeight={'100vh'}
      position={'relative'}>
      {/* <Head>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCNg3Wuul2IH5emMMMMr2Ne-OaB8v6fty8"></script>
      </Head> */}
      <Header
        setType={setType}
        setRatings={setRatings}
        setCoordinates={setCoordinates}
      />
      <List
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
      />
      <Map
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
      />
    </Flex>
  )
}

export default Home
