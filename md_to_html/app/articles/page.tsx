import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getMetaData } from '../_utils/getArticle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

interface ArticleMeta {
  slug: string
  frontmatter: {
    Title: string
    Created: string
    Tags: string[]
    Description: string
    Image: string
  }
}

function getAllDatesLatestToOldest(posts: ArticleMeta[]): ArticleMeta[] {
  return [...posts].sort((a, b) => {
    return new Date(b.frontmatter.Created).getTime() - new Date(a.frontmatter.Created).getTime()
  })
}

const articlePage = () => {

  const mkData = getMetaData()

  const sortedData = getAllDatesLatestToOldest(mkData)
  

  return (
    <div className='w-full'>
        <h2> List of all articles</h2>
        <div className="flex flex-col justify-center items-center">
           
            {
              sortedData.map((data, index) => (
                <Card
                key={index}
                className="m-2 w-[60%] h-[30%] bg-gray-100 border-[1.8px] shadow-sm hover:bg-zinc-200"
                >
                  <CardHeader>
                    <CardTitle>{data.frontmatter.Title}</CardTitle>
                    <CardAction>
                      <Button className='bg-gray-700 hover:bg-black'>
                        <Link
                        href={`/articles/${data.slug}`}
                        >
                        View
                        </Link>
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <div className='p-5 grid md:grid-cols-3 gap-3'>
                    <CardContent>
                      <Image
                      src={`/${data.frontmatter.Image}`}
                      alt='image'
                      height={100}
                      width={100}
                      />
                    </CardContent>
                    <CardDescription className='col-span-2'>{data.frontmatter.Description}</CardDescription>
                  </div>
                  <div className='flex flex-wrap gap-3 p-5'>
                    {
                      data.frontmatter.Tags.map((tag : string, idx : number)=>(
                        <Badge key={idx} variant="secondary" className='text-center'>{tag}</Badge>
                      ))
                    }
                    
                  </div>
                  <CardFooter>
                    <p>{data.frontmatter.Created}</p>
                  </CardFooter>
                </Card>
              ))
            }
           
        </div>
    </div>
  )
}

export default articlePage