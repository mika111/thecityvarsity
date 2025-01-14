'use client'

import { useRouter } from "next/navigation";
import { Archivo_Black } from 'next/font/google'
import { usePostHog } from "posthog-js/react";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"] })

// Displays image specified in tailwind.config.ts with title, subtitile and button
export default function Title(title: string, subtitle: string, buttonText: string, ticketLink: string) {
  const router = useRouter()
  const posthog = usePostHog()

  const onClick = () => {
    posthog.capture('Button Click', {'buttonText': buttonText, 'buttonLink': ticketLink})
    router.push(ticketLink)
  }

  const button = <div>
      <button className={"bg-btn-purple w-5/6 sm:w-fit mt-8 "+archivo.className} onClick={onClick}>
        <h1 className="py-4 md:py-4 px-4 md:px-16 text-md sm:text-lg md:text-xl text-primary">{buttonText}</h1>  
      </button>
    </div>

  return <div className="w-screen min-h-[500px] h-[40%] md:h-[50%] lg:h-[75%] bg-hero bg-no-repeat bg-center bg-cover">
      <div className="h-full w-full backdrop-brightness-75 flex items-center">
        <div className={"py-12 my-4 w-full content-center text-center text-primary "+archivo.className}>
          <h1 className="px-8 text-4xl md:text-6xl">
            <b>{title}</b>
          </h1>
          <h2 className="text-xl md:text-3xl">
            <b>{subtitle}</b>
          </h2>
          {button}
        </div>
      </div>  
    </div>
}