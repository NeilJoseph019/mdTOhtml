'use client'

import { Fragment, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadcrumbComponent = () => {

    const pathname = usePathname()

    const [pathList, setPathList] = useState<string[]>([])

    useEffect(()=>{

    if (pathname === "/") {
      setPathList(['Dashboard'])
    } 
    else {
      const segments = pathname
        .split('/')
        .filter(segment => segment)
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '))   
      
      setPathList(segments)
    }

    
},[pathname])

  return (
    <Breadcrumb>
        <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
            Core
            </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {
            pathList.map((item, index)=>(
                <Fragment key={index}>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{item}</BreadcrumbPage>
                    </BreadcrumbItem>
                    { index < pathList.length - 1 && <BreadcrumbSeparator className="hidden md:block" /> }
                </Fragment>
            ))
        }
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbComponent