import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean) => {

    //GraphQL Query

    const query = gql`
    query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
    )
    {
        myQuery(
            access_key: $access_key
            categories: $categories
            countries: "gb"
            sort: "published_desc"
            keywords: $keywords
          ) {
            data {
              author
              category
              country
              description
              image
              language
              published_at
              source
              title
              url
            }
            pagination {
              count
              offset
              limit
              total
            }
          }
    }`;

    //Fetch functiom with Next.js 13 caching....

    const res = await fetch('https://muncy.stepzen.net/api/pioneering-dachshund/__graphql', {
        method: 'POST',
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            },
        }),
    });

    console.log(
        "LOADING NEW DATA FROM API FOR CATEGORY >>>",
        category,
        keywords
    );

    const newsResponse = await res.json();

    //Sort funtion by images vs not image present

    const news = sortNewsByImage(newsResponse.data.myQuery);

    //return res

    return news;
}

export default fetchNews;

// Example Import
// stepzen import curl http://api.mediastack.com/v1/news?access_key=8f658b55a912d90b8c8b07acada0031b&sources=business,sports

// stepzen import curl http://api.mediastack.com/v1/news?access_key=8f658b55a912d90b8c8b07acada0031b&countries=us%2Cgb&limit=100&offset=0&sort=published_desc
