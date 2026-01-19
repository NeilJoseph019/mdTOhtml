import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getMetaData } from "./_utils/getArticle"

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


export default function Home() {

  const mkData = getMetaData()
  
  const sortedData = getAllDatesLatestToOldest(mkData).slice(0, 3)
    

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="p-5 bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
      <h2 className="text-2xl">Journals</h2>
      <div className=" flex-col min-h-[60%] m-5 ">
                                          {/* Sort articles by date from newest to oldest , ONLY TOP 3 ARTICLES */}
        <p className="text-gray-600">Recent</p>

        <div className="flex justify-center items-center">
          {
            sortedData.map((article, index) => (
              <Card
              key={index}
              className="m-2 w-60 h-60 bg-gray-100 border-[1.8px] shadow-sm hover:bg-zinc-200"
              >
                <CardHeader>
                  <CardTitle>{article.frontmatter.Title}</CardTitle>
                </CardHeader>
                <div className="line-clamp-3 h-[55%] px-5 text-sm text-gray-600">
                  {article.frontmatter.Description}
                </div>
                <CardFooter>
                  <p>{article.frontmatter.Created}</p>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </div>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
    </div>
  );
}
