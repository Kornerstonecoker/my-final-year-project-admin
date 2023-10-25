/**
 * The `ModalProvider` component is a React component that renders a `StoreModal` component only after
 * it has been mounted.
 * @returns The ModalProvider component is being returned.
 */
"use client"

import { StoreModal } from "@/components/modals/store-modal";
import { useEffect, useState } from "react"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if(!isMounted){
    return null;
  }

  return(
    <>
      <StoreModal/>
    </>
  )
}