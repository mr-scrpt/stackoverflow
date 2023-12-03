import { IJob, IRestCountry } from '@/types'
import { JobFilterParams } from '@/types/shared'

export const fetchLocation = async () => {
  const response = await fetch('http://ip-api.com/json/?fields=country')
  const location = await response.json()
  return location.country
}

export const fetchCountries = async (): Promise<
  { name: string; value: string }[]
> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result: IRestCountry[] = await response.json()

    const data = result.map(({ name, cca2 }) => ({
      name: name.common,
      value: name.common,
    }))
    return data
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}

export const fetchJobs = async (filters: JobFilterParams): Promise<IJob[]> => {
  const { query, page } = filters
  console.log(' =>>> query', query)

  const headers = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY ?? '',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  }

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
    {
      headers,
    }
  )

  const result = await response.json()

  return result.data
}
