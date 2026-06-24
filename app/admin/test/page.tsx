"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function TestPage() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      console.log(data)
      console.log(error)
    }

    test()
  }, [])

  return <div>Testing Supabase...</div>
} 

